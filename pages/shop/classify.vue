<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="(item,index) in itemParent" :key="index" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside">
			<block v-if="itemChild.length >= 1">
				<view v-for="(item1,index1) in itemChild" :key="index1" class="s-list">
					<text class="s-item">{{item1.name}}</text>
					<view class="t-list">
						<block v-if="item1.child.length >= 1">
							<view class="t-item" v-for="(item2,index2) in item1.child" :key="index2" @click="jump(item2.id)">
								<image :src="item2.icon" mode="aspectFill"></image>
								<text>{{item2.name}}</text>
							</view>
						</block>
						<block v-else>
							<view class="no-data">暂无分类</view>
						</block>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="no-data">暂无分类</view>
			</block>
		</scroll-view>
		<tab-bar :indexUrl="indexUrl"></tab-bar>
	</view>
</template>

<script>
	import tabBar from '@/components/shop/tabBar';
	export default {
		data() {
			return {
				indexUrl:'/pages/shop/index',
				currentId: 65,
				itemParent:[],
				itemChild:[]
			}
		},
		components:{
			tabBar
		},
		onLoad(){
			this.loadData();
		},
		methods: {
			async loadData(){
				const _this = this;
				uni.showLoading({
					title:'数据加载中'
				})
				await this.request.get(this.api.getToolShopCate,{
					data:{}
				}).then(res=>{
					if(res.code){ 
						this.itemParent = res.data;
						initChild();
					}
				}).catch(err=>{
					console.log(err);
				})
				function initChild(){
					_this.itemParent.forEach(item=>{
						if(_this.currentId == item.id){
							_this.itemChild = item.child;
						}
					})
				}
				uni.hideLoading();
			},
			//一级分类点击
			tabtap(item){
				this.itemChild = item.child;
				this.currentId = item.id;
			},
			jump(id){
				uni.navigateTo({
					url: `/pages/shop/lists?cate_id=${id}`
				})
			}
		},
		onShareAppMessage(res) {
			return {
				title: '全国建筑工程承包 找活 招工',
				path: `/pages/shop/classify`
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		background-color: #fff;
		margin-bottom:100upx;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: #606266;
		position: relative;
		&.active{
			color: #0099FF;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: #0099FF;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
		margin-bottom:100upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: #303133;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>
