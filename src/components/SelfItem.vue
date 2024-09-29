<template>
    
    <el-tabs type="border-card" style="height: 280px;">
        <el-scrollbar>
            <el-tab-pane label="收藏链接">
                <ul>
                    <li v-for="(item, index) in data.like_link" :key="index">
                        <el-link type="primary" :href="item.url" target="_blank">{{ item.name }}</el-link>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="常用工具">Config</el-tab-pane>

        </el-scrollbar>
    </el-tabs>

</template>
<script setup>
import { reactive, ref } from 'vue'

const lick_link_data = [
    { name: "django-oauth-toolkit", url: "https://django-oauth-toolkit.readthedocs.io/en/latest/" },
    { name: "django-rest-framework", url: "https://www.django-rest-framework.org/" },
    { name: "cherry-markdown官方文档", url: "https://github.com/Tencent/cherry-markdown/wiki/hello-world" },
    { name: "examples", url: "https://tencent.github.io/cherry-markdown/examples/index.html" },
    { name: "cherry-markdown", url: "https://portrait.gitee.com/kai-yuan/cherry-markdown" },
    { name: "element-plus", url: "https://s-test.belle.cn/zh-CN/" },
    { name: "vue3", url: "https://cn.vuejs.org/" },
    { name: "vue-router", url: "https://router.vuejs.org/" },
    { name: "vuex", url: "https://vuex.vuejs.org/" },
    { name: "axios", url: "https://axios-http.com/zh-cn/docs/intro" },
    { name: "pinia", url: "https://pinia.vuejs.org/" },
    { name: "vite", url: "https://cn.vitejs.dev/" },
    { name: "vue-i18n", url: "https://kazupon.github.io/vue-i18n/" },
    { name: "vue-cli", url: "https://cli.vuejs.org/" },
    { name: "useDark", url: "https://vueuse.org/core/useDark/" },
    { name: "components", url: "https://vueuse.org/guide/components" },


]


const data = ref({
    like_link: lick_link_data
})


</script>
<style></style>
