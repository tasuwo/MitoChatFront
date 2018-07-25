<template>
    <div class="ReactionButtons_List">
        <div class="ReactionButtons_Wrapper" v-for="action in actions">
            <button class="ReactionButtons_Button" v-on:click="action.sendMessage(action.name)">
                {{ action.name }}
            </button>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ReactionButtons',
    computed: mapState([
      'actions',
    ]),
  }
</script>

<style type="scss" scoped>
    .ReactionButtons {
        &_List {
            display: flex;
            flex-direction: column;
        }
        &_Wrapper {
            flex: 1;
            width: 100%;
            display: flex;
            justify-content: center;
        }
        &_Button {
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
    }
</style>
