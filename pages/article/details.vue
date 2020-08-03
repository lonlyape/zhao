<template>
	<view class="box">
		<!-- #ifdef H5 -->
		<view class="header">
			<navigator open-type="navigateBack" class="item"></navigator>
			<view class="item">文章详情</view>
			<navigator url="/pages/index/index" class="item" open-type="switchTab">首页</navigator>
		</view>
		<!-- #endif -->
		<view class="main">
			<view class="title">{{data.title}}</view>
			<view class="content">
				<rich-text :nodes="data.content"></rich-text>
			</view>
			<view class="prve-next">
				<navigator :url="'/pages/article/details?article_id='+data.prev.id" v-if="data.prev">上一篇：{{data.prev.title}}</navigator><text v-else>上一篇：没了</text>
				<navigator :url="'/pages/article/details?article_id='+data.next.id" v-if="data.next">下一篇：{{data.next.title}}</navigator><text v-else>下一篇：没了</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				data:[]
			}
		},
		onLoad(option) {
			this.loadData(option);
		},
		methods:{
			async loadData(option){
				uni.showLoading({
					title:'数据加载中',
				})
				await this.request.get(this.api.getArticleDetails,{
					data:{article_id:option.article_id}
				}).then(res => {
					if(res.code) this.data = res.data;
				}).catch(error =>{
					console.log('Error:',error);
				})
				uni.hideLoading();
			}
		},
		onShareAppMessage(res) {
			return {
				title: '全国建筑工程承包 找活 招工',
				path: `/pages/article/details?article_id=${this.data.id}`
			}
		}
	}
</script>

<style lang="scss">
	.box{
		/* #ifdef H5 */
		.header{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: white;
			display: flex;
			flex-direction:row;
			justify-content: space-between;
			align-items: center;
			z-index: 99;
			height:90upx;
			padding:0 20upx;
			box-shadow: 0 1px 6px #ccc;
			.item{
				color: #14aaf7;
			}
			.item:nth-child(1){
				height:36upx;
				width:26upx;
				background-image:url('~@/static/top_icon01.png');
				background-size:100%;
				background-repeat: no-repeat;
				background-position:center;
				opacity:0.7;
			}
			.item:nth-child(2){
				font-size:32upx;
			}
			.item:nth-child(3){
				font-size:28upx;
			}
			.item:nth-child(3)::before{
				content: '';
				display:inline-flex;
				vertical-align:sub;
				margin-right:8upx;
				height:36upx;
				width:30upx;
				background-image:url('~@/static/top_icon02.png');
				background-size:100%;
				background-repeat: no-repeat;
				background-position:center;
			}
		}
		/* #endif */
		.main{
			/* #ifdef H5 */
			margin-top:110upx;
			/* #endif */
			background-color: white;
			.title{
				font-size:28upx;
				font-weight: bold;
				color: #333333;
				padding:16upx;
				border-bottom: 1px dashed #dcdcdc;
			}
			.content{
				padding:12upx;
				color: #333333;
				line-height:1.5;
				font-size:26upx;
			}
			.prve-next{
				padding:16upx;
				line-height: 2;
				color: #333333;
				margin-bottom: 20upx;
			}
		}
	}
</style>
