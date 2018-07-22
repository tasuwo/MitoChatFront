import axios from 'axios';

function retrieveChat(id, state) {
  return axios.get(`https://api.mito-chat.tasuwo.net/chat/` + id)
    .then(response => {
      let fns = parseScenario(response.data.scenario, 0);
      playScenario(fns.shift(), fns, state);
    })
    .catch(e => {
      state.commit('addError', e);
    })
}

function playScenario(fn, fns, state) {
  if(fn) {
    fn(() => playScenario(fns.shift(), fns, state), state);
  }
}

/**
 * scenario の仕様:
 *
 * {
 *   <ID>: {
 *     events: [
 *       { type: <イベントタイプ>, ... },
 *       { type: <イベントタイプ>, ... },
 *       ...
 *     ]
 *   },
 *   <ID>: {
 *     sequence_id: <再生のためのID>
 *     events: [
 *       { type: <イベントタイプ>, ... },
 *       { type: <イベントタイプ>, ... },
 *       ...
 *     ]
 *   },
 *   ...
 * }
 *
 * @param scenario
 * @param id
 * @returns {Array}
 */
function parseScenario(scenario, id) {
  let fns = [];

  scenario[id].events.forEach((event) => {
    switch (event.type) {
      case "WAITING":
        fns.push(waiting(event.time));
        break;
      case "TYPING":
        fns.push(typing(event.time));
        break;
      case "TALK":
        fns.push(addMessage(event.icon, event.text, event.right));
        break;
      case "PROVIDE_BUTTON":
        fns.push(addAction(event.text, event.nextChatId, scenario));
        break;
      case "RESET_BUTTONS":
        fns.push(resetActions());
        break;
    }
  });

  return fns;
}

// --------

function typing(sec) {
  return (next, state) => {
    state.commit('startTyping');
    setTimeout(function () {
      state.commit('endTyping');
      next();
    }.bind(state), sec * 1000);
  }
}

function addMessage(icon, text, isRight=true) {
  return (next, state) => {
    state.commit('addMessage', {
      icon: icon,
      text: text,
      isRight: isRight
    });
    next();
  };
}

function addAction(name, id, scenario) {
  return (next, state) => {
    state.commit('addReactionButton', {
      name: name,
      sendMessage: function () {
        let fns = parseScenario(scenario, id);
        playScenario(fns.shift(), fns, state);
      }.bind(state)
    });
    next();
  }
}

function resetActions() {
  return (next, state) => {
    state.commit('resetReactionButtons');
    next();
  }
}

function waiting(sec) {
  return (next) => {
    setTimeout(function () {
      next();
    }, sec * 1000);
  }
}

export { retrieveChat }
