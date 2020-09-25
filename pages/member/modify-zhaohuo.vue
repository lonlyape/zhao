<template>
	<view v-if="data">
		<zhao-huo></zhao-huo>
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-group">
				<view class="title">找活需求</view>
				<input placeholder="请输入找活需求" name="title" :value="data.title"></input>
			</view>
			<view class="form-group">
				<view class="title">专业工种</view>
				<input placeholder="请选择专业工种" :value="cateName" disabled="true" @click="togglePopup('open','cate_id')"></input>
				<input type="text" :value="cateId" name="cate_id" class="hidden"/>
				<uni-popup ref="cate_id" :custom="true">
					<popup-cate headerTitle="请选择专业工种" cateType="zhaohuo" overstepLengthTips="专业工种" chooseLength="3" :defaultSelectedVal="data.cate.id" :defaultSelectedName="cateName" @close="togglePopup" @click="confirmCateChoose"></popup-cate>
				</uni-popup>
			</view>
			<view class="form-group">
				<view class="title">接活区域</view>
				<input placeholder="请选择接活区域" :value="regionName" disabled="true" @click="togglePopup('open','region_id')"></input>
				<input type="text" :value="regionId" name="region_id" class="hidden"/>
				<uni-popup ref="region_id" :custom="true">
					<popup-region headerTitle="请选择接活区域" overstepLengthTips="接活区域" chooseLength="3" :defaultSelectedVal="data.region.id" :defaultSelectedName="regionName" @close="togglePopup" @click="confirmRegionChoose"></popup-region>
				</uni-popup>
			</view>
			<choose-team @confirm="getChooseTeamVal" type="zhaohuo" :defaultSelectedVal="data.team"></choose-team>
			<input type="text" :value="team" name="team" class="hidden">
			<view class="form-group">
				<view class="title">联系人</view>
				<input type="text" name="contact" placeholder="请输入联系人" :value="data.contact">
			</view>
			<view class="form-group">
				<view class="title">联系电话</view>
				<input type="text" name="phone" placeholder="请输入联系电话" maxlength="11" :value="data.phone">
			</view>
			<view class="xq-title">找活详情</view>
			<view class="form-group" style="border:none;">
				<textarea v-if="isTextAreaShow" @input="bindTextArea" :value="textAreaContent" name="content" maxlength="750" placeholder="请输入找活详情（如会做什么、工作经历、期望工资、期望结款方式/周期等），有助于您更快、更准确的找到好工作~"/>
				<view class="view-textarea" v-else>{{textAreaContent}}</view>
			</view>
			<upload-image title="上传工程照片" length="6" tips="可上传做过的工程照片、完工现场照片等" :dataId="data.id" :image="data.image"></upload-image>
			<!-- <upload-image title="上传凭证" length="1" @getImageUrl="getIdCardImageUrl" :dataId="data.id" :image="[data.more.hand_id_card]" more_file_name="hand_id_card"></upload-image> -->
			<view class="form-group form-button_box">
				<input type="text" name="id" class="hidden" :value="data.id" />
				<input type="text" name="type" class="hidden" :value="data.type" />
				<input type="text" name="user_id" class="hidden" :value="userInfo.uid" />
				<!-- <input type="text" class="hidden" name="hand_id_card_url" maxlength="-1" :value="idCardImageList"/> -->
				<button type="default" formType="submit" class="submit-btn">立即修改</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import zhaoHuo from "@/components/member/annotation/zhaohuo";
	import uniPopup from "@/components/uni-popup/uni-popup";
	import popupCate from "@/components/member/popup-cate";
	import popupRegion from "@/components/member/popup-region";
	import chooseTeam from "@/components/member/choose-team";
	import uploadImage from "@/components/member/upload-image";
	var validate = require("../../common/extend/validate.js");
	export default{
		data(){
			return{
				data:null,
				team:'',
				cateId:'',
				cateName:'',
				regionId:'',
				regionName:'',
				isTextAreaShow:true,
				idCardImageList:[],
				textAreaContent:''
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		components:{
			zhaoHuo,
			uniPopup,
			popupCate,
			popupRegion,
			chooseTeam,
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
				await this.request.post(this.api.findWorkOneData,{
					data:{work_id:option.work_id,user_id:this.userInfo.uid}
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
					_this.team = data.team;
					_this.cateId = data.cate.id;
					_this.cateName = data.cate.name;
					_this.regionId = data.region.id;
					_this.regionName = data.region.name;
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
			confirmCateChoose(e){
				this.cateId = e.cateId;
				this.cateName = e.cateName;
			},
			confirmRegionChoose(e){
				this.regionId = e.regionId;
				this.regionName = e.regionName;
			},
			getChooseTeamVal(e){
				this.team = e.team;
			},
			bindTextArea(e){
				this.textAreaContent = e.detail.value;
			},
			getIdCardImageUrl(e){
				this.idCardImageList = e;
			},
			formSubmit: function(e) {
				let formData = e.detail.value;
				let rule = [
                    {name:"title", checkType : "notnull", checkRule:"",  errorMsg:"请输入标题"},
                    {name:"cate_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择专业工种"},
                    {name:"region_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择接活区域"},
                    {name:"team", checkType : "notnull", checkRule:"",  errorMsg:"请选择人员构成"},
                    {name:"contact", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系人"},
                    {name:"phone", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系电话"},
                    {name:"phone", checkType : "reg", checkRule:"^[1][3-9]{1}[0-9]{9}$",  errorMsg:"请正确输入联系电话"},
                    {name:"content", checkType : "notnull", checkRule:"",  errorMsg:"请输入找活详情"},
                ];
				let result = validate.check(formData,rule);
				if(!result){
					this.func.msg(validate.error);
					return;
				}
				uni.showLoading({
					title:'修改中',
					mask:true
				});
				this.request.post(this.api.modifyZhaoHuo,{
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
									url:'publish-zhaohuo-list'
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