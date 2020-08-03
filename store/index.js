import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		isBindAccount:false
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			if(provider.account){
				state.isBindAccount = true;
			}
			uni.setStorage({//缓存用户登录信息
			    key: 'userInfo',  
			    data: provider  
			});
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.isBindAccount = false;
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		checkBindAccount(state){
			if(state.hasLogin && !state.isBindAccount){
				uni.showModal({
					title:'提示',
					content:'检测到您未绑定手机号码，部分功能无法正常使用，请您先绑定手机号码',
					confirmText:'去绑定',
					showCancel:false,
					success:(e=>{
						if(e.confirm){
							uni.navigateTo({
								url:'/pages/member/modify-info'
							})
						}
					})
				})
			}
		}
	},
	actions: {
		
	}
})

export default store