import { defineStore } from "pinia";
import { ref,computed,reactive } from "vue";

export const useNavigationStore = defineStore('navigation', () => {
    
    const save_url = ref('')
    let func=null
    const setSaveArticleFunc = (f)=>{
        func = f
    }
    
    const saveArticle = ()=>{
        func(save_url.value)
    }

    const setSaveUrl = (url)=>{
        save_url.value = url
    }
    
    return {save_url,setSaveUrl,setSaveArticleFunc,saveArticle}
})