<template>
	<view class="container">
		<search @searchValue="searchValue" searchWay="shop"></search>
		<view style="margin-top:100upx;"></view>
<!-- 		<view class="brand-wrap">
			<view class="title">品牌专区</view>
			<view class="brand-box" v-if="brandList.length >= 1">
				<view class="brand-item" v-for="(item,index) in brandList" :key="index" @click="jump('lists?brand_id='+item.id)">
					<image :src="item.icon"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
			<view class="no-data" v-else>{{brandTipsText}}</view>
		</view> -->
		<notice-roll></notice-roll>
		<view class="hot-wrap">
			<view class="title">热卖推荐</view>
			<view class="hot-box" v-if="hotList.length >= 1">
				<scroll-view scroll-x scroll-with-animation="true">
					<view class="scroll-wrapper">
						<view class="goods" v-for="(item,index) in hotList" :key="index" @click="jump('details?id='+item.id)">
							<image :src="item.thumbnail" mode="aspectFill"></image>
							<view class="name">{{item.title}}</view>
							<view class="info">
								<text class="price">￥{{item.price}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="no-data" v-else>{{tipsText}}</view>
		</view>
		<view class="special-wrap" v-for="(items,indexs) in specialList" :key="indexs">
			<view class="t">{{items.name}}<text @click="jump('lists?work_id='+items.id)">查看更多>></text></view>
			<view class="l" v-if="items.goods.length >= 1">
				<view class="goods-bag" v-for="(item,index) in items.goods" :key="index">
					<view class="goods" @click="jump('details?id='+item.id)">
						<image :src="item.thumbnail" mode="aspectFill"></image>
						<view class="name">{{item.title}}</view>
						<view class="info">
							<text class="price">￥{{item.price}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="no-data" v-else>无数据</view>
		</view>
		<view style="height: 100upx;"></view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import search from '@/components/search';
	import noticeRoll from '@/components/notice-roll';
	import tabBar from '@/components/shop/tabBar';
	export default {
		data() {
			return {
				tipsText:'数据加载中',
				brandTipsText:'数据加载中',
				brandList:[],
				hotList:[],
				specialList:[],
			};
		},
		components:{
			search,
			noticeRoll,
			tabBar
		},
		onPullDownRefresh() {
			this.loadData();
		},
		onLoad() {
			this.loadData();
		},
		methods:{
			async loadData(){
				uni.showLoading({
					title:'数据加载中'
				})
				await this.request.get(this.api.getToolShopBrand,{
					data:{},
				}).then(res=>{
					if(res.code){
						this.brandList = res.data;
					}else{
						this.brandTipsText = '无品牌';
					}
				}).catch(err=>{
					console.log(err);
				})
				await this.request.get(this.api.getToolShopHotGoods,{
					data:{}
				}).then(res=>{
					if(res.code){
						this.hotList = res.data;
					}else{
						this.tipsText = '无数据';
					}
				}).catch(err=>{
					console.log(err);
				})
				await this.request.get(this.api.getToolShopSpecialGoods,{
					data:{}
				}).then(res=>{
					this.specialList = res.data;
				}).catch(err=>{
					console.log(err);
				})
				uni.hideLoading();
			},
			searchValue(e){
				this.jump('lists?keyword='+e.keyword);
			},
			jump(url){
				uni.navigateTo({
					url:url
				})
			}
		},
		onShareAppMessage(res) {
			return {
				title: '全国建筑工程承包 找活 招工',
				path: `/pages/shop/index`
			}
		}
	}
</script>

<style lang="scss">
	.brand-wrap{
		background: #fff;
		.title{
			text-align: center;
			font-size: 32upx;
			padding:30upx;
		}
		.title::before{
			display: inline-block;
			content:'';
			width:26upx;
			height:32upx;
			margin-right:10upx;
			background-image: url('~@/static/brand-icon.png');
			background-repeat: no-repeat;
			background-size: 100%;
			vertical-align: middle;
		}
		.brand-box{
			display: flex;
			justify-content:center;
			align-items: center;
			flex-wrap:wrap;
			padding: 0upx 22upx 0upx 22upx;
			.brand-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #333333;
				margin-bottom:30upx;
				width:20%;
				image {
					width:100upx;
					height: 100upx;
					margin-bottom: 14upx;
					border-radius:20upx;
				}
			}
		}
	}
	.hot-wrap{
		background: #fff;
		.title{
			text-align: center;
			font-size: 32upx;
			padding:30upx;
		}
		.title::before{
			display: inline-block;
			content:'';
			width:26upx;
			height:32upx;
			margin-right:10upx;
			background-image: url('~@/static/hot-icon.png');
			background-repeat: no-repeat;
			background-size: 100%;
			vertical-align: middle;
		}
		.hot-box{
			padding:0 15upx 20upx;
			white-space:nowrap;
			.scroll-wrapper{
				display: flex;
				align-items:flex-start;
			}
			.goods{
				padding:0 10upx;
				border-radius:15upx;
				image{
					width:250upx;
					height:250upx;
				}
				.name{
				  overflow:hidden;
				  text-overflow:ellipsis;
				  white-space:nowrap;
				}
				.info{
					padding:10upx 0;
					.price{
						color:#e65339;
					}
				}
			}
		}
	}
	.special-wrap{
		background-color:#fff;
		margin-top:20upx;
		padding:20upx;
		.t{
			font-size:30upx;
			margin-bottom:30upx;
			text{
				font-size:24upx;
				color: #13aaf6;
				float: right;
			}
		}
		.l{
			display: flex;
			flex-wrap: wrap;
			align-items:flex-start;
			.goods-bag{
				padding:0 10upx;
				width: 50%;
				height: 472upx;
				margin-bottom:20upx;
				.goods{
					box-shadow: 0upx 0upx 2upx #aeadad;
					height: 100%;
					border-radius:10upx;
					image{
						width: 100%;
						height:350upx;
					}
					.name{
					  display: -webkit-box;
					  -webkit-box-orient: vertical;
					  -webkit-line-clamp:2;
					  overflow: hidden;
					}
					.info{
						padding:10upx 0;
						.price{
							color:#e65339;
						}
					}
				}
			}
		}
	}
</style>