<template>
    <el-container id="container">
        <el-aside class="aside hidden-xs-only" width="450px" height="100%">
            <el-row justify="center">
                <el-col :span="10">
                    <TitleList @editClick="editClick_articleSet" @itemClick="refreshArticleSet" @click="addArticleSet"
                        v-model="articlesets" icon="Plus" title="创建文集" menuId="i-menu" addUrl="/articlesets/" />

                </el-col>

                <el-col :span="14">
                    <TitleList @editClick="editClick" @itemClick="refreshArticle" @click="addArticle" :noborder="true"
                        icon="CirclePlusFilled" v-model="articles" title="创建文章" menuId="e-menu" addUrl="/articles/" />
                </el-col>
            </el-row>
            <el-row style="padding: 20px 20px 0px 20px;">
                <el-col :span="12">
                    <el-button size="large" @click="saveArticle">杂文</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button size="large" @click="saveArticle">文档</el-button>
                </el-col>

            </el-row>
        </el-aside>

        <el-main class="main">
            <div id="markdown-id-edit"></div>
        </el-main>

        <!-- 模态框  文章信息 -->

        <el-dialog v-model="dialogFormVisible" title="编辑文章信息" height='auto' width="auto" style="max-width: 600px;"
            center>

            <el-form style="margin: 0 20px 80px " label-position="top" :model="articleData" status-icon label-width="120px" class="demo-ruleForm">
                <el-form-item label="标题：" size="large">
                    <el-input v-model="articleData.title" type="text" autocomplete="off"
                        :placeholder="articleData.title" />
                </el-form-item>
                <el-form-item label="是否公开：" size="large">
                    <el-radio-group v-model="articleData.public" class="ml-4">
                        <el-radio-button :label="true" size="large">公开</el-radio-button>
                        <el-radio-button :label="false" size="large">私密</el-radio-button>
                    </el-radio-group>
                </el-form-item>


                <el-form-item label="标签：" size="large">

                   

                    <el-check-tag v-if="!isEditTag" @click="tagClick(item)"
                        :checked="currentArticleSelectedTags.includes(item.url)" style="margin:4px 8px 0px 0px"
                        v-for="item, index in tags" :index="index">{{ item.tag_name
                        }}</el-check-tag>

                    <template v-else>
                        <el-tag effect="light" class="xm-1" style="margin:4px 8px 0px 0px" v-for="tag, index in tags" :key="index" closable
                            :disable-transitions="false" @close="handleClose(tag)">
                            {{ tag.tag_name }}
                        </el-tag>
                        <el-input style="margin:4px 8px 0px 0px" v-if="inputVisible" ref="InputRef" v-model="inputValue"
                            class="ml-1 w-20" size="small" @keyup.enter="handleInputConfirm"
                            @blur="handleInputConfirm" />
                        <el-button style="margin:4px 8px 0px 0px" v-else class="button-new-tag ml-1" size="small"
                            @click="showInput">
                            + New Tag
                        </el-button>
                    </template>



                </el-form-item>
                <el-form-item >
                    <el-button size="large" @click="updateArticleData(articleData, currentArticleSelectedTags)"
                        type="button">提交</el-button>
                    <el-button size="large" @click="uTags.refresh()" type="button">刷新标签</el-button>
                    <el-button size="large" @click="isEditTag = !isEditTag" type="button">{{ isEditTag ? "选择标签" : "编辑标签"
                        }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 文集信息 -->
        <el-dialog v-model="dialogFormVisible_articleSet" title="编辑文集信息" height='auto' width="auto"
            style="max-width: 600px;" center>
            <el-form  style="margin: 0 20px 80px " label-position="top" :model="articleSetData" status-icon label-width="120px" class="demo-ruleForm">
                <el-form-item label="标题：" size="large">
                    <el-input v-model="articleSetData.title" type="text" autocomplete="off"
                        :placeholder="articleSetData.title" />
                </el-form-item>

                <el-form-item>
                    <el-button size="large" @click="updateArticleSetData(articleSetData)" type="button">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


    </el-container>
</template>
<script setup>
import TitleList from '@/components/TitleList.vue';
import { computed, reactive, ref, watch, onMounted, nextTick } from 'vue'
import { ElMessage, ElInput } from 'element-plus'
import { ArticleCreatePage } from '@/utility/ArticleCreatePage'
import { MD } from '@/utility/markdown'
import { storeToRefs } from 'pinia';
import { useNavigationStore } from '@/stores/navigationStore';
import { useTags } from '@/stores/tagStore';
const uTags = useTags()
const { tags } = storeToRefs(uTags);
// uTags.refresh()
const { setSaveUrl, setSaveArticleFunc } = useNavigationStore();

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()
const isEditTag = ref(false)
const handleClose = (tag) => {
    uTags.deleteTag(tag.url, (json, status_code) => {
        if (status_code >= 200 && status_code < 300) {
            tags.value.splice(tags.value.indexOf(tag), 1)
        } else {
            messageBox(false, json.detail ? json.detail : json)
            
        }
    })
    
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value && InputRef.value.input && InputRef.value.input.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        uTags.createTag(inputValue.value, (json, status_code) => {
            if (status_code >= 200 && status_code < 300) {
                tags.value.push(json)
            } else {
                messageBox(false, json.detail ? json.detail : json)
            }
        })

    }
    inputVisible.value = false
    inputValue.value = ''
}


const { getArticleSetList, autoMethod, getArticleList, getTags } = ArticleCreatePage()
const articleSet_selectedId = ref(0)
const articleListUrl = computed(() => "/list_articleset/" + articleSet_selectedId.value + "/")
const { result: articlesets } = getArticleSetList()
const { result: articles, fetchData: refreshArticleList } = getArticleList(articleListUrl.value)
// const { result: tags } = getTags()


const articleData = reactive({
    title: '',
    public: false,
})
const articleSetData = reactive({
    title: '',
})
const dialogFormVisible = ref(false)
const dialogFormVisible_articleSet = ref(false)




//markdown 编辑器
let md = null
onMounted(() => {
    const mds = MD("markdown-id-edit", false)
    md = mds.md
})

//提示框
const messageBox = (type, message) => {
    type = type ? "success" : "error"
    ElMessage({
        message: message,
        grouping: true,
        type: type,
    })
}

const autohttp = autoMethod('#')
//增加
const __addItem = (title, addUrl, data) => {
    const now = new Date();
    const _data = {
        title: title + `${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}时`
    }
    autohttp.fetchData(addUrl, "post", (json, code) => {
        if (json.title) {
            data.value.unshift(json)
            messageBox(true, "新建成功")
        } else {
            messageBox(false, json.detail ? json.detail : json)
        }
    }, _data)

}

//创建文集
const addArticleSet = () => {
    __addItem("新建文集", "/articlesets/", articlesets)
}

const create_article_url = computed(() => "/create_article/" + articleSet_selectedId.value + "/")
//创建文章
const addArticle = () => {
    __addItem("新建文章", create_article_url.value, articles)
}

//文集项目点击事件  刷新文章列表
const refreshArticleSet = (id) => {
    md.setMarkdown('')
    currentArticleUrl.value = ''
    articleSet_selectedId.value = id
    refreshArticleList(articleListUrl.value)

}


//文章项目点击事件  刷新文章内容
const refreshArticle = (id, url) => {
    currentArticleUrl.value = url
    autohttp.fetchData(url, "get", (json, code) => {
        if (code >= 200 && code < 300) {
            md.setMarkdown(json.content || "")
        } else {
            messageBox(false, json.detail ? json.detail : json)
        }
    })
}

//保存文章
const saveArticles = (url) => {
    let content = md.getMarkdown()
    autohttp.fetchData(url, "patch", (json, code) => {
        if (code >= 200 && code < 300) {
            messageBox(true, "保存成功")
        } else {
            messageBox(false, json.detail ? json.detail : json)
        }
    }, { content: content })
}

const currentArticleSelectedTags = ref([])
//文章编辑按钮点击
const editClick = (index, id, url) => {
    dialogFormVisible.value = true
    const currentArticle = articles.value[index]
    articleData.title = currentArticle.title
    articleData.public = currentArticle.public
    currentArticleIndex.value = index
    currentArticleEditUrl.value = url
    currentArticleSelectedTags.value = currentArticle.tag

}
const currentArticleIndex = ref(0)
const currentArticleEditUrl = ref("")
const currentArticleSetIndex = ref(0)
const currentArticleSetUrl = ref("")
// 文集编辑按钮点击
const editClick_articleSet = (index, id, url) => {
    dialogFormVisible_articleSet.value = true
    const current = articlesets.value[index]
    articleSetData.title = current.title
    currentArticleSetIndex.value = index
    currentArticleSetUrl.value = url
}

//更新文章信息（局部更新）
const updateArticleData = (data, tags) => {
    autohttp.fetchData(currentArticleEditUrl.value, "patch", (json, code) => {
        if (code >= 200 && code < 300) {
            articles.value[currentArticleIndex.value] = json

            messageBox(true, "更新文章信息成功")
        } else {
            messageBox(false, json.detail ? json.detail : json)
        }
    }, null, { ...data, tag: tags })
}

//更新文集信息 （局部更新）
const updateArticleSetData = (data) => {
    autohttp.fetchData(currentArticleSetUrl.value, "patch", (json, code) => {
        if (code >= 200 && code < 300) {
            articlesets.value[currentArticleSetIndex.value] = json
            messageBox(true, "更新文集信息成功")
        } else {
            messageBox(false, json.detail ? json.detail : json)
        }
    }, null, { ...data })
}



//tag点击
const tagClick = (tag) => {
    let url = tag.url
    if (currentArticleSelectedTags.value.includes(url)) {
        currentArticleSelectedTags.value.splice(currentArticleSelectedTags.value.indexOf(url), 1)
    } else {
        currentArticleSelectedTags.value.push(url)
    }

}



//状态管理
const currentArticleUrl = ref("")
setSaveArticleFunc(saveArticles)
watch(() => currentArticleUrl.value, (newValue) => {
    setSaveUrl(newValue)

})






</script>
<style>
/* 去掉预览区白线 */
#markdown-id-edit *[class*="cherry-"] {
    border-color: transparent;
}
</style>



<style scoped>
.aside {
    margin: 20px auto;
}

#container {
    height: calc(100vh - 60px);
}

.main {
    border-style: solid;
    padding: 0px;
    border-color: var(--el-border-color);
    border-width: 0px 0px 0px 1px;

}
</style>