<template>
	<common-box v-if="option">
		<view class="construction_com" v-on:click="jump">
			<view class="row row_1">
				<view class="row_left">
					<texe class="title">{{option.title}}</texe>
				</view>
				<view class="row_right" v-if="option.is_new">
					<view class="tab">NEW</view>
				</view>
			</view>
			<view class="row row_2">
				<view class="row_left">
					<uni-icon type="location-filled" size="24" color="#acacac" style="display: inline-block;vertical-align: middle;"></uni-icon>
					<texe>{{addr}}</texe>
					<text class="tub_text">{{option.publish_time}}</text>
				</view>
				<view class="row_right money_month">
					<view>{{xinzi}}</view>
				</view>
			</view>
			<view class="row row_3">
				<view class="row_left">
					所需工种 ：{{workType}}
				</view>
			</view>
			<view class="row row_4">
				<view class="row_left">
					{{option.content}}
				</view>
			</view>
			<view class="foot_box">
				<view class="left">
					<image class="left_img" v-bind:src="user.head_img" mode=""></image>
				</view>
				<view class="center">
					<view class="p_1">
						{{option.contact}}
						<text class="real_name" v-if="user.is_certification">已实名</text>
						<text class="status_t">{{option.status_text}}</text>
					</view>
					<view class="p_2">{{option.phone}}</view>
				</view>
				<view class="right">
					<button class="handler_button" size="mini">立即联系</button>
				</view>
			</view>
		</view>
	</common-box>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import commonBox from './common/item-box.vue'
	export default {
		components: {
			commonBox,
			uniIcon
		},
		props: {
			option: {
				type: Object,
			}
		},
		computed: {
			addr: function() {
				let addr = ''
				let addrObj = this.option.region
				addr += addrObj.city || addrObj.province
				return addr
			},
			user: function() {
				console.log(this.option.user)
				return this.option.user
			},
			workType: function() {
				let str = ''
				let data = this.option
				let hasName = data.cate ? data.cate.some(one => one.name) : null
				if (hasName) {
					let workTypeList = data.cate;
					workTypeList.forEach(one => {
						str += str ? ',' + one.name : one.name
					})
				} else if (data.more.gongzuoleixing_text) {
					str = data.more.gongzuoleixing_text
				}
				return str || '--'
			},
			xinzi: function() {
				let msg = this.option.more
				if (msg) {
					return msg.xinzi_text + msg.xinzileixing_text
				} else {
					return '面议/月'
				}
			}
		},
		methods: {
			jump: function() {
				let url = '/pages/work/details?work_id=' + this.option.id
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './common/com.scss';

	.construction_com {
		@extend .common_com;

		.row {
			&.row_2 {
				.row_left {
					.tub_text {
						margin-left: 30rpx;
						display: inline-block;
					}
				}

				.row_right {
					width: 180rpx;

					&.money_month {
						font-size: 32rpx;
						color: #0669ed;
					}
				}
			}
		}
	}
</style>
