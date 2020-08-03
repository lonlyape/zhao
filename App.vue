<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login'])
		},
		onLaunch: function() {
			let userInfo = uni.getStorageSync('userInfo') || '';
			if (userInfo != '') {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data);
					}
				});
			}

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>
<style lang='scss'>
	page {
		font-size: $uni-font-size-sm;
		background-color: $uni-bg-color-grey;
	}

	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}

	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-yiguoqi1:before {
		content: "\e700";
	}

	.icon-iconfontshanchu1:before {
		content: "\e619";
	}

	.icon-iconfontweixin:before {
		content: "\e611";
	}

	.icon-alipay:before {
		content: "\e636";
	}

	.icon-shang:before {
		content: "\e624";
	}

	.icon-shouye:before {
		content: "\e626";
	}

	.icon-shanchu4:before {
		content: "\e622";
	}

	.icon-xiaoxi:before {
		content: "\e618";
	}

	.icon-jiantour-copy:before {
		content: "\e600";
	}

	.icon-fenxiang2:before {
		content: "\e61e";
	}

	.icon-pingjia:before {
		content: "\e67b";
	}

	.icon-daifukuan:before {
		content: "\e68f";
	}

	.icon-pinglun-copy:before {
		content: "\e612";
	}

	.icon-dianhua-copy:before {
		content: "\e621";
	}

	.icon-shoucang:before {
		content: "\e645";
	}

	.icon-xuanzhong2:before {
		content: "\e62f";
	}

	.icon-gouwuche_:before {
		content: "\e630";
	}

	.icon-icon-test:before {
		content: "\e60c";
	}

	.icon-icon-test1:before {
		content: "\e632";
	}

	.icon-bianji:before {
		content: "\e646";
	}

	.icon-jiazailoading-A:before {
		content: "\e8fc";
	}

	.icon-zuoshang:before {
		content: "\e613";
	}

	.icon-jia2:before {
		content: "\e60a";
	}

	.icon-huifu:before {
		content: "\e68b";
	}

	.icon-sousuo:before {
		content: "\e7ce";
	}

	.icon-arrow-fine-up:before {
		content: "\e601";
	}

	.icon-hot:before {
		content: "\e60e";
	}

	.icon-lishijilu:before {
		content: "\e6b9";
	}

	.icon-zhengxinchaxun-zhifubaoceping-:before {
		content: "\e616";
	}

	.icon-naozhong:before {
		content: "\e64a";
	}

	.icon-xiatubiao--copy:before {
		content: "\e608";
	}

	.icon-shoucang_xuanzhongzhuangtai:before {
		content: "\e6a9";
	}

	.icon-jia1:before {
		content: "\e61c";
	}

	.icon-bangzhu1:before {
		content: "\e63d";
	}

	.icon-arrow-left-bottom:before {
		content: "\e602";
	}

	.icon-arrow-right-bottom:before {
		content: "\e603";
	}

	.icon-arrow-left-top:before {
		content: "\e604";
	}

	.icon-icon--:before {
		content: "\e744";
	}

	.icon-zuojiantou-up:before {
		content: "\e605";
	}

	.icon-xia:before {
		content: "\e62d";
	}

	.icon--jianhao:before {
		content: "\e60b";
	}

	.icon-weixinzhifu:before {
		content: "\e61a";
	}

	.icon-comment:before {
		content: "\e64f";
	}

	.icon-weixin:before {
		content: "\e61f";
	}

	.icon-fenlei1:before {
		content: "\e620";
	}

	.icon-erjiye-yucunkuan:before {
		content: "\e623";
	}

	.icon-Group-:before {
		content: "\e688";
	}

	.icon-you:before {
		content: "\e606";
	}

	.icon-forward:before {
		content: "\e607";
	}

	.icon-tuijian:before {
		content: "\e610";
	}

	.icon-bangzhu:before {
		content: "\e679";
	}

	.icon-share:before {
		content: "\e656";
	}

	.icon-yiguoqi:before {
		content: "\e997";
	}

	.icon-shezhi1:before {
		content: "\e61d";
	}

	.icon-fork:before {
		content: "\e61b";
	}

	.icon-kafei:before {
		content: "\e66a";
	}

	.icon-iLinkapp-:before {
		content: "\e654";
	}

	.icon-saomiao:before {
		content: "\e60d";
	}

	.icon-shezhi:before {
		content: "\e60f";
	}

	.icon-shouhoutuikuan:before {
		content: "\e631";
	}

	.icon-gouwuche:before {
		content: "\e609";
	}

	.icon-dizhi:before {
		content: "\e614";
	}

	.icon-fenlei:before {
		content: "\e706";
	}

	.icon-xingxing:before {
		content: "\e70b";
	}

	.icon-tuandui:before {
		content: "\e633";
	}

	.icon-zuanshi:before {
		content: "\e615";
	}

	.icon-zuo:before {
		content: "\e63c";
	}

	.icon-shoucang2:before {
		content: "\e62e";
	}

	.icon-shouhuodizhi:before {
		content: "\e712";
	}

	.icon-yishouhuo:before {
		content: "\e71a";
	}

	.icon-dianzan-ash:before {
		content: "\e617";
	}

	.no-data {
		text-align: center;
		padding: 20upx;
	}

	.loadMore {
		color: #555;
		font-size: 30upx;
		margin: 20upx;
		text-align: center;
	}

	.hidden {
		display: none;
	}

	.main-color {
		color: #14aaf7;
	}

	.fz-14 {
		font-size: 28upx;
	}

	/* 表单 */
	.form-group {
		background-color: #ffffff;
		padding: 1upx 30upx;
		display: flex;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
		border-top: 1upx solid $uni-border-color;

		.title {
			text-align: justify;
			padding-right: 30upx;
			font-size: 28upx;
			position: relative;
			height: 60upx;
			line-height: 60upx;
			min-width: calc(4em + 15px);
		}

		input {
			flex: 1;
			font-size: 30upx;
			color: #555;
			padding-right: 20upx;
		}

		textarea {
			margin: 32upx 0 30upx;
			height: 4.6em;
			width: 100%;
			line-height: 1.2em;
			flex: 1;
			font-size: 28upx;
			padding: 0;
		}

		.view-textarea {
			margin: 32upx 0 30upx;
			height: 4.6em;
			width: 100%;
			line-height: 1.2em;
			flex: 1;
			font-size: 28upx;
			padding: 0;
		}

		picker {
			flex: 1;
			padding-right: 40upx;
			overflow: hidden;
			position: relative;

			.picker {
				font-size: 28upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				width: 100%;
				/* text-align: right; */
			}
		}

		.submit-btn {
			display: block;
			width: 70%;
			margin: 20upx auto;
			background: #0099ff;
			color: #ffffff;
		}
	}

	.form-button_box {
		padding:60rpx 0;
		background-color: rgba(255, 255, 255, 0);
		border:none;
		.submit-btn{
			border-radius: 60rpx;
			background: linear-gradient(to right,#015fea,#1995fb);
		}
	}

	.form_margin_top {
		margin-top: 20rpx;
	}

	form .xq-title {
		font-size: 28upx;
		line-height: 60upx;
		height: 60upx;
		background: white;
		padding: 10upx 30upx 0;
		border-top: 1upx solid #eee;
	}

	/* 招工/找活/承包列表 */
	.zg-list {
		.list-item {
			padding: 20upx;
			background-color: white;
			margin-bottom: 20upx;

			.t {
				font-size: $uni-font-size-sm + 4;
				margin-bottom: 15upx;
				color: #333333;
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.m {
				color: #999999;

				text {
					margin: 0upx 20upx;
				}
			}

			.f {
				border-top: 1px dashed #e3e3e3;
				margin-top: 20upx;
				padding-top: 20upx;

				image {
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
				}

				view {
					display: inline-block;
					line-height: 100upx;
					margin-left: 20upx;
					vertical-align: top;
					color: #999999;

					text {
						margin: 0upx 20upx;
					}

					.status-text {
						color: #c60606;
						margin: 0;
					}
				}

				.bag {
					background: #13aaf6;
					color: #FFFFFF;
					border-radius: 10upx;
					float: right;
					padding: 10upx;
					margin-top: 30upx;
				}
			}
		}
	}

	.zh-list {
		.list-item {
			padding: 20upx;
			background-color: white;
			margin-bottom: 20upx;

			.t {
				font-size: $uni-font-size-sm + 4;
				margin-bottom: 15upx;
				color: #333333;
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.m {
				line-height: 45upx;
				margin-top: 20upx;

				image {
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
				}

				.zh_m {
					margin-left: 30upx;
					display: inline-block;
					vertical-align: top;
					width: 80%;
				}
			}

			.f {
				border-top: 1px dashed #e3e3e3;
				color: #999999;
				margin-top: 20upx;
				padding-top: 20upx;

				text {
					margin: 0upx 20upx;
				}

				.status-text {
					color: #c60606;
					margin: 0;
				}
			}
		}
	}

	/* 二手交易列表 */
	.es-list {
		.list-item {
			padding: 20upx;
			background-color: white;
			margin-bottom: 20upx;

			.t {
				font-size: $uni-font-size-sm + 4;
				margin-bottom: 15upx;
				color: #333333;
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.m {
				line-height: 45upx;
				margin-top: 20upx;

				image {
					width: 90upx;
					height: 90upx;
					border-radius: 50%;
					margin-top: 42upx;
				}

				.es_m {
					margin-left: 30upx;
					display: inline-block;
					vertical-align: top;
					width: 80%;

					view {
						text {
							display: inline-block;
							min-width: 100upx;
							text-align: justify;
							text-align-last: justify;
							color: #333333;
						}
					}

					.status_text {
						color: #c60606;
						margin: 0;
					}
				}
			}
		}
	}

	.cu-mask {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .6);
	}

	.cu-modal {
		position: fixed;
		z-index: 999;
		width: 90%;
		max-width: 600upx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 3px;
		overflow: hidden;

		.cu-modal__hd {
			padding: 30upx 60upx;
			text-align: center;

			.cu-modal__title {
				font-weight: 400;
				font-size: 18px;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		.cu-modal__bd {
			padding: 40upx;
			min-height: 40px;
			font-size: 15px;
			line-height: 1.4;
			color: #999;
			max-height: 400px;
			overflow-y: auto;
		}

		.cu-modal__ft {
			position: relative;
			line-height: 96upx;
			font-size: 36upx;
			display: flex;
			text-align: center;

			.cu-modal__btn {
				display: block;
				flex: 1;
				color: #3cc51f;
				text-decoration: none;
				position: relative;
			}

			.cu-modal__btn:nth-child(1) {
				color: #353535;
			}

			.cu-modal__btn::after {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				width: 2upx;
				bottom: 0;
				border-left: 2upx solid #d5d5d6;
				color: #d5d5d6;
				transform-origin: 0 0;
				transform: scaleX(.5);
			}
		}
	}

	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/* input 样式 */
	.input-placeholder {
		color: #cdcdcd;
	}

	.placeholder {
		color: #cdcdcd;
	}
</style>
