<template>
    <div class="SideBar_Container">
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
                margin-left: 4em;
            }

            @media (min-width: 68em) {
                margin-left: 15em;
            }
        }
        &_Trigger {
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
        }
        &_UserList {
            &Bar {
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
            }
            &Link {
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
            }
        }
    }
</style>
