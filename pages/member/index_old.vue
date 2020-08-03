<template>
	<view class="container">
		<view class="user-section">
			<view class="up">
				<image :src="userInfo.head_img || '../../static/tx01.png'"></image>
				<view class="text">
					<block v-if="hasLogin">
						<view>{{userInfo.name}}<view class="modify-info" @tap="jump('modify-info')">修改资料</view></view>
						<view>会员编号：<text>{{userInfo.id}}</text></view>
					</block>
					<block v-else>
						<view style="font-size:28upx;margin:0 10upx;color:#999999;font-weight:normal;" @click="showLogin">
							<view>未登录</view>
							<view>点击此处快速登录</view>
						</view>
					</block>
				</view>
			</view>
			<view class="dow">
				<view class="item">
					<view class="main-color fz-14">
						{{userInfo.integral||0}}
					</view>
					<view>豆币</view>
				</view>
				<view class="item" @tap="showPublishMenu">
					<view>我要发布</view>
					<view class="main-color">承包、招工、找活、交易</view>
				</view>
			</view>
			<view class="dow" style="padding-top: 20upx;">
				<view class="item" style="color:#ec062c;font-weight: bold;">
					<block v-if="userInfo.signin.today_is_signin">今日已签到</block>
					<block v-else><text @click="signin">签到</text></block>
				</view>
				<view class="item" v-show="!userInfo.signin.today_is_signin">
					签到可获得 <text style="color:#ec062c;font-weight: bold;">{{userInfo.signin.today_signin_bean}}</text> 豆币
				</view> 
			</view>
		</view>
		<view class="menu-section">
			<view class="item" @tap="jump('publish-chengbao-list')">
				<image src="../../static/uc-card.png"></image>
				<view>已发布工程承包</view>
			</view>
			<view class="item" @tap="jump('publish-zhaogong-list')">
				<image src="../../static/uc-publish.png"></image>
				<view>已发布招工信息</view>
			</view>
			<view class="item" @tap="jump('publish-zhaohuo-list')">
				<image src="../../static/uc-card.png"></image>
				<view>已发布工人找活</view>
			</view>
			<view class="item" @tap="jump('publish-gczh-list')">
				<image src="../../static/uc-ershou.png"></image>
				<view>已发布找厂工信息</view>
			</view>
			<view class="item" @tap="jump('publish-gczp-list')">
				<image src="../../static/uc-ershou.png"></image>
				<view>已发布工厂直聘</view>
			</view>
			<view class="item" @tap="jump('publish-ershou-list')">
				<image src="../../static/uc-ershou.png"></image>
				<view>已发布二手交易</view>
			</view>
			<view class="item" @tap="jump('bean-recharge')">
				<image src="../../static/uc-recode.png"></image>
				<view>豆币充值</view>
			</view>
			<view class="item" @tap="jump('bean-record')">
				<image src="../../static/uc-source.png"></image>
				<view>豆币记录</view>
			</view>
			<view class="item" @tap="jump('certification')">
				<image src="../../static/uc-yaoqing.png"></image>
				<view>实名认证</view>
			</view>
			<view class="item" @click="togglePopupForm('open')">
				<image src="../../static/uc-jianyi.png"></image>
				<view>给我们建议/意见</view>
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
						<textarea name="content" placeholder="请输入您的建议/意见" style="width:100%;" @input="bindContent" :value="content"/>
					</view>
					<view class="cu-modal__ft">
						<view class="cu-modal__btn cu-modal__btn_default" @click="togglePopupForm('close')">取消</view>
						<button class="cu-modal__btn cu-modal__btn_default" form-type="submit" style="background: #FFFFFF;">确定</button>
					</view>
				</view>
			</form>
		</view>	
		<view class="menu-list">
			<view class="item" @click="clear">清除本地缓存<text>{{cacheSize}}KB</text></view>
		</view>
		<tab-bar :alive="3"></tab-bar>
		<popup-login :isPopupLogin.sync="isPopupLogin"></popup-login>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import popupLogin from '@/components/popup-login';
	import tabBar from '@/components/tabbar.vue'
	var validate = require("../../common/extend/validate.js");
	export default{
		data(){
			return{
				cacheSize:0,
				isShowJingyi:false,
				content:'',
				isPopupLogin:false,
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo','isBindAccount']),
		},
		components:{
			popupLogin,
			tabBar
		},
		watch:{
			isPopupLogin:function(e){
				if(!e){
					if(this.hasLogin){
						this.checkBindAccount();
					}
				}
			}
		},
		onShow() {
			let info = uni.getStorageInfoSync();
			this.cacheSize = info.currentSize;
			this.checkBindAccount();
			if(this.isBindAccount){
				this.request.post(this.api.checkWxAppLogin,{
					data:{session_key:this.userInfo.session_key,open_id:this.userInfo.open_id}
				}).then(res=>{
					if(res.code){
						this.login(res.data);
					}else{
						if(typeof res.msg !== 'undefined'){
							uni.showModal({
								title:'提示',
								content:res.msg,
								showCancel:false,
								success:(e=>{
									if(e.confirm){
										this.logout();
									}
								})
							})
						}
					}
				})
			}
		},
		methods:{
			...mapMutations(['login','logout','checkBindAccount']),
			showLogin:function(){
				if(!this.hasLogin){
					this.isPopupLogin = true;
					return;
				}
			},
			showPublishMenu:function(){
				if(!this.hasLogin){
					this.isPopupLogin = true;
					return;
				}
				uni.showActionSheet({
					itemList: ['发布工程承包','发布招工信息','发布找活信息','发布找厂工信息','发布工厂直聘','发布二手交易'],
					success: (e) => {
						let urlArray = ['publish-chengbao','publish-zhaogong','publish-zhaohuo','publish-gczh','publish-gczp','publish-ershou'];
						uni.navigateTo({
							url:urlArray[e.tapIndex]
						})
					}
				});
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
						this.login(this.userInfo);
					}
					uni.showToast({
						title:res.msg
					})
				}).catch(err=>{
					uni.hideLoading();
					console.log(err);
				})
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
		},
		onShareAppMessage(res) {
			return {
				title: '全国建筑工程承包 找活 招工',
				path: `/pages/member/index`
			}
		}
	}
</script>

<style lang="scss">
	.user-section{
		background-color: white;
		 margin:0 20upx 10upx;
		 border-radius:15upx;
		 padding:20upx;
		.up{
			display:flex;
			border-bottom:1px dashed #e0e0e0;
			padding-bottom: 10upx;
			image{
				width: 120upx;
				height:120upx;
			}
			.text{
				width:82%;
				padding:12upx 0upx 26upx 20upx;
				font-size: 28upx;
				font-weight: bold;
				line-height:1.7;
				.modify-info{
					 float: right;
					 border:1px solid #dcdcdc;
					 padding:5upx 10upx;
					 border-radius: 10upx;
					 font-size:24upx;
					 font-weight: normal;
				}
				text{
					color:rgb(20, 170, 247);
				}
			}
		}
		.dow{
			display: flex;
			justify-content:space-around;
			text-align:center;
			margin-top: 20upx;
		}
	}
	.menu-section{
		border-radius:15upx;
		padding:10upx 20upx 0 20upx;
		display: flex;
		justify-content: flex-start;
		flex-wrap:wrap;
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: white;
			width:33.333333%;
			padding-top:20upx;
			padding-bottom:20upx;
			border-right: 1px dashed #d3d3d3;
			border-bottom: 1px dashed #d3d3d3;
			border-radius: 15upx;
			image{
				margin-bottom: 14upx;
				width:120upx;
				height: 120upx;
			}
		}
		.item:nth-child(3n){
			border-right: none;
		}
	}
	.menu-list{
		// position: relative;
		// bottom: 0;
		// right: 0;
		// left: 0;
		.item{
			padding:30upx;
			color: #333333;
			background: #FFFFFF;
			text{
				float: right;
				color: #999999;
			}
		}
	}
</style>
