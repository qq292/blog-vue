



import { useFetch } from "@/utility/fetchs";
// import { ref, watchEffect, toValue, computed, reactive, toRefs, watch } from 'vue'
import { useAuth } from "@/stores/auth";
import { storeToRefs } from "pinia";



export function ArticleContentPage() {
    const { token_header} = storeToRefs(useAuth());

    function getArticleContent(url){
        return useFetch(url, {
            method: 'get',
            headers: token_header.value,
        })
    }






    // function autoMethod(){
    //     return useFetch("#", {
    //         headers: token_header.value,
    //     })
    // }
  

    return { getArticleContent }


}

























