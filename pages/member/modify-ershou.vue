<template>
	<view v-if="data">
		<er-shou></er-shou>
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-group">
				<view class="title">标题</view>
				<input placeholder="请输入标题" name="title" :value="data.title"></input>
			</view>
			<view class="form-group">
				<view class="title">交易目的</view>
				<input placeholder="请选择交易目的" :value="cateName" disabled="true" @click="togglePopup('open','cate_id')"></input>
				<input type="text" :value="cateId" name="cate_id" class="hidden"/>
				<uni-popup ref="cate_id" :custom="true">
					<popup-cate headerTitle="请选择交易目的" cateType="ershou" overstepLengthTips="交易目的" :defaultSelectedVal="data.cate.id" :defaultSelectedName="cateName" @close="togglePopup" @click="confirmChoose"></popup-cate>
				</uni-popup>
			</view>
			<choose-region @confirm="getChooseRegionVal" :defaultSelectedVal="data.region"></choose-region>
			<input type="text" :value="region_id" name="region_id" class="hidden">
			<view class="form-group">
				<view class="title">产品名称</view>
				<input type="text" name="product_name" placeholder="请输入产品名称" :value="data.more.product_name">
			</view>
			<view class="form-group">
				<view class="title">品牌</view>
				<input type="text" name="product_brand" placeholder="请输入品牌" :value="data.more.product_brand">
			</view>
			<view class="form-group">
				<view class="title">型号</view>
				<input type="text" name="product_model" placeholder="请输入型号" :value="data.more.product_model">
			</view>
			<view class="form-group">
				<view class="title">已使用年限</view>
				<input type="text" name="product_term" placeholder="请输入已使用年限" :value="data.more.product_term">
			</view>
			<view class="form-group">
				<view class="title">价格</view>
				<input type="text" name="product_price" placeholder="请输入金额或面议" :value="data.more.product_price">
			</view>
			<view class="form-group">
				<view class="title">联系人</view>
				<input type="text" name="contact" placeholder="请输入联系人" :value="data.contact">
			</view>
			<view class="form-group">
				<view class="title">联系电话</view>
				<input type="text" name="phone" placeholder="请输入联系电话" maxlength="11" :value="data.phone">
			</view>
			<view class="xq-title">产品详情</view>
			<view class="form-group" style="border:none;">
				<textarea v-if="isTextAreaShow" @input="bindTextArea" :value="textAreaContent" name="content" maxlength="750" placeholder="请输入产品详情"/>
				<view class="view-textarea" v-else>{{textAreaContent}}</view>
			</view>
			<upload-image length="6" tips="可上传需要交易的机械图片等" type="ershou" :dataId="data.id" :image="data.image"></upload-image>
			<view class="form-group form-button_box">
				<input type="text" name="id" class="hidden" :value="data.id" />
				<input type="text" name="user_id" class="hidden" :value="userInfo.uid" />
				<button type="default" formType="submit" class="submit-btn">立即修改</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import erShou from "@/components/member/annotation/ershou";
	import uniPopup from "@/components/uni-popup/uni-popup";
	import popupCate from "@/components/member/popup-cate";
	import chooseRegion from "@/components/member/choose-region";
	import uploadImage from "@/components/member/upload-image";
	var validate = require("../../common/extend/validate.js");
	export default{
		data(){
			return{
				data:null,
				region_id:'',
				cateName:'',
				cateId:'',
				isTextAreaShow:true,
				textAreaContent:''
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		components:{
			erShou,
			uniPopup,
			popupCate,
			chooseRegion,
			uploadImage,
		},
		onLoad(option) {
			this.loadData(option);
		},
		methods:{
			async loadData(option){
				let _this = this;
				uni.showLoading({
					title:'数据加载中',
				})
				await this.request.post(this.api.findUsedOneData,{
					data:{used_id:option.ershou_id,user_id:this.userInfo.uid}
				}).then(res => {
					if(res.code){
						this.data = res.data;
						dispose(res.data);
					}else{
						uni.showModal({
							title:'提示',
							content:res.msg,
							showCancel:false,
							success:(e=>{
								if(e.confirm){
									uni.navigateBack();
								}
							})
						})
					}
				}).catch(error =>{
					console.log('Error:',error);
				})
				function dispose(data){
					let region = [];
					if(data.region.province_id != ''){
						region.push(data.region.province_id);
					}
					if(data.region.city_id != ''){
						region.push(data.region.city_id);
					}
					_this.cateId = data.cate.id;
					_this.cateName = data.cate.name;
					_this.region_id = region.join(',');
					_this.textAreaContent =  data.content;
				}
				uni.hideLoading();
			},
			togglePopup(e,ref) {
				if(typeof e == 'object'){
					this.isTextAreaShow = true;
					this.$refs[e.ref].close();
				}else{
					this.isTextAreaShow = false;
					this.$refs[ref].open();
				}	
			},
			confirmChoose(e){
				this.cateId = e.cateId;
				this.cateName = e.cateName;
			},
			getChooseRegionVal(e){
				this.region_id = e.region_id;
			},
			bindTextArea(e){
				this.textAreaContent = e.detail.value;
			},
			formSubmit: function(e) {
				let formData = e.detail.value;
				let rule = [
                    {name:"title", checkType : "notnull", checkRule:"",  errorMsg:"请输入标题"},
                    {name:"cate_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择交易目的"},
                    {name:"region_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择地区"},
                    {name:"contact", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系人"},
                    {name:"product_name", checkType : "notnull", checkRule:"",  errorMsg:"请输入产品名称"},
                    {name:"product_brand", checkType : "notnull", checkRule:"",  errorMsg:"请输入品牌"},
                    {name:"product_model", checkType : "notnull", checkRule:"",  errorMsg:"请输入型号"},
                    {name:"product_term", checkType : "notnull", checkRule:"",  errorMsg:"请输入已使用年限"},
                    {name:"product_price", checkType : "notnull", checkRule:"",  errorMsg:"请输入金额或面议"},
                    {name:"phone", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系电话"},
                    {name:"phone", checkType : "reg", checkRule:"^[1][3-9]{1}[0-9]{9}$",  errorMsg:"请正确输入联系电话"},
                    {name:"content", checkType : "notnull", checkRule:"",  errorMsg:"请输入产品详情"},
                ];
				let result = validate.check(formData,rule);
				if(!result){
					this.func.msg(validate.error);
					return;
				}
				formData.more = {
					product_name:formData.product_name,
					product_brand:formData.product_brand,
					product_model:formData.product_model,
					product_term:formData.product_term,
					product_price:formData.product_price,
				};
				delete formData.product_name;
				delete formData.product_brand;
				delete formData.product_model;
				delete formData.product_term;
				delete formData.product_price;
				uni.showLoading({
					title:'修改中',
					mask:true
				});
				this.request.post(this.api.modifyErShou,{
					data:formData,
				}).then(res=>{
					uni.hideLoading();
					uni.showModal({
						title:'提示',
						content:res.msg,
						showCancel:false,
						success: (res) => {
							if(res.confirm){
								uni.redirectTo({
									url:'publish-ershou-list'
								});
							}
						}
					});
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
		}
	}
</script>
<style>
	
</style>