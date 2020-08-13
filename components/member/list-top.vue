<template>
	<view class="fiexd">
		<view class="tab-wrap">
			<block v-for="(item,key) in list" :key="key">
				<view class="tab-item" :class="{'active':defaultActive==item.type}" @click="jump(item.url)">
					<image v-if="defaultActive==item.type" :src="'../../static/'+item.img+'-active.png'"></image>
					<image v-else :src="'../../static/'+item.img+'.png'"></image>
					<text>{{item.name}}</text>
				</view>
			</block>
		</view>
		<zhao-gong v-if="defaultActive == 'zhaogong'"></zhao-gong>
		<zhao-huo v-if="defaultActive == 'zhaohuo'"></zhao-huo>
		<cheng-bao v-if="defaultActive == 'chengbao'"></cheng-bao>
		<gczh v-if="defaultActive == 'gczh'"></gczh>
		<gczp v-if="defaultActive == 'gczp'"></gczp>
		<er-shou v-if="defaultActive == 'ershou'"></er-shou>
		<cailiao v-if="defaultActive == 'cailiao'"></cailiao>
		<view class="my-publish">
			我发布的{{title}}
			<text @click="jump(publishUrl,true)">去发布</text>
		</view>
		<remind ref="remind"></remind>
	</view>
</template>

<script>
	import zhaoGong from "@/components/member/annotation/zhaogong";
	import zhaoHuo from "@/components/member/annotation/zhaohuo";
	import chengBao from "@/components/member/annotation/chengbao";
	import gczh from "@/components/member/annotation/gczh";
	import gczp from "@/components/member/annotation/gczp";
	import erShou from "@/components/member/annotation/ershou";
	import cailiao from "@/components/member/annotation/cailiao";
	import remind from '@/components/remind.vue'
	export default {
		data() {
			return {
				list: [{
						name: "已发布工程承包",
						type: "chengbao",
						url: "publish-chengbao-list",
						img: "published-zh"
					}, {
						name: "已发布招工信息",
						type: "zhaogong",
						url: "publish-zhaogong-list",
						img: "published-zg"
					}, {
						name: "已发布工人找活",
						type: "zhaohuo",
						url: "publish-zhaohuo-list",
						img: "published-zh"
					}, {
						name: "已发布找厂工信息",
						type: "gczh",
						url: "publish-gczh-list",
						img: "published-ershou"
					}, {
						name: "已发布工厂直聘",
						type: "gczp",
						url: "publish-gczp-list",
						img: "published-ershou"
					}
					/* ,{
											name:"已发布二手交易",
											type:"ershou",
											url:"publish-ershou-list",
											img:"published-ershou"
										} */
					, {
						name: "已发布材料",
						type: "cailiao",
						url: "publish-cailiao-list",
						img: "published-ershou"
					}
				]
			}
		},
		name: 'list-top',
		components: {
			zhaoGong,
			zhaoHuo,
			chengBao,
			gczh,
			gczp,
			remind,
			erShou,
			cailiao,
		},
		props: {
			defaultActive: {
				type: String,
				default: ''
			}
		},
		computed: {
			title: function() {
				switch (this.defaultActive) {
					case 'chengbao':
						return '工程承包';
						break;
					case 'zhaogong':
						return '招工信息';
						break;
					case 'zhaohuo':
						return '工人找活';
						break;
					case 'gczh':
						return '厂工信息';
						break;
					case 'gczp':
						return '工厂直聘';
						break;
					case 'ershou':
						return '二手交易';
						break;
					case 'cailiao':
						return '材料';
						break;
				}
			},
			publishUrl: function() {
				switch (this.defaultActive) {
					case 'chengbao':
						return 'publish-chengbao';
						break;
					case 'zhaogong':
						return 'publish-zhaogong';
						break;
					case 'zhaohuo':
						return 'publish-zhaohuo';
						break;
					case 'gczh':
						return 'publish-gczh';
						break;
					case 'gczp':
						return 'publish-gczp';
						break;
					case 'ershou':
						return 'publish-ershou';
						break;
					case 'cailiao':
						return 'publish-cailiao';
						break;
				}
			}
		},
		methods: {
			jump: function(url, t) {
				if (url == 'publish-cailiao') {
					// uni.showModal({
					// 	title: '提示',
					// 	content: '材料发布请联系官方',
					// 	success: (e => {
					// 		console.log(e)
					// 	})
					// })
					this.$refs.remind.setShowMask(true)
				} else if (t) {
					uni.navigateTo({
						url: url
					})
				} else {
					uni.redirectTo({
						url: url
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.fiexd {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-grey;
		z-index: 99;
	}

	.tab-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		background-color: white;
		flex-wrap: wrap;

		.tab-item {
			padding: 20upx 5upx;

			text {
				vertical-align: super;
				margin-left: 7upx;
			}

			image {
				width: 40upx;
				height: 40upx;
			}
		}

		.active {
			color: #0099ff;
		}
	}

	.my-publish {
		padding: 20upx 20upx;
		background-color: white;
		font-weight: bold;

		text {
			font-weight: normal;
			float: right;
			color: #0099ff;
		}
	}
</style>
