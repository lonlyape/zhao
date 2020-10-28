<template>
	<view>
		<view class="top_box" v-if="datas">
			<view class="title">{{title}}</view>
			<view class="foot_box">
				<view class="left">
					<image class="left_img" v-bind:src="user.head_img" mode=""></image>
				</view>
				<view class="center">
					<view class="p_1">
						{{user.contact}}
						<text class="real_name" v-if="user.is_certification">已实名</text>
					</view>
					<view class="p_2">{{user.phone}}</view>
				</view>
				<view class="right">
					<template v-if="datas.status == 3">
						<view>{{datas.status_text}}</view>
					</template>
					<template v-else>
						<button type="default" size="mini"  v-if="datas.look_phone_status == 1">我发布的</button>
						<button class="handler_button" type="default" size="mini"  @click="callPhone(datas.phone)" v-else-if="datas.look_phone_status == 2">立即联系</button>
						<button class="handler_button" type="default" size="mini"  @click="lookPhone(datas.id,datas.type,datas.look_phone_status)" v-else-if="datas.look_phone_status == 3">查看电话</button>
						<button class="handler_button" type="default" size="mini"  @click="lookPhone(datas.id,datas.type,datas.look_phone_status)" v-else>查看电话</button>
						<!-- <button v-on:click="call" class="handler_button" size="mini">立即联系</button> -->
					</template>
				</view>
			</view>
		</view>
		<view class="cell_box" v-for="one in cellList" v-bind:key="one[0].label">
			<cell v-for="item in one" v-bind:key="item.label" :label="item.label" :value="item.value" :cellStyle="{value:'color:#1a99fd'}"></cell>
		</view>
		<cell label="* 联系我时,请说明是在“招老板”上看到的" :cellStyle="{label:'color:#1a99fd;font-Size:26rpx'}"></cell>
		<view class="detail_item" v-for="one in detailList" v-bind:key="one.title">
			<view class="title">{{one.title}}
				<view class="border_view"></view>
			</view>
			<view class="content">
				<view class="text_c" v-if="one.content">{{one.content}}</view>
				<view class="img_c" v-if="one.img">
					<image v-on:click="ViewImage" :data-url="item" class="img_content" :style="imgStyle" v-for="(item,key) in one.img"
					 v-bind:key="item" :src="item" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<popup-login :isPopupLogin.sync="isPopupLogin"></popup-login>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import popupLogin from '@/components/popup-login';
	import cell from '@/components/common/cell.vue'
	export default {
		data() {
			return {
				imgStyle: '',
				isPopupLogin: false,
			}
		},
		created() {
			this.setStyle()
		},
		computed:{
			...mapState(['hasLogin','userInfo','isBindAccount']),
		},
		props: {
			datas:Object,
			title: {
				type: String,
				default: 'title'
			},
			user: {
				type: Object,
				default: function() {
					return {
						contact: '符东伟',
						phone: '18219304554',
						head_img: '/static/b_icon04_s.png'
					}
				}
			},
			cellList: {
				type: Array,
				default: function() {
					return [
						[{
							label: '地址',
							value: '北京'
						}, {
							label: '学历要求',
							value: '本科'
						}]
					]
				}
			},
			detailList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		components: {
			cell,
			popupLogin
		},
		methods: {
			...mapMutations(['checkBindAccount']),
			setStyle() {
				uni.getSystemInfo({
					success: (e) => {
						let style = 'width:49%;'
						let height = e.windowWidth * 0.49 * 0.6
						style += 'height:' + height + 'px'
						this.imgStyle = style
					}
				})
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
							_this.user.phone = res.data;
							_this.datas.look_phone_status = 2;
							_this.$emit('updateData')
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
			call() {
					// <button type="default" size="mini"  v-if="datas.look_phone_status == 1">我发布的</button>
					// <button type="default" size="mini"  @click="callPhone(datas.phone)" v-else-if="datas.look_phone_status == 2">拨打电话</button>
					// <button type="default" size="mini"  @click="lookPhone(datas.id,datas.type,datas.look_phone_status)" v-else-if="datas.look_phone_status == 3">查看完整电话</button>
					// <button type="default" size="mini"  @click="lookPhone(datas.id,datas.type,datas.look_phone_status)" v-else>免费查看电话</button>

				
				let datas=this.datas
				if(datas.look_phone_status == 2){
					this.callPhone(datas.phone)
				}else if(datas.look_phone_status == 3){
					this.lookPhone(datas.id,datas.type,datas.look_phone_status)
				}else{
					lookPhone(datas.id,datas.type,datas.look_phone_status)
				}
				
				this.callPhone(this.user.phone)
				return
				if (!/\*/.test(this.user.phone)) {
					this.callPhone(this.user.phone)
				}else{
					this.isPopupLogin=true
				}
			},
			callPhone: function(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			ViewImage(e) {
				console.log(e)
				let url = e.currentTarget.dataset.url
				this.detailList.forEach(one => {
					if (one.img && one.img.some(i => i == url)) {
						uni.previewImage({
							urls: one.img,
							current: url,
							indicator: 'number',
							loop: true
						});
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped="detail_com">
	$margin_top:20rpx;

	.top_box {
		background-color: #fff;
		padding: 0 30rpx 20rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			padding: 20rpx 0 0;
		}
	}

	.foot_box {
		display: flex;
		padding-top: 28rpx;
		align-items: center;

		.left {
			width: 80rpx;
			position: relative;
			left: -10rpx;

			.left_img {
				width: 100%;
				height: 80rpx;
				border-radius: 50%;
				background-color: #f1f1f1;
			}
		}

		.center {
			flex: 1;
			margin-left: 20rpx;

			.p_1 {
				margin-bottom: 4rpx;
				;
				font-size: 26rpx;
				font-weight: bold;

				.real_name {
					font-size: 22rpx;
					color: #1AAD19;
					border: 1rpx solid #1AAD19;
					display: inline-block;
					padding: 4rpx;
					font-weight: normal;
					margin: 0 10rpx;
					border-radius: 4rpx;
				}
			}
		}

		.right {
			width: 190rpx;
			text-align: right;

			.handler_button {
				text-align: center;
				padding:0;
				min-width: 170rpx;
				background: linear-gradient(to right, #015fea, #1995fb);
				color: #fff;
				letter-spacing: .5px;
				border-radius: 40rpx;
			}
		}
	}

	.cell_box {
		margin-top: $margin_top;
	}

	.detail_item {
		background-color: #fff;
		margin-top: $margin_top;

		.title {
			font-weight: bold;
			font-size: 36rpx;
			padding: 20rpx 30rpx;
			position: relative;

			.border_view {
				position: absolute;
				bottom: 0;
				left: 30rpx;
				right: 0;
				height: 1rpx;
				background-color: $uni-border-color;
			}
		}

		.content {
			padding: 20rpx 30rpx;
			line-height: 38rpx;
			color: #212121;

			.text_c {
				+.img_c {
					margin-top: 2%;
				}
			}

			.img_c {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				justify-content: space-between;

				.img_content {
					margin-bottom: 2%;
				}
			}
		}
	}
</style>
