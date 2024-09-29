
import { useFetch } from "@/utility/fetchs";
import { ref, watchEffect, toValue, computed, reactive, toRefs, watch } from 'vue'
import { useAuth } from "@/stores/auth";
import { storeToRefs } from "pinia";



export function homePage() {
    const { token_header} = storeToRefs(useAuth());

    // const {result,fetchData,error} = useAuth("/articles/",{method:"get",headers: token_header.value,onLoad:  true});
    
    const {result,fetchData,error} = useFetch('/articles/', {
        method: 'get',
        headers: token_header.value,
        onLoad:true
    })

    
    const page_data = computed(() => result.value.results || result.value.article_set)
    const next_page = computed(() => result.value.next)
    const data_count = computed(() => result.value.count)

    

    const refresh_load = (url) => fetchData(url || next_page.value)
    
    return { page_data,next_page,data_count,refresh_load,error }
}





















