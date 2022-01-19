<template>
    <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="circle"
        class="svg-inline--fa fa-circle"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        :height="height"
        :width="width"
        >
        <path
            :fill="color"
            d="M512 256c0 141.4-114.6 256-256
                256s-256-114.6-256-256s114.6-256 256-256S512 114.6 512 256z"
            >
        </path>
    </svg>
</template>

<script>
export default {
    name: 'Circle',
    props: {
        color: {
            type: String,
            default: 'grey'
        },
        height: {
            type: String,
            default: '50'
        },
        width: {
            type: String,
            default: '50'
        }
    }
}
</script>