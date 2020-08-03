<template>
	<view class="main">
		<view class="login-img">
			<image src="../../static/tx01.png"></image>
		</view>
		<view class="form"  >
			<view class="item">
				<image src="../../static/tel.png"></image>
				<input type="number" maxlength="11" placeholder="请输入手机号" @input="inputChange" data-name="account"/>
			</view>
			<view class="item">
				<image src="../../static/pwd.png"></image>
				<input type="text" password="true" maxlength="16" placeholder="请输入密码" @input="inputChange" data-name="password" @confirm="bindLogin"/>
			</view>
			<view class="submit">
				<button type="default" @tap="bindLogin" :disabled="logining" class="phoneLogin">登录</button>
			</view>
		</view>
		<!-- #ifndef MP-->
		<view class="forget-reg">
			<navigator url="/pages/common/find_pwd" open-type="navigate">忘记密码</navigator>
			<text>|</text>
			<navigator url="/pages/common/reg" optn-type="navigate">注册账号</navigator>
		</view>
		<!-- #endif -->
		<!-- #ifndef H5 || MP-->
		<view class="third-party">
			<view class="title">
				第三方账号登录
			</view>
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauthLogin(provider.value)"></image>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return{
				logining:false,
				account:'',
				password:'',
				providerList: [],
				hasProvider: false,
			}
		},
		onLoad(){
		},
		methods:{
			...mapMutations(['login']),
			inputChange(e){
				const name = e.currentTarget.dataset.name;
				this[name] = e.detail.value;
			},
			// 输入账号密码登录
			bindLogin:function(e){
				if(this.account == ''){
					this.func.msg('请输入手机号');
					return;
				}
				if(this.password == ''){
					this.func.msg('请输入密码');
					return;
				}
				uni.showLoading({
					title:'登录中',
					mask:true
				})
				this.request.post(this.api.login,{
					data:{account:this.account,password:this.password}
				}).then(res => {
					uni.hideLoading();
					if(res.code){
						this.login(res.data);
						uni.navigateBack();
						uni.showToast({
							title:'登录成功'
						});
						uni.getStorage({
							key:'return_url',
							success:(res=>{
								uni.navigateTo({
									url:res.data
								})
								uni.removeStorage({
									key:'return_url'
								})
							}),
							fail:(err=>{
								console.log(err);
							})
						})
					}else{
						this.func.msg(res.msg);
					}
				}).catch(error => {
					console.log(error);
				})
			},
			// #ifndef H5
			// 初始化服务商
			initProvider() {
			    const filters = ['weixin', 'qq', 'sinaweibo'];
			    uni.getProvider({
			        service: 'oauth',
			        success: (res) => {
						console.log(res);
			            if (res.provider && res.provider.length) {
			                for (let i = 0; i < res.provider.length; i++) {
			                    if (~filters.indexOf(res.provider[i])) {
			                        this.providerList.push({
			                            value: res.provider[i],
			                            image: '../../static/' + res.provider[i] + '.png'
			                        });
			                    }
			                }
			                this.hasProvider = true;
			            }
			        },
			        fail: (err) => {
			            console.error('获取服务供应商失败：' + JSON.stringify(err));
			        }
			    });
			},
			// 第三方授权登录
			oauthLogin(value) {
			    uni.login({
			        provider: value,
			        success: (res) => {
			            uni.getUserInfo({
			                provider: value,
			                success: (infoRes) => {
			                    /**
			                     * 实际开发中，获取用户信息后，需要将信息上报至服务端。
			                     * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
			                     */
								console.log(infoRes);
			                }
			            });
			        },
			        fail: (err) => {
			            console.error('授权登录失败：' + JSON.stringify(err));
			        }
			    });
			}
			// #endif
		},
		onReady() {
			// #ifndef H5
		    this.initProvider();
			// #endif
		}
	}
</script>

<style lang="scss">
	page{
		background-color: white;
	}
	.main{
		padding:100upx 0;
		.login-img{
			text-align: center;
			image{
				width: 180upx;
				height: 180upx;
			}
		}
		.form{
			padding:100upx 30upx 0upx;
			display: block;
			.item{
				padding:30upx 40upx 20upx 0upx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #eeeeee;
				input{
					width: 100%;
					height:60upx;
					padding-left: 40upx;
				}
				image{
					width: 60upx;
					height: 60upx;
				}
			}
			.submit button{
				background-color: #14aaf7;
				color: white;
				margin: 60upx 120upx;
				box-shadow: #cce4ff 0 0 2upx;
				letter-spacing:10upx;
				border-radius:100upx;
				font-size: 36upx;
			}
		}
		.forget-reg{
			display: flex;
			justify-content: center;
			navigator{
				font-size:28upx;
				color: #14aaf7;
				margin:0upx 30upx;
			}
		}
		.third-party{
			margin-top:40upx;
			.title{
				text-align: center;
				margin-bottom:40upx;
				color: #999999;
			}
			.oauth-image{
				display: flex;
				justify-content:center;
				image{
					width:70upx;
					height: 70upx;
					margin:0 15upx;
				}
			}
		}
	}
</style>
