<template>
	<view v-if="detailData">
		<zhao-huo></zhao-huo>
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-group">
				<view class="title">标题</view>
				<input placeholder="请输入标题" name="title" :value="title"></input>
			</view>
			<view class="form-group">
				<view class="title">所属分类</view>
				<input placeholder="请选择所属分类" :value="cateName" disabled="true" @click="togglePopup('open','cate_id')"></input>
				<input type="text" :value="cateId" name="cate_id" class="hidden" />
				<uni-popup ref="cate_id" :custom="true">
					<popup-cate headerTitle="请选择所属分类" cateType="cailiao" overstepLengthTips="所属分类" chooseLength="3" @close="togglePopup"
					 @click="confirmCateChoose"></popup-cate>
				</uni-popup>
			</view>
			<view class="form-group">
				<view class="title">所属材料</view>
				<input placeholder="请选择所属材料" :value="mtName" disabled="true" @click="togglePopup('open','mt_id')"></input>
				<input type="text" :value="mtId" name="mt_id" class="hidden" />
				<uni-popup ref="mt_id" :custom="true">
					<popup-cate headerTitle="请选择所属材料" cateType="cailiao-mt" overstepLengthTips="所属材料" chooseLength="3" @close="togglePopup('close','mt_id')"
					 @click="confirmMt"></popup-cate>
				</uni-popup>
			</view>
			<view class="form-group">
				<view class="title">包装规格</view>
				<input placeholder="请选择包装规格" :value="pgName" disabled="true" @click="togglePopup('open','pg_id')"></input>
				<input type="text" :value="pgId" name="pg_id" class="hidden" />
				<uni-popup ref="pg_id" :custom="true">
					<popup-cate headerTitle="请选择包装规格" cateType="cailiao-pg" overstepLengthTips="包装规格" chooseLength="3" @close="togglePopup('close','pg_id')"
					 @click="confirmPg"></popup-cate>
				</uni-popup>
			</view>
			<view class="form-group">
				<view class="title">价格(元)</view>
				<input placeholder="输入价格" name="more-price" :value="more.price"></input>
			</view>
			<view class="form-group">
				<view class="title">店名</view>
				<input placeholder="输入店名" name="more-company_name" :value="more.company_name"></input>
			</view>
			<view class="form-group">
				<view class="title">产品名称</view>
				<input placeholder="输入产品名称" name="more-product_name" :value="more.product_name"></input>
			</view>
			<view class="form-group">
				<view class="title">牌号/规格</view>
				<input placeholder="输入牌号/规格" name="more-guige" :value="more.guige"></input>
			</view>
			<view class="form-group">
				<view class="title">品牌</view>
				<input placeholder="输入品牌" name="more-brand" :value="more.brand"></input>
			</view>
			<view class="form-group">
				<view class="title">产地</view>
				<input placeholder="请选择产地" :value="regionName" disabled="true" @click="togglePopup('open','region_id')"></input>
				<input type="text" :value="regionId" name="region_id" class="hidden" />
				<uni-popup ref="region_id" :custom="true">
					<popup-region headerTitle="请选择产地" overstepLengthTips="产地" :defaultSelectedVal="regionId" chooseLength="3" @close="togglePopup"
					 @click="confirmRegionChoose"></popup-region>
				</uni-popup>
			</view>
			<view class="form-group">
				<view class="title">自定义参数1</view>
				<input placeholder="输入自定义参数1" name="more-param1" :value="more.param1"></input>
			</view>
			<view class="form-group">
				<view class="title">自定义参数2</view>
				<input placeholder="输入自定义参数2" name="more-param2" :value="more.param2"></input>
			</view>
			<view class="form-group block_margin">
				<view class="title">联系人</view>
				<input type="text" name="contact" placeholder="请输入联系人" :value="userInfo.name">
			</view>
			<view class="form-group">
				<view class="title">联系电话</view>
				<input type="text" name="phone" placeholder="请输入联系电话" maxlength="11" :value="userInfo.account">
			</view>
			<!-- <view class="xq-title">找活详情</view>
			<view class="form-group" style="border:none;">
				<textarea v-if="isTextAreaShow" @input="bindTextArea" :value="textAreaContent" name="content" maxlength="750" placeholder="请输入找活详情（如会做什么、工作经历、期望工资、期望结款方式/周期等），有助于您更快、更准确的找到好工作~"/>
				<view class="view-textarea" v-else>{{textAreaContent}}</view>
			</view> -->
			<view class="block_margin">
				<upload-image length="6" :dataId="detailData.id" :image="imageList" title="产品图片" @getImageUrl="getImageUrl"></upload-image>
			</view>
			<view class="block_margin">
				<upload-image length="6" :dataId="detailData.id" :image="imageList2" type="yingye" title="营业执照" @getImageUrl="getImageUrl2"></upload-image>
			</view>
			<view class="xq-title block_margin">详细信息</view>
			<view class="form-group" style="border:none;">
				<textarea v-if="isTextAreaShow" @input="bindTextArea" :value="textAreaContent" name="content1" maxlength="750"
				 placeholder="请输入详情信息" />
				<view class="view-textarea" v-else>{{textAreaContent}}</view>
			</view>
			<view class="xq-title block_margin">订购说明</view>
			<view class="form-group" style="border:none;">
				<textarea v-if="isTextAreaShow" @input="bindTextArea2" :value="textAreaContent2" name="content2" maxlength="750" placeholder="请输入订购说明"/>
				<view class="view-textarea" v-else>{{textAreaContent}}</view>
			</view>
			<view class="form-group form-button_box">
				<input type="text" name="type" class="hidden" value="10" />
				<input type="text" name="is_tcp" class="hidden" :value="isTcp" v-if="tcpStatus" />
				<input type="text" class="hidden" name="imgUrl" maxlength="-1" :value="imageList" />
				<input type="text" class="hidden" name="img1Url" maxlength="-1" :value="imageList2" />
				<input type="text" name="user_id" class="hidden" :value="userInfo.uid" />
				<button type="default" formType="submit" class="submit-btn">立即发布</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	import zhaoHuo from "@/components/member/annotation/zhaohuo";
	import uniPopup from "@/components/uni-popup/uni-popup";
	import popupCate from "@/components/member/popup-cate";
	import popupRegion from "@/components/member/popup-region";
	import chooseTeam from "@/components/member/choose-team";
	import uploadImage from "@/components/member/upload-image";
	import publishTcp from "@/components/member/publish-tcp";
	var validate = require("../../common/extend/validate.js");
	export default {
		data() {
			return {
				team: '',
				title:'',
				cateName: '',
				cateId: '',
				mtId: '',
				mtName: '',
				regionId: '',
				regionName: '',
				pgId: '',
				pgName: '',
				imageList: [],
				imageList2: [],
				isTcp: '',
				tcpStatus: 0,
				isTextAreaShow: true,
				textAreaContent: '',
				textAreaContent2: '',
				detailData:null,
				more:{},
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		components: {
			zhaoHuo,
			uniPopup,
			popupCate,
			popupRegion,
			chooseTeam,
			uploadImage,
			publishTcp
		},
		onLoad(option) {
			this.loadData(option);
		},
		methods: {
			async loadData(option){
				let _this = this;
				uni.showLoading({
					title:'数据加载中',
				})
				await this.request.post(this.api.findWorkOneData,{
					data:{work_id:option.work_id,user_id:this.userInfo.uid}
				}).then(res => {
					if(res.code){
						this.detailData = res.data;
						this.more=this.detailData.more
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
					console.log(data)
					let region = [];
					if(data.region.province_id != ''){
						region.push(data.region.province_id);
					}
					if(data.region.city_id != ''){
						region.push(data.region.city_id);
					}
					
					let mtName=''
					let mtId=''
					if(data.mt instanceof Array){
						data.mt.forEach(one=>{
							mtName=mtName?','+one.name:one.name
							mtId=mtId?','+one.id:one.ids
						})
					}else{
						mtName=data.mt.name
						mtId=data.mt.id
					}
					
					let pgName=''
					let pgId=''
					if(data.pg instanceof Array){
						data.pg.forEach(one=>{
							pgName=mtName?','+one.name:one.name
							pgId=mtId?','+one.id:one.ids
						})
					}else{
						pgName=data.pg.name
						pgId=data.pg.id
					}
					
					_this.mtId =mtId
					_this.mtName =mtName
					_this.pgName =pgName
					_this.pgId =pgId
					_this.regionId =region.join(',')
					
					_this.imageList = data.image
					_this.imageList2 = data.image1||[]
					_this.title = data.title
					_this.textAreaContent = data.content1
					_this.textAreaContent2 = data.content2
					_this.cateId = data.cate.id;
					_this.cateName = data.cate.name
					
					
					// _this.team = data.team;
					// _this.textAreaContent =  data.content;
				}
				uni.hideLoading();
			},
			togglePopup(e, ref) {
				if (typeof e == 'object') {
					this.isTextAreaShow = true;
					this.$refs[e.ref].close();
				} else if (e == 'close' && ref) {
					this.isTextAreaShow = true;
					this.$refs[ref].close()
				} else {
					this.isTextAreaShow = false;
					console.log(ref)
					this.$refs[ref].open();
				}
			},
			confirmCateChoose(e) {
				this.cateId = e.cateId;
				this.cateName = e.cateName;
			},
			confirmMt(e) {
				this.mtId = e.cateId;
				this.mtName = e.cateName;
			},
			confirmPg(e) {
				this.pgId = e.cateId;
				this.pgName = e.cateName;
			},
			confirmRegionChoose(e) {
				this.regionId = e.regionId;
				this.regionName = e.regionName;
			},
			getChooseTeamVal(e) {
				this.team = e.team;
			},
			getImageUrl(e) {
				this.imageList = e;
			},
			getImageUrl2(e) {
				this.imageList2 = e;
				console.log(e)
			},
			getPublishTcpValue(e) {
				this.isTcp = e.value;
				this.tcpStatus = e.status;
				this.isTextAreaShow = e.isTextAreaShow;
			},
			bindTextArea(e) {
				this.textAreaContent = e.detail.value;
			},
			bindTextArea2(e) {
				this.textAreaContent2 = e.detail.value;
			},
			formSubmit: function(e) {
				let rule = [{
						name: "title",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入标题"
					},
					{
						name: "cate_id",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择所属分类"
					},
					{
						name: "mt_id",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择所属材料"
					},
					{
						name: "pg_id",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择包装规格"
					},
					{
						name: "more-price",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "输入价格"
					},
					{
						name: "more-company_name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "输入店名"
					},
					{
						name: "region_id",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择产地"
					},
					{
						name: "contact",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入联系人"
					},
					{
						name: "phone",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入联系电话"
					},
					{
						name: "phone",
						checkType: "reg",
						checkRule: "^[1][3-9]{1}[0-9]{9}$",
						errorMsg: "请正确输入联系电话"
					},
					{
						name: "content1",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入详情信息"
					},
					{
						name: "content2",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入订购说明"
					},
				];
				if (this.tcpStatus) {
					rule.push({
						name: "is_tcp",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请认真阅读招老板平台发布协议"
					});
				}
				let formData = e.detail.value;
				let result = validate.check(formData, rule);
				if (!result) {
					this.func.msg(validate.error);
					return;
				}
				
				var more={
					image1:formData.img1Url
				}
				
				delete formData.img1Url
				for(let i in formData){
					if(/\more-/.test(i)){
						more[i.replace('more-','')]=formData[i]
						delete formData[i]
					}
				}
				formData.more=more
				formData.id=this.detailData.id
				
				uni.showLoading({
					title: '发布中',
					mask: true
				});
				this.request.post(this.api.modifyMaterial, {
					data: formData,
				}).then(res => {
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: res.msg,
						showCancel: false,
						success: (res) => {
							if (res.confirm) {
								uni.redirectTo({
									url: 'publish-cailiao-list'
								});
							}
						}
					});
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.showModal({
						title: '提示',
						content: '网络错误',
						showCancel: false
					})
				})
			}
		}
	}
</script>
<style>
	.block_margin {
		margin-top: 30rpx;
	}
</style>
