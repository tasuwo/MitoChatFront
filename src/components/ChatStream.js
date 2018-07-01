function chain(fn, fns, app) {
  if(fn) {
    fn(() => chain(fns.shift(), fns, app), app);
  }
}

/**
 * TODO: サーバへ問い合わせ & json 取得 & パース
 * @param id
 */
function getFns(id) {
  let fns = { chat: [] };

  switch (id) {
    case 1:
      fns = {
        chat: [
          {
            type: "waiting",
            time: 2
          },
          {
            type: "typing",
            time: 2
          },
          {
            type: "message",
            icon: "default",
            text: "起立！気をつけ！",
            isRight: false
          },
          {
            type: "waiting",
            time: 1
          },
          {
            type: "typing",
            time: 4
          },
          {
            type: "message",
            icon: "default",
            text: "こんにちは〜〜〜！月ノ美兎です〜〜〜！",
            isRight: false
          },
          {
            type: "waiting",
            time: 1
          },
          {
            type: "typing",
            time: 2
          },
          {
            type: "message",
            icon: "default",
            text: "見えてるかな？？",
            isRight: false
          },
          {
            type: "waiting",
            time: 1.5
          },
          {
            type: "action",
            name: "おるやんけ！！",
            nextChatId: 2
          },
          {
            type: "action",
            name: "見えてます！！",
            nextChatId: 3
          }
        ]
      };
      break;
    case 2:
      fns = {
        chat: [
          {
            type: "resetActions"
          },
          {
            type: "message",
            icon: "default",
            text: "おるやんけ！！",
            isRight: true
          },
          {
            type: "waiting",
            time: 3
          },
          {
            type: "typing",
            time: 3
          },
          {
            type: "waiting",
            time: 0.2
          },
          {
            type: "message",
            icon: "default",
            text: "は〜い、おりますよ〜w",
            isRight: false
          },
        ]
      };
      break;
  }

  return parseEvents(fns.chat);
}

function parseEvents(events) {
  let fns = [];

  events.forEach((event) => {
    switch (event.type) {
      case "waiting":
        fns.push(waiting(event.time));
        break;
      case "typing":
        fns.push(typing(event.time));
        break;
      case "message":
        fns.push(addMesssage(event.icon, event.text, event.isRight));
        break;
      case "action":
        fns.push(addAction(event.name, event.nextChatId));
        break;
      case "resetActions":
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

function addMesssage(icon, text, isRight=true) {
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
        let fns = getFns(id);
        chain(fns.shift(), fns, this);
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

export { chain, getFns }
