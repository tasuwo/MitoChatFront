<template>
    <div>
        <svg class="loader" v-if="isTyping"
             version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="80" viewBox="0, 0, 600, 300"
             preserveAspectRatio="xMinYMax">
            <g>
                <path d="M135.602,12.581 L351.064,12.581 C390.402,12.581 422.291,44.231 422.291,83.273 L422.291,163.685 C422.291,202.727 390.402,234.377 351.064,234.377 L135.602,234.377 C96.264,234.377 64.375,202.727 64.375,163.685 L64.375,83.273 C64.375,44.231 96.264,12.581 135.602,12.581 z"
                      fill="rgb(243,243,243)"/>
            </g>
            <g>
                <path d="M173.305,153.479 C156.737,153.479 143.305,140.048 143.305,123.479 C143.305,106.91 156.737,93.479 173.305,93.479 C189.874,93.479 203.305,106.91 203.305,123.479 C203.305,140.048 189.874,153.479 173.305,153.479 z"
                      fill="#CBCBCB"/>
                <path d="M173.305,153.479 C156.737,153.479 143.305,140.048 143.305,123.479 C143.305,106.91 156.737,93.479 173.305,93.479 C189.874,93.479 203.305,106.91 203.305,123.479 C203.305,140.048 189.874,153.479 173.305,153.479 z"
                      fill-opacity="0" stroke="#CBCBCB" stroke-width="1"/>
            </g>
            <g>
                <path d="M243.333,153.479 C226.765,153.479 213.333,140.048 213.333,123.479 C213.333,106.91 226.765,93.479 243.333,93.479 C259.902,93.479 273.333,106.91 273.333,123.479 C273.333,140.048 259.902,153.479 243.333,153.479 z"
                      fill="#CBCBCB"/>
                <path d="M243.333,153.479 C226.765,153.479 213.333,140.048 213.333,123.479 C213.333,106.91 226.765,93.479 243.333,93.479 C259.902,93.479 273.333,106.91 273.333,123.479 C273.333,140.048 259.902,153.479 243.333,153.479 z"
                      fill-opacity="0" stroke="#CBCBCB" stroke-width="1"/>
            </g>
            <g>
                <path d="M313.361,153.479 C296.793,153.479 283.361,140.048 283.361,123.479 C283.361,106.91 296.793,93.479 313.361,93.479 C329.93,93.479 343.361,106.91 343.361,123.479 C343.361,140.048 329.93,153.479 313.361,153.479 z"
                      fill="#CBCBCB"/>
                <path d="M313.361,153.479 C296.793,153.479 283.361,140.048 283.361,123.479 C283.361,106.91 296.793,93.479 313.361,93.479 C329.93,93.479 343.361,106.91 343.361,123.479 C343.361,140.048 329.93,153.479 313.361,153.479 z"
                      fill-opacity="0" stroke="#CBCBCB" stroke-width="1"/>
            </g>
            <g>
                <path d="M78.709,247.979 C62.14,247.979 48.709,234.548 48.709,217.979 C48.709,201.41 62.14,187.979 78.709,187.979 C95.277,187.979 108.709,201.41 108.709,217.979 C108.709,234.548 95.277,247.979 78.709,247.979 z"
                      fill="rgb(243,243,243)"/>
            </g>
            <g>
                <path d="M33.709,268.419 C25.424,268.419 18.709,261.703 18.709,253.419 C18.709,245.135 25.424,238.419 33.709,238.419 C41.993,238.419 48.709,245.135 48.709,253.419 C48.709,261.703 41.993,268.419 33.709,268.419 z"
                      fill="rgb(243,243,243)"/>
            </g>
        </svg>
    </div>
</template>

<script>
  export default {
    name: "Typing",
    props: [
      'isTyping'
    ]
  }
</script>

<style scoped lang="scss">
    @mixin flashFadeHelper($delay) {
        opacity: 0.35;
        animation: flashFade 0.7s cubic-bezier(.39,.58,.57,1) $delay infinite alternate-reverse;
    }
    @keyframes flashFade {
        from {
            opacity: 1;
        }
        to {
            opacity: 0.45;
        }
    }

    @mixin scaleCircle($scale, $rad) {
        transform: translate(((1 - $scale) * $rad) + px, ((1 - $scale) * $rad) + px) scale($scale);
    }
    @keyframes bubble {
        from {
            transform: scale(1);
        }
        to {
            @include scaleCircle(1.02, 100);
        }
    }
    @keyframes expandTiny {
        from {
            transform: scale(1);
        }
        to {
            @include scaleCircle(1.05, 30);
        }
    }
    @keyframes expandBigger {
        from {
            transform: scale(1);
        }
        to {
            @include scaleCircle(1.03, 100);
        }
    }

    .loader {
        g {
            &:nth-of-type(1) {
                animation: bubble 0.5s infinite alternate;
            }

            &:nth-of-type(2) {
                @include flashFadeHelper(0s);
            }

            &:nth-of-type(3) {
                @include flashFadeHelper(0.4s);
            }

            &:nth-of-type(4) {
                @include flashFadeHelper(0.8s);
            }

            &:nth-of-type(5) {
                animation: expandBigger 0.5s infinite alternate 0.4s;
            }

            &:nth-of-type(6) {
                animation: expandTiny 0.5s infinite alternate;
            }
        }
    }
</style>