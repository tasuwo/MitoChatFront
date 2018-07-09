import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { retrieveEvents } from '@/components/ChatStream.js'

const mockAxios = new MockAdapter(axios);
jest.useFakeTimers();

describe('ChatStream.js', () => {
  const baseUrl = "https://api.mito-chat.tasuwo.net";
  const initialApp = {
    messages: [],
    actions: [],
    isTyping: false
  };
  let app = {};

  beforeEach(() => {
    app = {
      messages: [],
      actions: [],
      isTyping: false
    };
  });

  it('複数のイベントの発行時には、それらを同期的に順に実行する', async () => {
    mockAxios.onGet(baseUrl + '/events/1')
      .reply(200, { events: [
        { type: "TYPING", time: 3 },
        { type: "WAITING", time: 3 },
        { type: "TALK", icon: "icon1", text: "test1", right: true },
        { type: "WAITING", time: 1 },
      ]});

    expect(app)
      .toEqual(initialApp);

    await retrieveEvents(1, app);

    expect(app.isTyping)
      .toBe(true);

    jest.advanceTimersByTime(3 * 1000);

    expect(app)
      .toEqual(initialApp);

    jest.advanceTimersByTime(3 * 1000);

    expect(app.messages)
      .toEqual([
        { icon: "icon1", text: "test1", isRight: true },
      ])
  });

  it('待ちイベント発行時には、指定秒数停止する', async () => {
    mockAxios.onGet(baseUrl + '/events/1')
      .reply(200, { events: [ { type: "WAITING", time: 3 } ] });

    await retrieveEvents(1, app);

    expect(app)
      .toEqual(initialApp);

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3 * 1000);
  });

  it('書き込み中イベント発行時には、指定時間のみ isTyping を true にする', async () => {
    mockAxios.onGet(baseUrl + '/events/1')
      .reply(200, { events: [ { type: "TYPING", time: 3 } ] });

    expect(app.isTyping)
      .toBe(false);

    await retrieveEvents(1, app);

    expect(app.isTyping)
      .toBe(true);

    jest.advanceTimersByTime(3 * 1000);

    expect(app.isTyping)
      .toBe(false);
  });

  it('会話追加イベント発行時には、会話情報を messages に格納する', async () => {
    mockAxios.onGet(baseUrl + '/events/1')
      .reply(200, { events: [
        { type: "TALK", icon: "icon1", text: "test1", right: true },
        { type: "TALK", icon: "icon2", text: "test2", right: false },
      ]});

    expect(app.messages)
      .toEqual([]);

    await retrieveEvents(1, app);

    expect(app.messages)
      .toEqual([
          { icon: "icon1", text: "test1", isRight: true },
          { icon: "icon2", text: "test2", isRight: false },
      ]);
  });

  it('ボタン追加イベント発行時には、actions にその名前と次のイベント群取得用関数を格納する', async () => {
    mockAxios.onGet(baseUrl + '/events/1')
      .reply(200, { events: [
          { type: "PROVIDE_BUTTON", text: "test1", nextEventsId: 2 },
          { type: "PROVIDE_BUTTON", text: "test2", nextEventsId: 3 },
        ]});
    mockAxios.onGet(baseUrl + '/events/2')
      .reply(200, { events: [ { type: "TALK", icon: "icon1", text: "text1", right: true } ] });
    mockAxios.onGet(baseUrl + '/events/3')
      .reply(200, { events: [ { type: "TALK", icon: "icon2", text: "text2", right: true } ] });

    await retrieveEvents(1, app);

    expect(app.actions[0].name)
      .toEqual("test1");
    expect(app.actions[1].name)
      .toEqual("test2");
    expect(app.messages)
      .toEqual([]);

    await app.actions[0].sendMessage();

    expect(app.messages)
      .toEqual([
        { icon: "icon1", text: "text1", isRight: true },
      ]);

    await app.actions[1].sendMessage();

    expect(app.messages)
      .toEqual([
        { icon: "icon1", text: "text1", isRight: true },
        { icon: "icon2", text: "text2", isRight: true },
     ]);
  });

  it('ボタン消去イベント発行時には、格納済みの actions を全て削除する', async () => {
    mockAxios.onGet(baseUrl + '/events/1')
      .reply(200, { events: [ { type: "RESET_BUTTONS" } ]});
    app.actions = [
      { name: "test1", sendMessage: () => {} },
      { name: "test2", sendMessage: () => {} },
    ];

    await retrieveEvents(1, app);

    expect(app)
      .toEqual(initialApp)
  });

  it('タイムアウト時には app オブジェクトにエラーを格納する', async () => {
    mockAxios.onGet(baseUrl + '/events/1')
      .timeout();

    await retrieveEvents(1, app);

    expect(app.errors)
      .toHaveLength(1);
  });

  it('不正な形式のレスポンス時には app オブジェクトにエラーを格納する', async () => {
    mockAxios.onGet(baseUrl + '/events/1')
      .reply(200, {});

    await retrieveEvents(1, app);

    expect(app.errors)
      .toHaveLength(1);
  });
});
