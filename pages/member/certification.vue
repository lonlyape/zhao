<template>
	<view>
		<view class="certification" v-if="data != '' && !isShow">
			<view><text>状态</text>：<block v-if="data.status==0">您已提交认证信息，审核中</block><block v-else-if="data.status==1">审核不通过</block><block v-else>您已成功实名认证</block></view>
			<view v-if="data.status == 1"><text>不通过原因</text>：{{data.fail_reason}}</view>
			<view v-if="data.status==1 || data.status==2"><text>审核时间</text>：{{data.audit_time}}</view>
			<view><text>提交认证时间</text>：{{data.create_time}}</view>
			<view><text>最后更新时间</text>：{{data.update_time}}</view>
			<button type="primary" size="mini" style="background: #14aaf7;" v-if="data.status==1" @click="recertification">重新去认证</button>
		</view>
		<form @submit="submit" v-if="data == '' || data != '' && data.status == 1 && isShow">
			<view class="form-group">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" name="name" maxlength="10" :value="data.name"></input>
			</view>
			<view class="form-group">
				<view class="title">出生日期</view>
				 <picker mode="date" :value="birthdate" :end="endDate" @change="bindDateChange">
					<input placeholder="请选择出生日期" name="birthdate" :value="birthdate" disabled="true"></input>
				</picker>
			</view>
			<view class="form-group">
				<view class="title">选择民族</view>
				<picker mode="selector" :value="nationalityIndex" :range="nationalityArray" @change="bindNationalityChange">
					<input placeholder="请选择民族" name="nationality" disabled="true" :value="nationalityArray[nationalityIndex]"></input>
				</picker>
			</view>
			<view class="form-group">
				<view class="title">身份证号</view>
				<input type="idcard" placeholder="请输入身份证号" name="id_card" maxlength="18" :value="data.id_card"></input>
			</view>
			<choose-region @confirm="getChooseRegionVal" :defaultSelectedVal="regionObject"></choose-region>
			<input class="hidden" :value="regionName" name="region">
			<input class="hidden" :value="regionId" name="region_id">
			<input class="hidden" :value="regionName" name="region_name">
			<view class="form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入详细地址" name="details_address" :value="data.more.details_address"></input>
			</view>
			<view class="form-group">
				<view class="title">单位名称</view>
				<input placeholder="请输入单位名称" name="company_name" :value="data.company_name"></input>
			</view>
			<view class="form-group">
				<view class="title">专业工种</view>
				<input placeholder="请选择专业工种" name="work" :value="cateName" disabled="true" @click="togglePopup('open','cate_id')"></input>
				<input :value="cateId" name="cate_id" class="hidden"/>
				<input :value="cateName" name="cate_name" class="hidden"/>
				<uni-popup ref="cate_id" :custom="true">
					<popup-cate headerTitle="请选择专业工种" cateType="zhaohuo" overstepLengthTips="专业工种" chooseLength="5" :defaultSelectedVal="cateId" :defaultSelectedName="cateName" @close="togglePopup" @click="confirmCateChoose"></popup-cate>
				</uni-popup>
			</view>
			<!-- <view style="padding:30upx;margin-top:20upx;background: #FFFFFF;line-height: 2;">
				<text style="background-color: #f52626;color: #FFFFFF;padding:10upx;">拍摄身份证要求</text>
				<view style="margin-top:20upx;font-size:28upx;">上传前，先按示范拍好两张照片，一张单独的身份证正面照，一张真人头像同身份证的合影照片。</view>
			</view> -->
			<!-- <view class="form-group" style="height:280upx;margin-top:20upx;text-align: center;padding-top:20upx;">
				<view style="width:50%;height:100%;">
					<image :src="o_id_card_img || '../../static/idcard-z.png'" mode="aspectFit" style="width:100%;height:80%;" @click="chooseImage('id_card_img')"></image>
					<text>请上传身份证正面照片</text>
					<input class="hidden" name="id_card_img" :value="id_card_img">
				</view>
				<view style="width:50%;height:100%;">
					<image :src="o_hand_id_card_img || '../../static/idcard-f.png'" mode="aspectFit" style="width:100%;height:80%;" @click="chooseImage('hand_id_card_img')"></image>
					<text>请上传手持身份证照片</text>
					<input class="hidden" name="hand_id_card_img" :value="hand_id_card_img">
				</view>
			</view> -->
			<view class="form-group">
				<input class="hidden" name="id_card_img" :value="'null'">
				<input class="hidden" name="hand_id_card_img" :value="'null'">
				<!-- <input class="hidden" type="idcard" placeholder="请输入身份证号" name="id_card" maxlength="18" :value="'null'"></input> -->
				<input class="hidden" name="user_id" :value="userInfo.uid">
				<input class="hidden" name="id" :value="data.id" v-if="data.id">
				<button type="default" formType="submit" class="submit-btn">立即提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	function getDate() {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		return `${year}-${month}-${day}`;
	}
	import {mapState,mapMutations} from 'vuex';
	import chooseRegion from "@/components/member/choose-region";
	import uniPopup from "@/components/uni-popup/uni-popup";
	import popupCate from "@/components/member/popup-cate";
	import { pathToBase64, base64ToPath } from '../../common/extend/image-tools.js';
	var validate = require("../../common/extend/validate.js");
	export default{
		data(){
			return {
				isShow:false,
				data:[],
				birthdate:'',
				endDate:getDate(),
				nationalityIndex:null,
				nationalityArray:[],
				regionId:'',
				regionName:'',
				regionObject:{
					province_id:'',
					city_id:'',
				},
				cateId:'',
				cateName:'',
				id_card_img:'',
				hand_id_card_img:'',
				o_id_card_img:'',
				o_hand_id_card_img:'',
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		components:{
			chooseRegion,
			uniPopup,
			popupCate
		},
		onLoad() {
			this.loadData();
		},
		methods:{
			async loadData(){
				let nationalityName = 'nationalityData';
				let _this = this;
				uni.showLoading({
					title:'数据加载中'
				})
				await uni.getStorage({
					key:nationalityName,
					success:(res=>{
						this.nationalityArray = res.data;
					}),
					fail:(err=>{
						this.request.get(this.api.getNationalityData,{
							data:{},
						}).then(res=>{
							this.nationalityArray = res.data;
							uni.setStorage({
								key:nationalityName,
								data:res.data
							})
						})
					})
				})
				await this.request.post(this.api.getCertification,{
					data:{user_id:_this.userInfo.uid}
				}).then(res=>{
					if(res.code){
						this.data = res.data;
						t(res.data)
						function t(data){
							_this.birthdate 		= data.birthdate;
							_this.regionId    		= data.more.region_id;
							_this.regionName   		= data.more.region_name;
							_this.cateId    		= data.more.cate_id;
							_this.cateName  		= data.more.cate_name;
							_this.id_card_img		= data.id_card_img;
							_this.o_id_card_img		= data.id_card_img;
							_this.hand_id_card_img	= data.hand_id_card_img;
							_this.o_hand_id_card_img= data.hand_id_card_img;
							let regionArr			= data.more.region_id.split(',');
							_this.regionObject.province_id = regionArr[0];
							if(regionArr.length > 1){
								_this.regionObject.city_id = regionArr[1];
							}
							for(var i = 0; i < _this.nationalityArray.length; i++){
								if(_this.nationalityArray[i] === data.nationality){
									_this.nationalityIndex = i;
									break;
								}
							}
						}
					}
				})
				uni.hideLoading();
			},
			bindDateChange(e){
				this.birthdate = e.detail.value;
			},
			bindNationalityChange(e){
				this.nationalityIndex = e.detail.value;
			},
			getChooseRegionVal(e){
				this.regionId = e.region_id;
				this.regionName = e.region_name;
			},
			confirmCateChoose(e){
				this.cateId = e.cateId;
				this.cateName = e.cateName;
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
			chooseImage(name){
				let _this = this;
				let oldFile = '';
				if(name === 'id_card_img'){
					oldFile = this.id_card_img;
				}else if(name === 'hand_id_card_img'){
					oldFile = this.hand_id_card_img;
				}
				uni.chooseImage({
				    count: 1, 
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (chooseRes) {
						uni.showLoading({
							title:'上传中',
							mask:true
						});
						pathToBase64(chooseRes.tempFilePaths[0]).then(base64 => {
							_this.request.post(_this.api.base64ToImg,{
								data:{base64ImgStr:base64,oldFile:oldFile}
							}).then(res=>{
								uni.hideLoading();
								if(res.code){
									if(name === 'id_card_img'){
										_this.id_card_img = res.data;
										_this.o_id_card_img = chooseRes.tempFilePaths[0];
									}else if(name === 'hand_id_card_img'){
										_this.hand_id_card_img = res.data;
										_this.o_hand_id_card_img = chooseRes.tempFilePaths[0];
									}
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
							}).catch(error=>{
								console.log(error);
								uni.hideLoading();
								uni.showModal({
									title:'提示',
									content:'网络错误',
									showCancel:false
								})
							})
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
			recertification(){
				this.isShow = true;
			},
			submit(e){
				let formData = e.detail.value;
				let rule = [
				    {name:"name", checkType : "notnull", checkRule:"",  errorMsg:"请输入姓名"},
				    {name:"birthdate", checkType : "notnull", checkRule:"",  errorMsg:"请选择出生日期"},
				    {name:"nationality", checkType : "notnull", checkRule:"",  errorMsg:"请选择民族"},
				    {name:"id_card", checkType : "notnull", checkRule:"",  errorMsg:"请输入身份证号码"},
				    {name:"region", checkType : "notnull", checkRule:"",  errorMsg:"请选择地区"},
				    {name:"details_address", checkType : "notnull", checkRule:"",  errorMsg:"请输入详细地址"},
				    {name:"company_name", checkType : "notnull", checkRule:"",  errorMsg:"请输入单位名称"},
				    {name:"work", checkType : "notnull", checkRule:"",  errorMsg:"请选择专业工种"},
				    {name:"id_card_img", checkType : "notnull", checkRule:"",  errorMsg:"请上传身份证正面"},
				    {name:"hand_id_card_img", checkType : "notnull", checkRule:"",  errorMsg:"请上传身份证手持图"},
				];
				let result = validate.check(formData,rule);
				if(!result){
					this.func.msg(validate.error);
					return;
				}
				formData.more = {
					cate_id:formData.cate_id,
					cate_name:formData.cate_name,
					region_id:formData.region_id,
					region_name:formData.region_name,
					details_address:formData.details_address
				}
				uni.showLoading({
					title:'提交中',
					mask:true
				});
				this.request.post(this.api.certification,{
					data:formData,
				}).then(res=>{
					uni.hideLoading();
					if(res.code){
						if(this.data.id){
							uni.showToast({
								title:'重新提交成功',
							})
						}else{
							uni.showToast({
								title:'提交成功',
							})
						}
						setTimeout(()=>{
							uni.redirectTo({
								url:'certification'
							})
						},1000);
					}else{
						uni.showModal({
							title:'提示',
							content:res.msg,
							showCancel:false,
						});
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
		}
	}
</script>

<style lang="scss">
	.certification{
	    padding:40upx;
	    background: #ffffff;
		view{
			 line-height: 2;
		}
	}
</style>
