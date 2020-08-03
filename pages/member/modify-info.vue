<template>
	<view class="container">
		<view class="list-wrap">
			<view class="list-item" @click="uploadImg">头像<image :src="userInfo.head_img || '../../static/tx01.png'"></image></view>
			<view class="list-item" @click="togglePopup('open','modify-name')">姓名<text>{{userInfo.name}}</text></view>
			<uni-popup ref="modify-name" :custom="true">
				<view class="popup-wrap">
					<form class="popup-form" @submit="popupFormSubmit">
						<view class="popup-block title">
							修改姓名
						</view>
						<view class="popup-block">
							<input type="text" class="popup-input" name="new_name" :value="userInfo.name" maxlength="10" placeholder="请输入姓名"/>
						</view>
						<view class="popup-block">
							<input type="text" name="type" value="modify-name" class="hidden"/>
							<button type="default" class="popup-button" @click="togglePopup('close','modify-name')">取消</button>
							<button type="default" class="popup-button" formType="submit">确定</button>
						</view>
					</form>
				</view>
			</uni-popup>
			<view class="list-item" @click="togglePopup('open','modify-corp_name')">公司名称<text>{{userInfo.corp_name || ''}}</text></view>
			<uni-popup ref="modify-corp_name" :custom="true">
				<view class="popup-wrap">
					<form class="popup-form" @submit="popupFormSubmit">
						<view class="popup-block title">
							修改公司名称
						</view>
						<view class="popup-block">
							<input type="text" class="popup-input" name="corp_name" :value="userInfo.corp_name" maxlength="20" placeholder="请输入公司名称"/>
						</view>
						<view class="popup-block">
							<input type="text" name="type" value="modify-corp_name" class="hidden"/>
							<button type="default" class="popup-button" @click="togglePopup('close','modify-corp_name')">取消</button>
							<button type="default" class="popup-button" formType="submit">确定</button>
						</view>
					</form>
				</view>
			</uni-popup>
			<view class="list-item" v-if="userInfo.account" @click="togglePopup('open','modify-password')">修改密码</view>
			<uni-popup ref="modify-password" :custom="true">
				<view class="popup-wrap">
					<form class="popup-form" @submit="popupFormSubmit">
						<view class="popup-block title">
							修改密码
						</view>
						<view class="popup-block">
							<input type="text" class="popup-input" password="true" name="old_password" maxlength="16" placeholder="请输入旧密码"/>
						</view>
						<view class="popup-block">
							<input type="text" class="popup-input" password="true" name="new_password" maxlength="16" placeholder="请输入新密码"/>
						</view>
						<view class="popup-block">
							<input type="text" class="popup-input" password="true" name="con_password" maxlength="16" placeholder="请输入确认密码"/>
						</view>
						<view class="popup-block">
							<input type="text" name="type" value="modify-password" class="hidden"/>
							<button type="default" class="popup-button" @click="togglePopup('close','modify-password')">取消</button>
							<button type="default" class="popup-button" formType="submit">确定</button>
						</view>
					</form>
				</view>
			</uni-popup>
			<view class="list-item" v-if="userInfo.account" @click="togglePopup('open','modify-account')">手机号码<text>{{userInfo.account}}</text></view><view class="list-item" v-else @click="togglePopup('open','modify-account')">绑定手机号码</view>
			<uni-popup ref="modify-account" :custom="true">
				<view class="popup-wrap">
					<form class="popup-form" @submit="popupFormSubmit">
						<view class="popup-block title" v-if="userInfo.account">
							更换手机号码
						</view>
						<view class="popup-block title" v-else>
							绑定手机号码
						</view>
						<view class="popup-block">
							<input type="number" class="popup-input" name="new_account"  maxlength="11" placeholder="请输入手机号码" @input="monitorAccount"/>
						</view>
						<view class="popup-block part">
							<input type="number" class="popup-input" name="code" maxlength="6" placeholder="请输入验证码"/>
							<button type="default" size="mini" @click="sendSms">{{getCodeText}}</button>
						</view>
						<view class="popup-block" v-if="!userInfo.account">
							<input type="text" class="popup-input" name="new_password" password="true" placeholder="请设置登录密码" maxlength="16" />
						</view>
						<view class="popup-block form-button_box">
							<input type="text" name="type" value="modify-account" class="hidden"/>
							<button type="default" class="popup-button" @click="togglePopup('close','modify-account')">取消</button>
							<button type="default" class="popup-button" formType="submit">确定</button>
						</view>
					</form>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import uniPopup from "@/components/uni-popup/uni-popup";
	export default{
		data(){
			return{
				config:{},
				user_id:'',
				getCodeText:'获取验证码',
				inputAccount:'',
				lock:false
			}
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		components:{
			uniPopup
		},
		onReady() {
			this.config  = this.request.getConfig();
			this.user_id = this.userInfo.uid;
		},
		methods:{
			...mapMutations(['login']),
			// 上传头像
			uploadImg(){
				const _this = this;
				const url   = this.config.baseUrl+this.api.modifyInfo;
				if(!_this.userInfo.account){
					this.func.msg('请先绑定手机号码');
					return;
				}
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.showLoading({
							title:'上传中',
							mask:true
						})
						uni.uploadFile({
							url:url,
							filePath: tempFilePaths[0],
							name: 'head_img',
							formData: {
								user_id:_this.user_id,
							},
							success: (uploadFileRes) => {
								const res = JSON.parse(uploadFileRes.data);
								if(res.code){
									uni.hideLoading();
									uni.showToast({
										title:'上传成功'
									})
									_this.userInfo.head_img = res.data.head_img;
									_this.login(_this.userInfo);
								}else{
									uni.hideLoading();
									uni.showModal({
										title:'提示',
										content:res.msg,
										showCancel:false
									})
								}
							},
							fail:(err)=>{
								uni.hideLoading();
								uni.showModal({
									title:'提示',
									content:err,
									showCancel:false
								})
							}
						});
					}
				});
			},
			popupFormSubmit:function(e){
				const formData = e.detail.value;
				const type = formData.type;
				const _this = this;
				formData.user_id = _this.user_id;
				formData.open_id = _this.userInfo.open_id;
				switch(type){
					case "modify-name":
						if(formData.new_name == ''){
							this.func.msg('请输入姓名');
							return;
						}
						if(formData.new_name === _this.userInfo.name){
							_this.togglePopup('close',type);
							return;
						}
					break;
					case "modify-corp_name":
						if(formData.corp_name == ''){
							this.func.msg('请输入公司名称');
							return;
						}
						if(formData.corp_name === _this.userInfo.corp_name){
							_this.togglePopup('close',type);
							return;
						}
					break;
					case "modify-account":
						if(formData.new_account == ''){
							this.func.msg('请输入手机号码');
							return;
						}
						if(formData.new_account === _this.userInfo.account){
							_this.togglePopup('close',type);
							return;
						}
						let reg = /^[1][3-9]{1}[0-9]{9}$/;
						if(!reg.test(formData.new_account)){
							this.func.msg('请正确输入手机号码');
							return;
						}
						if(formData.code == ''){
							this.func.msg('请输入验证码');
							return;
						}
						if(formData.new_password == ''){
							this.func.msg('请输入密码');
							return;
						}else{
							if(formData.new_password != undefined && formData.new_password.length < 6){
								this.func.msg('密码不能少于6位数');
								return;
							}
						}
						if(!_this.userInfo.account){
							formData.is_bind = 'true';
						}else{
							formData.is_bind = 'false';
						}
					break;
					case "modify-password":
						if(formData.old_password == ''){
							this.func.msg('请输入旧密码');
							return;
						}
						if(formData.new_password == ''){
							this.func.msg('请输入新密码');
							return;
						}
						if(formData.new_password.length < 6){
							this.func.msg('新密码不能少于6位数');
							return;
						}
						if(formData.con_password == ''){
							this.func.msg('请输入确认密码');
							return;
						}
						if(formData.new_password != formData.con_password){
							this.func.msg('两次输入的密码不一致');
							return;
						}
					break;
				}
				uni.showLoading({
					title:'修改中',
					mask:true
				})
				this.request.post(this.api.modifyInfo,{
					data:formData
				}).then(res => {
					uni.hideLoading();
					if(res.code){
						uni.showToast({
							title:'修改成功'
						});
						switch(type){
							case "modify-name":
							_this.userInfo.name = res.data.name;
							break;
							case "modify-corp_name":
							_this.userInfo.corp_name = res.data.corp_name;
							break;
							case "modify-account":
							_this.userInfo.account = res.data.account;
							_this.userInfo.phone = res.data.phone;
							_this.userInfo.uid = res.data.uid;
							break;
						}
						_this.login(_this.userInfo);
						_this.togglePopup('close',type);
						uni.redirectTo({
							url: 'modify-info'
						});
					}else{
						uni.showModal({
							title:'提示',
							content:res.msg,
							showCancel:false
						})
					}
				}).catch(error => {
					uni.hideLoading();
					console.log(error);
				})
			},
			togglePopup(isOpen,ref) {
				if(ref != "modify-account"){
					if(!this.userInfo.account){
						this.func.msg('请先绑定手机号码');
						return;
					}
				}
				if(isOpen == 'close'){
					this.$refs[ref].close();
				}else{
					this.$refs[ref].open();
				}
			},
			monitorAccount(e){
				this.inputAccount = e.detail.value;
			},
			sendSms(){
				let time = 60;
				let _this = this;
				let timer;
				let templateCode = '171185997';
				// * [171185997]绑定手机号模板
				// * [171185774]更换手机号模板
				if(this.userInfo.account){
					templateCode = '171185774';
				}
				if(!_this.lock){
					if(this.inputAccount == ''){
						this.func.msg('请输入手机号码');
						return;
					}
					if(this.inputAccount === this.userInfo.account){
						this.func.msg('请不要输入相同的手机号码');
						return;
					}
					let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
					if(!reg.test(this.inputAccount)){
						this.func.msg('请正确输入手机号码');
						return;
					}
					_this.lock = true;
					uni.showLoading({
						title:'获取验证码中',
						mask:true
					})
					timer = setInterval(()=>{
						if(time <= 1){
							_this.lock = false;
							time = 60;
							_this.getCodeText = '获取验证码';
							clearInterval(timer)
						}else{
							--time;
							_this.getCodeText = time+'秒后重试';
						}
					},1000);
					this.request.post(this.api.sendSms,{
						data:{phone:this.inputAccount,templateCode:templateCode}
					}).then(res=>{
						if(res.code){
							uni.showToast({
								title:'发送成功'
							});
						}else{
							uni.showModal({
								title:'提示',
								content:res.msg,
								showCancel:false
							})
						}
					}).catch(err=>{
						console.log(err);
					})
					uni.hideLoading();
				}
			}
		}
	}
</script>

<style lang="scss">
	.list-wrap{
		background-color:white;
		.list-item{
			font-size:28upx;
			padding:0upx 50upx;
			border-bottom:1px solid #f4f4f4;
			height:100upx;
			line-height: 100upx;
			image{
				width:80upx;
				height: 80upx;
				float: right;
				margin-right:30upx;
				margin-top: 10upx;
			}
			text{
				float: right;
				margin-right:30upx;
			}
		}
		.list-item::after{
			position: absolute;
			right:50upx;
			content:'';
			width:12upx;
			height: 12upx;
			border-top: 1px solid #ccc;
			border-right: 1px solid #ccc;
			transform: rotate(45deg);
			margin-top:40upx;
		}
	}
	
	.popup-wrap{
		background-color:rgba(255,255,255,.95);
		width:500upx;
		border-radius: 26upx;
		.popup-form{
			display: block;
			padding:30upx 20upx 0upx;
			.popup-block{
				position: relative;
				margin-bottom:20upx;
			}
			.title{
				text-align: center;
				font-size: 32upx;
				margin-bottom: 40upx;
			}
			.popup-input{
				background-color: white;
				border:1px solid #dcdcdc;
				height:68upx;
				padding: 0 20upx;
			}
			.hidden{
				display: none;
			}
			.part input{
				width:60%;
			}
			.part button{
				position: absolute;
				right: 0;
				top: 0;
				width:40%;
				height:100%;
				line-height:68upx;
				padding:0;
			}
			.popup-button{
				display: inline-block;
				width: 50%;
			}
		}
	}
</style>
