<template>
    <el-container class="layout-container-demo">
        <el-header>

            <NavigationItem></NavigationItem>

        </el-header>

        <el-main >
            <RouterView />
            

        </el-main>

    </el-container>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavigationItem from './components/NavigationItem.vue';
// import { useTags } from './stores/tagStore';
// const uTags = useTags()
// uTags.refresh()






</script>

<style scoped>
.layout-container-demo .el-header {
    height: var(--nav-hight);
    position: fixed;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--el-border-color);
    top: 0px;
    right: 0px;
    left: 0px;
    z-index: 99;
    background-color: var(--el-bg-color);
    color: var(--el-text-color-primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding: 0 1%; */
}


.layout-container-demo .el-main {
    padding: 0;
    margin-top: var(--nav-hight)
}
</style>
<style>
body {
    --nav-hight: 60px;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}
</style>