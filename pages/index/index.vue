<template>
	<view class="page_index">
		<view class="banner" :style="bannerStyle">
			<image class="banner_img" src="../../static/dai_2/benner.jpg" mode="aspectFill"></image>
			<view class="search_view">
				<uni-search-bar placeholder="输入地区，工程类型、关键词查找" class="search-bar" style="background-color: rgba(255,255,255,0);"
				 :radius="100" @confirm="search" clearButton="none" cancelButton="none"></uni-search-bar>
			</view>
		</view>
		<view class="tab_box">
			<view class="tab_item" v-bind:class="{'alive':alive==key}" v-for="(one,key) in dataList" v-bind:key="one.tabName"
			 v-on:click="selectTab(key)">
				<span>{{one.tabName}}</span>
				<view class="tab_left" v-if="alive==key-1"></view>
				<view class="tab_right" v-if="alive==key+1"></view>
			</view>
		</view>
		<filtrate-top v-if="alive<4" :type="fileOption.type" @filterParam="filterParam" :isRequireTeam="fileOption.isRequireTeam" :isClearChooseParam="fileOption.isClearChooseParam"></filtrate-top>
		<view :class="{'alive_4_view':alive==4}">
			<template v-for="one in dataList[alive].list">
				<contract v-if="alive==0" v-bind:key="one.id" v-bind:option="one"></contract>
				<construction v-if="alive==1" v-bind:key="one.id" v-bind:option="one"></construction>
				<construction v-if="alive==2" v-bind:key="one.id" v-bind:option="one"></construction>
				<worker v-if="alive==3" v-bind:key="one.id" v-bind:option="one"></worker>
				<materials v-if="alive==4" v-bind:key="one.id" v-bind:option="one"></materials>
			</template>
		</view>
		<view class="buttom_text_load_more">
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>
<script>
	import contract from '../../components/index/contract.vue'
	import construction from '../../components/index/construction.vue'
	import worker from '../../components/index/worker.vue'
	import materials from '../../components/index/materials.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import tabBar from '@/components/tabbar.vue'
	import filtrateTop from '@/components/filtrate-top-new.vue';
	export default {
		components: {
			worker,
			contract,
			materials,
			uniLoadMore,
			construction,
			filtrateTop,
			tabBar,
		},
		data() {
			return {
				alive: 0,
				bannerStyle: '',
				dataList: [],
				refreshing: false,
				params: {},
				fileOption:{
					type:'chengbao',
					isRequireTeam:true,
					isClearChooseParam:false,
				},
			}
		},
		computed: {
			loadStatus: function() {
				let aliveObj = this.dataList[this.alive]
				if (aliveObj) {
					return aliveObj.status
				} else {
					return 'more'
				}
			},
		},
		watch: {
			alive: function(val) {
				let dataObj = this.dataList[val]
				if (dataObj.list.length == 0 && dataObj.status === 'more') {
					this.getData()
				}
				this.setFileOption()
			}
		},
		onLoad: function(option) {
			
			this.setStyle()
			this.initDataList()
			this.getData()
		},
		onPullDownRefresh() {
			this.refreshing = true;
			this.dataList.forEach(one => {
				one.list = []
				one.page = 0
				one.status = 'more'
			})
			this.getData();
		},
		onReachBottom() {
			if (this.dataList[this.alive].status != 'nomore') {
				this.getData();
			}
		},
		methods: {
			setFileOption(){
				switch (this.alive) {
					case 0:
						this.fileOption={
							type:'chengbao',
							isRequireTeam:true,
							isClearChooseParam:false,
						}
						break
					case 1:
						this.fileOption={
							type:'zhaogong',
							isRequireTeam:false,
							isClearChooseParam:true,
						}
						break
					case 2:
						this.fileOption={
							type:'gczp',
							isRequireTeam:true,
							isClearChooseParam:false,
						}
						break
					case 3:
						this.fileOption={
							type:'zhaohuo',
							isRequireTeam:true,
							isClearChooseParam:true,
						}
						break
					case 4:
						this.fileOption={
							type:'',
							isRequireTeam:false,
							isClearChooseParam:false,
						}
						break
				}
			},
			selectTab(key) {
				this.alive = key
			},
			search(e) {
				console.log(e)
				this.params = {
					...this.params,
					keyword: e.value,
				}
				this.initQuery()
				this.getData()

			},
			filterParam(e){
				let params={}
				if(this.params.keyword){
					params.keyword=this.params.keyword
				}
				for(let i in e){
					if(e[i]){
						params[i]=e[i]
					}
				}
				this.params=params
				this.initQuery()
				this.getData()
			},
			setStyle() {
				uni.getSystemInfo({
					success: (e) => {
						let style = 'width:100%;'
						let height = e.windowWidth / 2.2
						style += 'height:' + height + 'px'
						this.bannerStyle = style
					}
				})
			},
			initDataList() {
				let list = [{
					tabName: '综合承包',
					list: [],
					page: 1,
					pageSize: 10,
					status: 'more',
					url: this.api.getWorkList + '?type=3'
				}, {
					tabName: '工地招工',
					list: [],
					page: 1,
					pageSize: 10,
					status: 'more',
					url: this.api.getWorkList + '?type=1'
				}, {
					tabName: '工厂招聘',
					list: [],
					page: 1,
					pageSize: 10,
					status: 'more',
					url: this.api.getWorkList + '?type=5'
				}, {
					tabName: '找工人',
					list: [],
					page: 1,
					pageSize: 10,
					status: 'more',
					url: this.api.getWorkList + '?type=2'
				}, {
					tabName: '材料采购',
					list: [],
					page: 1,
					pageSize: 10,
					status: 'more',
					url: this.api.getWorkList + '?type=10'
				}]
				this.dataList = list
			},
			initQuery(){
				this.dataList.forEach(one=>{
					one.page=1
					one.status='more'
				})
			},
			async getData() {
				let alive = this.alive
				let dataObj = this.dataList[alive]
				let params = {
					page: dataObj.page++,
					...this.params
				}
				//请求前动作
				dataObj.status = 'loading'

				await this.request.get(dataObj.url, {
					data: params
				}).then(res => {
					if (res.code) {
						if(res.data){
							res.data.forEach(one=>{
								one.phone=one.phone.substring(0,3)+'*****'+one.phone.substring(7)
							})
						}
						if (params.page == 1) {
							if (res.data) {
								dataObj.list = res.data
							}
							if (this.refreshing) {
								uni.stopPullDownRefresh()
								this.refreshing = false
							}
						} else {
							if (res.data) {
								dataObj.list = dataObj.list.concat(res.data)
							}
						}
						if (dataObj.list.length == res.count) {
							dataObj.status = 'nomore'
						} else {
							dataObj.status = 'more'
						}
					} else {
						if(res.msg==='无数据'){
							if(params.page==1){
								dataObj.list=[]
								dataObj.status = 'nomore'
							}else{
								dataObj.status = 'nomore'
							}
						}
						dataObj.status = 'nomore'
					}
				})
			},
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #edf2f8;
	}

	.page_index {
		.banner {
			width: 100%;
			height: 400rpx;
			position: relative;
			z-index: 100;

			.banner_img {
				width: 100%;
				height: 100%;
				position: absolute;
			}

			.search_view {
				position: absolute;
				width: 90%;
				left: 5%;
				top: 230rpx;
				overflow: hidden;
				height: 36px;
				border-radius: 18px;

				.search-bar {
					position: absolute;
					top: -16rpx;
					left: -16rpx;
					right: -16rpx;
				}
			}
		}

		.tab_box {
			display: flex;
			background: #5c7087;
			color: #fff;
			position: relative;
			z-index: 100;

			.tab_item {
				flex: 1;
				text-align: center;
				font-weight: bold;
				letter-spacing: .6rpx;
				position: relative;
				height: 92rpx;
				line-height: 92rpx;
				overflow: hidden;
				.tab_left{
					width:0;
					height:0;
					position: absolute;
					border:14rpx solid transparent;
					border-left-color:#fff;
					border-top-width: 92rpx;
					top:0;
					left: 0;
				}
				.tab_right{
					width:0;
					height:0;
					position: absolute;
					border:14rpx solid transparent;
					border-right-color:#fff;
					border-top-width: 92rpx;
					top:0;
					right: 0;
				}

				&.alive {
					background-color: #fff;
					color: #0669ed;
				}
			}
		}

		.alive_4_view {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
		}

		.buttom_text_load_more {
			margin-top: 20rpx;
		}
	}
</style>
