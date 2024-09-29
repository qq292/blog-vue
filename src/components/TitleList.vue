<template>
    <el-button size="large" round @click="$emit('click')">
        <template v-if="icon">
            <el-icon :size="size">
                <component :is="icon"></component>
            </el-icon>
        </template>
        <span>{{ title }}</span>
    </el-button>

    <div id="scroll">
        <el-scrollbar height="100%">
            <el-menu :class="{ 'no-boder': noborder }">
                <template v-for="(item, index) in data" :key="index">


                    <el-menu-item :index="String(index)" @mouseover="selectedItem = index"
                        @click="$emit('itemClick', item.id, item.url)">
                        <span class="ellipsis">{{ item.title }}</span>
                        <template v-if="item.public">
                            <el-icon>
                                <Cellphone />
                            </el-icon>
                        </template>

                        <el-dropdown v-show="selectedItem == index">
                            <el-icon style="margin-right: 8px; margin-top: 1px">
                                <setting />
                            </el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="removeItem(index, item.url)">删除</el-dropdown-item>

                                    <el-dropdown-item
                                        @click="$emit('editClick', index, item.id, item.url)">编辑</el-dropdown-item>
                                    <template v-if="(item.public !== undefined)">
                                        <el-dropdown-item>
                                            <el-link :href="'/article/' + item.id" target="_blank">预览</el-link>
                                        </el-dropdown-item>
                                        <el-dropdown-item @click="publishArticle(index, item.url)"
                                            v-if="item.public == false">发布</el-dropdown-item>
                                    </template>

                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>

                    </el-menu-item>



                </template>
            </el-menu>
        </el-scrollbar>
    </div>

</template>
<script setup>
import { ArticleCreatePage } from '@/utility/ArticleCreatePage';
import { ElMessage } from 'element-plus'
import { watch, ref } from 'vue';
const { autoMethod } = ArticleCreatePage()
const data = defineModel({ type: Array, default: [] })
const emits = defineEmits(["click", 'itemClick', 'editClick'])

const porops = defineProps({
    menuId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'default-新建文集'
    },
    icon: {
        type: String,
        default: null
    },
    size: {
        type: Number,
        default: 20
    },
    noborder: {
        type: Boolean,
        default: false
    }, addUrl: {
        type: String,
        required: true
    }

})

const selectedId = ref(0)
const selectedItem = ref(0)
const autohttp = autoMethod('#')

const messageBox = (type, message) => {
    type = type ? "success" : "error"
    ElMessage({
        message: message,
        grouping: true,
        type: type,
    })
}

//监听错误信息
watch(autohttp.error, (newValue) => {
    if (newValue) {
        messageBox(false, newValue)
    }
})


//移除
const removeItem = (index, url) => {
    autohttp.fetchData(url, "delete", (json, code) => {
        if (code == 204) {
            messageBox(true, "删除成功")
            data.value.splice(index, 1)
        } else {
            messageBox(false, json.detail)
        }
    })
}
//局部更新 发布
const publishArticle = (index, url) => {
    autohttp.fetchData(url, "patch", (json, code) => {
        if (code == 200) {
            messageBox(true, "发布成功")
            data.value[index].public = true
        } else {
            messageBox(false, json.detail)
        }
    }, { public: true })
}









</script>
<style scoped>
.ellipsis {
    width: 200px;
    /* 设置宽度 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 隐藏溢出部分 */
    text-overflow: ellipsis;
    /* 显示省略号 */
    /* border: 1px solid #ccc; */
    /* 可选的边框样式 */
}

#scroll {
    height: calc(100vh - 250px);
}

button {
    margin-bottom: 22px;
}

.el-menu-item {
    justify-content: space-between;
}

.-setting-active {
    display: flex;
}

.-setting-hide {
    display: none;
}

.no-boder {
    border-right-width: 0px;
}
</style>