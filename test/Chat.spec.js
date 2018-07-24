import Chat from '@/components/Chat.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('List.vue', () => {
  it('data.messages 内のメッセージを描画する', () => {
    const messages = [
      { icon: "icon1", text: "test1", isRight: true},
      { icon: "icon2", text: "test2", isRight: false}
    ];
    const store = new Vuex.Store({
      state: {
        messages: messages
      }
    });
    const wrapper = shallowMount(Chat, {
      localVue,
      store
    });

    expect(wrapper.findAll(".Message_Wrapper"))
      .toHaveLength(messages.length);
    expect(wrapper.findAll(".Message_Box"))
      .toHaveLength(messages.length);
    // アイコンは自分のメッセージには表示しない
    expect(wrapper.findAll(".Message_Icon"))
      .toHaveLength(messages.length - 1);
    expect(wrapper.findAll(".Message_Body"))
      .toHaveLength(messages.length);

    expect(wrapper.findAll(".Message_Wrapper").at(0).classes())
      .toContain("right");
    expect(wrapper.findAll(".Message_Wrapper").at(1).classes())
      .not.toContain("right");

    expect(wrapper.findAll(".Message_Body").at(0).text())
      .toContain("test1");
    expect(wrapper.findAll(".Message_Body").at(1).text())
      .toContain("test2");

    expect(wrapper.findAll(".Message_Icon > img").at(0).attributes())
      .toHaveProperty("src", "images/icon2");
  });

});