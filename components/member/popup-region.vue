<template>
	<view class="popup-wrap">
		<view class="popup-head">{{headerTitle}}</view>
		<view class="popup-body">
			<checkbox-group @change="checkboxChange">
				<block v-for="(itemss,indexss) in allRegion" :key="indexss">
					<!-- <view style="text-align: center;font-size:32upx;">{{itemss.name}}</view> -->
					<view class="item" v-for="(items,indexs) in itemss.child" :key="indexs">
						<block v-if="items.child.length != 0">
							<view class="t" @click="childTap(items.id)">{{items.name}}<text class="angle" :class="[{'rotate-angle':current_id.indexOf(items.id.toString()) != -1},'']"></text></view>
							<view class="child-box" :class="[{active:current_id.indexOf(items.id.toString()) != -1},'']">
								<label v-for="(item,index) in items.child" :key="index">
									{{item.name}}
									<block v-if="defaultSelectedVal != '' && defaultSelectedVal.indexOf(item.id.toString()) != -1">
										<checkbox :value="item.id" checked="true"/>
									</block>
									<block v-else>
										<checkbox :value="item.id" :checked="item.isChoose"/>
									</block>
								</label>
							</view>
						</block>
						<block v-else>
							<view class="t">
								<label style="font-size:32upx;padding:0;">
									{{items.name}}
									<block v-if="defaultSelectedVal != '' && defaultSelectedVal.indexOf(items.id.toString()) != -1">
										<checkbox :value="items.id" checked="true"/>
									</block>
									<block v-else>
										<checkbox :value="items.id" :checked="items.isChoose"/>
									</block>
								</label>
							</view>
						</block>
					</view>
				</block>
			</checkbox-group>
		</view>
		<view class="popup-button">
			<button type="default" class="button" @click.stop="closePopup('close','region_id')">取消</button>
			<button type="default" class="button" @click.stop="confirmChoose('close','region_id')">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				allRegion:[],
				confirmId:'',
				confirmName:'',
				current_id:[]
			}
		},
		name: 'popup-region',
		props: {
			headerTitle:{
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
				this.requestRegion();
				this.confirmId = this.defaultSelectedVal;
				this.confirmName = this.defaultSelectedName;
				this.current_id = this.defaultSelectedVal.split(',');
			},200);
		},
		methods: {
			initName(){
				if(this.defaultSelectedVal&&!this.defaultSelectedName){
					let allRegion = this.allRegion
					let value=this.defaultSelectedVal.split(',')
					let str=''
					allRegion.forEach(one=>{
						if(value.includes(String(one.id))){
							str+=str?','+one.name:one.name
						}
						one.child.forEach(item=>{
							if(value.includes(String(item.id))){
								str+=str?','+item.name:item.name
							}
							item.child&&item.child.forEach(obj=>{
								if(value.includes(String(obj.id))){
									str+=str?','+obj.name:obj.name
								}
							})
						})
					})
					this.confirmName = str
					this.$emit('click',{regionId:this.confirmId,regionName:this.confirmName});
				}
			},
			requestRegion(){
				let storageName = 'allRegion';
				let _this = this;
				uni.getStorage({
					key:storageName,
					success:(res=>{
						let region = res.data.all;
						_this.allRegion = region;
						this.initName()
					}),
					fail:(err=>{
						this.request.post(this.api.getAllRegion,{
							data:{}
						}).then(res => {
							if(res.code){
								uni.setStorage({
									key:storageName,
									data:res.data
								});
								_this.allRegion = res.data.all;
								this.initName()
							}
						}).catch(error =>{
							console.log('Error:',error);
						})
					})
				})
			},
			checkboxChange(e){
				let value = e.detail.value;
				let allRegion = this.allRegion;
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
				for(var i=0; i< allRegion.length;i++){
					let region1 = allRegion[i]
					for(var j=0;j< region1.child.length;j++){
						let region2 = region1.child[j];
						if(region2.child.length != 0){
							for(var k=0;k < region2.child.length;k++){
								let region3 = region2.child[k];
								if(chooseExcess.indexOf(''+region3.id+'') >= 0){
									this.$set(region3,'isChoose',false);
								}
								let index = value.indexOf(''+region3.id+'');
								if(index >= 0){
									if(value.indexOf(region3.pid) === -1){
										value.splice(index,0,region3.pid);
									}
									confirmName.push(region3.name);
								}
							}
						}else{
							if(chooseExcess.indexOf(''+region2.id+'') >= 0){
								this.$set(region2,'isChoose',false);
							}
							if(value.indexOf(''+region2.id+'') >= 0){
								confirmName.push(region2.name);
							}
						}
					}
				}
				this.confirmId 	 = value.join(',');
				this.confirmName = confirmName.join('、');
			},
			childTap:function(id){
				if(this.current_id.indexOf(id.toString()) != -1){
					this.current_id.splice(this.current_id.indexOf(id.toString()),1);
				}else{
					this.current_id.push(id.toString());
				}
			},
			confirmChoose:function(type,ref){
				this.closePopup(type,ref);
				this.$emit('click',{regionId:this.confirmId,regionName:this.confirmName});
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
				position: relative;
				overflow: hidden;
				.t{
					font-size: 32upx;
					color: #0099ff;
					line-height: 2.3;
					.angle{
						display: inline-flex;
						width: 0; 
						height: 0;
						float: right;
						margin-right:18upx;
						margin-top: 14upx;
						border-width:7px;
						border-style: solid;
						border-color: transparent #13aaf6 transparent transparent;
						transform: rotate(-90deg);
						transition: transform .2s ease-out;
					}
					.rotate-angle{
						transform: rotate(90deg);
					}
				}
				.child-box{
					position: absolute;
					right: 0;
					left: 0;
					transform: translateY(-100%);
					visibility: hidden;
					transition:all .2s ease-out;
				}
				.active{
					position: unset;
					visibility:visible;
					transform:translateY(0%);
					margin-bottom:15upx;
				}
				label{
					display: block;
					height: 100%;
					position: relative;
					padding: 20upx;
					font-size: 28upx;
					checkbox{
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
