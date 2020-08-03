<template>
	<view>
		<view class="header">
			<view class="logo">
				<image src="/static/logo.png"></image>
			</view>
			<view class="area" @click="showArea">
				<text>{{showRegion}}</text>
			</view>
			<!-- <view class="search">
				<input type="text" placeholder="输入关键字搜索">
				<image src="/static/icon_ser.png"></image>
			</view> -->
			<view class="op-btn" v-if="!hasLogin">
				<view @click="isLogin()">
					<view><image src="../static/ind_icon11.png" mode="aspectFit"></image></view>
					<text>我要登录</text>
				</view>
				<!-- <view>
					<view><image src="../static/ind_icon11.png" mode="aspectFit"></image></view>
					<text>我要注册</text>
				</view> -->
			</view>
		</view>
		<area-top :visible="visible" :positionRegion="showRegion" @close="closeArea" @click="clickArea"></area-top>
		<view style="padding-top: 100upx;"></view>
		<popup-login :isPopupLogin.sync="isPopupLogin"></popup-login>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import areaTop from './area-top';
	import popupLogin from './popup-login';
	export default {
		data(){
			return {
				visible:false,
				showRegion:'全国',
				isPopupLogin:false
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		components:{
			areaTop,
			popupLogin
		},
		name:'header-top',
		props:{
			positionRegion:{
				type:String,
				default:'全国'
			}
		},
		watch:{
			positionRegion(val){
				this.showRegion = val;
			}
		},
		methods:{
			showArea(){
				this.visible = true;
			},
			closeArea() {
				this.visible = false;
			},
			clickArea(e){
				this.showRegion = e.name;
				this.$emit('getPositionRegion',e);
			},
			isLogin(){
				this.isPopupLogin = true;
			}
		}
	}
</script>

<style lang="scss">
	.header{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		min-height: 100upx;
		padding: 15upx 20upx;
		background-color: white;
		box-shadow: 0 1px 6px #ccc;
		z-index:999;
		view{
			float: left;
		}
		.logo{
			height:70upx;
			width:200upx;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.area{
			margin:20upx 0upx 0 40upx;
			text{
				display: inline-block;
				width:120upx;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
				
			}
			text::after{
				content: '';
				display: inline-block;
				width:20upx;
				height:26upx;
				background-image: url('~@/static/top_icon03.png');
				background-size: 100%;
				background-repeat: no-repeat;
				margin-left:5upx;
				vertical-align: bottom;
			}
		}
		.search{
			position: relative;
			border: 1px solid #dcdcdc;
			float: right;
			margin-top: 10upx;
			width:315upx;
			input{
				float: left;
				padding-left:10upx;
			}
			image{
				position: absolute;
				top:7upx;
				right:10upx;
				width:40upx;
				height: 40upx;
			}
		}
	}
	.op-btn{
		display: flex;
		justify-content: space-around;
		float: unset !important;
		text-align: center;
		view{
			float: unset !important;
			image{
				width:40upx;
				height: 40upx;
			}
			text{
				color: #14aaf7;
			}
		}
	}
</style>
