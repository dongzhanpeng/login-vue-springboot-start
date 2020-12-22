<template>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <div>
            <svg-icon class-name="international-icon" icon-class="language"/>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language==='zh'" command="zh">
                中文
            </el-dropdown-item>
            <el-dropdown-item :disabled="language==='zht'" command="zht">
                繁體
            </el-dropdown-item>
            <el-dropdown-item :disabled="language==='en'" command="en">
                English
            </el-dropdown-item>
            <el-dropdown-item :disabled="language==='ja'" command="ja">
                日本語
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import SvgIcon from '@/components/SvgIcon'

    export default {
        name: 'LangSelect',
        components: {SvgIcon},
        computed: {
            language() {
                return this.$store.getters.language
            }
        },
        methods: {
            handleSetLanguage(lang) {
                this.$i18n.locale = lang
                this.$store.dispatch('app/setLanguage', lang)
                this.$message({
                    message: 'Switch Language Success',
                    type: 'success'
                })
            }
        }
    }
</script>
