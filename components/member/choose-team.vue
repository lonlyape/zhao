<template>
	<view class="form-group">
		<view class="title">{{tips}}</view>
			<picker @change="teamConfirm" :range="teamArray" :value="teamIndex" range-key="name">
			<view class="picker" v-if="teamStatus">
			{{teamArray[teamIndex].name}}
			</view>
			<input type="text" disabled :placeholder="'请选择'+tips" v-else>
		</picker>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				teamIndex:0,
				teamArray:[],
				teamStatus:false,
				teamValue:'',
				tips:'人员构成'
			}
		},
		name:'choose-team',
		props:{
			type:{
				type:String,
				default:''
			},
			defaultSelectedVal:{
				type:String,
				default:''
			}
		},
		onReady(){
			setTimeout(()=>{
				if(this.type == 'chengbao'){
					this.tips = '所需人员构成';
				}
				this.requestTeam();
			},200);
		},
		methods:{
			// 请求人员构成
			requestTeam(){
				let storageName = 'staffComposition';
				let _this = this;
				uni.getStorage({
					key:storageName,
					success:(res=>{
						disposeTeam(res.data);
					}),
					fail:(err=>{
						this.request.get(this.api.getStaffComposition,{
							data:{},
						}).then(res=>{
							uni.setStorage({
								key:storageName,
								data:res.data
							})
							disposeTeam(res.data);
						})
					})
				})
				function disposeTeam(data){
					let team  = [];
					let key = 0;
					if(_this.type == 'zhaohuo'){
						team = data.zhaohuo;
					}else{
						team = data.chengbao;
					}
					for(var index in team){
						let a = {value:index,name:team[index]};
						_this.teamArray.push(a);
						if(_this.defaultSelectedVal != '' && _this.defaultSelectedVal == index){
							_this.teamStatus = true;
							_this.teamIndex = key;
						}
						key++;
					}
				}
			},
			teamConfirm(e){//监听人员构成确定
				this.teamStatus = true;
				this.teamIndex = e.detail.value;
				this.teamValue = this.teamArray[e.detail.value].value;
				this.$emit('confirm',{team:this.teamValue});
			},
		}
	}
</script>

<style>
</style>
