<template>
	<common-box v-if="option">	
		<view class="contract_com" v-on:click="jump">
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
				</view>
				<view class="row_right">
					<view>{{option.publish_time}}</view>
				</view>
			</view>
			<view class="row row_3">
				<view class="row_left">
					工程列别：{{workType}}
				</view>
			</view>
			<view class="row row_4">
				<view class="row_left">
					预计造价：{{price}}
				</view>
			</view>
			<view class="foot_box">
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
				<view class="right">
					<button class="handler_button" size="mini">联系分包</button>
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
				let addrObj=this.option.region
				addr+=addrObj.city||addrObj.province
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
			price:function(){
				let msg=this.option.more
				return msg.project_cost+' w'
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
	.contract_com{
		@extend .common_com;
	}
</style>
