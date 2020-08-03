<template>
	<view class="form-group">
		<view class="title">{{title}}</view>
			<picker mode="multiSelector" @change="regionConfirm" @columnchange="regionColumnChange" :value="regionIndex" :range="regionArray" range-key="name">
			<view class="picker" v-if="regionStatus">
			{{regionArray[0][regionIndex[0]].name}}{{regionArray[1][regionIndex[1]].name !== undefined ? ' - '+regionArray[1][regionIndex[1]].name : ''}}
			</view>
			<input type="text" disabled :placeholder="title" v-else>
		</picker>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				regionArray: [],
				regionIndex:[0,0],
				regionStatus:false,
				regionValue:'',
				province:[],
				city:[],
			}
		},
		name: 'choose-region',
		props:{
			defaultSelectedVal:{
				type:Object,
				default:function(){
					return {province_id:'',city_id:''};
				}
			},
			title:{
				type:String,
				default:'选择地区'
			}
		},
		onReady(){
			setTimeout(()=>{
				this.requestRegion();
			},300);
		},
		created() {
			
		},
		methods:{
			// 请求地区
			requestRegion(){
				let storageName = 'allRegion';
				let _this = this;
				uni.getStorage({
					key:storageName,
					success:(res=>{
						let region = res.data.all;
						disposeRegion(region);
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
								disposeRegion(res.data.all);
							}
						}).catch(error =>{
							console.log('Error:',error);
						})
					})
				})
				function disposeRegion(region){
					let city = [];
					let province = [];
					let selected_val = _this.defaultSelectedVal;
					let c = [];
					for (var i=0;i < region.length;i++) {
						for(var j=0; j < region[i].child.length;j++){
							let r1 = region[i].child[j];
							let r2 = region[i].child[j].child;
							province.push(r1);
							city.push(r2);
						}
					}
					if(selected_val.province_id != ''){
						for (var i=0;i < province.length;i++) {
							if(selected_val.province_id == province[i].id){
								c = province[i].child;
								_this.regionStatus = true;
								_this.regionIndex.splice(0,1,i);
							}
						}
					}
					if(selected_val.city_id != '' && c.length >= 1){
						for (var i=0;i < c.length;i++) {
							if(selected_val.city_id == c[i].id){
								_this.regionIndex.splice(1,1,i);
							}
						}
					}
					_this.province = province;
					_this.city 	   = city;
					_this.regionArray.push(province,c);
				}
			},
			regionConfirm(e) {//监听地区确定
				let value = e.detail.value;
				let regionValue = [];
				let province_id = this.regionArray[0][value[0]].id;
				let city_id		= this.regionArray[1].length != 0 ? this.regionArray[1][value[1]].id : '';
				let province_name = this.regionArray[0][value[0]].name;
				let city_name  = this.regionArray[1].length != 0 ? this.regionArray[1][value[1]].name : '';
				if(city_id == ''){
					regionValue.push(province_id);
				}else{
					regionValue.push(province_id,city_id);
				}
				this.regionStatus = true;
				this.regionIndex = value;
				this.regionValue = regionValue.join(',');
				this.$emit('confirm',{region_id:this.regionValue,region_name:province_name+city_name});
			},
			regionColumnChange(e){//监听地区滑动
				let value = e.detail.value;
				let column = e.detail.column;
				if(column == 0){
					this.regionArray = [];
					this.regionArray.push(this.province,this.city[value]);
					this.regionIndex[1] = 0;
					this.regionIndex[0] = value;
				}
			},
		}
	}
</script>

<style>
</style>
