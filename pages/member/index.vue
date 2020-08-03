<template>
	<view>
		<view class="top_view">
			<image class="img" src="../../static/dai_2/user_banner.jpg" mode="widthFix"></image>
			<view class="msg_box">
				<view class="flex_box">
					<view class="left">
						<image class="user_img" :src="userInfo.head_img || '../../static/tx01.png'" mode=""></image>
					</view>
					<view class="right">
						<view class="name">
							{{userInfo.name||'未登录'}}
						</view>
						<view class="edit" v-if="hasLogin" @tap="jump('modify-info')">
							<image class="edit_icon" src="../../static/dai_2/edit.jpg" mode=""></image>
							修改资料
						</view>
						<view class="edit" v-else @click="showLogin">
							快速登录
						</view>
					</view>
				</view>
			</view>
			<view class="bottom_float">
				<view class="bottom_left" @tap="showPublishMenu">
					<image class="top_icon" src="../../static/dai_2/top_icon_1.png" mode=""></image>我要发布
				</view>
				<view class="line"></view>
				<view class="bottom_right" v-if="userInfo.signin.today_is_signin">
					<image class="top_icon" src="../../static/dai_2/top_icon_2.png" mode=""></image>今日已签到
				</view>
				<view class="bottom_right" v-else @click="signin">
					<image class="top_icon" src="../../static/dai_2/top_icon_2.png" mode=""></image>签到有奖
				</view>
			</view>
		</view>
		<view class="bottom_next">
			<view class="sc_view">
				<view class="num">
					账户余额：<text class="text_num">{{userInfo.integral||0}}</text>
				</view>
				<view class="button_view">
					<text class="text" @tap="jump('bean-recharge')">充值</text>
				</view>
			</view>
		</view>
		<view class="cell_g" v-for="(item,key) in cellGround" v-bind:key="key">
			<view class="cell_item" v-for="one in item" v-bind:key="one.title" @tap="cellClick(one)">
				<view class="img_view">
					<image class="image" :src="one.icon" mode=""></image>
				</view>
				<view class="cell_box">
					<cell :label="one.title" :cellStyle="cellStyle" arrow></cell>
				</view>
			</view>
		</view>
		<form @submit="popupFormSubmit" v-show="isShowJingyi">
			<view class="cu-mask" @click="togglePopupForm('close')"></view>
			<view class="cu-modal">
				<view class="cu-modal__hd">
					<text class="cu-modal__title">给我们建议/意见</text>
				</view>
				<view class="cu-modal__bd">
					<input type="text" class="hidden" name="type" value="1">
					<input type="text" class="hidden" name="name" :value="userInfo.name">
					<input type="text" class="hidden" name="phone" :value="userInfo.account">
					<input type="text" class="hidden" name="user_id" :value="userInfo.uid">
					<textarea name="content" placeholder="请输入您的建议/意见" style="width:100%;" @input="bindContent" :value="content" />
					</view>
					<view class="cu-modal__ft">
						<view class="cu-modal__btn cu-modal__btn_default" @click="togglePopupForm('close')">取消</view>
						<button class="cu-modal__btn cu-modal__btn_default" form-type="submit" style="background: #FFFFFF;">确定</button>
					</view>
				</view>
			</form>
		<tab-bar :alive="3"></tab-bar>
		<popup-login :isPopupLogin.sync="isPopupLogin"></popup-login>
		<view class="mask" v-if="showDao">
			<view class="xiandao">
				<image src="../../static/dai_2/user_right.png" class="img" mode=""></image>
				<view class="title">今日已签到</view>
				<view class="dis">连续签到7天可获得<text class="text">3</text>豆币</view>
				<view class="close" v-on:click="setShowDao">关闭</view>
			</view>
		</view>
	</view>
</template>
<script>
	import cell from '@/components/common/cell.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import popupLogin from '@/components/popup-login';
	import tabBar from '@/components/tabbar.vue'
	var validate = require("../../common/extend/validate.js");
	export default {
		components: {
			cell,
			tabBar,
			popupLogin,
		},
		data: () => {
			return {
				cellGround: [],
				cellStyle: {
					arrow: 'color:#dedede;'
				},
				cacheSize: 0,
				isShowJingyi: false,
				content: '',
				isPopupLogin: false,
				showDao:false,
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo','isBindAccount']),
		},
		watch: {
			isPopupLogin: function(e) {
				if (!e) {
					if (this.hasLogin) {
						this.checkBindAccount();
					}
				}
			}
		},
		created() {
			this.setCells()
		},
		onShow() {
			let info = uni.getStorageInfoSync();
			this.cacheSize = info.currentSize;
			this.checkBindAccount();
			if (this.isBindAccount) {
				this.request.post(this.api.checkWxAppLogin, {
					data: {
						session_key: this.userInfo.session_key,
						open_id: this.userInfo.open_id
					}
				}).then(res => {
					if (res.code) {
						this.login(res.data);
					} else {
						if (typeof res.msg !== 'undefined') {
							uni.showModal({
								title: '提示',
								content: res.msg,
								showCancel: false,
								success: (e => {
									if (e.confirm) {
										this.logout();
									}
								})
							})
						}
					}
				})
			}
		},
		methods: {
			...mapMutations(['login', 'logout', 'checkBindAccount']),
			showLogin:function(){
				if(!this.hasLogin){
					this.isPopupLogin = true;
					return;
				}
			},
			setShowDao(){
				this.showDao=!this.showDao
			},
			showPublishMenu:function(){
				if(!this.hasLogin){
					this.isPopupLogin = true;
					return;
				}
				uni.showActionSheet({
					itemList: ['发布工程承包','发布招工信息','发布找活信息','发布找厂工信息','发布工厂直聘','发布材料'],
					success: (e) => {
						let urlArray = ['publish-chengbao','publish-zhaogong','publish-zhaohuo','publish-gczh','publish-gczp','publish-cailiao'];
						uni.navigateTo({
							url:urlArray[e.tapIndex]
						})
					},fail: (e) => {
						console.log('fail:',e)
					},complete: (e) => {
						console.log('complete')
					}
				});
			},
			cellClick(one){
				if(one.path){
					this.jump(one.path)
				}else if(one.fun){
					one.fun()
				}
			},
			jump:function(url){
				if(!this.hasLogin){
					this.isPopupLogin = true;
					return;
				}
				uni.navigateTo({
					url:url
				})
			},
			signin:function(){
				if(!this.hasLogin){
					this.isPopupLogin = true;
					return;
				}
				uni.showLoading({
					title:'签到中',
					mask:true
				})
				this.request.post(this.api.signin,{
					data:{user_id:this.userInfo.uid}
				}).then(res=>{
					uni.hideLoading();
					if(res.code){
						this.userInfo.integral = res.data.userbean != null ? res.data.userbean : this.userInfo.integral;
						this.userInfo.signin.today_is_signin =  true;
						this.setShowDao()
						this.login(this.userInfo);
					}
					// uni.showToast({
					// 	title:res.msg
					// })
				}).catch(err=>{
					uni.hideLoading();
					console.log(err);
				})
			},
			clear(){
				const _this = this;
				uni.showLoading({
					title:'清除缓存中',
					mask:true
				})
				uni.clearStorage();
				setTimeout(()=>{
					uni.showToast({
						title:'清除成功',
						success:(res=>{
							_this.logout();
						})
					})
				},1000);
			},
			togglePopupForm:function(status){
				if(!this.hasLogin){
					this.isPopupLogin = true;
					return;
				}
				if(status == 'open'){
					this.isShowJingyi = true;
				}else{
					this.content = '';
					this.isShowJingyi = false;
				}
			},
			bindContent:function(e){
				this.content = e.detail.value;
			},
			popupFormSubmit:function(e){
				let formData = e.detail.value;
				let rule = [
				    {name:"content", checkType : "notnull", checkRule:"",  errorMsg:"请输入您的建议/意见"},
				];
				let result = validate.check(formData,rule);
				if(!result){
					this.func.msg(validate.error);
					return;
				}
				uni.showLoading({
					title:'提交中',
					mask:true
				})
				this.request.post(this.api.onlineLeaveWord,{
					data:formData
				}).then(res=>{
					uni.hideLoading();
					if(res.code){
						uni.showToast({
							title:'提交成功'
						})
					}else{
						uni.showModal({
							title:"提示",
							content:res.msg,
							showCancel:false
						})
					}
					this.togglePopupForm('close');
				}).catch(error=>{
					uni.hideLoading();
					console.log(error);
				})
			},
			setCells() {
				const _this = this;
				let list = [
					[{
						title: '我发布的信息',
						path: 'publish-chengbao-list',
						icon: '../../static/dai_2/user_icon_1.jpg',
					}],
					[{
						title: '实名认证',
						path: 'certification',
						icon: '../../static/dai_2/user_icon_2.jpg',
					}, {
						title: '豆币记录',
						path: 'bean-record',
						icon: '../../static/dai_2/user_icon_3.jpg',
					}, {
						title: '意见反馈',
						fun: ()=>{
							_this.togglePopupForm('open')
						},
						icon: '../../static/dai_2/user_icon_4.jpg',
					}],
					[{
						title: '清除本地缓存',
						fun: ()=>{
							_this.clear()
						},
						icon: '../../static/dai_2/user_icon_5.jpg',
					}]
				]
				this.cellGround = list;
			},
		}
	}
</script>
<style lang="scss" scoped="user_page">
	.top_view {
		position: relative;

		.img {
			width: 100%;
		}

		.msg_box {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			padding: 60rpx;

			.flex_box {
				display: flex;
				width: 100%;
				align-items: center;

				.left {
					width: 160rpx;
					height: 160rpx;
					margin-right: 30rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 6rpx solid #3890f3;

					.user_img {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					color: #fff;

					.name {
						font-size: 36rpx;
						font-weight: bold;
					}

					.edit {
						margin-top: 20rpx;
						padding: 10rpx 30rpx;
						font-size: 22rpx;
						background: #419ef9;
						border-radius: 30rpx;

						.edit_icon {
							display: inline-block;
							width: 30rpx;
							height: 30rpx;
							vertical-align: middle;
							margin-right: 10rpx;
						}
					}
				}
			}
		}

		.bottom_float {
			position: absolute;
			left: 30rpx;
			right: 30rpx;
			bottom: -62rpx;
			height: 126rpx;
			border-radius: 20rpx;
			background: linear-gradient(to right, #67bfff, #10a0ff);
			color: #fff;
			display: flex;

			.bottom_right,
			.bottom_left {
				font-size: 30rpx;
				text-align: center;
				line-height: 126rpx;
				flex: 1;
				.top_icon{
					display: inline-block;
					width:40rpx;
					height:40rpx;
					vertical-align: middle;
					margin-right: 20rpx;
				}
			}

			.line {
				width: 1px;
				position: absolute;
				top: 30rpx;
				left: 50%;
				bottom: 30rpx;
				background-color: #fff;
				opacity: 0.6;
			}
		}
	}

	.bottom_next {
		background-color: #fff;
		padding: 100rpx 30rpx 40rpx;
		font-size: 30rpx;

		.sc_view {
			display: flex;

			.num {
				flex: 1;
				color: #9a9a9a;

				.text_num {
					color: #015eea;
					font-weight: bold;
				}
			}

			.button_view {
				.text {
					font-size: 28rpx;
					display: block;
					padding: 10rpx 20rpx;
					background-color: #ffefe4;
					color: #f57f31;
					border-radius: 30rpx;
				}
			}
		}
	}

	.cell_g {
		margin-top: 20rpx;
		background-color: #fff;

		.cell_item {
			display: flex;
			align-items: center;
			padding-left: 30rpx;

			.img_view {
				width: 50rpx;
				height: 50rpx;
				display: inline-block;

				.image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.cell_box {
				flex: 1;
			}
		}
	}
	.mask{
		position: fixed;
		top:0;
		left:0;
		right: 0;
		bottom:0;
		background-color: rgba(0,0,0,.6);
		.xiandao{
			background-color: #FFFFFF;
			border-radius: 14rpx;
			text-align: center;
			position: absolute;
			top:50%;
			left:20%;
			right:20%;
			margin-top: -200rpx;
			.img{
				position: absolute;
				width: 130rpx;
				height: 130rpx;
				top:-65rpx;
				left:50%;
				margin-left:-65rpx;
			}
			.title{
				font-size: 40rpx;
				color:#14aaf7;
				padding: 100rpx 0 30rpx;
			}
			.dis{
				letter-spacing: 1px;
				.text{
					color:#ffc600;
				}
			}
			.close{
				background:#14aaf7;
				color:#fff;
				width: 33%;
				margin:50rpx auto;
				padding: 14rpx;
				border-radius: 30rpx;
			}
		}
	}
</style>
