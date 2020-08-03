<template>
	<view>
		<view class="special-wrap">
			<view class="item" v-for="(item,index) in lists" :key="index" @click="jump(item.id)">
				<view>{{item.name}}</view>
				<image :src="item.icon" mode="aspectFill"></image>
			</view>
		</view>
		<view style="height: 100upx;"></view>
		<tab-bar :indexUrl="indexUrl"></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/shop/tabBar';
	export default{
		data(){
			return{
				indexUrl:'/pages/shop/index',
				lists:[]
			}
		},
		components:{
			tabBar
		},
		onLoad() {
			this.loadData();
		},
		methods:{
			async loadData(){
				uni.showLoading({
					title:'数据加载中'
				})
				await this.request.get(this.api.getToolShopSpecial,{
					data:{}
				}).then(res=>{
					if(res.code){
						this.lists = res.data;
					}
				}).catch(err=>{
					console.log(err);
				})
				uni.hideLoading();
			},
			jump(id){
				uni.navigateTo({
					url:`lists?work_id=${id}`
				})
			}
		},
		onShareAppMessage(res) {
			return {
				title: '全国建筑工程承包 找活 招工',
				path: `/pages/shop/speial`
			}
		}
	}
</script>

<style lang="scss">
	.special-wrap{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		background-color: #fff;
		text-align:center;
		.item{
			padding:30upx;
			width:50%;
			border-bottom:1px solid #dcdcdc;
			view{
				color: #666666;
				font-size:28upx;
				font-weight: bold;
			}
			image{
				margin-top:30upx;
				height: 200upx;
				width: 200upx;
			}
		}
		.item:nth-child(odd){
			border-right:1px solid #dcdcdc;
		}
	}
</style>
