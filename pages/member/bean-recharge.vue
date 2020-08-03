<template>
	<view class="container">
		<view class="recharge-info">
			<view>账户余额：<text>{{userInfo.integral}}豆币</text></view>
			<block v-if="lists.length >= 1">
				<view>充值金额：<text>{{price}}元</text></view>
				<view>获得豆币：<text>{{bean}}豆币</text></view>
			</block>
		</view>
		<view class="recharge-wrap">
			<block v-if="lists.length >= 1">
				<view class="title">请选择充值余额</view>
				<view class="item-wrap">
					<view class="item" v-for="(item,index) in lists" :key="index" :class="{active:index == currentIndex}" @click="itemClick(item,index)">
						<view>{{item.price}}元</view>
						<view>{{item.integral}}豆币</view>
					</view>
				</view>
				<button class="btn" type="default" @click="recharge">立即充值</button>
			</block>
			<block v-else>
				<view class="no-data">{{loadDataText}}</view>
			</block>
		</view>
		
	</view>
</template>

<script>
	import {
	    mapState,mapMutations
	} from 'vuex';
	export default{
		data(){
			return{
				lists:[],
				currentIndex:0,
				price:0,
				bean:0,
				goods_id:0,
				loadDataText:'数据加载中',
				lastClickTime:0,
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		onLoad() {
			this.loadData();
		},
		methods:{
			async loadData(){
				uni.showLoading({
					title:'数据加载中'
				})
				await this.request.get(this.api.getBeanRechargeList,{
					data:{}
				}).then(res=>{
					if(res.code){
						this.lists = res.data;
						this.goods_id = this.lists[0].id;
						this.price = this.lists[0].price;
						this.bean = this.lists[0].integral;
					}else{
						this.loadDataText = '暂不提供豆币充值';
					}
				}).catch(err=>{
					console.log(err);
				})
				uni.hideLoading();
			},
			itemClick(item,index){
				this.price = item.price;
				this.bean = item.integral;
				this.goods_id = item.id;
				this.currentIndex = index;
			},
			...mapMutations(['login']),
			recharge(event){
				const _this = this;
				if(!this.userInfo.open_id){
					uni.showModal({
						title:'提示',
						content:'请使用微信登录或已绑定过微信的账号完成充值',
						showCancel:false
					})
					return;
				}
				let currentTime = event.timeStamp;
				let lastClickTime = this.lastClickTime;
				this.lastClickTime = currentTime;
				if(currentTime - lastClickTime < 300){
					return;
				}
				const data = {user_id:this.userInfo.uid,pay_way:'wxPay',goods_id:this.goods_id,type:1};
				uni.showLoading({
					title:'请稍候',
					mask:true
				})
				this.request.post(this.api.createOrder,{
					data:data
				}).then(e=>{
					if(e.code){
						let obj = e.data;
						obj['open_id']	= this.userInfo.open_id;
						this.request.post(e.data.url,{
							data:obj
						}).then(res=>{
							if(res.code){
								uni.requestPayment({
									provider:'wxpay',
									orderInfo:'',
									appId:res.data.appId,
									nonceStr:res.data.nonceStr,
									package:res.data.package,
									paySign:res.data.paySign,
									signType:res.data.signType,
									timeStamp:res.data.timeStamp,
									success:(s=>{
										// 更新缓存信息
										_this.userInfo.integral = _this.bean+_this.userInfo.integral;
										_this.login(_this.userInfo);
										uni.showModal({
											title:'提示',
											content:'支付成功',
											showCancel:false,
											success:(r=>{
												if(r.confirm){
													uni.navigateBack();
												}
											})
										})
									}),
									fail:(err=>{
										uni.showModal({
											title:'提示',
											content:'支付失败',
											showCancel:false,
											success:(r=>{
												if(r.confirm){
													uni.navigateBack();
												}
											})
										})
									})
								});
							}else{
								uni.showModal({
									title:'提示',
									content:res.msg,
									showCancel:false
								})
							}
						}).catch(err=>{
							console.log(err);
						})
					}else{
						uni.showModal({
							title:'提示',
							content:e.msg,
							showCancel:false
						})
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
	.container{
		.recharge-info{
			background: #FFFFFF;
			color: #414141;
			padding:20upx 40upx;
			font-size:28upx;
			view{
				margin-bottom:10upx;
				text{
					color: #0099ff;
				}
			}
		}
		.recharge-wrap{
			background: #FFFFFF;
			color: #414141;
			margin-top: 20upx;
			padding:20upx 40upx;
			.title{
				margin-bottom: 20upx;
			}
			.item-wrap{
				display: flex;
				justify-content:space-between;
				flex-wrap:wrap;
				align-items:center;
				text-align:center;
				.item{
					background: #FFFFFF;
					border:1px solid #f4f4f4;
					width:30%;
					padding:30upx 0;
					margin-top:20upx;
					border-radius:5upx;
					font-size:24upx;
					view:first-child{
						margin-bottom: 10upx;
					}
					view:last-child{
						color:#adadad;
					}
				}
				.active{
					background: #13aaf6;
					border: 1px solid #13aaf6;
					color: #FFFFFF;
					view:last-child{
						color:#FFFFFF;
					}
				}
			}
			.btn{
				margin-top: 30upx;
				width:80%;
				background: #13aaf6;
				color: #FFFFFF;
			}
		}
	}
</style>
