<template>
    <div class="success-container">
        <h1>欢迎！{{msg}}</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: this.$route.query.data
            };
        },
    }
</script>

<style lang="scss" scoped>
    .success-container {
        background: url("../image/success.jpg") no-repeat;
        background-size: 100%;
        min-height: 100%;
        overflow: hidden;
        position: absolute;
        font-family: 隶书;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

</style>