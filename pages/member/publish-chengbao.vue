<template>
	<view>
		<cheng-bao></cheng-bao>
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-group">
				<view class="title">标题</view>
				<input placeholder="请输入标题" name="title"></input>
			</view>
			<view class="form-group">
				<view class="title">工程类别</view>
				<input placeholder="请选择工程类别" :value="cateName" disabled="true" @click="togglePopup('open','cate_id')"></input>
				<input type="text" :value="cateId" name="cate_id" class="hidden"/>
				<uni-popup ref="cate_id" :custom="true">
					<popup-cate headerTitle="请选择工程类别" cateType="chengbao" overstepLengthTips="工程类别" chooseLength="3" @close="togglePopup" @click="confirmChoose"></popup-cate>
				</uni-popup>
			</view>
			<radio-group name="contract_manner" >
				<view class="form-group">
					<view class="title">承包方式</view>
					<label class="radio">
						<radio value="1" />
						清包工
					</label>
					<label class="radio">
						<radio value="2" />
						包工包料
					</label>
					<label class="radio">
						<radio value="3" />
						包工包辅材
					</label>
				</view>
			</radio-group>
			<radio-group name="is_insurance">
				<view class="form-group">
					<view class="title">是否需要保险</view>
					<label class="radio">
						<radio value="1"  />
						需要
					</label>
					<label class="radio">
						<radio value="0"/>
						不需要
					</label>
				</view>
			</radio-group>
			<radio-group name="is_labor_corp">
				<view class="form-group">
					<view class="title">是否需要劳务合同</view>
					<label class="radio">
						<radio value="1"  />
						需要
					</label>
					<label class="radio">
						<radio value="0"/>
						不需要
					</label>
				</view>
			</radio-group>
			<radio-group name="bidding_type">
				<view class="form-group">
					<view class="title">发包类型</view>
					<label class="radio">
						<radio value="私人发包"  />
						私人发包
					</label>
					<label class="radio">
						<radio value="企业发包"/>
						企业发包
					</label>
				</view>
			</radio-group>
			<view class="form-group">
				<view class="title">预计工程造价</view>
				<input type="number" name="project_cost" placeholder="请输入预计工程造价" maxlength="5">
				<text>W</text>
			</view>
			<choose-region @confirm="getChooseRegionVal"></choose-region>
			<input type="text" :value="region_id" name="region_id" class="hidden">
			<choose-team @confirm="getChooseTeamVal" type="chengbao"></choose-team>
			<input type="text" :value="team" name="team" class="hidden">
			<view class="form-group form_margin_top">
				<view class="title">联系人</view>
				<input type="text" name="contact" placeholder="请输入联系人" :value="userInfo.name">
			</view>
			<view class="form-group">
				<view class="title">联系电话</view>
				<input type="text" name="phone" placeholder="请输入联系电话" maxlength="11" :value="userInfo.account">
			</view>
			<view class="form-group">
				<view class="title">发包单位</view>
				<input type="text" name="company_name" placeholder="请输入发包单位或个人">
			</view>
			<view class="xq-title">发包工程详情</view>
			<view class="form-group" style="border:none;">
				<textarea v-if="isTextAreaShow" @input="bindTextArea" :value="textAreaContent" name="content" maxlength="750" placeholder="请输入发包工程详情（如建筑规模、面积、计价方式、承包专业等）"/>
				<view class="view-textarea" v-else>{{textAreaContent}}</view>
			</view>
			<upload-image length="6"  @getImageUrl="getImageUrl"></upload-image>
			<publish-tcp @result="getPublishTcpValue" tcpType="chengbao" v-if="tcpStatus"></publish-tcp>
			<view class="form-group form-button_box">
				<input type="text" name="type" class="hidden" value="3" />
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
	import chengBao from "@/components/member/annotation/chengbao";
	import uniPopup from "@/components/uni-popup/uni-popup";
	import popupCate from "@/components/member/popup-cate";
	import chooseRegion from "@/components/member/choose-region";
	import chooseTeam from "@/components/member/choose-team";
	import uploadImage from "@/components/member/upload-image";
	import publishTcp from "@/components/member/publish-tcp";
	var validate = require("../../common/extend/validate.js");
	export default{
		data(){
			return{
				region_id:'',
				team:'',
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
			chengBao,
			uniPopup,
			popupCate,
			chooseRegion,
			chooseTeam,
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
			confirmChoose(e){
				this.cateId = e.cateId;
				this.cateName = e.cateName;
			},
			getChooseRegionVal(e){
				this.region_id = e.region_id;
			},
			getChooseTeamVal(e){
				this.team = e.team;
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
                    {name:"cate_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择工程类别"},
                    {name:"contract_manner", checkType : "notnull", checkRule:"",  errorMsg:"请选择承包方式"},
                    {name:"is_insurance", checkType : "notnull", checkRule:"",  errorMsg:"请选择是否需要保险"},
                    {name:"is_labor_corp", checkType : "notnull", checkRule:"",  errorMsg:"请选择是否需要劳务公司"},
                    {name:"bidding_type", checkType : "notnull", checkRule:"",  errorMsg:"请选择发包类型"},
                    {name:"project_cost", checkType : "notnull", checkRule:"",  errorMsg:"请输入预计工程造价"},
                    {name:"project_cost", checkType : "int", checkRule:"",  errorMsg:"请正确输入预计工程造价"},
                    {name:"region_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择地区"},
                    {name:"team", checkType : "notnull", checkRule:"",  errorMsg:"请选择所需人员构成"},
                    {name:"contact", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系人"},
                    {name:"phone", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系电话"},
                    {name:"phone", checkType : "reg", checkRule:"^[1][3-9]{1}[0-9]{9}$",  errorMsg:"请正确输入联系电话"},
                    {name:"content", checkType : "notnull", checkRule:"",  errorMsg:"请输入发包工程详情"},
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
					contract_manner:formData.contract_manner,
					is_insurance:formData.is_insurance,
					is_labor_corp:formData.is_labor_corp,
					bidding_type:formData.bidding_type,
					project_cost:formData.project_cost,
				};
				delete formData.is_insurance;
				delete formData.is_labor_corp;
				delete formData.contract_manner;
				delete formData.bidding_type;
				delete formData.project_cost;
				uni.showLoading({
					title:'发布中',
					mask:true
				});
				this.request.post(this.api.publishChengBao,{
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
									url:'publish-chengbao-list'
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