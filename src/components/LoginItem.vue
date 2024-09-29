<template>


    <!-- Form -->
    <!-- <el-button text @click="dialogFormVisible = true">open a Form nested Dialog</el-button> -->

    <el-dialog v-model="dialogFormVisible" title="欢迎使用" width="auto" style="max-width: 600px;" center>

        <el-tabs tab-position="top" style="height: 500px" class="demo-tabs" justify-content="end">
            <el-tab-pane label="登陆">
                <el-form :model="ruleForm" status-icon label-width="120px" class="demo-ruleForm">
                    <el-form-item label="账号">
                        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="fetchData()" type="button">登陆</el-button>
                        <el-button @click="refreshToken.fetchData()" type="button">刷新</el-button>
                        <el-button @click="logoutTask.fetchData()" type="button">注销</el-button>
                        <!-- <el-button @click="resetForm(ruleForm)">Reset</el-button> -->
                    </el-form-item>

                    <el-form-item>
                        <div v-if="result.error || error" style="color: red;">
                            {{ error || result }}
                        </div>
                        <div v-else-if="result.access_token" style="color: aquamarine;">
                            {{ result }}
                        </div>
                        <div v-else>
                            登陆请求中...3
                        </div>

                    </el-form-item>
                    <el-form-item>
                        <span>已登录信息</span>
                        {{ accees_token }}
                        {{ refresh_token }}
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" style="height: 100%;">
                <el-form :model="createUserData" status-icon label-width="120px" class="demo-ruleForm">
                    <el-form-item label="账号" required>
                        <el-input v-model="createUserData.username" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="密码" required>
                        <el-input v-model="createUserData.password" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="再次输入" required>
                        <el-input v-model="again" type="password" autocomplete="off" />
                    </el-form-item>


                    <el-form-item label="邮箱">
                        <el-input v-model="createUserData.email" type="email" autocomplete="off" />
                    </el-form-item>
                    

                    <el-form-item label="验证码" required justify="stretch">
                        <!-- <el-input v-model="createUserData.captcha" type="text" autocomplete="off" /> -->
                        <Captcha v-model="createUserData"></Captcha>

                    </el-form-item>
                    
                    <el-form-item>
                        <el-button @click="create_user(createUserData, again)" type="button">注册</el-button>

                    </el-form-item>
                    <el-form-item>
                        <div v-if="createUserResult.url" style="color: aquamarine;">
                            注册成功: {{ createUserResult.username }}
                        </div>
                        
                        <div v-else-if="createUserResult.error || createUserError  || Object.entries(createUserResult).length!=0">
                            <div v-for="item in Object.entries(createUserResult)">
                                <span>{{ item[0] }}  {{ item[1][0] }}</span>
                            </div>
                            <div>
                                {{ createUserError || createUserResult.error  }}
                            </div>
                            
                        </div>

                        
                        <div v-else>
                            注册请求中...
                        </div>


                    </el-form-item>


                </el-form>

            </el-tab-pane>

        </el-tabs>
    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '@/stores/auth';
import { HttpApi } from '@/utility/HttpApi';
import { storeToRefs } from 'pinia';
import { ElMessage, ElInput } from 'element-plus'
import Captcha from './Captcha.vue';

const ruleForm = reactive({
    password: '',
    username: '',
    grant_type: "password"
})

const createUserData = reactive({
    password: '',
    username: '',
    email: '',
    captcha: ['key',''],
})
const dialogFormVisible = defineModel({ type: Boolean, default: false })

const { refresh_token, accees_token } = storeToRefs(useAuth())
const { apiRefreshToken, apiLogout, apiLogin, createUser } = HttpApi()
const { result, error, fetchData } = apiLogin(ruleForm)
const refreshToken = apiRefreshToken()
const logoutTask = apiLogout()


const again = ref('')
const { result: createUserResult, error: createUserError, fetchData: _create_user } = createUser()

const create_user = (data, again) => {

    if (data.password != again) {
        ElMessage({
            message: '两次输入密码不一致',
            grouping: true,
            type: false,
        })
        return
    }

    _create_user('/user/', 'post', null, null, data)
}











</script>
<style scoped>
.el-select {
    width: 250px;
}

.el-input {
    width: 250px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>