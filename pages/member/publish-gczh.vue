<template>
	<view>
		<gczh></gczh>
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-group">
				<view class="title">标题</view>
				<input placeholder="请输入标题" name="title"></input>
			</view>
			<view class="form-group">
				<view class="title">厂工工种</view>
				<input placeholder="请输入厂工工种" name="gongchanggongzhong"></input>
			</view>
			<view class="form-group">
				<view class="title">接活区域</view>
				<input placeholder="请选择接活区域" :value="regionName" disabled="true" @click="togglePopup('open','region_id')"></input>
				<input type="text" :value="regionId" name="region_id" class="hidden"/>
				<uni-popup ref="region_id" :custom="true">
					<popup-region headerTitle="请选择接活区域" overstepLengthTips="接活区域" chooseLength="3" @close="togglePopup" @click="confirmRegionChoose"></popup-region>
				</uni-popup>
			</view>
			<view class="form-group">
				<view class="title">联系人</view>
				<input type="text" name="contact" placeholder="请输入联系人" :value="userInfo.name">
			</view>
			<view class="form-group">
				<view class="title">联系电话</view>
				<input type="text" name="phone" placeholder="请输入联系电话" maxlength="11" :value="userInfo.account">
			</view>
			<view class="form-group">
				<view class="title">曾工作单位</view>
				<input placeholder="请输入曾经工作过的单位" name="cenggongzuodanwei"></input>
			</view>
			<view class="xq-title">厂工详情</view>
			<view class="form-group" style="border:none;">
				<textarea v-if="isTextAreaShow" @input="bindTextArea" :value="textAreaContent" name="content" maxlength="750" placeholder="请输入详情（如会做什么、工作经历、期望工资、期望结款方式/周期等），有助于您更快、更准确的找到好工作~"/>
				<view class="view-textarea" v-else>{{textAreaContent}}</view>
			</view>
			<upload-image length="1" title="身份证信息" tips="请上传手持身份证照片,身份证信息只用于平台内部审核,不会对外展示" @getImageUrl="getIdCardInfo"></upload-image>
			<upload-image length="6" tips="可上传做过的工程照片、完工现场照片等" @getImageUrl="getImageUrl"></upload-image>
			<publish-tcp @result="getPublishTcpValue" tcpType="zhaohuo" v-if="tcpStatus"></publish-tcp>
			<view class="form-group form-button_box">
				<input type="text" name="type" class="hidden" value="4" />
				<input type="text" name="is_tcp" class="hidden" :value="isTcp" v-if="tcpStatus"/>
				<input type="text" class="hidden" name="imgUrl" maxlength="-1" :value="imageList"/>
				<input type="text" class="hidden" name="hand_id_card_url" maxlength="-1" :value="idCardInfo"/>
				<input type="text" name="user_id" class="hidden" :value="userInfo.uid" />
				<button type="default" formType="submit" class="submit-btn">立即发布</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import gczh from "@/components/member/annotation/gczh";
	import uniPopup from "@/components/uni-popup/uni-popup";
	import popupRegion from "@/components/member/popup-region";
	import uploadImage from "@/components/member/upload-image";
	import publishTcp from "@/components/member/publish-tcp";
	var validate = require("../../common/extend/validate.js");
	export default{
		data(){
			return{
				regionId:'',
				regionName:'',
				imageList:[],
				idCardInfo:[],
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
			gczh,
			uniPopup,
			popupRegion,
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
			confirmRegionChoose(e){
				this.regionId = e.regionId;
				this.regionName = e.regionName;
			},
			getImageUrl(e){
				this.imageList = e;
			},
			getIdCardInfo(e){
				this.idCardInfo = e;
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
                    {name:"gongchanggongzhong", checkType : "notnull", checkRule:"",  errorMsg:"请输入厂工工种"},
                    {name:"region_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择接活区域"},
                    {name:"contact", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系人"},
                    {name:"phone", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系电话"},
                    {name:"phone", checkType : "reg", checkRule:"^[1][3-9]{1}[0-9]{9}$",  errorMsg:"请正确输入联系电话"},
                    {name:"content", checkType : "notnull", checkRule:"",  errorMsg:"请输入详情"},
                ];
				if(this.tcpStatus){
					rule.push({name:"is_tcp", checkType : "notnull", checkRule:"",  errorMsg:"请认真阅读招老板平台发布协议"});
				}
				let result = validate.check(formData,rule);
				if(!result){
					this.func.msg(validate.error);
					return;
				}
				formData.more = {
					gongchanggongzhong:formData.gongchanggongzhong,
					cenggongzuodanwei:formData.cenggongzuodanwei,
				};
				delete formData.gongchanggongzhong;
				delete formData.cenggongzuodanwei;
				uni.showLoading({
					title:'发布中',
					mask:true
				});
				this.request.post(this.api.publishGczh,{
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
									url:'publish-gczh-list'
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