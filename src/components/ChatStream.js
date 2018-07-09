import axios from 'axios';

function retrieveEvents(id, app) {
  axios.get(`https://api.mito-chat.tasuwo.net/events/` + id)
    .then(response => {
      let fns = parseEvents(response.data.events);
      chain(fns.shift(), fns, app);
    })
    .catch(e => {
      if (!('errors' in app)) {
        app.errors = [];
      }
      app.errors.push(e);
    })
}

function chain(fn, fns, app) {
  if(fn) {
    fn(() => chain(fns.shift(), fns, app), app);
  }
}

function parseEvents(events) {
  let fns = [];

  events.forEach((event) => {
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
        fns.push(addAction(event.text, event.nextEventsId));
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
        retrieveEvents(id, app);
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

export { retrieveEvents }
