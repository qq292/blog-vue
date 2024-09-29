<template>
    <el-row justify="center" style="height: calc(100vh - 60px);">
        <el-col :span="18" :xs="24" :ms="24" style="height: 100%;">
            <el-row  :gutter="16" class="top-row">
                <el-col :span="8" :xs="24" >
                    <el-card :body-style="{ padding: '0px', height: '240px' }" class="box-card">
                        <div class="demo-image__error">
                            <div class="block">
                                <el-image :src="src" @click="src = random_url + '?t=' + Math.random()">
                                    <template #error>
                                        <div class="image-slot">
                                            <el-icon>
                                                <Picture />
                                            </el-icon>
                                        </div>
                                    </template>
                                </el-image>
                            </div>
                        </div>

                    </el-card>
                </el-col>

                <el-col :span="16" :xs="24" class="hidden-xs-only">
                    <el-card :body-style="{ padding: '0px', height: '240px' } " class="box-card">
                        <el-carousel :interval="4000" type="card" height="240px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <div class="demo-image__error">
                                    <div class="block">
                                        <el-image :src="random_url + '?t=' + item">
                                            <template #error>
                                                <div class="image-slot">
                                                    <el-icon>
                                                        <Picture />
                                                    </el-icon>
                                                </div>
                                            </template>
                                        </el-image>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </el-card>
                </el-col>

                <el-col :span="24" >
                    <el-card class="box-card" :body-style="{ padding: '0px',height:'100%' }">
                        <template #header>
                            <el-check-tag :checked="selected_tag_url == item.url" @click="onTagClick(item)"
                                style="margin:4px 8px 4px 0px" class="mx-1" size="large" v-for="item, index in tags"
                                :key="index">
                                {{ item.tag_name}}
                            </el-check-tag>
                        </template>
                        <ul v-infinite-scroll="load" infinite-scroll-distance="200" infinite-scroll-dela="0"
                            class="infinite-list" style="overflow: auto">
                            <li v-for="data, index in current_page_data" :key="index" class="infinite-list-item">

                                <el-link target="_blank" :href="'/article/' + data.id + '/'">
                                    <strong>{{ data.title }}</strong>
                                </el-link>
                            </li>
                            <li style="text-align: center;padding: 30px 0px;">
                                <span v-if="error">{{ error }}<el-button @click="refresh_load()">刷新</el-button></span>
                                <span v-else-if="current_page_data.length == data_count">到底了({{
                                    current_page_data.length }})...</span>
                                <span v-else=" next_page!=null">Loading...</span>
                            </li>
                        </ul>
                    </el-card>

                </el-col>
            </el-row>

        </el-col>
    </el-row>


</template>


<script setup>
import { ref, reactive, watch } from 'vue';
import { homePage } from '@/utility/homePage';
import { useTags } from '@/stores/tagStore';
import { storeToRefs } from 'pinia';
const { tags } = storeToRefs(useTags());
const selected_tag_url = ref('')

const random_url = "https://picsum.photos/453/240"
const src = ref(random_url)

const loading = ref(false)
const { page_data, next_page, data_count, refresh_load, error } = homePage()

//当前展示的文章列表
const current_page_data = ref([])
watch(page_data, () => {

    Array.prototype.push.apply(current_page_data.value, page_data.value);
    loading.value = false
})

//tag点击 
const onTagClick = (tag_item) => {
    selected_tag_url.value = tag_item.url
    current_page_data.value = []
    refresh_load(selected_tag_url.value)
}


const load = () => {
    if (loading.value) { return }
    loading.value = true
    if (next_page.value != null) {
        refresh_load()
    }
}


</script>

<style scoped>
.top-row >div {
    margin-top: 20px;
}

.xy-center {
    display: flex;
    justify-content: center;
    align-items: center;
}



.demo-image__error {
    height: 100%;
}

.demo-image__error .block {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.demo-image__error .el-image {
    /* padding: 0 5px; */
    max-height: 240px;
    height: 100%;
    width: 100%;
}

.demo-image__error .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
}


.box-card ul {
    scrollbar-width: none;
}

.box-card ul:hover {
    scrollbar-width: thin;
}

.infinite-list {
    height: calc(100vh - 460px);
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: start;
    height: 50px;
    background: var(--el-color-info-light-9);
    margin: 10px;
    padding: 0px 10px;
    color: var(--el-color-primary);
    border-radius: 6px;
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.box-card {
    height: 100%;
    padding: 0px;
}


</style>
