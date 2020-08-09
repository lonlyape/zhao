<template>
	<view class="select_box">
		<view class="top-tab-wrap">
			<view @click="clickShow(1)" :style="{color:isShowRegion ? '#059bfe' : '#384156'}">{{regionName}}<text class="angle" :class="{'rotate-angle':isShowRegion}"></text></view>
			<view @click="clickShow(2)" :style="{color:isShowCate ? '#059bfe' : '#384156'}" v-if="isRequireCate">{{cateName}}<text class="angle" :class="{'rotate-angle':isShowCate}"></text></view>
			<view @click="clickShow(3)" :style="{color:isShowTeam ? '#059bfe' : '#384156'}" v-if="isRequireTeam">{{teamName}}<text class="angle" :class="{'rotate-angle':isShowTeam}"></text></view>
		</view>
		<view class="top-screen-shade" :class="{'show-shade':isShowShade}" @click="close"></view>
		<view class="top-screen-wrap" :class="{'show':isShowRegion}">
			<view class="content-wrap">
				<view class="item" @click="filterParam({type:'region',ischild:false},'All')" :class="[{avtive:regionName=='全国'},'']">全国</view>
				<block v-for="item1 in region" :key="item1.id">
					<block v-for="item2 in item1.child" :key="item2.id">
						<view class="item" v-if="item2.child == ''" :class="[{avtive:regionName==item2.name},'']" @click="filterParam({type:'region',ischild:false},{id:item2.id,name:item2.name})">{{item2.name}}</view>
						<view class="item" v-else @click="toggleShowChild(item2.id,'region')">
							<text :class="[{avtive:regionName==item2.name || region_pid==item2.id},'']">{{item2.name}}</text>
							<view class="item-child" :class="[{'show':region_pid==item2.id},'']">
								<view @click="filterParam({type:'region',ischild:true},{id:item2.id,name:item2.name})" :class="[{'avtive-child':regionName==item2.name},'']">全部</view>
								<view v-for="(item3,index3) in item2.child" :key="index3" @click="filterParam({type:'region',ischild:true},{id:item3.id,name:item3.name})" :class="[{'avtive-child':regionName==item3.name},'']">{{item3.name}}</view>
							</view>
						</view>
					</block>
				</block>
			</view>
		</view>
		<view class="top-screen-wrap" :class="{'show':isShowCate}" v-if="isRequireCate">
			<view class="content-wrap">
				<view class="item" @click="filterParam({type:'cate',ischild:false},'','All')" :class="[{avtive:cateName=='全部'},'']">全部</view>
				<block v-for="item1 in cate" :key="item1.id">
					<view class="item" v-if="item1.child == ''" :class="[{avtive:cateName==item1.name},'']" @click="filterParam({type:'cate',ischild:false},'',{id:item1.id,name:item1.name})">{{item1.name}}</view>
					<view class="item" v-else @click="toggleShowChild(item1.id,'cate')">
						<text :class="[{avtive:cateName==item1.name || cate_pid==item1.id},'']">{{item1.name}}</text>
						<view class="item-child" :class="[{'show':cate_pid==item1.id},'']">
							<view @click="filterParam({type:'cate',ischild:true},'',{id:item1.id,name:item1.name})" :class="[{'avtive-child':cateName==item1.name},'']">全部</view>
							<view v-for="(item2,index) in item1.child" :key="index" @click="filterParam({type:'cate',ischild:true},'',{id:item2.id,name:item2.name})" :class="[{'avtive-child':cateName==item2.name},'']">{{item2.name}}</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="top-screen-wrap" :class="{'show':isShowTeam}" v-if="isRequireTeam">
			<view class="content-wrap">
				<view class="item" @click="filterParam('','','','All')" :class="[{avtive:teamName==changeTeamName},'']">全部</view>
				<block v-for="(item,index) in team" :key="index" >
					<block v-if="type == 'chengbao'">
						<view class="item" v-if="index != 1" @click="filterParam('','','',{id:index,name:item})" :class="[{avtive:teamName==item},'']">{{item}}</view>
					</block>
					<block v-else-if="item">
						<view class="item" @click="filterParam('','','',{id:index,name:item})" :class="[{avtive:teamName==item},'']">{{item}}</view>
					</block>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				region:[],
				team:[],
				cate:[],
				isShowShade:false,
				isShowRegion:false,
				isShowCate:false,
				isShowTeam:false,
				region_pid:'',
				cate_pid:'',
				regionName:'全国',
				cateName:'工程专业',
				teamName:'',
				changeTeamName:''
			}
		},
		name:'filtrate-top',
		computed:{
			
		},
		props:{
			type:{
				type:String,
				default:'',
			},
			isRequireTeam:{
				type:Boolean,
				default:false
			},
			isRequireCate:{
				type:Boolean,
				default:true
			},
			isClearChooseParam:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			isShowRegion(val){
				if(val){
					let storageName = 'allRegion';
					uni.getStorage({
						key:storageName,
						success:(res=>{
							let region = res.data.all;
							this.region = region;
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
									this.region = res.data.all;
								}
							}).catch(error =>{
								console.log('Error:',error);
							})
						})
					})
				}
			},
			isShowCate(val){
				if(val){
					this.requestCate();
				}
			},
			isShowTeam(val){
				const _this = this;
				if(val){
					let storageName = 'staffComposition';
					uni.getStorage({
						key:storageName,
						success:(res=>{
							t(res.data);
						}),
						fail:(err=>{
							this.request.get(this.api.getStaffComposition,{
								data:{},
							}).then(res=>{
								uni.setStorage({
									key:storageName,
									data:res.data
								})
								t(res.data);
							})
						})
					})
					function t(data){
						switch(_this.type){
							case 'chengbao':
							_this.team = data.chengbao;
							break;
							case 'zhaohuo':
							_this.team = data.zhaohuo;
							break;
							case 'gczp':
							_this.team = data.gczp;
							break;
						}
					}
				}
			},
			isClearChooseParam(val){
				if(val){
					uni.removeStorage({
						key:'filterParam',
					})
					this.filterParam();
				}
			},
			type:{
				handler:function(val){
					this.teamName=this.defaultTeamName()
					this.close()
				},
				immediate: true
			}
		},
		methods:{
			requestCate(){
				let _this = this;
				if(this.type === 'chengbao'){
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
				}else if(this.type == 'ershou'){
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
				}else{
					let storageName = 'allWorkCate';
					uni.getStorage({
						key:storageName,
						success:(res=>{
							_this.cate = res.data;
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
							})
						})
					})
				}
			},
			clickShow:function(index){
				switch(index){
					case 1:
						if(this.isShowRegion){
							this.isShowRegion = false;
							this.isShowShade = false;
						}else{
							this.isShowRegion = true;
							this.isShowShade = true;
						}
						this.isShowCate = false;
						this.isShowTeam = false;
					break;
					case 2:
						if(this.isShowCate){
							this.isShowCate = false;
							this.isShowShade = false;
						}else{
							this.isShowCate = true;
							this.isShowShade = true;
						}
						this.isShowRegion = false;
						this.isShowTeam = false;
					break;
					case 3:
						if(this.isShowTeam){
							this.isShowTeam = false;
							this.isShowShade = false;
						}else{
							this.isShowTeam = true;
							this.isShowShade = true;
						}
						this.isShowRegion = false;
						this.isShowCate = false;
					break;
				}
			},
			close:function(e=''){
				this.isShowRegion = false;
				this.isShowCate = false;
				this.isShowTeam = false;
				this.isShowShade = false;
				if(e.type != undefined && e.type == 'region' && e.ischild == false){
					this.region_pid = '';
				}else if(e.type != undefined && e.type == 'cate' && e.ischild == false){
					 this.cate_pid = '';
				}
			},
			toggleShowChild:function(id,type){
				if(type == 'region'){
					this.region_pid = id;
				}else if(type == 'cate'){
					this.cate_pid = id;
				}
			},
			filterParam:function(s,region='',cate='',team=''){
				const cacheKey = 'filterParam';
				const param = uni.getStorageSync(cacheKey);
				const positionRegion = uni.getStorageSync('positionRegion');
				if(region == 'All'){
					region = '';
				}else if(typeof region == 'object'){
					region = region;
				}else if(param.region != undefined){
					region = param.region;
				}else{
					if(positionRegion.id && positionRegion.id != undefined){
						region = positionRegion;
					}
				}
				if(cate == 'All'){
					cate = '';
				}else if(typeof cate == 'object'){
					cate = cate;
				}else if(param.region != undefined){
					cate = param.cate;
				}
				if(team == 'All'){
					team = '';
				}else if(typeof team == 'object'){
					team = team;
				}else if(param.team != undefined){
					team = param.team;
				}
				this.cl(region,cate,team);
				uni.setStorage({
					key:cacheKey,
					data:{region:region,cate:cate,team:team}
				});
				this.$emit('filterParam',{region_id:region.id != undefined ? region.id : '',cate_id:cate.id != undefined ? cate.id : '',team_id:team.id != undefined ? team.id : ''});
				this.close(s);
			},
			cl:function(region='',cate='',team=''){
				this.regionName = region.name != undefined ? region.name : "全国";
				this.cateName = cate.name != undefined ? cate.name : "工程专业";
				this.teamName = team.name != undefined ? team.name : this.defaultTeamName();
				if(team == ''){
					this.changeTeamName = this.defaultTeamName();
				}
			},
			defaultTeamName(){
				switch(this.type){
					case 'chengbao':
					return '班组/单位';
					break;
					case 'gczp':
					return '班组/单位';
					break;
					case 'zhaohuo':
					return '建筑工人/厂工';
					break;
					case 'zhaogong':
					return '建筑工人/厂工';
					break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.select_box{
		position: relative;
	}
	.top-tab-wrap{
		height: 80upx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color:#FFFFFF;
		border-bottom: 1px solid #dcdcdc;
		z-index:100;
		color:#000000;
		font-size:28upx;
		position: relative;
		view{
			.angle{
				display: inline-flex;
				width: 0; 
				height: 0;
				margin-left:10upx;
				border-width:12rpx;
				border-style: solid;
				border-color: transparent #8d98a4 transparent transparent;
				transform: rotate(-90deg);
				transition: transform .2s ease-out;
				margin-left:10rpx;
			}
			.rotate-angle{
				transform: rotate(90deg);
				vertical-align:top;
			}
		}
	}
	.top-screen-shade{
		position:fixed;
		z-index: 99;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		visibility: hidden;
		overflow: hidden;
	}
	.top-screen-wrap{
		position: absolute;
		top:80rpx;
		width: 100%;
		height:50vh;
		background: #fff;
		z-index:99;
		overflow:hidden;
		visibility: hidden;
		transition: all .3s ease-out;
		transform: translatey(-100%);
		.content-wrap{
			width: 100%;
			height:100%;
			overflow-y:scroll;
			.item{
				font-size:28upx;
				padding:0 40upx;
				line-height:80upx;
				border-bottom: solid 1px #e8e6e3;
				.item-child{
					position: fixed;
					top:0;
					right: 0;
					width: 50%;
					height: 60vh;
					background: #f7f7f7;
					overflow-y: scroll;
					z-index:1000;
					visibility: hidden;
					transition: all .3s ease-out;
					transform: translateX(100%);
					view{
						padding:0 20upx;
						line-height:80upx;
						border-bottom: solid 1px #e8e6e3;
					}
				}
			}
		}
	}
	.show{
		visibility: visible !important;
		transform: translatey(0%) !important;
	}
	.show-shade{
		visibility: visible;
	}
	.avtive{
		color:#0099ff;
	}
	.avtive-child{
		background:#0099ff;
		color:#ffff;
	}
</style>
