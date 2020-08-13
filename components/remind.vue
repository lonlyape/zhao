<template>
	<view class="mask" v-if="showMask">
		<view class="mask_3">
			<view class="title">联系方式</view>
			<view class="content">
				<view>材料发布请联系官方</view>
				<view class="contat" v-on:click="copyPhone('ZHAOBOSS9399')">
					添加微信：ZHAOBOSS9399
				</view>
			</view>
			<view class="cancel" v-on:click="cancelButton">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showMask:false
			}
		},
		methods:{
			cancelButton() {
				this.showMask = false
			},
			setShowMask(b){
				this.showMask = b
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
		},
	}
</script>

<style lang="scss" scoped>
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
			top: 40%;
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
				font-size: 28rpx;
	
				.contat {
					margin-bottom: 10rpx;
					color: #007AFF;
					text-decoration: underline;
				}
			}
		}
	}
</style>
