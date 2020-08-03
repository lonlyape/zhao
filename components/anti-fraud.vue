<template>
	<view>
		<view style="padding:20upx;">
			<text style="color:#FF6000">温馨提示：</text>此信息由招老板提供，请您<text style="color:#14aaf7;" @click="read">认真阅读防骗手册</text>。
		</view>
		<view class="cu-mask" v-show="isShow"></view>
		<view class="cu-modal" v-show="isShow">
			<view class="cu-modal__hd">
				<text class="cu-modal__title">防骗手册</text>
			</view>
			<view class="cu-modal__bd">
				<rich-text :nodes="content"></rich-text>
			</view>
			<view class="cu-modal__ft">
				<view class="cu-modal__btn cu-modal__btn_default" @click="close">关闭</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:'',
				isShow:false,
			}
		},
		created() {
			this.loadData();
		},
		methods:{
			async loadData(){
				let _this = this;
				await this.request.post(this.api.getAntiFraud,{
					data:{isApi:true},
				}).then(res=>{
					_this.content = res.data.content;
				})
			},
			read(){
				this.isShow = true;
			},
			close(){
				this.isShow = false;
			}
		}
	}
</script>

<style>

</style>
