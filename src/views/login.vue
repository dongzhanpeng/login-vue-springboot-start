<template>
    <div class="login-container">
        <el-card class="login-form" :model="loginForm" :rules="loginRules" autocomplete="on" label-position="left"
                 style="background: #ddeff7">
            <el-form
                    autocomplete="on"
                    :model="loginForm"
                    ref="loginForm"
                    label-position="left"
            >
                <el-form-item style="margin-bottom: 40px;text-align: right">
                    <el-button class="el-button"
                               style="width: 50%; font-size: xx-small;"
                               type="primary"
                               :loading="loading"
                               @click="changeLanguage"
                    >{{ $t('message.switchlanguage') }}
                    </el-button>
                </el-form-item>


                <div class="title-container">
                    <h2 class="login-title color-main">{{ $t('message.dzplogin') }}</h2>
                    <lang-select class="set-language" style="
    color: gray;
    width: 15px;
    height: 15px;
"/>
                </div>

                <el-form-item prop="username">
                    <span class="svg-container">
                        <svg-icon icon-class="user" style="
    color: indianred;
    width: 15px;
    height: 15px;"/>
                    </span>
                    <el-input
                            name="username"
                            type="text"
                            v-model="loginForm.username"
                            autocomplete="on"
                            :placeholder="$t('message.username')"
                            tabindex="1"
                            ref="username"
                    />
                    <span slot="prefix">
                        <svg-icon icon-class="user" class="color-main"></svg-icon>
                    </span>
                </el-form-item>

                <span class="svg-container">
                        <svg-icon icon-class="password" style="
    color: indianred;
    width: 15px;
    height: 29px;"/>
                    </span>
                <el-form-item prop="password">
                    <!--                    <span class="svg-container">-->
                    <!--                        <svg-icon icon-class="password"/>-->
                    <!--                    </span>-->
                    <el-input
                            name="password"
                            :type="passwordType"
                            @keyup.enter.native="handleLogin"
                            v-model="loginForm.password"
                            autocomplete="on"
                            :placeholder="$t('message.password')"
                    />
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" style="
    color: gray;
    width: 15px;
    height: 29px;
"/>
                    </span>
                </el-form-item>

                <el-form-item style="margin-bottom: 10px;text-align: center;">
                    <el-button
                            style="width: 60%; text-align: center; font-size:x-small"
                            type="primary"
                            :loading="loading"
                            @click.native.prevent="handleLogin"
                    >{{ $t('message.login') }}
                    </el-button>
                </el-form-item>
                <el-form-item style="margin-bottom: 10px; text-align: center;">
                    <el-button
                            style="width: 60%; text-align: center; font-size:x-small"
                            type="primary"
                            :loading="loading"
                            @click.native.prevent="forgetPassword"
                    >{{ $t('message.forgetpassword') }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import SvgIcon from '@/components/SvgIcon'
    import LangSelect from '@/components/LangSelect'

    export default {
        name: "login",
        components: {SvgIcon, LangSelect},
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!validateUsername(value)) {
                    callback(new Error('Please enter the correct user name'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('The password can not be less than 6 digits'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: "admin",
                    password: "admin"
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                passwordType: 'password',
                capsTooltip: false,
                loading: false,
                showDialog: false,
                redirect: undefined,
                otherQuery: {}
            };
        },
        methods: {
            changeLanguage() {
                if (this.$i18n.locale === "zh") {
                    this.$i18n.locale = "en";
                } else {
                    this.$i18n.locale = 'zh'
                }
            },
            forgetPassword() {

            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.$store
                            .dispatch("Login", this.loginForm)
                            .then(response => {
                                this.loading = false;
                                let code = response.data.code;
                                if (code == 200) {
                                    this.$router.push({
                                        path: "/success",
                                        query: {data: response.data.data}
                                    });
                                } else {
                                    this.$router.push({
                                        path: "/error",
                                        query: {message: response.data.message}
                                    });
                                }
                            })
                            .catch(() => {
                                this.loading = false;
                            });
                    } else {
                        // eslint-disable-next-line no-console
                        console.log("参数验证不合法！");
                        return false;
                    }
                });
            }
        }
    };
</script>


<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .el-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #f7e7e7;
        border: 1px solid #DCDFE6;
        border-color: #ceb924;
        color: #0c0c0c;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }

    .login-container {
        min-height: 100%;
        width: 100%;
        background-color: #bed6f5;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        font-family: cursive;

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }

            .set-language {
                color: #fff;
                position: absolute;
                top: 3px;
                font-size: 18px;
                right: 0px;
                cursor: pointer;
            }
        }

        .login-form {
            position: relative;
            width: 310px;
            max-width: 100%;
            padding: 30px 40px 0;
            margin: 0 auto;
            overflow: hidden;
            top: 30px;
            bottom: 20px;
        }

        /*.login-form-layout {*/
        /*    position: absolute;*/
        /*    left: 0;*/
        /*    right: 0;*/
        /*    width: 360px;*/
        /*    margin: 140px auto;*/
        /*    border-top: 30px solid orange;*/
        /*}*/

        .show-pwd {
            position: absolute;
            right: 25px;
            top: 10px;
            font-size: 16px;
            color: red;
            cursor: pointer;
            user-select: none;
        }

        .login-title {
            text-align: center;
        }

        .login-center-layout {
            background: green;
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            margin-top: 200px;
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: paleturquoise;
            vertical-align: middle;
            width: 60px;
            display: inline-block;
        }
    }
</style>