<template>
    <div>
        <h1>登录失败:{{msg}}</h1>
    </div>
</template>
<script>
    export default {
        // data() {
        //   return {
        //     msg: this.$route.query.data
        //   };
        // }, //????????????????? msg
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