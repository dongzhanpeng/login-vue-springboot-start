<template>
    <div class="error-container">
        <h1>登录失败:{{msg}}</h1>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: null
            };
        },
        created() {
            this.msg = this.$route.query.message;
        }
    };
</script>


<style lang="scss" scoped>
    .error-container {
        width: 100%;
        background: url("../image/error.jpg") no-repeat;
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