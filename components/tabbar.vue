<template>
	<view class="tab_box_bottom">			
		<view class="tab_view">
			<view class="tab_item" v-for="(one,key) in tabList" v-bind:key="one.text" v-on:click="toPage(one)">
				<image class="tab_img" :src="one.selectedIconPath" mode="" v-if="alive==key"></image>
				<image class="tab_img" :src="one.iconPath" mode="" v-else></image>
				<view>{{one.text}}</view>
			</view>
		</view>
		<view class="push_mask" v-if="showFlexBox||showListBox">			
			<view class="push_icon_box">
				<view class="flex_box" v-if="showFlexBox">
					<view class="flex_item" v-for="one in pushList" v-bind:key="one.title" v-on:click="jump(one)">
						<image class="icon_img" :src="one.icon" mode=""></image>
						<view class="title">{{one.title}}</view>
						<view class="title sub_title">{{one.subTitle}}</view>
					</view>
				</view>
				<view class="list_box" v-if="showListBox">
					<view class="list_item" v-for="one in listList" v-bind:key="one.title" v-on:click="jump(one)">
						{{one.title}}
					</view>
				</view>
				<view class="cancel" v-on:click="cancelPush">
					取消
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			alive:{
				type:[Number,String],
				default:0
			}
		},
		data() {
			return {
				tabList:[],
				pushList:[],
				listList:[],
				showFlexBox:false,
				showListBox:false,
			};
		},
		created(){
			this.initTab()
			this.initPushList()
			this.initListList()
		},
		methods:{
			jump(one){
				if(one.path){
					uni.navigateTo({
						url:one.path
					})
				}
			},
			toPage(e){
				if(e.pagePath){
					uni.reLaunch({
						url:e.pagePath
					})
				}else{
					if(e.text=='发布招工'){
						this.showFlexBox=true
					}else{
						this.showListBox=true
					}
				}
			},
			cancelPush(){
				this.showFlexBox=false
				this.showListBox=false
			},
			initListList(){
				let list=[{
					title:'建筑工人发布找活',
					path:'/pages/member/publish-zhaohuo'
				},{
					title:'工厂发布找活',
					path:'/pages/member/publish-gczh'
				}]
				this.listList=list
			},
			initPushList(){
				let list=[{
					icon:'/static/dai_2/push_icon_0.jpg',
					title:'工程承包',
					subTitle:'招聘工程队',
					path:'/pages/member/publish-chengbao'
				},{
					icon:'/static/dai_2/push_icon_1.jpg',
					title:'工队招聘',
					subTitle:'工队找工人',
					path:'/pages/member/publish-zhaogong'
				},{
					icon:'/static/dai_2/push_icon_2.jpg',
					title:'工厂招聘',
					subTitle:'工厂找工人',
					path:'/pages/member/publish-gczp'
				}]
				this.pushList=list
			},
			initTab(){
				let list=[{
					"text":'找活',
					"pagePath":"/pages/index/index",
					"iconPath":"../static/dai_2/fine.png",
					"selectedIconPath":"../static/dai_2/fine_alive.png"
				},{
					"text":'发布招工',
					"iconPath":"../static/dai_2/push.png",
					"selectedIconPath":"../static/dai_2/push_fill.png"
				},{
					"text":'发布找活',
					"iconPath":"../static/dai_2/msg.png",
					"selectedIconPath":"../static/dai_2/msg_fill.png"
				},{
					"text":'个人中心',
					"pagePath":"/pages/member/index",
					"iconPath":"../static/dai_2/me.png",
					"selectedIconPath":"../static/dai_2/me_fill.png"
				}]
				this.tabList=list
			}
		}
	}
</script>

<style lang="scss" scoped="tab_box-com">
	.tab_box_bottom{
		height: 120rpx;
		margin-top:100rpx;
		.tab_view{
			background-color: #fff;
			position: fixed;
			bottom:0;
			left:0;
			right:0;
			height: 120rpx;
			display: flex;
			padding:4rpx 0;
			z-index: 3000;
			box-shadow: 0 0 4px 0 #dfdfdf;
			.tab_item{
				flex:1;
				text-align: center;
				color:#565656;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.tab_img{
					width: 48rpx;
					height: 48rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
	.push_mask{		
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.6);
		z-index: 3100;
		.push_icon_box{
			position: absolute;
			bottom:40rpx;
			left:40rpx;
			right:40rpx;
			z-index: 3200;
			background-color: #fff;
			border-radius: 12rpx;
			.flex_box{
				display: flex;
				.flex_item{
					flex: 1;
					padding: 50rpx 0;
					text-align: center;
					.icon_img{
						display: inline-block;
						width: 100rpx;
						height: 100rpx;
						text-align: center;
						align-items: center;
					}
					.title{
						margin-top:36rpx;
					}
					.sub_title{
						margin-top: 18rpx;
						font-size: 24rpx;
						color:#8d98a4;
					}
				}
			}
			.list_box{
				.list_item{
					padding:30rpx;
					text-align: center;
					font-size:28rpx;
					&+.list-item{
						border-top: 1rpx solid $uni-border-color;
					}
				}
			}
			.cancel{
				padding:30rpx;
				border-top: 1rpx solid $uni-border-color;
				text-align: center;
				letter-spacing: 1px;
			}
		}
	}
</style>
