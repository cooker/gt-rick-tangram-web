<style scoped>
    .header,.side,.apa_footer{display: none;}
    #body_content{margin-left:0px;}
    .main{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top:100px;
    }
    .main .left{
        width:350px;
        margin-right:30px;
    }
    .main .left .title{
        font-size:30px;
        font-weight:300;
        margin-bottom:10px;
    }
    .main .left .desc{
        line-height:30px;
        font-size:13px;
        color:#666;

    }
    .main .left .banquan{
        margin-top:30px;
        color:#aaa;
    }
    .main .right{
        width:380px;
        background:#fff;
        padding:20px;
        box-shadow: 5px 5px 10px #eee;
    }
    .main .right .h1{
        font-size:28px;
        font-weight:300;
        margin:10px 0 20px;
        text-align:center;
    }
    .main .right .item{
        display: flex;
        flex-direction: row;
        align-content: center;
        margin-bottom:20px;
    }
    .main .right .item span{
        font-size:30px;
        color:#409EFF;
        margin-right:10px;
    }
    .main .right .item .inp{
        width:300px;
    }
    .main .right .submit{
        width:300px;
        margin-left:40px;

    }
    .main .right .texts{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top:15px;
    }
</style>
<template>
<div class="content" id="login" v-cloak>
    <div class="main">
        <div class="left">
            <div class="title">后台管理</div>
            <div class="desc">持续集成，持久监控，友好运维。</div>
            <div class="banquan">Copyright Grant © 2020</div>
        </div>
        <div class="right">
            <div class="h1">用户登录</div>
            <div class="item">
                <span class="el-icon-user"></span>
                <el-input class="inp" type="text" v-model.trim="username" placeholder="请输入账号"></el-input>
            </div>
            <div class="item">
                <span class="el-icon-lock"></span>
                <el-input class="inp" type="password" v-model.trim="password" placeholder="请输入密码"></el-input>
            </div>
            <div class="item" v-show="type===2">
                <span class="el-icon-lock"></span>
                <el-input class="inp" type="password" v-model.trim="typassword" placeholder="请确认密码"></el-input>
            </div>
            <div class="btn">
                <el-button class="submit" v-show="type===1" type="primary" @click="login">登录</el-button>
                <el-button class="submit" v-show="type===2" type="primary" @click="register">注册</el-button>
            </div>
            <div class="texts">
                <el-button class="bt" type="text" @click="login">忘记密码</el-button>
                <el-button class="bt" type="text" @click="type=1" v-show="type===2">返回登录</el-button>
                <el-button class="bt" type="text" @click="type=2" v-show="type===1">注册账号</el-button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        el: '#login',
        data: function () {
            return {
                type: 1,   //1:登录  2：注册
                username:'',
                password:'',
                typassword:'',
                redirect: undefined
            } 
        },
        mounted() {
        },
        methods: {
            login() {
                if (!this.username) {
                    popup.alert({ type: 'msg', title: '用户名有误!' }); return false;
                }
                if (!this.password) {
                    popup.alert({ type: 'msg', title: '用户密码有误!' }); return false;
                }
                let loginForm = {
                    username: this.username, password: this.password
                }
                this.$store.dispatch('user/login', loginForm).then(() => {
                        this.$router.push({ path: this.redirect || '/' })
                 }).catch(() => {})
                 
            },
            register() {
                if (!this.username) {
                    popup.alert({ type: 'msg', title: '用户名有误!' }); return false;
                }
                if (!this.password) {
                    popup.alert({ type: 'msg', title: '用户密码有误!' }); return false;
                }
                if (this.password !== this.typassword) {
                    popup.alert({ type: 'msg', title: '两次密码输入不一致!' }); return false;
                }

                util.ajax({
                    url: config.baseApi + 'api/v1/user/register',
                    data: {
                        userName: this.username,
                        passWord: this.password
                    },
                    success(data) {
                        popup.miss({ title: "注册成功！" });
                        util.setStorage('local', 'userMsg', JSON.stringify(data.data))
                        setTimeout(() => { location.href = '/' }, 500)
                    }
                })
            },
        }
    }
</script>