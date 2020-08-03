<template>
	<view class="container">
		<header-top :positionRegion="positionRegionName" @getPositionRegion="getPositionRegion"></header-top>
		<!-- 幻灯片 -->
		<view class="carousel-section">
			<view class="background"></view>
			<swiper class="carousel" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor">
				<swiper-item class="carousel-item" v-for="(item,index) in slideList" :key="index">
					<image :src="item.path"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" @click="jumpToTabBar('/pages/work/chengbao',true)">
				<image src="/static/ind_icon06.png"></image>
				<text>综合承包</text>
			</view>
			<view class="cate-item" @click="jumpToTabBar('/pages/work/zhaogong',true)">
				<image src="/static/ind_icon01.png"></image>
				<text>招工信息</text>
			</view>
			<view class="cate-item" @click="jumpToTabBar('/pages/work/zhaohuo',true)">
				<image src="/static/ind_icon02.png"></image>
				<text>工人找活</text>
			</view>
			<view class="cate-item" @click="jump('/pages/ershou/index',true)">
				<image src="/static/ind_icon07.png"></image>
				<text>二手交易</text>
			</view>
			<view class="cate-item" @click="jump('/pages/work/gczh')">
				<image src="/static/ind_icon05.png"></image>
				<text>找厂工</text>
			</view>
			<view class="cate-item" @click="jump('/pages/work/gczp')">
				<image src="/static/ind_icon03.png"></image>
				<text>工厂直聘</text>
			</view>
			<view class="cate-item" @click="jump('/pages/shop/index')">
				<image src="/static/ind_icon08.png"></image>
				<text>供货信息</text>
			</view>
			<view class="cate-item" @click="jumpToPublish('/pages/member/publish-chengbao')">
				<image src="/static/ind_icon04.png"></image>
				<text>发布工程承包</text>
			</view>
		</view>
		<!-- <view class="ind-cx">
			<view class="cx-item">
				<image src="/static/ind_icon09.png"></image>
				<text>实名认证</text>
			</view>
			<view class="cx-item">
				<image src="/static/ind_icon10.png"></image>
				<text>实名查询</text>
			</view>
			<view class="cx-item">
				<image src="/static/ind_icon11.png"></image>
				<text>关于我们</text>
			</view>
		</view> -->
		<!-- 公告滚动 -->
		<notice-roll></notice-roll>
		<view class="work-title"><text class="text1">综合承包</text><text class="text2" @click="jumpToTabBar('/pages/work/chengbao',true)">查看更多 >></text></view>
		<view class="zg-list" v-if="chengBaoList != ''">
			<view class="list-item" v-for="(item,index) in chengBaoList" :key="index" @click="jump('/pages/work/details?work_id='+item.id)">
				<view class="t">{{item.title}}</view>
				<view class="m">{{item.region.province}}<text v-if="item.region.city != ''">|</text>{{item.region.city}}<text>|</text>{{item.publish_time}}</view>
				<view class="f">
					<image :src="item.user.head_img" v-if="item.user.head_img != ''"></image>
					<image src="/static/tx01.png" v-else></image>
					<view>{{item.contact}}<text>|</text><text class="status-text">{{item.status_text}}</text></view>
					<text class="bag" v-if="item.more.bidding_type">{{item.more.bidding_type}}</text>
				</view>
			</view>
		</view>
		<view class="no-data" v-else>{{loadDataText}}</view>
		<view class="work-title"><text class="text1">招工信息</text><text class="text2" @click="jumpToTabBar('/pages/work/zhaogong',true)">查看更多 >></text></view>
		<view class="zg-list" v-if="zhaoGongList != ''">
			<view class="list-item" v-for="(item,index) in zhaoGongList" :key="index" @click="jump('/pages/work/details?work_id='+item.id)">
				<view class="t">{{item.title}}</view>
				<view class="m">{{item.region.province}}<text v-if="item.region.city != ''">|</text>{{item.region.city}}<text>|</text>{{item.publish_time}}</view>
				<view class="f">
					<image :src="item.user.head_img" v-if="item.user.head_img != ''"></image>
					<image src="/static/tx01.png" v-else></image>
					<view>{{item.contact}}<text>|</text><text class="status-text">{{item.status_text}}</text></view>
				</view>
			</view>
		</view>
		<view class="no-data" v-else>{{loadDataText}}</view>
		<view class="work-title"><text class="text1">工人找活</text><text class="text2" @click="jumpToTabBar('/pages/work/zhaohuo',true)">查看更多 >></text></view>
		<view class="zh-list" v-if="zhaoHuoList != ''">
			<view class="list-item" v-for="(item,index) in zhaoHuoList" :key="index" @click="jump('/pages/work/details?work_id='+item.id)">
				<view class="t">{{item.title}}</view>
				<view class="m">
					<image :src="item.user.head_img" v-if="item.user.head_img != ''"></image>
					<image src="/static/tx01.png" v-else></image>
					<view class="zh_m">
						<view>姓名：{{item.contact}}</view>
						<view>业务：{{item.work_cate}}</view>
					</view>
				</view>
				<view class="f">{{item.region}}<text>|</text></text>{{item.publish_time}}<text>|</text><text class="status-text">{{item.status_text}}</text></view>
			</view>
		</view>
		<view class="no-data" v-else>{{loadDataText}}</view>
		<view class="work-title"><text class="text1">找厂工</text><text class="text2" @click="jump('/pages/work/gczh',true)">查看更多 >></text></view>
		<view class="zg-list" v-if="gczhList != ''">
			<view class="list-item" v-for="(item,index) in gczhList" :key="index" @click="jump('/pages/work/details?work_id='+item.id)">
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
		<view class="no-data" v-else>{{loadDataText}}</view>
		<view class="work-title"><text class="text1">工厂直聘</text><text class="text2" @click="jump('/pages/work/gczp',true)">查看更多 >></text></view>
		<view class="zg-list" v-if="gczpList != ''">
			<view class="list-item" v-for="(item,index) in gczpList" :key="index" @click="jump('/pages/work/details?work_id='+item.id)">
				<view class="t">{{item.title}}</view>
				<view style="margin-bottom:20rpx;color:#999999;">
					<text style="color:red;">{{item.more.xinzi_text}}</text><text>{{item.more.xinzileixing_text}}</text>
					<text style="margin-left: 30rpx;">招聘人数：</text><text>{{item.team_text}}</text>
					<text style="margin-left: 30rpx;font-weight: bold;color:red;" v-if="item.more.gongzuoleixing_text">{{item.more.gongzuoleixing_text}}</text>
				</view>
				<view class="m">{{item.region.province}}<text v-if="item.region.city != ''">|</text>{{item.region.city}}<text>|</text>{{item.publish_time}}</view>
				<view class="f">
					<image :src="item.user.head_img" v-if="item.user.head_img != ''"></image>
					<image src="/static/tx01.png" v-else></image>
					<view>{{item.contact}}<text>|</text><text class="status-text">{{item.status_text}}</text></view>
					<text class="bag" v-if="item.more.bidding_type">{{item.more.bidding_type}}</text>
				</view>
			</view>
		</view>
		<view class="no-data" v-else>{{loadDataText}}</view>
		<view class="service_tel">
			客服电话：<text class="phone" @click="callPhone">{{serviceTel}}</text><text class="call" @click="callPhone">拨打</text>
		</view>
		<popup-login :isPopupLogin.sync="isPopupLogin"></popup-login>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import headerTop from '@/components/header-top';
	import noticeRoll from '@/components/notice-roll';
	import popupLogin from '@/components/popup-login';
	export default {
		data() {
			return {
				positionRegion:'',
				positionRegionName:'全国',
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				circular: true,
				indicatorColor:'rgba(0,0,0,0.1)',
				indicatorActiveColor:'white',
				slideList:[],
				zhaoGongList:[],
				zhaoHuoList:[],
				chengBaoList:[],
				gczhList:[],
				gczpList:[],
				serviceTel:'',
				loadDataText:'数据加载中',
				isPopupLogin:false
			};
		},
		components:{
			headerTop,
			noticeRoll,
			popupLogin
		},
		computed:{
			...mapState(['hasLogin','isBindAccount'])
		},
		onShow() {
			const region = uni.getStorageSync('positionRegion');
			this.positionRegion = region;
			this.positionRegionName = region.name;
			this.loadData(region);
		},
		onPullDownRefresh() {
			this.loadData(this.positionRegion,true);
		},
		methods: {
			...mapMutations(['checkBindAccount']),
			async loadData(region,refresh=false) {
				let workData = {limit:5};
				uni.showLoading({
					title: '数据加载中'
				});
				if(region.id != undefined && region.id){
					workData.region_id = region.id;
				}
				// 获取幻灯片
				await this.request.get(this.api.getSlideList,{
					data:{cate_id:2}
				}).then(res => {
					if(res.code) this.slideList = res.data;
				}).catch(error =>{
					console.log('getSlideListError:',error);
				})
				// 获取综合承包
				await this.request.get(this.api.getChengBaoList,{
					data:workData
				}).then(res => {
					if(res.code){
						this.chengBaoList = res.data;
					}else{
						this.chengBaoList = [];
						this.loadDataText = '无数据';
					}
				}).catch(error =>{
					console.log('getChengBaoListError:',error);
				})
				// 获取招工信息
				await this.request.get(this.api.getZhaoGongList,{
					data:workData
				}).then(res => {
					if(res.code){
						this.zhaoGongList = res.data;
					}else{
						this.zhaoGongList = [];
						this.loadDataText = '无数据';
					}
				}).catch(error =>{
					console.log('getZhaoGongListError:',error);
				})
				// 获取工人找活
				await this.request.get(this.api.getZhaoHuoList,{
					data:workData
				}).then(res => {
					if(res.code){
						this.zhaoHuoList = res.data;
					}else{
						this.zhaoHuoList = [];
						this.loadDataText = '无数据';
					}
				}).catch(error =>{
					console.log('getZhaoHuoListError:',error);
				})
				// 获取工厂找活
				await this.request.get(this.api.getGczhList,{
					data:workData
				}).then(res => {
					if(res.code){
						this.gczhList = res.data;
					}else{
						this.gczhList = [];
						this.loadDataText = '无数据';
					}
				}).catch(error =>{
					console.log('getZhaoHuoListError:',error);
				})
				// 获取工厂直聘
				await this.request.get(this.api.getGczpList,{
					data:workData
				}).then(res => {
					if(res.code){
						this.gczpList = res.data;
					}else{
						this.gczpList = [];
						this.loadDataText = '无数据';
					}
				}).catch(error =>{
					console.log('getGczpListError:',error);
				})
				// 获取客服电话
				await this.request.get(this.api.getServiceTel,{
					data:{},
				}).then(res => {
					this.serviceTel = res.data;
				}).catch(error=>{
					console.log('getServiceTelError:',error);
				})
				if(refresh){
					uni.stopPullDownRefresh();
				}
				uni.hideLoading();
			},
			getPositionRegion:function(e){
				this.loadData(e);
			},
			//跳转到选项卡
			jumpToTabBar:function(url,leaveIsReload=false){
				if(leaveIsReload){
					uni.setStorageSync('leaveIsReload',true);
				}
				uni.switchTab({
					url:url
				})
			},
			// 跳转到发布
			jumpToPublish:function(url){
				if(!this.hasLogin){
					this.isPopupLogin = true;
					return;
				}
				this.checkBindAccount();
				if(this.isBindAccount){
					uni.navigateTo({
						url:url
					})
				}
			},
			jump:function(url,leaveIsReload=false){
				if(leaveIsReload){
					uni.setStorageSync('leaveIsReload',true);
				}
				uni.navigateTo({
					url:url
				})
			},
			callPhone:function(){
				uni.makePhoneCall({
					phoneNumber:this.serviceTel
				})
			}
		},
		onShareAppMessage(res) {
			return {
				title: '全国建筑工程承包 找活 招工',
				path: '/pages/index/index'
			}
		}
	}
</script>
<style lang="scss">
	// 幻灯片
	.carousel-section{
		.carousel {
			width: 100%;
			height: 400upx;
			.carousel-item {
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
				// padding: 0 20upx;
			}
		}
		.background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	
	// 分类
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx 0upx 22upx; 
		background: #fff;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #333333;
			width:25%;
			margin-bottom:30upx;
		}
		image {
			width: 90upx;
			height: 90upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
		}
	}
	// 实名认证部分
	.ind-cx{
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding:25upx;
		background: white;
		margin-top:15upx;
		.cx-item{
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		image{
			width:60upx;
			height:60upx;
			margin-right: 20upx;
		}
	}

	.work-title{
		padding:20upx 30upx;
		background-color: #14aaf7;
		color: white;
		font-size:$uni-font-size-sm + 4;
		line-height: 35upx;
		.text1::before{
			content:'|';
			font-size:$uni-font-size-sm;
			background-color: white;
			margin-right:10upx;
		}
		.text2{
			font-size: $uni-font-size-sm;
			float: right;
		}
	}
	
	.service_tel{
		text-align: center;
		padding:20upx 0 40upx;
		.phone{
			color:#13aaf6;
		}
		.call{
			margin-left: 10upx;
			color: #FFFFFF;
			background-color: #13aaf6;
			padding: 6upx 10upx;
			border-radius: 10upx;
		}
	}
	.service_tel::before{
		display: inline-block;
		content: '';
		width: 15px;
		height: 19px;
		margin-right: 4upx;
		background-image: url('~@/static/call-tel.png');
		background-repeat: no-repeat;
		background-size: 100%;
		vertical-align: middle;
	}
</style>
