<template>
    <div id="chat">
        <div class="pure-g center">
            <div id="chat-wrapper" class="pure-u-5-6">
                <div class="message-wrapper"
                     v-for="message in messages"
                     v-bind:class="{ 'right': message.isRight }">
                    <div class="pure-u-3-5 message">
                        <div class="message-icon">
                            <img v-bind:src="'images/' + message.icon"/>
                        </div>
                        <div class="message-body">
                            {{ message.text }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pure-g center">
            <div id="is-typing">
                <img v-show="isTyping" v-bind:src="require('../assets/waiting.gif')"/>
            </div>
        </div>
        <div class="pure-g center">
            <div class="user-area">
                <div class="user-area-wrapper"
                     v-for="action in actions">
                    <button v-on:click="action.sendMessage(action.name)" class="action-button">
                        {{ action.name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { retrieveChat } from './ChatStream'

  export default {
    name: 'Chat',
    data: function () {
      return {
        messages: [],
        actions: [],
        isTyping: false
      }
    },
    mounted: function () {
      retrieveChat(1, this);
    }
  }
</script>

<style lang="css">
    .center {
        justify-content: center;
    }

    #chat {
        padding-top: 150px;
        overflow: auto;
    }

    #chat-wrapper {
        max-width: 800px;
    }

    .message {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        border: 1px solid #e7e7e7;
        background-color: #f3f3f3;

        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;

        margin-bottom: 20px;
    }

    .message-wrapper {
        display: flex;
    }

    .message-wrapper.right {
        justify-content: flex-end;
    }

    div.right {
        display: flex;
    }

    /* --- */

    .message {
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
    }

    .message-icon {
        width: 70px;
        min-height: 70px;
    }

    .message-icon > img {
        padding: 10px;
        width: 50px;
        height: 50px;
    }

    .message-body {
        padding-top: 10px;
        min-height: 50px;

        margin-right: 70px;
        width: 100%;
    }

    /* --- */

    .action-button {
        min-width: 100px;

        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        border: 1px solid #e7e7e7;
        background-color: black;
        color: white;

        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;

        padding: 10px;

        margin-bottom: 10px;
    }


    /* --- */

    #is-typing {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        border: 1px solid #e7e7e7;
        background-color: white;

        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
    }

    #is-typing > img {
        padding: 10px;
        width: 30px;
        height: 30px;
    }
</style>