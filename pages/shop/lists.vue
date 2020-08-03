<template>
	<view>
		<search @searchValue="searchValue" :inputValue="inputValue" :isClearSearchValue="isClearSearchValue" searchWay="shop"></search>
		<view class="navbar">
			<view class="nav-item" :class="{current: tabIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<!-- <view class="nav-item" :class="{current: tabIndex === 1}" @click="tabClick(1)">
				销量优先
			</view> -->
			<view class="nav-item" :class="{current: tabIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: orderPrice === 'asc' && tabIndex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: orderPrice === 'desc' && tabIndex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>
		</view>
		<view class="list-wrapper">
			<view class="list-item" v-for="(item,index) in lists" :key="index" @click="jump('details?id='+item.id)">
				<view class="info"><image :src="item.thumbnail" mode="aspectFill"></image></view>
				<view class="info">
					<view class="title">{{item.title}}</view>
					<view class="ord">
						<view>品牌：{{item.brand_name}}</view>
						<view>型号：{{item.model}}</view>
						<view class="price">￥{{item.price}}</view>
					</view>
				</view>
			</view>
			<view class="loadMore" style="padding-top:10upx;">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
	import search from '@/components/search';
	export default{
		data(){
			return {
				refreshing: false,
				loadMoreText: '',
				lists: [],
				page: 1,
				noMoreData:false,
				fliterParam:{},
				inputValue:'',
				tabIndex:0,
				orderPrice: 'asc', //asc 价格从低到高 desc 价格从高到低
			}
		},
		components:{
			search
		},
		onLoad(option) {
			this.loadData(option);
			if(option.keyword != '' && option.keyword != undefined){
				this.inputValue = option.keyword;
			}
			this.fliterParam = option;
		},
		onPullDownRefresh() {
			this.refreshing = true;
			this.loadData(this.fliterParam);
		},
		onReachBottom() {
			if(this.noMoreData){
				return;
			}
			this.loadData(this.fliterParam,true);
		},
		methods:{
			async loadData(e='',pull=false){
				const data = {page:(this.refreshing ? 1 : this.page)};
				uni.showLoading({
					title:'数据加载中'
				})
				if(e.keyword && e.keyword != undefined){
					data.keyword = e.keyword;
				}
				if(e.brand_id && e.brand_id != undefined){
					data.brand_id = e.brand_id;
				}
				if(e.cate_id && e.cate_id != undefined){
					data.cate_id = e.cate_id;
				}
				if(e.work_id && e.work_id != undefined){
					data.work_id = e.work_id;
				}
				if(e.orderPrice && e.orderPrice != undefined){
					data.orderPrice = e.orderPrice;
				}
				if(pull == false){
					this.page = 1;
					data.page = this.page;
				}
				await this.request.get(this.api.getToolShopGoodsList,{
					data:data
				}).then(res => {
					if(res.code){
						if (this.refreshing) {
							this.refreshing = false;
							uni.stopPullDownRefresh()
							this.lists = res.data;
							this.page = 2;
							this.noMoreData = false;
						} else {
							this.lists = this.lists.concat(res.data);
							this.page += 1;
						}
						if(this.lists.length == res.count){
							this.noMoreData = true;
							this.loadMoreText = '没有更多了';
						}
					}else{
						if(!this.lists.length){
							this.loadMoreText = '无数据';
						}
					}
				}).catch(error =>{
					console.log(err);
				})
				uni.hideLoading();
			},
			tabClick(index){
				if(this.tabIndex === index && index !== 2){
					return;
				}
				this.tabIndex = index;
				if(index === 2){
					this.orderPrice = this.orderPrice === "asc" ? "desc" : "asc";
				}else{
					this.orderPrice = '';
				}
				this.fliterParam.orderPrice = this.orderPrice;
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.lists = [];
				this.loadData(this.fliterParam);
			},
			searchValue(e){
				this.lists = [];
				this.loadMoreText = '';
				if(e.keyword != '' && e.keyword != undefined){
					this.fliterParam.keyword = e.keyword;
				}
				this.loadData(this.fliterParam);
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
				path: `/pages/shop/lists`
			}
		}
	}
</script>

<style lang="scss">
	.navbar{
		position: fixed;
		left: 0;
		top:100upx;
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #303133;
			position: relative;
			&.current{
				color: #0099FF;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid #0099FF;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size:28upx;
				color: #888;
				&.active{
					color: #0099FF;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
	}
	.list-wrapper{
		margin-top:180upx;
		.list-item{
			display: flex;
			border-bottom:solid 2upx #F0F0F0;
			padding:10upx;
			background:#FFFFFF;
			.info{
				image{
					width:240upx;
					height:240upx;
				}
				.title{
					font-size:28upx;
					height:80upx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.ord{
					color:#999999;
					margin-top:20upx;
					.price{
						margin-top:20upx;
						color: #a71e32;
					}
				}
			}
			.info:nth-child(even){
				margin-left:20upx;
			}
		}
		.list-item:nth-last-of-type(2){
			border-bottom:none !important;
		}
	}
</style>
