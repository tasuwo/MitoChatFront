<template>
    <div class="client_container">
        <div class="client_users_list_container">
            <a class="client_users_list_trigger" href="#0">
                <i class="fa fa-bars"></i>
            </a>

            <nav class="client_users_list_nav">
                <ul>
                    <li>
                        <a class="client_users_list_nav_link" href="#0">
                            <i class="fa fa-home">
                                <img class="client_users_list_icon" src="images/mito.png"/>
                            </i>
                            <em>月ノ美兎</em>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="client_main_container">
            <div id="chat-wrapper pure-g">
                <transition-group name="fade" mode="out-in">
                    <div class="message-wrapper"
                         v-for="(message, index) in messages"
                         v-bind:class="{ 'right': message.isRight }"
                         :key="index">
                        <div class="pure-u-3-5 message">
                            <div class="message-icon" v-if="!message.isRight">
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
                <div class="client_action_button_list">
                    <div class="client_action_buttons_wrapper"
                         v-for="action in actions">
                        <button v-on:click="action.sendMessage(action.name)" class="action-button">
                            {{ action.name }}
                        </button>
                    </div>
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
    .client_container {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .client_users_list_trigger {
        z-index: 2;
        position: fixed;
        left: 0;
        width: 100%;
        height: 4em;
        background: brown;
    }

    .client_users_list_trigger > i {
        display: inline-block;
        margin: 1.5em 0 0 1.5em;
        color: #f07ab0;
    }

    .client_users_list_icon {
        padding: 5px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);

        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
    }

    .client_users_list_nav {
        position: fixed;
        left: -15em;
        overflow: hidden;
        transition: all .3s ease-in;
        width: 15em;
        height: 100%;
        background: lightcoral;
        color: rgba(255, 255, 255, 0.7);
    }

    .client_users_list_nav:hover,
    .client_users_list_nav:focus,
    .client_users_list_trigger:focus + .client_users_list_nav,
    .client_users_list_trigger:hover + .client_users_list_nav {
        left: 0;
    }

    .client_users_list_nav ul {
        position: absolute;
        top: 4em;
        left: 0;
        margin: 0;
        padding: 0;
        width: 15em;
    }

    .client_users_list_nav ul li {
        width: 100%;
    }

    .client_users_list_nav_link {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 4em;
    }

    .client_users_list_nav_link em {
        position: absolute;
        top: 50%;
        left: 5em;
        transform: translateY(-50%);
        color: black;
    }

    .client_users_list_nav_link:hover {
        background: lightpink;
    }

    .client_users_list_nav_link > i {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 4em;
        height: 4em;
    }

    .client_users_list_nav_link > i::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .client_main_container {
        width: 100%;
        padding-top: calc(3em + 4em);
        padding-left: 1em;
        padding-right: 1em;
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
        padding: 13px 0 13px 13px;
        width: 50px;
        height: 50px;

        border-radius: 20px;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
    }

    .message-body {
        padding: 13px 16px 13px 16px;
        min-height: 50px;
        font-size: 1em;

        width: 100%;
    }

    /* --- */

    /* Mobile First */
    @media (min-width: 42em) {
        .client_users_list_container {
            margin-left: 4em;
        }

        /* Sidebar */
        .client_users_list_trigger {
            width: 4em;
        }

        .client_users_list_nav {
            width: 4em;
            left: 0;
        }

        .client_main_container {
            padding-left: 4em;
            padding-right: 4em;
            padding-top: 3em;
        }

        .client_users_list_nav:hover,
        .client_users_list_nav:focus,
        .client_users_list_trigger:hover + .client_users_list_nav,
        .client_users_list_trigger:focus + .client_users_list_nav {
            width: 15em;
        }
    }

    @media (min-width: 68em) {
        .client_users_list_container {
            margin-left: 15em;
        }

        /* Sidebar */
        .client_users_list_trigger {
            display: none
        }

        .client_users_list_nav {
            width: 15em;
        }

        .client_main_container {
            padding-left: 6em;
            padding-right: 6em;
            padding-top: 3em;
        }

        .client_users_list_nav ul {
            top: 1.3em;
        }
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

    .client_action_button_list {
        display: flex;
        flex-direction: column;
    }

    .client_action_buttons_wrapper {
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .action-button {
        flex: 0 0 1;
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