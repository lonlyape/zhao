<template>
	<view class="popup-wrap">
		<view class="popup-head">{{headerTitle}}</view>
		<view class="popup-body">
			<block v-if="cateType == 'ershou'">
				<radio-group @change="radioChange">
					<view class="item" v-for="(items,indexs) in cate" :key="indexs">
						<view class="t" :data-id="items.id">{{items.name}}</view>
						<label v-for="(item,index) in items.child" :key="index">
							{{item.name}}
							<block v-if="defaultSelectedVal != '' && defaultSelectedVal.indexOf(item.id) != -1">
								<radio :value="item.id" checked="true"/>
							</block>
							<block v-else>
								<radio :value="item.id"/>
							</block>
						</label>
					</view>
				</radio-group>
			</block>
			<block v-else>
				<checkbox-group @change="checkboxChange">
					<view class="item" v-for="(items,indexs) in cate" :key="indexs" :class="{hidden:items.isHidden}">
						<block v-if="items.child.length">
							<view class="t" :data-id="items.id">{{items.name}}</view>
							<label v-for="(item,index) in items.child" :key="index">
								{{item.name}}
								<block v-if="defaultSelectedVal != '' && defaultSelectedVal.indexOf(item.id) != -1">
									<checkbox :value="item.id" checked="true"/>
								</block>
								<block v-else>
									<checkbox :value="item.id" :checked="item.checked"/>
								</block>
							</label>
						</block>
						<block v-else>
							<label style="padding-left:0;">
								{{items.name}}
								<block v-if="defaultSelectedVal != '' && defaultSelectedVal.indexOf(items.id) != -1">
									<checkbox :value="items.id" checked="true"/>
								</block>
								<block v-else>
									<checkbox :value="items.id" :checked="items.checked"/>
								</block>
							</label>
						</block>
					</view>
				</checkbox-group>
			</block>
		</view>
		<view class="popup-button">
			<button type="default" class="button" @click.stop="closePopup('close','cate_id')">取消</button>
			<button type="default" class="button" @click.stop="confirmChoose('close','cate_id')">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				cate:[],
				confirmId:'',
				confirmName:'',
			}
		},
		name: 'popup-cate',
		props: {
			headerTitle:{
				type:String,
				default:''
			},
			cateType:{
				type:String,
				default:''
			},
			chooseLength:{
				type:Number,
				default:5
			},
			overstepLengthTips:{
				type:String,
				default:''
			},
			defaultSelectedVal:{
				type:String,
				default:''
			},
			defaultSelectedName:{
				type:String,
				default:''
			}
		},
		created() {
			setTimeout(()=>{
				this.requestCate();
				this.confirmId = this.defaultSelectedVal;
				this.confirmName = this.defaultSelectedName;
			},200);
		},
		methods: {
			requestCate(){
				let _this = this;
				if(this.cateType === 'chengbao'){
					let storageName = 'allContractCate';
					uni.getStorage({
						key:storageName,
						success:(res=>{
							_this.cate = res.data;
						}),
						fail:(err=>{
							this.request.get(this.api.getAllContractCate,{
								data:{},
							}).then(res=>{
								uni.setStorage({
									key:storageName,
									data:res.data
								})
								_this.cate = res.data;
							})
						})
					})
				}else if(this.cateType == 'ershou'){
					let storageName = 'allUsedCate';
					uni.getStorage({
						key:storageName,
						success:(res=>{
							_this.cate = res.data;
						}),
						fail:(err=>{
							this.request.get(this.api.getAllUsedCate,{
								data:{},
							}).then(res=>{
								uni.setStorage({
									key:storageName,
									data:res.data
								})
								_this.cate = res.data;
							})
						})
					})
				}else if(this.cateType=='cailiao'){
					let storageName = 'allMaterialCate'
					uni.getStorage({
						key:storageName,
						success:(res=>{
							_this.cate = res.data;
						}),
						fail:(err=>{
							this.request.get(this.api.getMaterialCate,{
								data:{},
							}).then(res=>{
								uni.setStorage({
									key:storageName,
									data:res.data
								})
								_this.cate = res.data;
							})
						})
					})
				}else if(this.cateType=='cailiao-mt'){
					let storageName = 'allMaterialCateMt'
					uni.getStorage({
						key:storageName,
						success:(res=>{
							_this.cate = res.data;
						}),
						fail:(err=>{
							this.request.get(this.api.getMaterialMt,{
								data:{},
							}).then(res=>{
								console.log('mtStor')
								uni.setStorage({
									key:storageName,
									data:res.data
								})
								_this.cate = res.data;
							})
						})
					})
				}else if(this.cateType=='cailiao-pg'){
					let storageName = 'allMaterialCatePg'
					uni.getStorage({
						key:storageName,
						success:(res=>{
							_this.cate = res.data;
						}),
						fail:(err=>{
							this.request.get(this.api.getMaterialPg,{
								data:{},
							}).then(res=>{
								console.log('mtStor')
								uni.setStorage({
									key:storageName,
									data:res.data
								})
								_this.cate = res.data;
							})
						})
					})
				}else{
					let storageName = 'allWorkCate';
					uni.getStorage({
						key:storageName,
						success:(res=>{
							_this.cate = res.data;
							// t();
						}),
						fail:(err=>{
							this.request.get(this.api.getAllWorkCate,{
								data:{},
							}).then(res=>{
								uni.setStorage({
									key:storageName,
									data:res.data
								})
								_this.cate = res.data;
								// t();
							})
						})
					})
					// function t(){
					// 	if(_this.cateType == 'zhaohuo'){
					// 		_this.cate.forEach(items=>{
					// 			if(items.name == '土建专业' || items.name == '安装工程专业'){
					// 				_this.$set(items,'isHidden',true);
					// 			}
					// 		})
					// 	}
					// }
				}
			},
			checkboxChange(e){
				let value = e.detail.value;
				let cates = this.cate;
				let chooseExcess = [];
				let confirmName = [];
				let _this = this;
				if(value.length > this.chooseLength){
					uni.showModal({
						title:'提示',
						content:this.overstepLengthTips+'最多选'+this.chooseLength+'个',
						showCancel:false
					})
					chooseExcess = value.slice(this.chooseLength);
					value		 = value.slice(0,this.chooseLength);
				}
				for(var i=0; i< cates.length;i++){
					let cate = cates[i]
					if(cate.child.length){
						for(var j=0;j< cate.child.length;j++){
							let cate_child = cate.child[j];
							let index = value.indexOf(''+cate_child.id+'');
							if(chooseExcess.indexOf(''+cate_child.id+'') != -1){
								this.$set(cate_child,'checked',false);
							}
							if(index >= 0){
								if(value.indexOf(cate_child.pid) === -1){
									value.splice(index,0,cate_child.pid);
								}
								confirmName.push(cate_child.name);
							}
						}
					}else{
						if(chooseExcess.indexOf(''+cate.id+'') != -1){
							this.$set(cate,'checked',false);
						}
						if(value.indexOf(''+cate.id+'') != -1){
							confirmName.push(cate.name);
						}
					}
				}
				this.confirmId 	 = value.join(',');
				this.confirmName = confirmName.join('、');
			},
			radioChange(e){
				let value = [e.detail.value];
				let cates = this.cate;
				let confirmName = [];
				for(var i=0;i<cates.length;i++){
					let cate = cates[i];
					for(var j=0;j< cate.child.length;j++){
						let cate_child = cate.child[j];
						let index = value.indexOf(''+cate_child.id+'');
						if(index >= 0){
							if(value.indexOf(cate_child.pid) === -1){
								value.splice(index,0,cate_child.pid);
							}
							confirmName.push(cate.name,cate_child.name);
						}
					}
				}
				this.confirmId 	 = value.join(',');
				this.confirmName = confirmName.join(' - ');
			},
			confirmChoose:function(type,ref){
				this.closePopup(type,ref);
				this.$emit('click',{cateId:this.confirmId,cateName:this.confirmName});
			},
			closePopup:function(type,ref){
				this.$emit('close',{type:type,ref:ref});
			}
		}
	}
</script>

<style lang="scss">
	.popup-wrap{
		width: 50vh;
		background-color:rgba(255,255,255,.95);
		box-shadow: #dcdcdc 0 0 10upx;
		height:70vh;
		overflow: hidden;
		border-top-left-radius: 26upx;
		border-top-right-radius: 26upx;
		.popup-head{
			background: #f3f3f3;
			text-align: center;
			font-size: 32upx;
			padding: 30upx;
		}
		.popup-body{
			padding: 20upx;
			overflow-y:auto; 
			height:90%;
			.item{
				.t{
					font-size: 32upx;
					color: #0099ff;
				}
				label{
					display: block;
					height: 100%;
					position: relative;
					padding: 20upx;
					font-size: 28upx;
					checkbox,radio{
						position: absolute;
						right: 0;
					}
				}
			}
		}
		.popup-button{
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			text-align: center;
			margin-bottom: -80upx;
			.button{
				display: inline-block;
				width: 50%;
				height:80upx;
				line-height:80upx;
				padding:0;
			}
		}
	}
</style>
