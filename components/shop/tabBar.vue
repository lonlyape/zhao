<template>
	<view class="cus-tabbar">
		<view class="cus-tabbar__item" @click="jump(indexUrl)">
			<view class="cus-tabbar__bd">
				<view class="cus-tabbar__icon">
					<image src="/static/b_icon01.png" mode=""></image>
				</view>
				<view class="cus-tabbar__label">首页</view>
			</view>
		</view>
		<view class="cus-tabbar__item" @click="jump('/pages/shop/classify')">
			<view class="cus-tabbar__bd">
				<view class="cus-tabbar__icon">
					<image src="/static/b_icon02.png" mode=""></image>
				</view>
				<view class="cus-tabbar__label">分类</view>
			</view>
		</view>
		<view class="cus-tabbar__item" @click="jump('/pages/shop/special')">
			<view class="cus-tabbar__bd">
				<view class="cus-tabbar__icon">
					<image src="/static/b_icon03.png" mode=""></image>
				</view>
				<view class="cus-tabbar__label">工种专场</view>
			</view>
		</view>
		<view class="cus-tabbar__item" @click="jump('/pages/member/index')">
			<view class="cus-tabbar__bd">
				<view class="cus-tabbar__icon">
					<image src="/static/b_icon04.png" mode=""></image>
				</view>
				<view class="cus-tabbar__label">会员中心</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		name:'tab-bar',
		props:{
			indexUrl:{
				type:String,
				default:'/pages/index/index'
			}
		},
		watch:{
			indexUrl(val){
				console.log(val);
			}
		},
		methods:{
			jump(url){
				uni.reLaunch({
					url:url,
				})
			}
		}
	}
</script>

<style lang="scss">
	.cus-tabbar{
		background-color:rgb(20, 170, 247);
		display: flex;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 998;
		.cus-tabbar__item{
			display: flex;
			justify-content: center;
			align-items: center;
			flex:1;
			.cus-tabbar__bd{
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				height: 100upx;
				flex-direction: column;
				text-align:center;
				.cus-tabbar__icon{
					position: relative;
					display: inline-block;
					margin-top: 10upx;
					width: 54upx;
					height: 54upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.cus-tabbar__label{
					 position: relative;
					 text-align: center;
					 font-size: 20upx;
					 line-height: 1.8;
					 color: #fff;
				}
			}
		}
	}
</style>
