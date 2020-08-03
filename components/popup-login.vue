<template>
	<view>
		<view class="cu-mask" v-show="isShow"></view>
		<view class="cu-modal" style="width:60%;" v-show="isShow">
			<view class="cu-modal__hd" style="padding-bottom:0;">
				<!-- <text class="cu-modal__title">登录 / 注册</text> -->
				<text class="cu-modal__title">登录</text>
				<text style="position: absolute;right:0upx;top:0upx;font-size:28upx;padding:20upx 20upx 0;" @click="close()">X</text>
			</view>
			<view class="cu-modal__bd">
				<view class="login-btn">
					<!-- <button type="default" class="phone" @tap="jump('/pages/common/login')">手机号注册 / 登录</button> -->
					<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="wxLogin" class="weixin">微信快速登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		props: {
			isPopupLogin: {
				type: Boolean,
				default: false
			}
		},
		data: function() {
			return {
				isShow: false,
				code: '',
				interval: null,
			};
		},
		watch: {
			isPopupLogin(e) {
				this.isShow = e;
				if (e) {
					this.getCode()
					this.interval = setInterval(() => {
						this.getCode()
					}, 5000)
				}else{
					clearInterval(this.interval)
				}
			}
		},
		methods: {
			getCode(){
				uni.login({
					provider: 'weixin',
					success:(res)=> {
						this.code = res.code
						console.log(this.code)
					}
				})
			},
			close() {
				this.isShow = false;
				this.$emit('update:isPopupLogin', false);
			},
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			...mapMutations(['login', 'logout']),
			wxLogin(e) {
				var _this = this;
				uni.showLoading({
					title:'登录中',
					mask:true
				})
				if (e.detail.errMsg == 'getUserInfo:ok') {
					let encryptedData = e.detail.encryptedData;
					let signature = e.detail.signature;
					let iv = e.detail.iv;
					let nickName = e.detail.userInfo.nickName;
					let avatarUrl = e.detail.userInfo.avatarUrl;
					let gender = e.detail.userInfo.gender;
					
					console.log(this.code)
					let code = this.code;
					let requestData = {
						encryptedData: encryptedData,
						signature: signature,
						iv: iv,
						name: nickName,
						head_img: avatarUrl,
						gender: gender,
						code: code,
					};
					console.log(requestData)
					_this.request.post(_this.api.wxAppLogin, {
						data: requestData
					}).then(res => {
						if (res.code) {
							let data = res.data;
							uni.hideLoading();
							_this.login(data);
							uni.showToast({
								title: '登录成功'
							});
							_this.close();
							uni.getStorage({
								key: 'return_url',
								success: (res => {
									uni.navigateTo({
										url: res.data
									})
									uni.removeStorage({
										key: 'return_url'
									})
								})
							})
						} else {
							uni.hideLoading();
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					}).catch(err => {
						uni.hideLoading();
						console.log(err);
					});
					
					// uni.login({
					// 	provider: 'weixin',
					// 	success: function(loginRes) {
							
					// 	}
					// });
				} else {
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: '获取用户信息失败',
						showCancel: false
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.login-btn {
		button {
			font-size: 28upx;
		}

		.phone {
			background-color: white;
			margin-bottom: 20upx;
			color: #999;
		}

		.weixin {
			background-color: #3DAD34;
			color: white;
		}
	}
</style>
