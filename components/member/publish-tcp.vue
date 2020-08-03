<template>
	<view>
		<view class="form-group xieyi">
			<checkbox-group name="is_tcp" @change="changeCheckbox">
		        <label>
					<checkbox value="1" :checked="checked"/>
					<view class="title" style="display: inline-block;vertical-align: middle;">我已阅读并同意《<text style="color:#0099ff" @click="read">招老板平台发布协议</text>》</view>
				</label>
		    </checkbox-group>
		</view>
		<view class="cu-mask" v-show="isShow"></view>
		<view class="cu-modal" v-show="isShow">
			<view class="cu-modal__hd">
				<text class="cu-modal__title">发布协议</text>
			</view>
			<view class="cu-modal__bd">
				<rich-text :nodes="content"></rich-text>
			</view>
			<view class="cu-modal__ft">
				<view class="cu-modal__btn cu-modal__btn_default" @click="cancel">取消</view>
				<view class="cu-modal__btn cu-modal__btn_default" @click="confirm">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:'',
				status:1,
				content:'',
				checked:false,
				isShow:false,
				isTextAreaShow:true
			}
		},
		name:'publish-tcp',
		props:{
			tcpType:{
				type:String,
				default:'common'
			}
		},
		created() {
			this.loadData();
		},
		methods:{
			loadData(){
				let _this = this;
				this.request.get(this.api.getTcpInfo,{
					data:{},
				}).then(res=>{
					_this.status = res.data.publish.status >= 1 ? true : false;
					_this.content = res.data.publish.content;
					_this.emit();
				})
			},
			changeCheckbox(e){
				let length = e.detail.value.length;
				if(length){
					this.checked = true;
					this.value = 1;
				}else{
					this.checked = false;
					this.value = '';
				}
				this.emit();
			},
			read(){
				this.isTextAreaShow = false;
				this.isShow = true;
				this.emit();
			},
			cancel(){
				this.isShow = false;
				this.value = '';
				this.checked = false;
				this.isTextAreaShow = true;
				this.emit();
			},
			confirm(){
				this.isShow = false;
				this.value = 1;
				this.checked = true;
				this.isTextAreaShow = true;
				this.emit();
			},
			emit(){
				this.$emit('result',{value:this.value,status:this.status,isTextAreaShow:this.isTextAreaShow});
			}
		}
	}
</script>

<style lang="scss">
.xieyi{
	background-color: rgba(255,255,255,0);
}
</style>
