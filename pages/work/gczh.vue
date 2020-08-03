<template>
	<view class="container">
		<search @searchValue="filterParam" :isClearSearchValue="isClearSearchValue"></search>
		<filtrate-top type="gczh" :isRequireTeam="isRequireTeam" :isRequireCate="false" :isClearChooseParam="isClearChooseParam" @filterParam="filterParam"></filtrate-top>
		<notice-roll :margin-top="170"></notice-roll>
		<view class="zg-list">
			<view class="list-item" v-for="(item,index) in lists" :key="index" @click="jump('/pages/work/details?work_id='+item.id)">
				<view class="t">{{item.title}}</view>
				<view class="m">{{item.region}}<text>|</text>{{item.publish_time}}</view>
				<view class="f">
					<image :src="item.user.head_img" v-if="item.user.head_img != ''"></image>
					<image src="/static/tx01.png" v-else></image>
					<view>{{item.contact}}<text>|</text><text class="status-text">{{item.status_text}}</text></view>
					<text class="bag" v-if="item.more.rests_status">{{item.more.rests_status}}</text>
				</view>
			</view>
		</view>
		<view class="loadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import search from '@/components/search';
	import filtrateTop from '@/components/filtrate-top';
	import noticeRoll from '@/components/notice-roll';
	export default{
		data(){
			return{
				refreshing: false,
				loadMoreText: '',
				lists: [],
				page: 1,
				noMoreData:false,
				isRequireTeam:false,
				fliterParam:'',
				isClearChooseParam:false,
				isClearSearchValue:false,
				keyword:''
			}
		},
		components:{
			search,
			filtrateTop,
			noticeRoll
		},
		onShow() {
			uni.getStorage({
				key:'leaveIsReload',
				success:(res=>{
					if(res.data){
						this.t();
					}else{
						uni.setStorage({
							key:'leaveIsReload',
							data:true,
						});
					}
				}),
				fail:(err=>{
					uni.setStorage({
						key:'leaveIsReload',
						data:true,
					});
					this.t();
				})
			})
		},
		onHide() {
			this.isClearChooseParam = false;
			this.isClearSearchValue = false;
			uni.getStorage({
				key:'leaveIsReload',
				success:(res=>{
					if(res.data){
						this.lists = [];
						this.noMoreData = false;
						this.loadMoreText = '';
					}
				})
			});
		},
		onPullDownRefresh() {
			this.refreshing = true;
			this.getData(this.fliterParam);
		},
		onReachBottom() {
			if(this.noMoreData){
				return;
			}
			this.getData(this.fliterParam,true);
		},
		methods:{
			t:function(){
				this.keyword = '';
				this.fliterParam = '';
				this.isClearChooseParam = true;
				this.isClearSearchValue = true;
			},
			async getData(e='',pull=false){
				const data = {page:(this.refreshing ? 1 : this.page)};
				uni.showLoading({
					title:'数据加载中'
				})
				if(e.keyword && e.keyword != undefined){
					data.keyword = e.keyword;
				}
				if(e.region_id && e.region_id != undefined){
					data.region_id = e.region_id;
				}
				if(e.cate_id && e.cate_id != undefined){
					data.cate_id = e.cate_id;
				}
				if(e.team_id && e.team_id != undefined){
					data.team = e.team_id;
				}
				if(pull == false){
					this.page = 1;
					data.page = this.page;
				}
				await this.request.get(this.api.getGczhList,{
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
					console.log('Error:',error);
				})
				uni.hideLoading();
			},
			jump:function(url){
				uni.setStorageSync('leaveIsReload',false);
				uni.navigateTo({
					url:url
				})
			},
			filterParam:function(e){
				this.lists = [];
				this.isClearChooseParam = false;
				if(e.keyword != undefined){
					this.keyword = e.keyword;
				}else if(this.keyword){
					e.keyword = this.keyword;
				}
				this.getData(e);
				this.fliterParam = e;
			},
		},
		onShareAppMessage(res) {
			return {
				title: '全国建筑工程承包 找活 招工',
				path:`/pages/work/gczh`
			}
		}
	}
</script>
<style lang="scss">

</style>
