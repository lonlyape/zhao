<template>
	<view class="box">
		<!-- #ifdef H5 -->
		<view class="header">
			<navigator open-type="navigateBack" class="item"></navigator>
			<view class="item">信息详情</view>
			<navigator url="/pages/index/index" class="item" open-type="switchTab">首页</navigator>
		</view>
		<!-- #endif -->
		<view class="main">
			<view class="title">
				{{datas.title}}
				<view style="color:#828282;font-size:24upx;font-weight: normal;" v-if="datas.type == 5">
					<text style="color:red;font-weight: bold;">{{datas.more.xinzi_text}}</text><text> {{datas.more.xinzileixing_text}}</text>
					<text style="color: red;font-weight: bold;margin-left: 40upx">{{datas.more.gongzuoleixing_text}}</text>
					<view class="t">
						<text>学历要求：{{datas.more.xueliyaoqiu}}</text>
						<text>工作经验：{{datas.more.gongzuonianxian}}</text>
						<text>招聘人数：{{datas.team_text}}</text>
					</view>
				</view>
			</view>
			<view class="item-list">
				<view class="item">
					<view>联系人</view>
					<view>{{datas.contact}}</view>
				</view>
				<view class="item">
					<view v-if="datas.type == 1">招工区域</view>
					<view v-else-if="datas.type == 2">可去区域</view>
					<view v-else-if="datas.type == 5">工作地址</view>
					<view v-else>地区</view>
					<view>{{datas.region}}</view>
				</view>
				<view class="item" v-if="datas.more.cenggongzuodanwei">
					<view>曾工作单位</view>
					<view>{{datas.more.cenggongzuodanwei}}</view>
				</view>
				<view class="item" v-if="datas.more.zhiweifuli_text">
					<view>职位福利</view>
					<view>{{datas.more.zhiweifuli_text}}</view>
				</view>
				<view class="item">
					<view>电话号码</view>
					<view v-if="datas.status == 3"><block v-if="datas.look_phone_status == 1">【{{datas.status_text}}】</block><block v-else>【{{datas.status_text}}，号码不显示】</block></view>
					<view v-else>
						{{datas.phone}}
						<button type="default" size="mini"  v-if="datas.look_phone_status == 1">我发布的</button>
						<button type="default" size="mini"  @click="callPhone(datas.phone)" v-else-if="datas.look_phone_status == 2">拨打电话</button>
						<button type="default" size="mini"  @click="lookPhone(datas.id,datas.type,datas.look_phone_status)" v-else-if="datas.look_phone_status == 3">查看完整电话</button>
						<button type="default" size="mini"  @click="lookPhone(datas.id,datas.type,datas.look_phone_status)" v-else>免费查看电话</button>
					</view>
				</view>
				<view class="item">
					<view>发布时间</view>
					<view>{{datas.publish_time}}</view>
				</view>
				<view class="item" v-if="datas.more.bidding_type">
					<view>发包类型</view>
					<view>{{datas.more.bidding_type}}</view>
				</view>
				<view class="item" v-if="datas.type != 5 && datas.team_text != undefined">
					<view v-if="datas.type == 3">所需人员构成</view><view v-else>人员构成</view>
					<view>{{datas.team_text}}</view>
				</view>
				<view v-if="datas.type == 3">
					<view class="item" >
						<view>承包方式</view>
						<view>{{datas.more.contract_manner_text}}</view>
					</view>
					<view class="item">
						<view>预计工程造价</view>
						<view>{{datas.more.project_cost}} W</view>
					</view>
				</view>
				<view class="item" style="color: #14aaf7;font-size:24upx;border-bottom: none;">联系我时，请说明是在“招老板”上看到的</view>
			</view>
			<view class="block" v-if="datas.type != 5">
				<view class="title" v-if="datas.type == 1">所需工种</view>
				<view class="title" v-else-if="datas.type == 2">专业工种</view>
				<view class="title" v-else-if="datas.type == 3">工程类别</view>
				<view class="title" v-else-if="datas.type == 4">厂工工种</view>
				<view class="cate">
					<view v-if="datas.type == 4 && datas.more.gongchanggongzhong">{{datas.more.gongchanggongzhong}}</view>
					<block v-else v-for="(item,index) in datas.work_cate" :key="index">
						<view v-if="item">{{index}}{{item}}</view><block v-else>{{index}}</block>
					</block>
				</view>
			</view>
			<view class="block">
				<view class="title" v-if="datas.type == 1">招工信息详情</view>
				<view class="title" v-else-if="datas.type == 2">工人找活详情</view>
				<view class="title" v-else-if="datas.type == 3">发包工程详情</view>
				<view class="title" v-else-if="datas.type == 4">厂工详情</view>
				<view class="title" v-else-if="datas.type == 5">工厂直聘详情</view>
				<view class="content">{{datas.content}}</view>
			</view>
			<view class="block" v-if="datas.image">
				<view class="title" >图片</view>
				<view class="image" v-if="datas.image">
					<view v-for="(item,index) in datas.image" :key="index" @click="ViewImage" :data-url="item">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view style="background-color:#FFFFFF;"><anti-fraud></anti-fraud></view>
			<popup-login :isPopupLogin.sync="isPopupLogin"></popup-login>
		</view>
	</view>
</template>

<script>
	import antiFraud from '@/components/anti-fraud';
	import popupLogin from '@/components/popup-login';
	import {mapState,mapMutations} from 'vuex';  
	export default{
		data(){
			return {
				datas:[],
				lookPhoneText:'免费查看电话',
				work_id:'',
				isPopupLogin:false
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo','isBindAccount'])
		},
		components:{
			antiFraud,
			popupLogin
		},
		onLoad(option) {
			this.work_id = option.work_id;
			this.loadData(option);
		},
		methods:{
			...mapMutations(['checkBindAccount']),
			async loadData(option){
				uni.showLoading({
					title:'数据加载中',
				})
				let data = {work_id:option.work_id};
				if(this.userInfo.uid != undefined){
					data.user_id = this.userInfo.uid;
				}
				await this.request.get(this.api.getWorkDetails,{
					data:data
				}).then(res => {
					if(res.code) this.datas = res.data;
				}).catch(error =>{
					console.log('Error:',error);
				})
				uni.hideLoading();
			},
			lookPhone:function(id,type,look_phone_status){
				let _this = this;
				if(this.hasLogin){
					this.checkBindAccount();
					if(this.isBindAccount){
						if(look_phone_status == 3){
							uni.showModal({
								title:'提示',
								content:'需要 '+_this.datas.look_phone_require_bean+' 豆币方可查看，确定查看吗？',
								success:(res=>{
									if(res.confirm){
										t();
									}
								})
							})
						}else{
							t();
						}
					}
				}else{
					this.isPopupLogin = true;
				}
				function t(){
					uni.showLoading({
						title:'获取电话中',
						mask:true
					})
					_this.request.post(_this.api.lookWorkPhone,{
						data:{work_id:id,type:type,user_id:_this.userInfo.uid}
					}).then(res => {
						if(res.code){
							_this.datas.phone = res.data;
							_this.datas.look_phone_status = 2;
						}else{
							if(res.msg != 'failure'){
								uni.showModal({
									title:'提示',
									content:res.msg,
									confirmText:'去充值',
									success:(res=>{
										if(res.confirm){
											uni.navigateTo({
												url:'/pages/member/bean-recharge'
											})
										}
									})
								})
							}else{
								_this.func.msg(res.msg);
							}
						}
						uni.hideLoading();
					}).catch(error => {
						console.log(error);
					})
				}
			},
			callPhone:function(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.datas.image,
					current: e.currentTarget.dataset.url,
					indicator:'number',
					loop:true
				});
			},
		},
		onShareAppMessage(res) {
			return {
				// title: this.datas.title,
				title: '全国建筑工程承包 找活 招工',
				path:`/pages/work/details?work_id=${this.work_id}`
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
			.block{
				margin:20upx 0;
			}
			.title{
				font-size:28upx;
				font-weight: bold;
				color: #333333;
				padding:16upx;
				line-height: 2.1;
				border-bottom: 1px dashed #dcdcdc;
				background-color: white;
			}
			.cate{
				padding:20upx 16upx;
				background-color: white;
			}
			.content{
				padding:20upx 16upx;
				color: #333333;
				line-height:1.5;
				font-size:26upx;
				background-color: white;
			}
			.image{
				display: flex;
				flex-wrap: wrap;
				padding:16upx;
				background-color: white;
				text-align:center;
				view{
					width:33.3333%;
					height: 200upx;
					padding:2px;
					image{
						width:100%;
						height:100%;
					}
				}
			}
			.item-list{
				background-color: white;
				color: #333333;
				.item{
					display: flex;
					flex-direction:row;
					justify-content: space-between;
					align-items: center;
					padding:16upx;
					border-bottom: 1px dashed #dcdcdc;
					line-height: 2.1;
					font-size:28upx;
					view:last-child{
						font-size:24upx;
						color: #14aaf7;
					}
					button{
						background-color: #13aaf6;
						color: white;
						font-size: 24upx;
						padding:0 20upx;
						vertical-align: top;
						margin-left:8upx;
					}
				}
			}
		}
		.t text{
			margin-right: 30upx;
		}
	}
</style>
