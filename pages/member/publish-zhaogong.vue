<template>
	<view>
		<zhao-gong></zhao-gong>
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-group">
				<view class="title">标题</view>
				<input placeholder="请输入标题" name="title"></input>
			</view>
			<view class="form-group">
				<view class="title">所需工种</view>
				<input placeholder="请选择所需工种" :value="cateName" disabled="true" @click="togglePopup('open','cate_id')"></input>
				<input type="text" :value="cateId" name="cate_id" class="hidden"/>
				<uni-popup ref="cate_id" :custom="true">
					<popup-cate headerTitle="请选择所需工种" cateType="zhaogong" overstepLengthTips="所需工种" chooseLength="5" @close="togglePopup" @click="confirmChoose"></popup-cate>
				</uni-popup>
			</view>
			<view class="form-group">
				<view class="title">薪资</view>
				<input type="number" name="xinzi" :value="xinzi_value" :placeholder="xinzi_placeholder" @input="bindXinziInput" :disabled="xinzileixing_value=='0'">
				<picker @change="bindXinzileixingChange" :value="xinzileixing_value" :range="xinzileixing" range-key="name" style="width:150upx;position:absolute;right:0;z-index: 99999;">
					<view style="width:150upx">{{xinzileixing[xinzileixing_value].name}} ▼</view>
				</picker>
				<input type="text" class="hidden" name="xinzileixing" :value="xinzileixing_value">
			</view>
			<choose-region @confirm="getChooseRegionVal"></choose-region>
			<input type="text" :value="region_id" name="region_id" class="hidden">
			<view class="form-group">
				<view class="title">联系人</view>
				<input type="text" name="contact" placeholder="请输入联系人" :value="userInfo.name">
			</view>
			<view class="form-group">
				<view class="title">联系电话</view>
				<input type="text" name="phone" placeholder="请输入联系电话" maxlength="11" :value="userInfo.account">
			</view>
			<view class="form-group">
				<view class="title">单位名称</view>
				<input type="text" name="company_name" placeholder="请输入单位名称">
			</view>
			<view class="xq-title">招工详情</view>
			<view class="form-group" style="border:none;">
				<textarea v-if="isTextAreaShow" @input="bindTextArea" :value="textAreaContent" name="content" maxlength="750" placeholder="请输入招工详情（如招工要求、工作内容、工资待遇、结款方式/周期等），有助于您更快、更准确的招到好工人~"/>
				<view class="view-textarea" v-else>{{textAreaContent}}</view>
			</view>
			<upload-image length="6" tips="可上传工地现场照片、工程图纸、承包合同等" @getImageUrl="getImageUrl"></upload-image>
			<publish-tcp @result="getPublishTcpValue" tcpType="zhaogong" v-if="tcpStatus"></publish-tcp>
			<view class="form-group form-button_box">
				<input type="text" name="type" class="hidden" value="1" />
				<input type="text" name="is_tcp" class="hidden" :value="isTcp" v-if="tcpStatus"/>
				<input type="text" class="hidden" name="imgUrl" maxlength="-1" :value="imageList"/>
				<input type="text" name="user_id" class="hidden" :value="userInfo.uid" />
				<button type="default" formType="submit" class="submit-btn">立即发布</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import zhaoGong from "@/components/member/annotation/zhaogong";
	import uniPopup from "@/components/uni-popup/uni-popup";
	import popupCate from "@/components/member/popup-cate";
	import chooseRegion from "@/components/member/choose-region";
	import uploadImage from "@/components/member/upload-image";
	import publishTcp from "@/components/member/publish-tcp";
	var validate = require("../../common/extend/validate.js");
	export default{
		data(){
			return{
				region_id:'',				
				xinzi_placeholder:'格式，例：3000-5000',
				xinzileixing:[
					{name:'面议',value:0},
					{name:'月/元',value:1},
					{name:'日/元',value:2}
				],
				xinzileixing_value:1,
				xinzi_value:'',
				teamIndex:0,
				teamArray:[],
				teamStatus:false,
				teamValue:'',
				cateName:'',
				cateId:'',
				imageList:[],
				isTcp:'',
				tcpStatus:1,
				isTextAreaShow:true,
				textAreaContent:''
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		components:{
			zhaoGong,
			uniPopup,
			popupCate,
			chooseRegion,
			uploadImage,
			publishTcp
		},
		onLoad() {
			
		},
		methods:{
			togglePopup(e,ref) {
				if(typeof e == 'object'){
					this.isTextAreaShow = true;
					this.$refs[e.ref].close();
				}else{
					this.isTextAreaShow = false;
					this.$refs[ref].open();
				}	
			},
			bindXinzileixingChange(e){
				this.xinzi_value = '';
				if(e.detail.value == '0'){
					this.xinzileixing_value = '0';
					this.xinzi_placeholder = '';
				}else if(e.detail.value == '1'){
					this.xinzileixing_value = '1';
					this.xinzi_placeholder = '格式，例：3000-5000';
				}else if(e.detail.value == '2'){
					this.xinzileixing_value = '2';
					this.xinzi_placeholder = '请输入薪资';
				}
			},
			bindXinziInput(e){
				this.xinzi_value = e.detail.value;
			},
			confirmChoose(e){
				this.cateId = e.cateId;
				this.cateName = e.cateName;
			},
			getChooseRegionVal(e){
				this.region_id = e.region_id;
			},
			getImageUrl(e){
				this.imageList = e;
			},
			getPublishTcpValue(e){
				this.isTcp = e.value;
				this.tcpStatus = e.status;
				this.isTextAreaShow = e.isTextAreaShow;
			},
			bindTextArea(e){
				this.textAreaContent = e.detail.value;
			},
			formSubmit: function(e) {
				let formData = e.detail.value;
				let rule = [
                    {name:"title", checkType : "notnull", checkRule:"",  errorMsg:"请输入标题"},
                    {name:"cate_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择所需工种"},
                    {name:"region_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择地区"},
                    {name:"contact", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系人"},
                    {name:"phone", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系电话"},
                    {name:"phone", checkType : "reg", checkRule:"^[1][3-9]{1}[0-9]{9}$",  errorMsg:"请正确输入联系电话"},
                    {name:"company_name", checkType : "notnull", checkRule:"",  errorMsg:"请输入单位名称"},
                    {name:"content", checkType : "notnull", checkRule:"",  errorMsg:"请输入招工详情"},
                ];
				if(this.tcpStatus){
					rule.push({name:"is_tcp", checkType : "notnull", checkRule:"",  errorMsg:"请认真阅读招老板平台发布协议"});
				}
				let result = validate.check(formData,rule);
				if(!result){
					this.func.msg(validate.error);
					return;
				}
				formData.more={
					xinzi:formData.xinzi,
					xinzileixing:formData.xinzileixing
				}
				console.log(formData)
				uni.showLoading({
					title:'发布中',
					mask:true
				});
				this.request.post(this.api.publishZhaoGong,{
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
									url:'publish-zhaogong-list'
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