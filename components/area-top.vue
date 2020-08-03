<template>
	<view  v-if="visibleSync" :class="{'drawer-visible':showDrawer}"  class="area-container">
		<view class="header">
			<view class="s">
				<view class="closeBtn" @click="closeDrawer"></view>
				<view><text>选择城市</text></view>
			</view>
			<view class="x">当前选择的城市：{{positionRegion}}</view>
		</view>
		<view class="main">
			<view class="title">热门城市</view>
			<view class="area-box">
				<view class="item" style="color:red;" @click="clickArea('全国')">全国</view>
				<view class="item" v-for="item in region.hot" :key="item.id" @click="clickArea(item.name,item.id)">{{item.name}}</view>
			</view>
			<view v-for="value in region.all" :key="value.id">
				<view class="title" style="text-align: center;color:rgb(20, 170, 247);">
					<text>{{value.name}}</text>
				</view>
				<view v-for="val in value.child" :key="val.id">
					<view class="title">
						<text>{{val.name}}</text>
					</view>
					<view class="area-box" >
						<view class="item" @click="clickArea(val.name,val.id)">{{val.name}}</view>
						<view class="item" v-for="v in val.child" :key="v.id" @click="clickArea(v.name,v.id)">{{v.name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'area-top',
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			positionRegion:{
				type:String,
				default:'全国'
			}
		},
		data() {
			return {
				visibleSync: false,
				showDrawer: false,
				region:{
					all:[],
					hot:[]
				}
			}
		},
		watch: {
			visible(val) {
				clearTimeout(this.watchTimer)
				setTimeout(() => {
					this.showDrawer = val
				}, 100)
				if (this.visibleSync) {
					clearTimeout(this.closeTimer)
				}
				if (val) {
					this.visibleSync = val
				} else {
					this.watchTimer = setTimeout(() => {
						this.visibleSync = val
					}, 300)
				}
			},
			visibleSync:function(val){
				if(val){
					let storageName = 'allRegion';
					let region = uni.getStorageSync(storageName);
					if(region == ''){
						uni.showLoading({
							title:'数据加载中',
						})
						this.request.post(this.api.getAllRegion,{
							data:{}
						}).then(res => {
							if(res.code){
								uni.setStorageSync(storageName,res.data);
								this.region = res.data;
							}
							uni.hideLoading();
						}).catch(error =>{
							console.log('Error:',error);
						})
					}else{
						this.region = region;
					}
				}
			}
		},
		created() {
			this.visibleSync = this.visible
			setTimeout(() => {
				this.showDrawer = this.visible
			}, 100)
		},
		methods: {
			closeDrawer:function() {
				this.showDrawer = false;
				this.closeTimer = setTimeout(() => {
					this.visibleSync = false;
					this.$emit('close');
				}, 200)
			},
			clickArea:function(name,id){
				this.closeDrawer();
				let positionRegion = {name:name,id:id};
				uni.setStorageSync('positionRegion',positionRegion);
				this.$emit('click',{name:name,id:id});
			}
		}
	}
</script>

<style lang="scss">
	.area-container{
		position: fixed;
		top: 0;
		bottom:0;
		left:0;
		right:0;
		z-index:9999;
		background-color: #f7f6f9;
		overflow: hidden;
		visibility: hidden;
		transition: all .3s ease-out;
		transform: translatex(100%);
		.header{
			.s{
				display: flex;
				align-items: center;
				background-color: #0099ff;
				padding: 20upx 30upx;
				.closeBtn{
					width:50upx;
					height: 50upx;
					background-image: url('~@/static/area-close.png');
					background-size: 100%;
					background-repeat: no-repeat;
				}
				view:nth-child(2){
					width: 100%;
					text-align: center;
					font-size:36upx;
					color: white;
				}
			}
			.x{
				background-color: white;
				color: #0099ff;
				padding:20upx 30upx;
				font-size: 28upx;
			}
		}
		.main{
			height:85%;
			padding: 0upx 20upx;
			overflow-y: scroll;
			.title{
				font-size: 32upx;
				margin-top: 20upx;
			}
			.area-box{
				display: flex;
				flex-wrap: wrap;
				margin-top:20upx;
				.item{
					background-color: white;
					width:30%;
					color: #6f6f6f;
					padding:20upx;
					margin: 15upx 34upx;
					text-align: center;
					font-size: 32upx;
				}
				.item:nth-child(1n){
					margin-left:0;
				}
				.item:nth-child(3n){
					margin-right:0;
				}
			}
		}
	}
	.drawer-visible{
		visibility: visible;
		transform: translatex(0%);
	}
</style>
