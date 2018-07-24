<template>
    <div>
        <transition-group name="fade" mode="out-in">
            <div class="Message_Wrapper"
                 v-for="(message, index) in messages"
                 v-bind:class="{ 'right': message.isRight }"
                 :key="index">

                <div class="Message_Box pure-u-3-5">
                    <div class="Message_Icon" v-if="!message.isRight">
                        <img v-bind:src="'images/' + message.icon"/>
                    </div>
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
  import { retrieveChat } from './ChatStream';
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

            margin-bottom: 20px;
        }
        &_Icon {
            width: 70px;
            min-height: 70px;

            img {
                padding: 13px 0 13px 13px;
                width: 50px;
                height: 50px;

                border-radius: 20px;
                -webkit-border-radius: 20px;
                -moz-border-radius: 20px;
            }
        }
        &_Body {
            padding: 13px 16px 13px 16px;
            min-height: 50px;
            font-size: 1em;

            width: 100%;
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
