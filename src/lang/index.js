import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementZhTLocale from 'element-ui/lib/locale/lang/zh-TW'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import enLocale from './en'
import zhLocale from './zhCHS'
import zhTLocale from './zhCHT'
import jaLocale from './ja'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    },
    zht: {
        ...zhTLocale,
        ...elementZhTLocale
    },
    ja: {
        ...jaLocale,
        ...elementJaLocale
    }
}

export function getLanguage() {
    const chooseLanguage = Cookies.get('language')
    if (chooseLanguage) return chooseLanguage

    // if has not choose language
    const language = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }
    return 'en'
}

const i18n = new VueI18n({
    locale: getLanguage(),
    // set locale messages
    messages
})

export default i18n
