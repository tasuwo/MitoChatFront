<template>
    <div>
        <transition-group name="fade" mode="out-in">
            <div class="Message_Wrapper"
                 v-for="(message, index) in messages"
                 v-bind:class="{ 'right': message.isRight }"
                 :key="index">

                <img class="Message_Icon" v-if="!message.isRight" v-bind:src="'images/' + message.icon"/>

                <div class="Message_Box">
                    <div class="Message_Body">{{ message.text }}</div>
                </div>

            </div>
        </transition-group>

        <div class="pure-u-3-5">
            <Typing></Typing>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { retrieveChat } from '../modules/ChatStream';
  import Typing from './Typing';

  export default {
    name: 'Chat',
    components: {
      Typing,
    },
    computed: mapState([
      'messages'
    ]),
    mounted: function () {
      retrieveChat(1, this.$store);
    }
  }
</script>

<style lang="scss" scoped>
    .Message {
        &_Wrapper {
            display: flex;
            margin-bottom: 20px;
        }
        &_Box {
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flex;
            display: -o-flex;
            display: flex;

            background-color: rgb(243,243,243);

            border-radius: 15px;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;

            margin-top: 5px;

            height: auto;

            @media (min-width: 42em) {
                width: 60%;
            }
        }
        &_Icon {
            width: 60px;
            height: 60px;

            margin: 0 13px 0 0;

            border-radius: 50%;
        }
        &_Body {
            font-size: 0.8em;

            width: 100%;

            padding: 8px 12px 8px 12px;

            @media (min-width: 42em) {
                font-size: 1em;
                min-height: 50px;
                padding: 13px 13px 13px 13px;
            }
        }
    }

    div.right {
        justify-content: flex-end;
    }

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
