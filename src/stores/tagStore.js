import { defineStore } from "pinia";
import { ref,computed,reactive ,watch} from "vue";
import { useFetch } from '@/utility/fetchs';
import { parse, stringify } from 'zipson'

export const useTags = defineStore('tags', () => {
    const {result,fetchData:refresh} = useFetch('/tags/',{ method: 'get'})
    // fetchData = (urls, methods, callBack, datas,jsons)
    const createTag = (tag_name,callback)=>{
        refresh('/tags/','post',callback,null,{tag_name})
    }
    
    const deleteTag = (url,callback)=>{
        refresh(url,'delete',callback)
    }
    
    const _tags = ref([])
    
    const tags = computed(()=> {
        if(!_tags.value || _tags.value.length == 0){
            refresh()
        }
        return _tags.value
    })
    watch(()=>result.value,(newValue)=>{
        if(Array.isArray(newValue)){
            _tags.value = newValue
        }
       
    })
    
    
    
    return {tags,refresh,createTag,deleteTag,_tags}
    
}, {
    persist: {
        serializer: {
            deserialize: parse,
            serialize: stringify,
        }
    }
})