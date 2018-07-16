import { shallowMount } from '@vue/test-utils'
import Chat from '@/components/Chat.vue'

describe('List.vue', () => {
  it('data.messages 内のメッセージを描画する', () => {
    const messages = [
      { icon: "icon1", text: "test1", isRight: true},
      { icon: "icon2", text: "test2", isRight: false}
    ];
    const wrapper = shallowMount(Chat, {
      data: function () {
        return {
          messages: messages
        }
      },
    });

    expect(wrapper.findAll("div.message-wrapper"))
      .toHaveLength(messages.length);
    expect(wrapper.findAll("div.message"))
      .toHaveLength(messages.length);
    expect(wrapper.findAll("div.message-icon"))
      .toHaveLength(messages.length);
    expect(wrapper.findAll("div.message-body"))
      .toHaveLength(messages.length);

    expect(wrapper.findAll("div.message-wrapper").at(0).classes())
      .toContain("right");
    expect(wrapper.findAll("div.message-wrapper").at(1).classes())
      .not.toContain("right");

    expect(wrapper.findAll("div.message-body").at(0).text())
      .toContain("test1");
    expect(wrapper.findAll("div.message-body").at(1).text())
      .toContain("test2");

    expect(wrapper.findAll("div.message-icon > img").at(0).attributes())
      .toHaveProperty("src", "images/icon1");
    expect(wrapper.findAll("div.message-icon > img").at(1).attributes())
      .toHaveProperty("src", "images/icon2");
  });

  it('data.actions 内のアクションを描画する', () => {
    const actions = [ { name: "test1" }, { name: "test2" } ];
    const wrapper = shallowMount(Chat, {
      data: function () {
        return {
          actions: []
        }
      },
    });

    expect(wrapper.findAll("div.user-area-wrapper"))
      .toHaveLength(0);
    expect(wrapper.findAll("button.action-button"))
      .toHaveLength(0);

    Object.assign(wrapper.vm.$data, { actions : actions });

    expect(wrapper.findAll("div.user-area-wrapper"))
      .toHaveLength(actions.length);
    expect(wrapper.findAll("button.action-button"))
      .toHaveLength(actions.length);

    expect(wrapper.findAll("button.action-button").at(0).text())
      .toContain("test1");
    expect(wrapper.findAll("button.action-button").at(1).text())
      .toContain("test2");
  });

  it('アクションボタン押下時に sendMessage が実行される', () => {
    const fn = jest.fn();

    const wrapper = shallowMount(Chat, {
      data: function () {
        return {
          actions: [ { name: "test1", sendMessage: function () { fn(); } } ]
        }
      },
    });

    expect(fn.mock.calls)
      .toHaveLength(0);

    wrapper.findAll("button.action-button").at(0).trigger('click');

    expect(fn.mock.calls)
      .toHaveLength(1);
  });
});