<template>
    <ReactionButtonList>
        <ReactionButtonWrapper v-for="action in actions">
            <ReactionButton v-on:click="action.sendMessage(action.name)">
                {{ action.name }}
            </ReactionButton>
        </ReactionButtonWrapper>
    </ReactionButtonList>
</template>

<script>
  import { mapState } from 'vuex'
  import styled from 'vue-styled-components';

  const ReactionButtonList = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const ReactionButtonWrapper = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
  `;

  const ReactionButton = styled.button`
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
  `;

  export default {
    name: 'ReactionButtons',
    computed: mapState([
      'actions',
    ]),
    components: {
      ReactionButtonList,
      ReactionButtonWrapper,
      ReactionButton,
    },
  }
</script>
