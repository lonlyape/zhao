<template>
	<view class="container">
		<list-top defaultActive="cailiao"></list-top>
		<view class="list-wrap">
			<view class="list-item" v-for="(item,index) in lists" :key="index">
				<view class="t">
					<text class="title" @click="jump('/pages/work/details?work_id='+item.id)">{{item.title}}</text>
					<text class="status">{{item.status_text}}</text>
				</view>
				<view class="b">
					<text>{{item.create_time}}</text>
					<view class="btn-group">
						<block v-if="item.status==2">
							<block v-if="item.is_top">
								<text class="btn" @click="top(item)">置顶中</text>
							</block>
							<block v-else>
								<text class="btn" v-if="top_config.status >= 1" @click="top(item)">我要置顶</text>
							</block>
							<text class="btn" @click="setting(item)">{{settingName}}</text>
						</block>
						<block v-else-if="item.status != 3">
						<!-- <block v-else-if="false"> -->
							<text class="btn" @click="jump('modify-cailiao?work_id='+item.id)">修改</text>
						</block>
						<text class="btn danger" @click="deletes(item,index)">删除</text>
					</view>
				</view>
			</view>
		</view>
		<view class="loadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import {  
	    mapState
	} from 'vuex';
	import listTop from "@/components/member/list-top";
	export default{
		data(){
			return{
				refreshing: false,
				loadMoreText: '',
				lists: [],
				page: 1,
				noMoreData:false,
				settingName:'设为已找到',
				top_config:[]
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		components:{
			listTop
		},
		onLoad() {
			this.getData();
		},
		onPullDownRefresh() {
			this.refreshing = true;
			this.getData();
		},
		onReachBottom() {
			if(this.noMoreData){
				return;
			}
			this.getData();
		},
		methods:{
			async getData(){
				uni.showLoading({
					title:'数据加载中'
				})
				const data = {user_id:this.userInfo.uid,type:10,page:(this.refreshing ? 1 : this.page)};
				if(this.refreshing || this.page == 1){
					await this.request.post(this.api.getTopConfig,{
						data:{isApi:true}
					}).then(res => {
						this.top_config = res.data;
					})
				}
				await this.request.post(this.api.getUserWrokList,{
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
			setting(item){
				const _this = this;
				const data = {work_id:item.id,user_id:this.userInfo.uid,status:3};
				uni.showModal({
					title:'提示',
					content:'确定要'+this.settingName+'吗？',
					success:(e=>{
						if(e.confirm){
							this.request.post(this.api.updateWorkStatus,{
								data:data
							}).then(res=>{
								if(res.code){
									dispose();
									this.func.msg(res.msg);
								}else{
									this.func.msg(res.msg);
								}
							}).catch(err=>{
								console.log(err);
							})
						}
					})
				})
				function dispose(){
					_this.lists.forEach(ea=>{
						if(ea.id == item.id){
							_this.$set(item,'status',3);
							_this.$set(item,'status_text','已找到');
						}
					})
				}
			},
			top(item){
				let _this = this;
				let id = item.id;
				let type = item.type;
				let title = item.title;
				let is_top = item.is_top;
				let top_time = item.top_time;
				let bean = this.top_config.deduct_bean;
				if(is_top >= 1){
					uni.showModal({
						title:title+' 已在置顶中',
						content:'置顶时间：'+top_time,
						confirmText:'再次置顶',
						success:(e=>{
							if(e.confirm){
								t('需要 '+bean+' 豆币方可再次置顶，确定再次置顶吗?','no');
							}
						})
					})
				}else{
					t('需要 '+bean+' 豆币方可置顶，确定置顶吗?','yes');
				}
				function t(title,first){
					uni.showModal({
						title:'提示',
						content:title,
						success:(e=>{
							if(e.confirm){
								_this.request.post(_this.api.isTopWork,{
									data:{data_id:id,type:type,tab:'work',first:first,user_id:_this.userInfo.uid}
								}).then(res=>{
									if(res.code){
										_this.refreshing = true;
										_this.getData();
										uni.showToast({
											title:res.msg
										})
									}else{
										uni.showModal({
											title:'提示',
											content:res.msg,
											showCancel:false
										})
									}
								})
							}
						})
					})
				}
			},
			deletes(item,index){
				let _this = this;
				let id = item.id;
				uni.showModal({
					title:'提示',
					content:'确定要删除此信息吗?',
					success:(e=>{
						if(e.confirm){
							this.request.post(this.api.deleteWorkInfo,{
								data:{work_id:id,user_id:this.userInfo.uid}
							}).then(res=>{
								if(res.code){
									this.lists.splice(index,1);
									uni.showToast({
										title:res.msg
									})
								}else{
									uni.showModal({
										title:'提示',
										content:res.msg,
										showCancel:false
									})
								}
							})
						}
					})
				})
			},
			jump:function(url,f=true){
				if(f){
					uni.navigateTo({
						url:url
					})
				}else{
					uni.redirectTo({
						url:url
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.list-wrap{
		margin-top: 400upx;
		.list-item{
			margin-top:20upx;
			background-color:white;
			padding:20upx;
			.t{
				font-size: 28upx;
				padding-bottom:20upx;
				border-bottom: 1px solid #dcdcdc;
				position: relative;
				.title{
					display:block;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					width: 80%;
					color:#01AAED;
				}
				.status{
					color: #ec062c;
					position: absolute;
					right:0;
					top:0;
				}
			}
			.b{
				margin-top: 20upx;
				position: relative;
				display: flex;
				justify-content: space-between;
				.btn-group{
					.btn{
						color: #0099ff;
						border:solid 1px #0099ff;
						padding:7upx 10upx;
						margin-left: 10upx;
					}
					.danger{
						color:#ec062c ;
						border: solid 1px #ec062c;
					}
				}
			}
		}
	}
</style>
