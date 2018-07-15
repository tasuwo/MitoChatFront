import axios from 'axios';

function retrieveChat(id, app) {
  return axios.get(`https://api.mito-chat.tasuwo.net/chat/` + id)
    .then(response => {
      app.scenario = response.data.scenario;

      let fns = parseScenario(app.scenario, 0);
      playScenario(fns.shift(), fns, app);
    })
    .catch(e => {
      if (!('errors' in app)) {
        app.errors = [];
      }
      app.errors.push(e);
    })
}

function playScenario(fn, fns, app) {
  if(fn) {
    fn(() => playScenario(fns.shift(), fns, app), app);
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
        fns.push(addAction(event.text, event.nextChatId));
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
  return (next, app) => {
    app.isTyping = true;
    setTimeout(function () {
      app.isTyping = false;
      next();
    }.bind(app), sec * 1000);
  }
}

function addMessage(icon, text, isRight=true) {
  return (next, app) => {
    app.messages.push({
      icon: icon,
      text: text,
      isRight: isRight
    });
    next();
  };
}

function addAction(name, id) {
  return (next, app) => {
    app.actions.push({
      name: name,
      sendMessage: function () {
        let fns = parseScenario(app.scenario, id);
        playScenario(fns.shift(), fns, app);
      }.bind(app)
    });
    next();
  }
}

function resetActions() {
  return (next, app) => {
    app.actions = [];
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
