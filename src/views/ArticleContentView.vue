<template>
    <main>
        <el-row style="justify-content: center;">
            <el-col :span="19" :xs="24" :sm="22" :md="22" :lg="19">
                <el-row>
                    <el-col :span="18" :xs="24" :sm="16" :md="18" :lg="18">
                        <el-row style="margin-bottom: 20px;">
                            <el-col :span="24">
                                <el-card class="box-card" body-style="padding: 0px;">
                                    <template #header>
                                        <h1>
                                            <span style="font-size: 1.4em;">{{ result.title || result.error }}</span>
                                            <sub v-show="result.public == false" style="color: red; ">(仅自己可见)</sub>
                                        </h1>
                                        <p>
                                            <span style="margin-right:28px">创建: {{ result.created_date }}</span>
                                            <span>修改: {{ result.last_modified }}</span>
                                        </p>
                                        <p>
                                            <!-- 标签 -->
                                            <el-tag type="" style="margin-right:8px" class="mx-1" size="small"
                                                v-for="item, index in tags_name" :key="index">{{ item.tag_name
                                                }}</el-tag>

                                        </p>
                                    </template>
                                    <div id="markdown-id-preview"></div>
                                </el-card>


                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24" class="comment">
                                <!-- 这是comment区域 -->
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="6" :sm="8" :md="6" :lg="6" class="hidden-xs-only" style="padding-left:12px">
                        <el-affix :offset="60.01">
                            <SelfItem />
                        </el-affix>

                    </el-col>
                </el-row>

            </el-col>
            <el-backtop :bottom="100">
                <div style="
                    height: 100%;
                    width: 100%;
                    background-color: var(--el-bg-color-overlay);
                    box-shadow: var(--el-box-shadow-lighter);
                    text-align: center;
                    line-height: 40px;
                    color: #1989fa;
                    ">
                    <el-icon>
                        <Top />
                    </el-icon>
                </div>
            </el-backtop>
        </el-row>

    </main>
</template>


<script setup>

import SelfItem from '@/components/SelfItem.vue';
import { onMounted, watch, computed, ref } from 'vue';
import { MD } from '@/utility/markdown'
import { ArticleContentPage } from '@/utility/ArticleContentPage'
import { useTags } from '@/stores/tagStore';
import { storeToRefs } from 'pinia';
const { tags } = storeToRefs(useTags())

const porps = defineProps({
    id: String
})
const { getArticleContent } = ArticleContentPage()
const url = computed(() => "/articles/" + porps.id + "/")
const { result, fetchData } = getArticleContent(url.value)
const tags_name = computed(() => result.value.tag ? tags.value.filter(tag => result.value.tag.includes(tag.url)) : [])

//markdown 编辑器
let md = null
onMounted(() => {
    const mds = MD("markdown-id-preview", true)
    md = mds.md
    fetchData()


})

const title = computed(() => result)

//监听数据变化
watch(() => result.value, (newValue) => {
    if (md) {
        md.setMarkdown(newValue.content || '')
    }
})


</script>


<style>
#markdown-id-preview *[class*="cherry-"] {
    border-color: transparent;
}

@media (min-width: 768px) {

    #markdown-id-preview [class='cherry-previewer cherry-markdown theme__dark cherry-preview--full'] {
    padding: 20px 45px 20px 45px;
}
}


</style>

<style scoped>
/* .main{
        padding : 0px 20px;
    } */
.content {
    margin-bottom: 20px;
}
</style>