<template>
	<view class="gd" :style="{'margin-top':marginTop+'rpx'}">
		<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" :vertical="vertical">
			<swiper-item v-for="(item,index) in noticeList" :key="item.id" v-if="index % 2 == 0">
				<view @click="jump('/pages/article/details?article_id='+item.id)"><text>{{noticeList[index].title}}</text></view>
				<view v-if="index < noticeList.length-1" @click="jump('/pages/article/details?article_id='+noticeList[index+1].id)"><text>{{noticeList[index+1].title}}</text></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				autoplay: true,
				interval: 4000,
				duration: 2000,
				circular: true,
				vertical:true,
				noticeList:[]
			};
		},
		name:'notice-roll',
		props:{
			marginTop:{
				type:Number,
				default:0
			}
		},
		created() {
			this.loadData();
		},
		methods:{
			async loadData(){
				await this.request.get(this.api.getArticleList,{
					data:{limit:6}
				}).then(res => {
					if(res.code) this.noticeList = res.data;
				}).catch(error =>{
					console.log(error);
				})
			},
			jump:function(url){
				uni.setStorageSync('leaveIsReload',false);
				uni.navigateTo({
					url:url
				})
			},
		}
	}
</script>

<style lang="scss">
	// 公告滚动
	.gd{
		padding: 20upx;
		.swiper{
			height:80upx;
			swiper-item{
				height:100%;
				view{
					width:100%;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					margin-top:5upx;
					color: #c60606;
					text::before{
						content: '·';
						margin-right:10upx;
					}
				}
			}
		}
	}
</style>
