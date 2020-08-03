<template>
	<view>
		<view class="list-wrap">
			<view class="item" v-for="(item,index) in lists" :key="index">
				<view class="title">{{item.title}}<text>{{item.status_text}}</text></view>
				<view class="info"><text class="time">{{item.create_time}}</text><text class="price">￥{{item.money}}</text></view>
			</view>
		</view>
		<view class="loadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import {
	    mapState,mapMutations
	} from 'vuex';
	export default{
		data(){
			return{
				refreshing: false,
				loadMoreText: '',
				lists: [],
				page: 1,
				noMoreData:false,
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		onLoad(){
			this.loadData();
		},
		onPullDownRefresh() {
			this.refreshing = true;
			this.loadData();
		},
		onReachBottom() {
			if(this.noMoreData){
				return;
			}
			this.loadData();
		},
		methods:{
			async loadData(){
				const data = {user_id:this.userInfo.uid,page:(this.refreshing ? 1 : this.page),limit:12};
				uni.showLoading({
					title:'数据加载中'
				})
				await this.request.post(this.api.getUserBeanRecord,{
					data:data
				}).then(res=>{
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
				}).catch(err=>{
					console.log(err);
				})
				uni.hideLoading();
			}
		}
	}
</script>

<style lang="scss">
	 .list-wrap{
		 background: #FFFFFF;
		 .item{
			 padding:20upx 30upx;
			 border-bottom:1px solid #f2f2f2;
			 .title{
				 margin-bottom: 10upx;
				 color:#333333;
				 text{
					 float: right;
					 color: #FF3333;
				 }
			 }
			 .info{
				 .price{
				 	color: #e93b3d;
					float: right;
					font-weight:500;
				 }
				 .time{
				 	color:#999999;
				 }
			 }
			 &:last-child{
				 border: none;
			 }
		 }
	 }
</style>
