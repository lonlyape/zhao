<template>
	<view>
		<view class="search">
			<input type="text" placeholder="请输入关键词搜索" :value="inputValue" @input="getInputValue" @confirm="toggleSearch">
			<text @click="toggleSearch">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props:{
			isClearSearchValue:{
				type:Boolean,
				default:false
			},
			searchWay:{
				type:String,
				default:''
			},
			inputValue:{
				type:String,
				default:''
			}
		},
		methods:{
			getInputValue(e){
				this.inputValue = e.detail.value;
			},
			toggleSearch(){
				if(this.searchWay == 'shop'){
					const data = {keyword:this.inputValue};
					this.$emit('searchValue',data);
				}else{
					const filterParam = uni.getStorageSync('filterParam');
					let region_id = '';
					if(filterParam.region.id && filterParam.region.id != undefined){
						region_id = filterParam.region.id;
					}
					const data = {region_id:region_id,keyword:this.inputValue};
					this.$emit('searchValue',data);
				}
			}
		},
		watch:{
			isClearSearchValue(val){
				if(val){
					this.inputValue = '';
				}
			}
		}
	}
</script>

<style lang="scss">
	.search{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		min-height: 100upx;
		padding:0 20upx 15upx 20upx;
		background-color: #0099FF;
		box-shadow: 0 1px 6px #ccc;
		z-index:999;
		display:flex;
		align-items: center;
		input{
			width:85%;
			min-height: 70upx;
			line-height:40upx;
			background-color: #FFFFFF;
			border-radius: 10upx;
			padding:0upx 20upx;
		}
		text{
			color:#FFFFFF;
			font-size:30upx;
			margin-left:20upx;
		}
	}
</style>
