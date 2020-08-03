<template>
	<view class="materials_detail" v-if="datas">
		<view class="sp_msg">
			<view class="swiper_box">
				<swiper class="swiper" :style="imgStyle" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				 :duration="duration" @change="changeImg">
					<swiper-item v-for="one in imgs" v-bind:key="one" lass="img_box">
						<image :style="imgStyle+';width:100%'" class="img" :src="one" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<view class="swiper_page"><text>{{current+1}}</text>/<text>{{imgs.length}}</text></view>
			</view>
			<view class="price_view">
				￥<text class="text">{{datas.price}}</text>
			</view>
			<view style="color:#8d98a4">{{datas.title}}</view>
		</view>
		<view class="cell_groud">
			<view v-on:click="setMask(1)">
				<cell :cellStyle="cellStyle" label="包装规格" arrow></cell>
			</view>
			<view v-on:click="setMask(2)">
				<cell :cellStyle="cellStyle" label="订购说明" arrow></cell>
			</view>
		</view>
		<view class="cell_groud">
			<view v-on:click="setMask(3)">
				<cell :cellStyle="cellStyle" label="联系方式" arrow></cell>
			</view>
			<view v-on:click="setMask(4)">
				<cell :cellStyle="cellStyle" label="营业执照" arrow></cell>
			</view>
		</view>
		<view class="detail_view padding_box">
			<view class="detail_title">宝贝详情</view>
			<!-- <view class="detail_img_box">
				<image v-for="one in detailImg" v-bind:key="one" class="img" :src="one" mode="widthFix"></image>
			</view> -->
			<block v-if="datas&&datas.content1">
				<jyf-parser :html="datas.content1"></jyf-parser>
			</block>
		</view>
		<view class="detail_view" v-if="false">
			<view class="detail_title">相关产品</view>
			<view class="pro_view">
				<materials></materials>
				<materials></materials>
				<materials></materials>
				<materials></materials>
				<materials></materials>
			</view>
		</view>
		<view class="mask" v-if="showMask">
			<view class="mask_1" v-if="showMask==1">
				<view class="title">包装规格</view>
				<block v-if="datas.pg_name&&datas.pg_name.length">
					<view class="content" v-for="one in datas.pg_name" v-bind:key="one">{{one}}</view>
				</block>
				<view class="content" v-else>无</view>
				<view class="cancel" v-on:click="cancelButton">
					取消
				</view>
			</view>
			<view class="mask_2" v-if="showMask==2">
				<view class="title">订购说明</view>
				<block v-if="datas&&datas.content2">
					<jyf-parser :html="datas.content2"></jyf-parser>
				</block>
				<!-- <image v-for="one in mask2" v-bind:key="one" class="img" :src="one" mode="widthFix"></image> -->
				<view class="cancel" v-on:click="cancelButton">
					取消
				</view>
			</view>
			<view class="mask_3" v-if="showMask==3">
				<view class="title">联系方式</view>
				<view class="content">
					<view class="contat" v-on:click="copyPhone(mask3.phone)">
						{{mask3.name+':'+mask3.phone}}
					</view>
					<view v-if="datas.region">地址:{{datas.region}}</view>
				</view>
				<view class="cancel" v-on:click="cancelButton">
					取消
				</view>
			</view>
			<view class="mask_4" v-if="showMask==4">
				<view class="title">营业执照</view>
				<view class="swiper_box">
					<swiper class="swiper" :style="imgStyle2" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					 :duration="duration" @change="changeImg2">
						<swiper-item v-for="one in mask4" v-bind:key="one" lass="img_box">
							<image :style="imgStyle2+';width:100%'" class="img" :src="one" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
					<view class="swiper_page"><text>{{current2+1}}</text>/<text>{{mask4.length}}</text></view>
				</view>
				<view class="cancel" v-on:click="cancelButton">
					取消
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const cellStyle = {
		label: 'color:#8d98a4',
		arrow: 'color:#8d98a4'
	}
	import cell from '@/components/common/cell.vue'
	import materials from '../../components/index/materials.vue'
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		data() {
			return {
				cellStyle,
				imgStyle: '',
				imgStyle2: '',
				datas: null,
				autoplay: false,
				current: 0,
				current2: 0,
				showMask: 0,
			}
		},
		components: {
			cell,
			jyfParser,
			materials
		},
		computed: {
			mask1: function() {
				//包装规格
				if (this.datas) {
					let str = ''
					let pageName = this.datas.pg_name
					pageName.forEach(one => {
						str += one
					})
					return str || '无';
				}
			},
			// mask2: function() {
			// 	//订购说明
			// 	if (this.datas) {
			// 		if (this.datas && this.datas.content2) {
			// 			let list = this.datas.content2.match(/\/upload\/\S*(jpg|png|jpeg)+/g)
			// 			list.forEach((one, k) => {
			// 				let l = one.split(/\\/)
			// 				list[k] = this.api_url + l[0] + '/' + l[1]
			// 			})
			// 			return list
			// 		} else {
			// 			return []
			// 		}
			// 	}
			// },
			mask3: function() {
				//联系方式
				if (this.datas) {
					return {
						name: this.datas.contact,
						phone: this.datas.phone
					}
				}
			},
			mask4: function() {
				//订购说明
				if (this.datas) {
					if (this.datas && this.datas.image1) {
						let list = []
						this.datas.image1.forEach(one => {
							if (!/^http/.test(one)) {
								list.push(this.api_url + one)
							}
						})
						return list
					} else {
						return []
					}
				}
			},
			imgs: function() {
				let l = []
				if (this.datas) {
					if (this.datas.image) {
						l = this.datas.image
					}
				}
				return l
			},
			// detailImg: function() {
			// 	if (this.datas && this.datas.content1) {
			// 		let list = this.datas.content1.match(/\/upload\/\S*(jpg|png|jpeg)+/g)
			// 		list.forEach((one, k) => {
			// 			let l = one.split(/\\/)
			// 			list[k] = this.api_url + l[0] + '/' + l[1]
			// 		})
			// 		return list
			// 	} else {
			// 		return []
			// 	}
			// },
		},
		created() {
			uni.getSystemInfo({
				success: (e) => {
					let style = ''
					let height = e.windowWidth - 20
					style += 'height:' + height + 'px'
					this.imgStyle = style

					let style2 = ''
					height = e.windowWidth * 0.9
					style2 += 'height:' + height + 'px'
					this.imgStyle2 = style2

				}
			})
		},
		onLoad(option) {
			this.id = option.id;
			this.loadData();
		},
		methods: {
			setMask(e) {
				this.showMask = e
			},
			cancelButton() {
				this.showMask = 0
			},
			copyPhone(phone) {
				uni.setClipboardData({
					data: phone,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000
						});
					}
				});
			},
			async loadData() {
				uni.showLoading({
					title: '数据加载中',
				})
				let url = this.api.getMaterialsDetail
				let params = {
					work_id: this.id
				}
				await this.request.get(url, {
					data: params
				}).then(res => {
					if (res.code) {
						this.datas = res.data
						this.initData(this.datas)
						console.log(this.datas)
					}
				}).catch(error => {
					console.log('Error:', error);
				})
				uni.hideLoading();
			},
			initData(data) {
				data.content2 = this.initUrl(data.content2)
				data.content1 = this.initUrl(data.content1)
			},
			initUrl(str) {
				str = str.replace(/[\/upload\/|http]\S*(jpg|png|jpeg)+/g, (r) => {
					let str = r.replace(/\\/g, '/')
					if (/^\/upload/.test(str)) {
						str = this.api_url + str
					}
					return str
				})
				return str
			},
			changeImg({
				detail
			}) {
				this.current = detail.current
			},
			changeImg2({
				detail
			}) {
				this.current2 = detail.current
			}
		}
	}
</script>

<style lang="scss">
	.materials_detail {
		padding-bottom: 60rpx;

		.swiper_box {
			position: relative;

			.swiper_page {
				background-color: rgba(0, 0, 0, .5);
				color: #fff;
				border-radius: 40rpx;
				position: absolute;
				bottom: 0rpx;
				right: 0rpx;
				padding: 10rpx 30rpx;
			}
		}

		.sp_msg {
			padding: 10px;
			background-color: #fff;


			.img_box {
				.img {
					width: 100%;
					height: 100%;
				}
			}

			.price_view {
				color: #ff5500;
				margin: 20rpx 0 14rpx;

				.text {
					font-size: 40rpx;
					font-weight: bold;
				}
			}
		}

		.cell_groud {
			background-color: #fff;
			margin-top: 30rpx;
		}

		.detail_view {
			&.padding_box {
				padding: 0 30rpx;
			}

			.detail_title {
				text-align: center;
				color: #333;
				margin: 60rpx 0;
				position: relative;

				&::after {
					content: '';
					display: block;
					width: 20px;
					height: 1rpx;
					background-color: #b8b8b8;
					position: absolute;
					left: 50%;
					margin-left: -10px;
					bottom: -20rpx;
				}
			}

			.detail_img_box {
				padding: 0 10px;
				background-color: #fff;

				.img {
					width: 100%;
				}
			}

			.pro_view {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
			}
		}

		.mask {
			position: fixed;
			bottom: 0;
			top: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, .6);

			[class^=mask_] {
				position: absolute;
				background-color: #fff;
				top: 200rpx;
				width: 90%;
				left: 5%;
				padding: 40rpx 30rpx 0;
				border-radius: 10rpx;

				.title {
					text-align: center;
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 30rpx;
				}

				.cancel {
					padding: 30rpx 0;
					border-top: 1rpx solid $uni-border-color;
					text-align: center;
					letter-spacing: 1px;
					margin-top: 30rpx;
				}
			}

			.mask_3,
			.mask_1 {
				.content {
					text-align: center;

					.contat {
						margin-bottom: 10rpx;
						color: #007AFF;
						text-decoration: underline;
					}
				}
			}
		}
	}
</style>
