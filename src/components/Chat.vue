<template>
    <div id="chat">
        <div class="pure-g center">
            <div id="chat-wrapper" class="pure-u-5-6">
                <transition-group name="fade" mode="out-in">
                    <div class="message-wrapper"
                         v-for="(message, index) in messages"
                         v-bind:class="{ 'right': message.isRight }"
                         :key="index">
                        <div class="pure-u-3-5 message">
                            <div class="message-icon">
                                <img v-bind:src="'images/' + message.icon"/>
                            </div>
                            <div class="message-body">
                                {{ message.text }}
                            </div>
                        </div>
                    </div>
                </transition-group>
                <div class="pure-u-3-5">
                    <typing :isTyping="isTyping"></typing>
                </div>
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
  import Typing from './Typing'

  export default {
    name: 'Chat',
    data: function () {
      return {
        messages: [],
        actions: [],
        isTyping: false
      }
    },
    components: { Typing },
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
        background-color: rgb(243,243,243);

        border-radius: 15px;
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;

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
        padding: 13px;
        width: 50px;
        height: 50px;
    }

    .message-body {
        padding-top: 13px;
        min-height: 50px;

        margin-right: 13px;
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

    .fade-enter {
        opacity:0;
    }

    .fade-enter-active {
        animation: bounce-in 0.3s;
    }

    .fade-leave {
        opacity:1;
    }

    .fade-leave-active {
        animation: bounce-in 0.3s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0.6);
        }
        50% {
            transform: scale(1.02);
        }
        100% {
            transform: scale(1);
        }
    }
</style>