<template>
	<view>
		<gczp></gczp>
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-group">
				<view class="title">标题</view>
				<input placeholder="请输入标题" name="title"></input>
			</view>
			<view class="form-group">
				<view class="title">招聘人数</view>
				<input type="number" placeholder="请输入招聘人数" v-if="team_value != '0'" @input="bindTeamInput">
				<input type="text" value="不限" disabled="" v-else>
				<input class="hidden" name="team" :value="team_value"></input>
				<checkbox-group @change="bindTeamChange">
					<lable>
						<checkbox value="0" />不限
					</lable>
				</checkbox-group>
			</view>
			<view class="form-group">
				<view class="title">薪资</view>
				<input type="number" name="xinzi" :value="xinzi_value" :placeholder="xinzi_placeholder" @input="bindXinziInput"
				 :disabled="xinzileixing_value=='0'">
				<picker @change="bindXinzileixingChange" :value="xinzileixing_value" :range="xinzileixing" range-key="name" style="width:150upx;position:absolute;right:0;z-index: 99999;">
					<view style="width:150upx">{{xinzileixing[xinzileixing_value].name}} ▼</view>
				</picker>
				<input type="text" class="hidden" name="xinzileixing" :value="xinzileixing_value">
			</view>
			<view class="form-group">
				<view class="title">学历要求</view>
				<picker @change="bindEducationChange" :value="xueliyaoqiu_index" :range="gczpRestsData.education">
					<view v-if="xueliyaoqiu_status">{{gczpRestsData.education[xueliyaoqiu_index]}}</view>
					<input type="text" disabled="disabled" placeholder="请选择学历要求" v-else>
				</picker>
				<input type="text" class="hidden" name="xueliyaoqiu" :value="xueliyaoqiu_value">
			</view>
			<view class="form-group">
				<view class="title">工作年限</view>
				<picker @change="bindTermChange" :value="gongzuonianxian_index" :range="gczpRestsData.term">
					<view v-if="gongzuonianxian_status">{{gczpRestsData.term[gongzuonianxian_index]}}</view>
					<input type="text" disabled="disabled" placeholder="请选择工作年限" v-else>
				</picker>
				<input type="text" class="hidden" name="gongzuonianxian" :value="gongzuonianxian_value">
			</view>
			<view class="form-group">
				<view class="title">工作类型</view>
				<checkbox-group @change="bindGongzuoleixingChange">
					<view v-for="(item,index) in gczpRestsData.jobType" :key="index" style="margin: 15upx;display: inline-block;">
						<checkbox :value="item" />{{item}}
					</view>
				</checkbox-group>
				<input type="text" class="hidden" name="gongzuoleixing" :value="gongzuoleixing_value" />
			</view>
			<view class="form-group">
				<view class="title">职位福利</view>
				<checkbox-group @change="bindZhiweifuliChange">
					<view v-for="(item,index) in gczpRestsData.welfare" :key="index" style="margin: 15upx;display: inline-block;">
						<checkbox :value="item" />{{item}}
					</view>
				</checkbox-group>
				<input type="text" class="hidden" name="zhiweifuli" :value="zhiweifuli_value" />
			</view>
			<view class="form-group">
				<view class="title">联系人</view>
				<input type="text" name="contact" placeholder="请输入联系人" :value="userInfo.name">
			</view>
			<view class="form-group">
				<view class="title">联系电话</view>
				<input type="text" name="phone" placeholder="请输入联系电话" maxlength="11" :value="userInfo.account">
			</view>
			<choose-region @confirm="getChooseRegionVal" title="工作地址"></choose-region>
			<input type="text" :value="region_id" name="region_id" class="hidden">
			<view class="form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入详细地址" name="details_address"></input>
			</view>
			<view class="xq-title">直聘详情</view>
			<view class="form-group" style="border:none;">
				<textarea v-if="isTextAreaShow" @input="bindTextArea" :value="textAreaContent" name="content" maxlength="750"
				 placeholder="请输入详情，（比如：尽可能详细描述岗位、薪资待遇、工厂需求情况，便于应聘者了解）" />
				<view class="view-textarea" v-else>{{textAreaContent}}</view>
			</view>
			<publish-tcp @result="getPublishTcpValue" tcpType="chengbao" v-if="tcpStatus"></publish-tcp>
			<view class="form-group form-button_box">
				<input type="text" name="type" class="hidden" value="5" />
				<input type="text" name="is_tcp" class="hidden" :value="isTcp" v-if="tcpStatus"/>
				<input type="text" name="user_id" class="hidden" :value="userInfo.uid" />
				<button type="default" formType="submit" class="submit-btn">立即发布</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {mapState} from "vuex";
	import gczp from "@/components/member/annotation/gczp";
	import uniPopup from "@/components/uni-popup/uni-popup";
	import chooseRegion from "@/components/member/choose-region";
	import publishTcp from "@/components/member/publish-tcp";
	var validate = require("../../common/extend/validate.js");
	export default{
		data(){
			return{
				region_id:'',
				team_value:'',
				xinzileixing:[
					{name:'面议',value:0},
					{name:'月/元',value:1},
					{name:'日/元',value:2}
				],
				xinzi_placeholder:'格式，例：3000-5000',
				xinzileixing_value:1,
				xinzi_value:'',
				gczpRestsData:{},
				xueliyaoqiu_status:false,
				xueliyaoqiu_index:0,
				xueliyaoqiu_value:'',
				gongzuonianxian_status:false,
				gongzuonianxian_index:0,
				gongzuonianxian_value:'',
				gongzuoleixing_value:[],
				zhiweifuli_value:[],
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
			gczp,
			uniPopup,
			chooseRegion,
			publishTcp
		},
		onLoad() {
			let storageName = 'gczpRestsData';
			let _this = this;
			function setData(data){
				if(data.welfare){
					let list=data.welfare.filter(one=>one.length>2)
					let list_tow=data.welfare.filter(one=>one.length<=2)
					list.splice(2,0,list_tow[0])
					list.splice(5,0,list_tow[1])
					
					data.welfare=list
				}
			}
			uni.getStorage({
				key:storageName,
				success:(res=>{
					_this.gczpRestsData = res.data;
					setData(_this.gczpRestsData)
				}),
				fail:(err=>{
					this.request.get(this.api.getGczpRestsData,{
						data:{},
					}).then(res=>{
						_this.gczpRestsData = res.data;
						setData(_this.gczpRestsData)
						uni.setStorage({
							key:storageName,
							data:res.data
						})
					})
				})
			})
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
			bindTeamInput(e){
				this.team_value = e.detail.value;
			},
			bindTeamChange(e){
				if(e.detail.value.length){
					this.team_value = '0';
				}else{
					this.team_value = '';
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
			bindEducationChange(e){
				this.xueliyaoqiu_status = true;
				this.xueliyaoqiu_index = e.detail.value;
				this.xueliyaoqiu_value = this.gczpRestsData.education[e.detail.value];
			},
			bindTermChange(e){
				this.gongzuonianxian_status = true;
				this.gongzuonianxian_index = e.detail.value;
				this.gongzuonianxian_value = this.gczpRestsData.term[e.detail.value];
			},
			bindGongzuoleixingChange(e){
				this.gongzuoleixing_value = e.detail.value;
			},
			bindZhiweifuliChange(e){
				this.zhiweifuli_value = e.detail.value;
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
                    {name:"team", checkType : "notnull", checkRule:"",  errorMsg:"请输入招聘人数"},
                    {name:"xueliyaoqiu", checkType : "notnull", checkRule:"",  errorMsg:"请选择学历要求"},
                    {name:"gongzuonianxian", checkType : "notnull", checkRule:"",  errorMsg:"请选择工作年限"},
                    {name:"contact", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系人"},
                    {name:"phone", checkType : "notnull", checkRule:"",  errorMsg:"请输入联系电话"},
                    {name:"phone", checkType : "reg", checkRule:"^[1][3-9]{1}[0-9]{9}$",  errorMsg:"请正确输入联系电话"},
                    {name:"region_id", checkType : "notnull", checkRule:"",  errorMsg:"请选择工作地址"},
                    {name:"details_address", checkType : "notnull", checkRule:"",  errorMsg:"请输入详细地址"},
                    {name:"content", checkType : "notnull", checkRule:"",  errorMsg:"请输入详情"},
                ];
				if(formData.xinzileixing != '0'){
					rule.push({name:"xinzi", checkType : "notnull", checkRule:"",  errorMsg:"请输入薪资"});
				}
				if(this.tcpStatus){
					rule.push({name:"is_tcp", checkType : "notnull", checkRule:"",  errorMsg:"请认真阅读招老板平台发布协议"});
				}
				let result = validate.check(formData,rule);
				if(!result){
					this.func.msg(validate.error);
					return;
				}
				formData.more = {
					xinzi:formData.xinzi,
					xinzileixing:formData.xinzileixing,
					xueliyaoqiu:formData.xueliyaoqiu,
					gongzuonianxian:formData.gongzuonianxian,
					gongzuoleixing:formData.gongzuoleixing ? formData.gongzuoleixing.split(',') : [],
					zhiweifuli:formData.zhiweifuli ? formData.zhiweifuli.split(',') : [],
					details_address:formData.details_address,
				};
				delete formData.xinzi;
				delete formData.xinzileixing;
				delete formData.xueliyaoqiu;
				delete formData.gongzuonianxian;
				delete formData.gongzuoleixing;
				delete formData.zhiweifuli;
				delete formData.details_address;
				uni.showLoading({
					title:'发布中',
					mask:true
				});
				this.request.post(this.api.publishGczp,{
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
									url:'publish-gczp-list'
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
