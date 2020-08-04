<template>
	<view>
		<view class="form-group">
			<view class="title" style="width:210upx;">
				{{title}}
			</view>
			<view>
				<view v-if="length > 1">{{imageList.length}} / {{length}}</text></view>
				<!-- <view>{{tips}}</view> -->
			</view>
		</view>
		<view class="image-group">
			<view class="solids" v-for="(item,index) in imageList" :key="index" @click="ViewImage" :data-url="item">
				<text class="delete" @click.stop="DelImg(index)">X</text>
				<image :src="item" mode=""></image>
			</view>
			<view class="solids choose" @click="ChooseImage" v-if="imageList.length < length">
				+
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import { pathToBase64, base64ToPath } from '../../common/extend/image-tools.js'
	export default{
		data(){
			return{
				imageList:[],
				successList:[]
			}
		},
		name:'upload-image',
		props:{
			length:{
				type:Number,
				default:4
			},
			tips:{
				type:String,
				default:''
			},
			type:{
				type:String,
				default:'',
			},
			image:{
				type:Array,
				default:function(){
					return [];
				}
			},
			dataId:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:'上传图片'
			},
			more_file_name:{
				type:String,
				default:''
			},
			imageStr:{
				type:String,
				default:''
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		onReady() {
			setTimeout(()=>{
				if(this.dataId != ''){
					if(this.image.length){
						this.imageList = this.imageList.concat(this.image);
						this.successList = this.successList.concat(this.image);
					}else if(this.imageStr){
						let img = this.imageStr.split(',');
						this.imageList = this.imageList.concat(img);
						this.successList = this.successList.concat(img);
					}
				}
			},200);
		},
		created(){
			
		},
		methods:{
			ChooseImage() {
				let _this = this;
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'], // album 从相册选图，camera 使用相机，默认二者都有
					success: (chooseRes) => {
						uni.showLoading({
							title:'上传中',
							mask:true
						});
						pathToBase64(chooseRes.tempFilePaths[0]).then(base64 => {
							if(_this.dataId != ''){
								let url = _this.type == 'ershou' ? _this.api.modifyUsedImage : _this.api.modifyWorkImage;
								let type = _this.type == 'ershou' ? 'used' : 'work';
								if(_this.type=='yingye'){
									url=_this.api.modifyWorkImage2
								}
								let data = {base64ImgStr:base64,data_id:_this.dataId,type:type,user_id:_this.userInfo.uid};
								if(this.more_file_name){
									data.more_file_name = this.more_file_name;
								}
								_this.request.post(url,{
									data:data
								}).then(res=>{
									uni.hideLoading();
									if(res.code){
										uni.showToast({
											title:res.msg
										})
										_this.successList.push(res.data);
										if (_this.imageList.length != 0) {
											_this.imageList = _this.imageList.concat(chooseRes.tempFilePaths);
										} else {
											_this.imageList = chooseRes.tempFilePaths;
										}
										_this.$emit('getImageUrl',_this.successList);
									}else{
										uni.showModal({
											title:'提示',
											content:res.msg,
											showCancel:false
											
										})
									}
								})
							}else{
								let url=_this.api.base64ToImg
								if(_this.type=='yingye'){
									url=_this.api.modifyWorkImage2
								}
								_this.request.post(url,{
									data:{base64ImgStr:base64}
								}).then(res=>{
									uni.hideLoading();
									if(res.code){
										_this.successList.push(res.data);
										if (_this.imageList.length != 0) {
											_this.imageList = _this.imageList.concat(chooseRes.tempFilePaths);
										} else {
											_this.imageList = chooseRes.tempFilePaths;
										}
										_this.$emit('getImageUrl',_this.successList);
									}else{
										uni.showModal({
											title:'提示',
											content:res.msg,
											showCancel:false
										})
									}
								}).catch(err=>{
									console.log(err);
									uni.hideLoading();
									uni.showModal({
										title:'提示',
										content:'网络错误',
										showCancel:false
									})
								})
							}
						}).catch(error => {
							console.log(error);
							uni.showModal({
								title:'提示',
								content:error,
								showCancel:false
							})
						});
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imageList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(index) {
				uni.showModal({
					title: '提示',
					content: '确定要删除此图片吗？',
					success: res => {
						if (res.confirm) {
							if(this.dataId != ''){
								let url = this.type == 'ershou' ? this.api.deleteUsedImage : this.api.deleteWorkImage;
								let file_path = this.successList[index];
								let data_id = this.dataId;
								let user_id = this.userInfo.uid;
								let type = this.type == 'ershou' ? 'used' : 'work';
								let data = {file_path:file_path,data_id:data_id,type:type,user_id:user_id};
								if(this.more_file_name){
									data.more_file_name = this.more_file_name;
								}
								this.request.post(url,{
									data:data
								}).then(res=>{
									if(res.code){
										this.imageList.splice(index, 1);
										this.successList.splice(index, 1);
										uni.showToast({
											title:res.msg
										})
									}else{
										uni.showModal({
											title:'提示',
											content:res.msg,
											showCancel:false
										})
									}
								})
							}else{
								this.imageList.splice(index, 1);
								this.successList.splice(index, 1);
								this.$emit('getImageUrl',this.successList);
							}
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.image-group{
		padding:12upx 30rpx;
		background-color:#fff;
		display: flex;
		flex-wrap: wrap;
		
		.solids{
			position: relative;
			text-align: center;
			width:25%;
			height:160upx;
			overflow: hidden;
			padding:10upx;
			image{
				max-width:100%;
				max-height: 100%;
			}
			.delete{
				background: rgba(0, 0, 0, 0.5);
				padding: 2upx 12upx;
				color: #ffffff;
				position: absolute;
				top: 0;
				right:6upx;
				z-index: 1;
			}
		}
		.choose{
			padding: 0;
			line-height: 160upx;
			background-color:#f3f3f3;
			font-size: 60rpx;
		}
	}
</style>
