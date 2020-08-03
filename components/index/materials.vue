<template>
	<view class="materials_com" v-if="option" :style="boxStyle" v-on:click="jump">
		<image :style="imgStyle" class="pro_img" :src="img" mode=""></image>
		<view class="msg_box">
			<view class="title">{{option.title}}</view>
			<view class="price">￥<text class="price_text">{{option.price}}</text></view>
			<view class="st">{{option.company_name}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			option:{
				type:Object,
				default:function(){
					return null
				}
			},
		},
		data(){
			return{
				imgStyle:'',
				boxStyle:'',
			}
		},
		computed:{
			img:function(){
				let defImg='/static/temp/cate24.jpg'
				if(this.option){
					let img=this.option.image;
					if(img.length){
						return img[0]
					}else{
						return defImg
					}
				}else{
					return defImg
				}
			},
		},
		created(){
			uni.getSystemInfo({
				success:(e)=>{
					let height=e.windowWidth*0.47
					let style='width:'+height+'px;'
					style+='height:'+height+'px;'
					this.imgStyle = style
					
					let boxStyle = 'margin-left:'+e.windowWidth*0.02+'px;'
					boxStyle+='width:'+ height+'px;'
					boxStyle+='margin-top:20rpx'
					this.boxStyle = boxStyle
				}
			})
			console.log(this.option)
		},
		methods:{
			jump(){
				console.log('jump')
				let url='/pages/index/materials-detail?id='+this.option.id
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	.materials_com{
			background-color: #fff;
		.pro_img{
			width:100%;
			margin-bottom: 0;
		}
		.msg_box{
			padding: 20rpx;
			.title{
				color:#8d98a4;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				white-space: pre-wrap;
				word-break: break-all;
				-webkit-line-clamp: 2;
				line-height: 40rpx;
				height: 80rpx;
			}
			.price{
				color:#1c6ee5;
				margin: 14rpx 0 10rpx;
				.price_text{
					font-size:42rpx;
				}
			}
			.st{
				color:#8d98a4;
				font-size: 24rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				white-space: pre-wrap;
				word-break: break-all;
				-webkit-line-clamp: 1;
				line-height: 40rpx;
			}
		}
	}
</style>
