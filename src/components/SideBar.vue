<template>
    <Container>
        <Trigger><i></i></Trigger>
        <NavBar>
            <ul>
                <li>
                    <NavLink>
                        <i><img class="client_users_list_icon" src="images/mito.png"/></i>
                        <em>月ノ美兎</em>
                    </NavLink>
                </li>
            </ul>
        </NavBar>
    </Container>
</template>

<script>
  import styled from 'vue-styled-components';

  const Container = styled.div`
    @media (min-width: 42em) {
        margin-left: 4em;
    }

    @media (min-width: 68em) {
       margin-left: 15em;
    }
  `;

  const NavBar = styled.div`
    position: fixed;
    left: -15em;
    overflow: hidden;
    transition: all .3s ease-in;
    width: 15em;
    height: 100%;
    background: lightcoral;
    color: rgba(255, 255, 255, 0.7);

    &:hover, &:focus {
      left: 0;
    }

    @media (min-width: 42em) {
        width: 4em;
        left: 0;
        &:hover, &:focus {
          width: 15em;
        }
    }
    @media (min-width: 68em) {
        width: 15em;
    }

    ul {
      position: absolute;
      top: 4em;
      left: 0;
      margin: 0;
      padding: 0;
      width: 15em;

      @media (min-width: 68em) {
        top: 1.3em;
      }
    }

    ul > li {
      width: 100%;
    }
  `;

  const Trigger = styled.a`
    z-index: 2;
    position: fixed;
    left: 0;
    width: 100%;
    height: 4em;
    background: brown;

    &:focus, &:hover {
      left: 0;
    }

    @media (min-width: 42em) {
      width: 4em;
      &:focus, &:hover {
        width: 15em;
      }
    }

    @media (min-width: 68em) {
      display: none
    }

    i {
      display: inline-block;
      margin: 1.5em 0 0 1.5em;
      color: #f07ab0;
    }
  `;

  const NavLink = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    height: 4em;
    &:hover {
      background: lightpink;
    }

    em {
      position: absolute;
      top: 50%;
      left: 5em;
      transform: translateY(-50%);
      color: black;
    }

    i {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 4em;
      height: 4em;
    }

    i::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    i > img {
      padding: 5px;
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      border-radius: 10px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
    }
  `;

  export default {
    name: 'SideBar',
    components: {
      Container,
      Trigger,
      NavBar,
      NavLink,
    },
  }
</script>
