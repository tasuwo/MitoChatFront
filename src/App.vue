<template>
    <div class="AppContainer">
        <SideBar/>
        <div class="MainContainer">
            <Chat/>
            <ReactionButtons/>
        </div>
    </div>
</template>

<script>
  import SideBar from './components/SideBar';
  import Chat from './components/Chat';
  import ReactionButtons from './components/ReactionButtons';

  export default {
    name: 'App',
    components: {
      SideBar,
      Chat,
      ReactionButtons,
    },
  }
</script>

<style type="scss" scoped>
    .AppContainer {
        display: flex;
        width: 100%;
        height: 100%;
    }
    .MainContainer {
        width: 100%;
        padding-top: calc(3em + 4em);
        padding-left: 1em;
        padding-right: 1em;

        @media (min-width: 42em) {
            padding-left: 4em;
            padding-right: 4em;
            padding-top: 3em;
        }

        @media (min-width: 68em) {
            padding-left: 6em;
            padding-right: 6em;
            padding-top: 3em;
        }
    }
</style>

