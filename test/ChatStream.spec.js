import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { retrieveChat } from '@/modules/ChatStream.js'

import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex);

const mockAxios = new MockAdapter(axios);
jest.useFakeTimers();

describe('ChatStream.js', () => {
  const baseUrl = "https://api.mito-chat.tasuwo.net";
  let store;
  let state;

  beforeEach(() => {
    state = {
      messages: [],
      actions: [],
      errors: [],
      isTyping: false
    };
    store = new Vuex.Store({
      state: state,
      mutations: {
        startTyping (state) {
          state.isTyping = true
        },
        endTyping (state) {
          state.isTyping = false
        },

        addReactionButton (state, reaction) {
          state.actions.push(reaction)
        },
        resetReactionButtons (state) {
          state.actions = []
        },

        addMessage (state, message) {
          state.messages.push(message)
        },

        addError (state, error) {
          state.errors.push(error)
        }
      }
    })
  });

  it('複数のイベントの発行時には、それらを同期的に順に実行する', async () => {
    const scenario = {
      0: {
        events: [
          {type: "TYPING", time: 3},
          {type: "WAITING", time: 3},
          {type: "TALK", icon: "icon1", text: "test1", right: true},
        ]
      }
    };
    mockAxios.onGet(baseUrl + '/chat/1')
      .reply(200, { scenario: scenario });

    expect(state.messages)
      .toHaveLength(0);
    expect(state.isTyping)
      .toBe(false);

    await retrieveChat(1, store);

    expect(state.messages)
      .toHaveLength(0);
    expect(state.isTyping)
      .toBe(true);

    jest.advanceTimersByTime(3 * 1000);

    expect(state.messages)
      .toHaveLength(0);
    expect(state.isTyping)
      .toBe(false);

    jest.advanceTimersByTime(3 * 1000);

    expect(state.messages)
      .toEqual([
        { icon: "icon1", text: "test1", isRight: true },
      ]);
    expect(state.isTyping)
      .toBe(false);
  });

  it('待ちイベント発行時には、指定秒数停止する', async () => {
    const scenario = {
      0: {
        events: [
          { type: "WAITING", time: 3 },
        ]
      }
    };
    mockAxios.onGet(baseUrl + '/chat/1')
      .reply(200, { scenario: scenario });

    await retrieveChat(1, store);

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3 * 1000);
  });

  it('書き込み中イベント発行時には、指定時間のみ isTyping を true にする', async () => {
    mockAxios.onGet(baseUrl + '/chat/1')
      .reply(200, { scenario: {
          0: {
            events: [
              { type: "TYPING", time: 3 },
            ]
          }
        }});

    expect(state.isTyping)
      .toBe(false);

    await retrieveChat(1, store);

    expect(state.isTyping)
      .toBe(true);

    jest.advanceTimersByTime(3 * 1000);

    expect(state.isTyping)
      .toBe(false);
  });

  it('会話追加イベント発行時には、会話情報を messages に格納する', async () => {
    mockAxios.onGet(baseUrl + '/chat/1')
      .reply(200, { scenario: {
          0: {
            events: [
              { type: "TALK", icon: "icon1", text: "test1", right: true },
              { type: "TALK", icon: "icon2", text: "test2", right: false },
            ]
          }
        }});

    expect(state.messages)
      .toEqual([]);

    await retrieveChat(1, store);

    expect(state.messages)
      .toEqual([
          { icon: "icon1", text: "test1", isRight: true },
          { icon: "icon2", text: "test2", isRight: false },
      ]);
  });

  it('ボタン追加イベント発行時には、actions にその名前と次のイベント群取得用関数を格納する', async () => {
    mockAxios.onGet(baseUrl + '/chat/1')
      .reply(200, { scenario: {
          0: {
            events: [
              { type: "PROVIDE_BUTTON", text: "test1", nextChatId: 1 },
              { type: "PROVIDE_BUTTON", text: "test2", nextChatId: 2 },
            ]
          },
          1: {
            events: [
              { type: "TALK", icon: "icon1", text: "text1", right: true }
            ]
          },
          2: {
            events: [
              { type: "TALK", icon: "icon2", text: "text2", right: true }
            ]
          }
        }});

    await retrieveChat(1, store);

    expect(state.actions[0].name)
      .toEqual("test1");
    expect(state.actions[1].name)
      .toEqual("test2");
    expect(state.messages)
      .toEqual([]);

    await state.actions[0].sendMessage();

    expect(state.messages)
      .toEqual([
        { icon: "icon1", text: "text1", isRight: true },
      ]);

    await state.actions[1].sendMessage();

    expect(state.messages)
      .toEqual([
        { icon: "icon1", text: "text1", isRight: true },
        { icon: "icon2", text: "text2", isRight: true },
     ]);
  });

  it('ボタン消去イベント発行時には、格納済みの actions を全て削除する', async () => {
    const scenario = {
      0: {
        events: [
          { type: "RESET_BUTTONS" },
        ]
      }
    };
    mockAxios.onGet(baseUrl + '/chat/1')
      .reply(200, { scenario: scenario });
    state.actions = [
      { name: "test1", sendMessage: () => {} },
      { name: "test2", sendMessage: () => {} },
    ];

    await retrieveChat(1, store);

    expect(state.actions)
      .toHaveLength(0);
  });

  it('タイムアウト時には app オブジェクトにエラーを格納する', async () => {
    mockAxios.onGet(baseUrl + '/chat/1')
      .timeout();

    await retrieveChat(1, store);

    expect(state.errors)
      .toHaveLength(1);
  });

  it('不正な形式のレスポンス時には app オブジェクトにエラーを格納する', async () => {
    mockAxios.onGet(baseUrl + '/chat/1')
      .reply(200, {});

    await retrieveChat(1, store);

    expect(state.errors)
      .toHaveLength(1);
  });
});
