import { defineStore } from "pinia";
import { ref,computed,reactive } from "vue";
import { parse, stringify } from 'zipson'

export const useAuth = defineStore('auth', () => {
    const accees_token = ref('')
    const refresh_token = ref('')

    //登陆状态的请求头
    const accees_token_bearer = computed(()=>'Bearer '+  accees_token.value)
    const token_header = reactive ({ 'Authorization':  accees_token_bearer })
    return {accees_token,refresh_token,token_header}
}, {
    persist: {
        serializer: {
            deserialize: parse,
            serialize: stringify,
        }
    }
})