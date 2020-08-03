<template>
	<view class="cell_com_com">
		<view class="left" :style="labelStyle">{{label}}</view>
		<view class="right" :style="valueStyle">{{value}}</view>
		<i class="icon-you yticon" :style="arrowStyle" v-if="arrow"></i>
		<view class="border_view"></view>
	</view>
</template>

<script>
	export default{
		props:{
			arrow:{
				type:Boolean,
				default:false
			},
			label:{
				type:String,
				default:'label'
			},
			value:{
				type:[String,Number],
				default:''
			},
			cellStyle:{
				type:Object,
				default:function(){
					return{
						label:'',
						value:'',
						arrow:''
					}
				}
			}
		},
		computed:{
			labelStyle:function(){
				let cellStyle=this.cellStyle
				if(cellStyle&& cellStyle.label){
					return cellStyle.label
				}else{
					return''
				}
			},
			valueStyle:function(){
				let cellStyle=this.cellStyle
				if(cellStyle&& cellStyle.value){
					return cellStyle.value
				}else{
					return''
				}
			},
			arrowStyle:function(){
				let cellStyle=this.cellStyle
				if(cellStyle&& cellStyle.arrow){
					return cellStyle.arrow
				}else{
					return''
				}
			},
		}
	}
</script>

<style lang="scss" scoped="cell_com_com">
	.cell_com_com{
		display: flex;
		background-color: #fff;
		position: relative;
		padding:30rpx;
		.left{
			color:#323232;
			font-size:30rpx;
		}
		.right{
			flex:1;
			color:#565656;
			text-align: right;
			+.yticon{
				margin-left:10rpx;
			}
		}
		.border_view{
			position: absolute;
			left:30rpx;
			right: 0;
			height: 1rpx;
			background-color: $uni-border-color;
			bottom: 0;
		}
	}
</style>
