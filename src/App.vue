<template>
    <Container>
        <SideBar/>
        <MainContainer>
            <Chat/>
            <ReactionButtons/>
        </MainContainer>
    </Container>
</template>

<script>
  import styled from 'vue-styled-components';
  import SideBar from './components/SideBar';
  import Chat from './components/Chat';
  import ReactionButtons from './components/ReactionButtons';

  const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
  `;

  const MainContainer = styled.div`
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
  `;

  export default {
    name: 'App',
    components: {
      Container,
      SideBar,
      MainContainer,
      Chat,
      ReactionButtons,
    },
  }
</script>

