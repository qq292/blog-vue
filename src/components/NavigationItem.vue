<template>
    <LoginItem v-model="showLogin" />
    <div class="left-box">
        <div style="width: 32px;height: 32px;">
            <RouterLink to="/">
                <img src="@/assets/logo.svg" fit="contain" alt="图片" />
            </RouterLink>
        </div>
    </div>
    <div class="center-box">
        
        <RouterLink v-show="routeName != 'articlecreate'"  to="/articlecreate">
            <el-button link >写博客</el-button>
        </RouterLink>

        <el-button v-show="routeName == 'articlecreate' && save_url" @click="store.saveArticle()">
            保存
        </el-button>

    </div>
    <div class="right-box">
        <div class="toolbar">
            <DarkButton />
            <el-button circle style="margin-left: 10px;" @click="showLogin = true">登录</el-button>
        </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import DarkButton from '@/components/DarkButton.vue';

import { Menu as Setting } from '@element-plus/icons-vue'
import { ref, computed, watch } from 'vue'
import LoginItem from './LoginItem.vue';
import { useNavigationStore } from '@/stores/navigationStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const route = useRoute();
const routeName = computed(() => route.name);
const store = useNavigationStore()
const { save_url } = storeToRefs(store);






watch(route, (newValue) => {
    if (newValue.name == 'articlecreate') {
        save_url.value = ''
    }
})

const showLogin = ref(false)



</script>
<style scoped>
.layout-container-demo .toolbar {

    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    left: 20px;
}
</style>