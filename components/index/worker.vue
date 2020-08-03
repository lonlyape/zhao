<template>
	<common-box v-if="option">	
		<view class="worker_com" v-on:click="jump">
			<view class="row row_1">
				<view class="row_left">
					<texe class="title">{{option.title}}</texe>
				</view>
				<view class="row_right" v-if="option.is_new">
					<view class="tab">NEW</view>
				</view>
			</view>
			<view class="foot_box none_border">
				<view class="left">
					<image class="left_img" v-bind:src="user.head_img" mode=""></image>
				</view>
				<view class="center">
					<view class="p_1">
						{{user.name}}
						<text class="real_name" v-if="user.is_certification">已实名</text>
						<text class="status_t">{{option.status_text}}</text>
					</view>
					<view class="p_2">{{option.phone}}</view>
				</view>
			</view>
			<view class="row row_last">
				<view class="row_left">
					{{option.content}}
				</view>
			</view>
			<view class="foot_box">
				<view class="center">
					<view class="row">
						<view class="row_left left_relative">
							<uni-icon type="location-filled" size="24" color="#acacac" style="display: inline-block;vertical-align: middle;"></uni-icon>
							<texe>{{addr}}</texe>
							<text class="tub_text">{{option.publish_time}}</text>
						</view>
					</view>
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
	export default{
		components:{commonBox,uniIcon},
		props:{
			option:{
				type:Object,
			}
		},
		computed:{
			addr:function(){
				let addr=''
				let addrStr=this.option.region
				addr+=addrStr||this.option.region_list2
				return addr
			},
			user:function(){
				return this.option.user
			},
			workType:function(){
				let workTypeList=this.option.cate;
				let str=''
				workTypeList.forEach(one=>{
					str+=str?','+one.name:one.name
				})
				return str
			},
			xinzi:function(){
				let msg=this.option.more
				if(msg){
					return msg.xinzi_text+msg.xinzileixing_text
				}else{
					return '面议/月'
				}
			}
		},
		methods:{
			jump:function(){
				let url='/pages/work/details?work_id='+this.option.id
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './common/com.scss';
	.worker_com{
		@extend .common_com;
		.row{
			&.row_last{
				margin-top:20rpx;
				margin-bottom: 28rpx;
			}
		}
		.none_border{
			border:none;
			margin-top: 8rpx;
		}
		.tub_text{
			margin-left:10rpx;
		}
			
	}
</style>
