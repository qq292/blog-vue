import { ref,computed,onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuth } from '@/stores/auth'
const domain = import.meta.env.VITE_API_URL

export function useFetch(url, { data, json, headers={}, method = 'post', timeout = 5000 ,onLoad=false,outh=true} = {}) {
    const { token_header} = storeToRefs(useAuth());

    const result = ref({})
    const error = ref({})
    
    const fetchData = (urls, methods, callBack, datas,jsons) => {
        if(outh && headers && !headers['Authorization'] ){
            headers = {
                ...headers,
                ...token_header.value
            }
        }
        error.value = null
        result.value = {}
        const options = {}
        const signal = new AbortController()
        urls = urls || url
        const c_url = computed(() => urls.startsWith('/') ? domain+urls : urls)
        methods = (methods || method).toUpperCase()
        datas = datas || data
        jsons=jsons||json
        let status_code = 0
        if (!['GET', 'OPTIONS', 'HEAD', "DELETE"].includes(methods)) {
            if (datas) {
                options['body'] = new URLSearchParams(datas)
                options['headers'] = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    ...headers
                }
            } else if (jsons) {
                options['body'] = JSON.stringify(jsons)
                options['headers'] = {
                    'Content-Type': 'application/json',
                    ...headers
                }
            }
        } else {
            options['headers'] = headers
        }

        new Promise((resolve, reject) => {
            fetch(c_url.value, {
                method: methods,
                signal: signal.signal,
                ...options

            }).then(resolve, reject)
            setTimeout(() => {
                reject(new Error('请求超时'))
                signal.abort()
            }, timeout)
        })
            .then((res) => {
                status_code = res.status
                if (res.status === 204) {
                    return null
                }
                return res.json()
            })
            .then((json) => {
                result.value = json
                callBack && callBack(json, status_code)
            })
            .catch((err) => {
                error.value = err.message
            })
    }

    onMounted(()=>{
        if(onLoad){
            fetchData()
        }
    })
    return { result, error, fetchData }
}

