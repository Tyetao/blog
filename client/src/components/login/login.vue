<template>
<transition name="modal">
	<div class="modal-mask" @click.self="$emit('close')">
		<div class="login-wrap">
			<div class="login-html">
				<input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">登录</label>
				<input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">注册</label>
				<div class="login-form">
					<div class="sign-in-htm">
						<div class="group">
							<label for="user" class="label">用户名</label>
							<input v-model="signin.userName" placeholder="邮箱或者电话号码" id="user" type="text" class="input">
						</div>
						<div class="group">
							<label for="pass" class="label">密码</label>
							<input v-model="signin.password" placeholder="请输入密码" id="pass" type="password" class="input" data-type="password">
						</div>
						<div class="group">
							<input v-model="signin.remember" id="check" type="checkbox" class="check" checked>
							<label for="check"><span class="icon"></span>记住我</label>
						</div>
						<div class="group">
							<input @click="signinF()" type="submit" class="button" value="登录">
						</div>
						<div class="hr"></div>
						<!-- <div class="foot-lnk">
							<a href="#forgot">Forgot Password?</a>
						</div> -->
					</div>
					<div class="sign-up-htm">
						<div class="group">
							<label for="user" class="label">用户名</label>
							<input v-model="signup.userName" placeholder="邮箱或者电话号码" id="user" type="text" class="input">
						</div>
						<div class="group">
							<label for="pass" class="label">密码</label>
							<input v-model="signup.password" placeholder="不能小于6位数" id="pass" type="password" class="input" data-type="password">
						</div>
						<div class="group">
							<label for="pass" class="label">确认密码</label>
							<input v-model="signup.comfirPwd" placeholder="请再次输入密码" id="pass" type="password" class="input" data-type="password">
						</div>
						<div class="group">
							<input @click="signupF()" type="submit" class="button" value="注册">
						</div>
						<div class="hr"></div>
	<!-- 					<div class="foot-lnk">
							<label for="tab-1">Already Member?</label>
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</transition>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				url: '',
				signin: {
					userName: '',
					password: '',
					remember: false
				},
				signup: {
					userName: '',
					password: '',
					comfirPwd: ''
				}
			}
		},
		methods: {
			signinF() {
				console.log(JSON.stringify(this.signin))

				this.$http.post(this.url + 'api/signin', this.signin).then( res => {
					let obj = res.body;
					console.log(obj)
					if (obj.error_code == "Y10001") {
						alert(obj.msg)
						return;
					}
					if (obj.error_code == "Y10000") {
						if (this.signin.remember) {
							localStorage.setItem('userName',obj.datas.userName);
							localStorage.setItem('userId',obj.datas.userId);
						}
						sessionStorage.setItem('userName',obj.datas.userName);
						sessionStorage.setItem('userId',obj.datas.userId);
						alert(obj.msg)
						location.reload();
					}
				}, err => {
					alert('登录失败')
				})
			},
			signupF() {
				let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
				let phone =  /^1[34578]\d{9}$/;
				let signup = this.signup;
				if (!reg.test(signup.userName) && !phone.test(signup.userName)) {
					alert('用户名只能是邮箱或手机号码');
					return;
				}
				if (signup.password.length < 6) {
					alert('密码的长度不能小于6位数');
					return;
				}
				if (signup.password != signup.comfirPwd) {
					alert('两次输入的密码不一样');
					return;
				}

				this.$http.post(this.url + 'api/signup', {"signup":signup}).then( res => {
					let obj = res.body;
					if (obj.error_code == "Y10001") {
						alert(obj.msg)
						return;
					}
					if (obj.error_code == "Y10000") {
						alert(obj.msg)
						this.$emit('close');
					}
				}, err => {
					alert('注册失败')
				})
			}
		},
		created(){
			this.url = this.global_url.global_url;

			let userName = localStorage.getItem('userName');
			if (userName) {
				this.signin.remember = true;
			}
		}
	}
</script>

<style scoped>
.modal-mask{
  	position: fixed;
  	z-index: 9998;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	background-color: rgba(0, 0, 0, .8);
  	display: table;
  	transition: opacity .5s ease;
}
.login-wrap{
	width:540px;
	height:540px;
	position:absolute;
	top: 50%;
	margin-top: -270px;
	left: 50%;
	margin-left: -270px;
	/*background:rgba(0, 0, 0, .5);*/
	/*margin: auto;*/
	background:url(./bg.jpg) no-repeat top left;
	background-size: 100%;
	transition: opacity .5s ease;
	box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
	width:100%;
	height:100%;
	position:absolute;
	padding:90px 70px 50px 70px;
	background:rgba(40,57,101,.9);
	box-sizing: border-box;
}
.login-html .sign-in-htm,
.login-html .sign-up-htm{
	top:0;
	left:0;
	right:0;
	bottom:0;
	position:absolute;
	transform:rotateY(180deg);
	backface-visibility:hidden;
	transition:all .4s linear;
}
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check{
	display:none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button{
	text-transform:uppercase;
}
.login-html .tab{
	font-size:22px;
	margin-right:15px;
	padding-bottom:5px;
	margin:0 15px 10px 0;
	display:inline-block;
	border-bottom:2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab{
	color:#fff;
	border-color:#80C7DB;
}
.login-form{
	min-height:345px;
	position:relative;
	perspective:1000px;
	transform-style:preserve-3d;
}
.login-form .group{
	margin-bottom:15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button{
	width:100%;
	color:#fff;
	display:block;
}
.login-form .group .input,
.login-form .group .button{
	border:none;
	padding:15px 0;
	/*border-radius:25px;*/
	background:rgba(255,255,255,.1);
}
.login-form .group .input{
	text-indent: 10px
}
.login-form .group input[data-type="password"]{
	text-security:circle;
	-webkit-text-security:circle;
}
.login-form .group .label{
	color:#aaa;
	font-size:12px;
	margin-bottom: 10px
}
.login-form .group .button{
	background:#80C7DB;
}
.login-form .group label .icon{
	width:15px;
	height:15px;
	border-radius:2px;
	position:relative;
	display:inline-block;
	background:rgba(255,255,255,.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after{
	content:'';
	width:10px;
	height:2px;
	background:#fff;
	position:absolute;
	transition:all .2s ease-in-out 0s;
}
.login-form .group label .icon:before{
	left:3px;
	width:5px;
	bottom:6px;
	transform:scale(0) rotate(0);
}
.login-form .group label .icon:after{
	top:6px;
	right:0;
	transform:scale(0) rotate(0);
}
.login-form .group .check:checked + label{
	color:#fff;
}
.login-form .group .check + label .icon{
	vertical-align: middle;
	margin-right: 10px;
	background:#80C7DB;
}
.login-form .group .check:checked + label .icon{
	vertical-align: middle;
	margin-right: 10px;
	background:#80C7DB;
}
.login-form .group .check:checked + label .icon:before{
	transform:scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after{
	transform:scale(1) rotate(-45deg);
}
.login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
	transform:rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
	transform:rotate(0);
}

.hr{
	height:2px;
	margin:60px 0 50px 0;
	background:rgba(255,255,255,.2);
}
.foot-lnk{
	text-align:center;
}
.modal-enter{
  	opacity: 0
}

.modal-leave-active{
  	opacity: 0
}

.modal-enter .login-wrap,
.modal-leave-active .login-wrap{
  	transform: scale(1.1)
}	
</style>