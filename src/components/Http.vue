

<template></template>
<script setup>
import { onMounted} from 'vue'

const emit =defineEmits(["response"])
const fp = defineProps({
    method: {
        type: String,
        default: "post"
    },
    url: {
        type: String,
        default: 'api/blog/updateCaptcha/',
    },
    onLoad: {
        type: Boolean,
        default: true
    }

})


const send = () => {
    fetch(fp.url, { method: fp.method })
        .then(res =>  res.json()
        ).then(json => {
            emit('response',json)
        }).catch(e => {
            console.log(e)
        })
}


onMounted(() => {
    if (fp.onLoad) {
        send()
    }
})
defineExpose({ send })
</script>