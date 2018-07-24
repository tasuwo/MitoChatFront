<template>
    <div class="SideBar_Container">
        <span class="SideBar_Title">
            みとちゃっと β
        </span>

        <a class="SideBar_Trigger"><i></i></a>
        <div class="SideBar_UserListBar">
            <ul>
                <li>
                    <div class="SideBar_UserListLink">
                        <i><img src="images/mito.png"/></i>
                        <em>月ノ美兎</em>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'SideBar',
  }
</script>

<style type="scss" scoped>
    .SideBar {
        &_Container {
            @media (min-width: 42em) {
                margin-left: 15em;
            }
        }
        &_Title {
            display: inline-block;
            font-weight: bold;
            position: fixed;

            padding-top: 1.5em;
            left: 1em;

            z-index: 10;

            color: white;

            @media (max-width: 42em) {
                padding-top: 1.3em;
            }
        }
        &_Trigger {
            z-index: 2;
            position: fixed;
            left: 0;
            width: 100%;
            height: 4em;
            background: rgb(81, 56, 76);

            &:active + .SideBar_UserListBar,
            &:hover + .SideBar_UserListBar {
                top: 4em;
                left: 0;
            }

            @media (min-width: 42em) {
                display: none;
            }

            i {
                display: inline-block;
                margin: 1.5em 0 0 1.5em;
                color: #f07ab0;
            }
        }
        &_UserList {
            &Bar {
                position: fixed;
                overflow: hidden;
                width: 15em;
                height: 100%;
                background: rgb(81, 56, 76);

                &:hover, &:active {
                    top: 4em;
                    left: 0;
                }

                left: -15em;
                @media (min-width: 42em) {
                    width: 15em;
                    left: 0;

                    &:hover, &:active {
                        top: 0;
                        left: 0;
                    }
                }


                ul {
                    position: absolute;
                    top: calc(1.3em + 1.5em + 1em);
                    left: 0;
                    margin: 0;
                    padding: 0;
                    width: 15em;

                    @media (max-width: 42em) {
                        top: 1.3em;
                    }
                }

                ul > li {
                    width: 100%;
                }
            }
            &Link {
                position: relative;
                display: inline-block;
                width: 100%;
                height: 3em;
                &:hover {
                    background: rgb(65, 48, 61);
                }

                em {
                    position: absolute;
                    top: 50%;
                    left: 3.7em;
                    transform: translateY(-50%);
                    color: rgb(203, 196, 201);
                }

                i {
                    position: absolute;
                    top: 0;
                    left: 1em;
                    display: inline-block;
                    width: 2em;
                    height: 2em;
                    margin: 0.5em 0.5em 0.5em 0;
                }

                i > img {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                }
            }
        }
    }
</style>
