



import { useFetch } from "@/utility/fetchs";


import { ref, watchEffect, toValue, computed, reactive, toRefs, watch } from 'vue'
import { useAuth } from "@/stores/auth";
import { storeToRefs } from "pinia";



const auth_header={ "Authorization": "Basic UEc0cExkUTlaZDNkWFJnZzMyc3BwaWhoRDRVWW9VRENoR0JkRDNGVjpTYk9NS09JZ1o5c09kNk12N1NXNEtlTm9iSnhFOEtFM2lxYXZSczNvWTZ0WjhXV0pwMXFZajBkWjVkNEptMGczTWpzRVh1dlVvMHV4RXMzUm5ta1FPWklJaXdRS2pBY2ExV2Z6WjVva1o5aTFUZUhKMjl1WHhSV0ZzNlBnbzVHTg==" }

export function HttpApi() {
    const { token_header,  accees_token, refresh_token } = storeToRefs(useAuth());

    const refreshData = reactive({
        refresh_token: refresh_token,
        grant_type: "refresh_token",
        client_id: "PG4pLdQ9Zd3dXRgg32sppihhD4UYoUDChGBdD3FV",
        client_secret: "SbOMKOIgZ9sOd6Mv7SW4KeNobJxE8KE3iqavRs3oY6tZ8WWJp1qYj0dZ5d4Jm0g3MjsEXuvUo0uxEs3RnmkQOZIIiwQKjAca1WfzZ5okZ9i1TeHJ29uXxRWFs6Pgo5GN",
    })

    const logoutData = reactive(
        { token:refresh_token }
    )


    const watchTokenChange = (newValue) => {
        if (newValue.access_token) {
            accees_token.value = newValue.access_token
            refresh_token.value = newValue.refresh_token
        }
    }
    //刷新token
    function apiRefreshToken() {
        const { result, error, fetchData } = useFetch("/o/token/", { data: refreshData })
        watch(result, watchTokenChange)
        return { result, error, fetchData }
    }

    // 注销
    function apiLogout() {
        return useFetch("/o/revoke_token/", {
            data: logoutData,
            headers: auth_header
        })
    }

    //登陆
    function apiLogin(loginData) {
        const { result, error, fetchData } =  useFetch("/o/token/", {
            data: loginData,
            headers: auth_header
        })
        watch(result, watchTokenChange)
        return { result, error, fetchData } 
    }
    
    function createUser(){
        return useFetch("/user/", {
            method: "post",
        })
    }

    function testTask(){
        return useFetch("/users/32/", {
            // method: "post",
            headers: token_header.value,
            data: { "username": "test2" }
        })
    } 

    return { apiRefreshToken,apiLogout,apiLogin,testTask ,createUser}


}

























