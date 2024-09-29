<template>
    <el-input  type="text" v-model="captcha.captcha[1]" placeholder="请输入验证码" >
      <template #prepend >
        <img  :src="domain+result.image_url" alt="captcha"  style="width: 80px;height: 40px;" @click="fetchData()" >
      </template>
    </el-input>
</template>

<script setup>
import { watch } from 'vue'
import {useFetch} from '@/utility/fetchs'
const captcha = defineModel()
const headers = { 'x-requested-with': 'XMLHttpRequest' }
const { result ,error,fetchData}=useFetch('/captcha/refresh/',{method:'get', headers,onLoad:true })
const domain = import.meta.env.VITE_API_URL
watch(()=>result.value, (json)=>{
    captcha.value.captcha[0]=json.key
})

</script>
