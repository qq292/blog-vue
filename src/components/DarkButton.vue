<script setup>
import {UseDark } from '@vueuse/components'
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
const isDark = useDark({
    selector: 'body',
    attribute: 'color-scheme',
    valueDark: 'dark',
    valueLight: 'light',
})

</script>
<template>

    <UseDark></UseDark>
    <el-switch size="large"
        style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2; --el-switch-border-color:#a6a9ad"
        class="mt-2" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" v-model="isDark">
        <template #active-action>
            <span class="custom-active-action ">
                夜
            </span>
        </template>
        <template #inactive-action>
            <span class="custom-inactive-action ">
                白
            </span>
        </template>
    </el-switch>
</template>

<style scoped>
span {
    -webkit-user-select: none;
    user-select: none;
}
</style>
