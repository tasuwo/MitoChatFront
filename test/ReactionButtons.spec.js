import { createLocalVue, shallowMount } from '@vue/test-utils'
import ReactionButtons from '@/components/ReactionButtons.vue'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('List.vue', () => {
  let store;
  let state;
  let mutations;

  beforeEach(() => {
    mutations = {
      addReactionButton (state, reaction) {
        state.actions.push(reaction)
      },
      resetReactionButtons (state) {
        state.actions = []
      }
    };
    state = {
      actions: []
    };
    store = new Vuex.Store({
      state,
      mutations
    })
  });

  it('data.actions 内のアクションを描画する', () => {
    state.actions = [ { name: "test1" }, { name: "test2" } ];

    const wrapper = shallowMount(ReactionButtons, { store, localVue });

    expect(wrapper.findAll(".ReactionButtons_Button").at(0).text())
      .toContain("test1");
    expect(wrapper.findAll(".ReactionButtons_Button").at(1).text())
      .toContain("test2");
  });

  it('アクションボタン押下時に sendMessage が実行される', () => {
    const fn = jest.fn();
    state.actions = [{
      name: "",
      sendMessage: function () { fn(); }
    }];

    const wrapper = shallowMount(ReactionButtons, { store, localVue });

    expect(fn.mock.calls)
      .toHaveLength(0);

    wrapper.findAll(".ReactionButtons_Button").at(0).trigger('click');

    expect(fn.mock.calls)
      .toHaveLength(1);
  });
});
