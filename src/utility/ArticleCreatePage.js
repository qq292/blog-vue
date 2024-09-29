



import { useFetch } from "@/utility/fetchs";
import { ref, watchEffect, toValue, computed, reactive, toRefs, watch } from 'vue'
import { useAuth } from "@/stores/auth";
import { storeToRefs } from "pinia";



export function ArticleCreatePage() {
    const { token_header,  accees_token, refresh_token } = storeToRefs(useAuth());

    //获取文集列表
    function getArticleSetList(){
        return useFetch('/articlesets/', {
            method: 'get',
            headers: token_header.value,
            onLoad:true
        })
    }
    // //获取文章列表
    function getArticleList(url){
        return useFetch(url, {
            method: 'get',
            headers: token_header.value,
            onLoad:true
        })
    }

    function getTags(){
        return useFetch("/tags/", {
            method: 'get',
            headers: token_header.value,
            onLoad:true
        })
    }
    


    function autoMethod(){
        return useFetch("#", {
            headers: token_header.value,
        })
    }
  

    return { getArticleSetList,autoMethod,getArticleList,getTags }


}

























