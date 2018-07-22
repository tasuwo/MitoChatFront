<template>
    <div>
        <transition-group name="fade" mode="out-in">
            <MessageWrapper v-for="(message, index) in messages"
                            v-bind:class="{ 'right': message.isRight }"
                            :key="index">

                <Message class="pure-u-3-5">
                    <Icon v-if="!message.isRight">
                        <img v-bind:src="'images/' + message.icon"/>
                    </Icon>
                    <Body>{{ message.text }}</Body>
                </Message>

            </MessageWrapper>
        </transition-group>

        <div class="pure-u-3-5">
            <Typing></Typing>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import styled from 'vue-styled-components';
  import { retrieveChat } from './ChatStream';
  import Typing from './Typing';

  const MessageWrapper = styled.div`
    display: flex;
  `;

  const Message = styled.div`
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
  `;

  const Icon = styled.div`
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
  `;

  const Body = styled.div`
    padding: 13px 16px 13px 16px;
    min-height: 50px;
    font-size: 1em;

    width: 100%;
  `;

  export default {
    name: 'Chat',
    components: {
      Typing,
      MessageWrapper,
      Message,
      Icon,
      Body,
    },
    computed: mapState([
      'messages'
    ]),
    mounted: function () {
      retrieveChat(1, this.$store);
    }
  }
</script>

<style lang="css">
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
