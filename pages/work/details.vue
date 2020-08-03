<template>
	<view class="detail_box_f" v-if="datas">
		<detail @updateData="loadData" :datas="datas" :cellList="cellList" :title="title" :user="user" :detailList="detailList"></detail>
	</view>
</template>

<script>
	import detail from '@/components/detail.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		components: {
			detail
		},
		data() {
			return {
				datas: null,
				work_id: '',
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo', 'isBindAccount']),
			title: function() {
				if (this.datas) {
					return this.datas.title || 'title'
				}
			},
			type: function() {
				let datas = this.datas
				return datas.type
			},
			user: function() {
				let datas = this.datas
				let user = datas.user || {}
				return {
					...user,
					phone: datas.phone
				}
			},
			detailList: function() {
				let list = []
				let title = ''
				let datas = this.datas
				switch (this.type) {
					case 3:
						title = '发包工程详情'
						break
					case 1:
						title = '招工信息详情'
						break
					case 5:
						title = '工厂招聘详情'
						break
					case 2:
						title = '工人找活详情'
						break
					default:
						title = '详情'
				}
				if (datas.content) {
					list.push({
						title,
						content: datas.content
					})
				}
				if (datas.image) {
					list.push({
						title: '图片',
						img: datas.image
					})
				}
				return list;
			},
			cellList: function() {
				let list = []
				let l = []
				let datas = this.datas
				let more = datas.more || {}
				switch (this.type) {
					case 1:
						if (datas.region) {
							l.push(this.setCell('招工地区', datas.region))
						}
						if (datas.type != 5 && datas.work_cate) {
							let label = '所需工种'
							let value = ''
							let workCate = datas.work_cate
							for (let i in workCate) {
								if (i && workCate[i]) {
									value += value ? (',' + i + workCate[i]) : (i + workCate[i])
								} else {
									value += value ? (',' + i || workCate[i]) : (i || workCate[i])
								}
							}
							l.push(this.setCell(label, value))
						}
						if (l.length) {
							list.push(l)
							l = []
						}
						if (datas.publish_time) {
							l.push(this.setCell('发布时间', datas.publish_time))
						}
						list.push(l)

						break
					case 2:
						if (datas.region) {
							l.push(this.setCell('可去地区', datas.region))
						}
						if (datas.type != 5 && datas.work_cate) {
							let label = '专业工种'
							let value = ''
							let workCate = datas.work_cate
							for (let i in workCate) {
								if (i && workCate[i]) {
									value += value ? (',' + i + workCate[i]) : (i + workCate[i])
								} else {
									value += value ? (',' + i || workCate[i]) : (i || workCate[i])
								}
							}
							l.push(this.setCell(label, value))
						}
						if (l.length) {
							list.push(l)
							l = []
						}
						if (datas.publish_time) {
							l.push(this.setCell('发布时间', datas.publish_time))
						}
						if (datas.team_text && datas.type != 5) {
							let label = datas.type == 3 ? '所需人员构成' : '人员构成'
							l.push(this.setCell(label, datas.team_text))
						}
						list.push(l)
						break
					case 5:
						if (more.xinzi_text) {
							l.push(this.setCell('薪资', more.xinzi_text + more.xinzileixing_text))
						}
						if (datas.region) {
							l.push(this.setCell('工作地址', datas.region))
						}
						if (more.zhiweifuli_text) {
							l.push(this.setCell('职位福利', more.zhiweifuli_text))
						}
						if (more.xueliyaoqiu) {
							l.push(this.setCell('学历要求', more.xueliyaoqiu))
						}
						if (more.gongzuonianxian) {
							l.push(this.setCell('工作经验', more.gongzuonianxian))
						}
						if (datas.team_text) {
							l.push(this.setCell('招聘人数', datas.team_text))
						}
						if (more.gongzuoleixing_text) {
							l.push(this.setCell('工作类型', more.gongzuoleixing_text))
						}
						if (datas.publish_time) {
							l.push(this.setCell('发布时间', datas.publish_time))
						}
						list.push(l)
						break
					default:
						if (datas.region) {
							l.push(this.setCell('地区', datas.region))
						}
						if (more.cenggongzuodanwei) {
							l.push(this.setCell('曾工作单位', more.cenggongzuodanwei))
						}
						if (datas.zhiweifuli_text) {
							l.push(this.setCell('职位福利', datas.zhiweifuli_text))
						}
						if (datas.publish_time) {
							l.push(this.setCell('发布时间', datas.publish_time))
						}
						if (more.bidding_type) {
							l.push(this.setCell('发包类型', more.bidding_type))
						}
						if (datas.team_text && datas.type != 5) {
							let label = datas.type == 3 ? '所需人员构成' : '人员构成'
							l.push(this.setCell(label, datas.team_text))
						}
						if (datas.type == 3) {
							if (more.contract_manner_text) {
								l.push(this.setCell('承包方式', more.contract_manner_text))
							}
							if (more.project_cost) {
								l.push(this.setCell('预计工程造价', more.project_cost + ' w'))
							}
						}
						if (datas.type != 5 && datas.work_cate) {
							let label = ''
							let value = ''
							if (datas.type == 1) {
								label = '所需工种'
							}
							if (datas.type == 3) {
								label = '工程类别'
							}
							if (datas.type == 2) {
								label = '专业工种'
							}
							let workCate = datas.work_cate
							for (let i in workCate) {
								if (i && workCate[i]) {
									value += value ? (',' + i + workCate[i]) : (i + workCate[i])
								} else {
									value += value ? (',' + i || workCate[i]) : (i || workCate[i])
								}
							}
							l.push(this.setCell(label, value))
						}
						list.push(l)
				}
				return list
			},
		},
		onLoad(option) {
			this.work_id = option.work_id;
			this.loadData(option);
		},
		methods: {
			setCell(label, val) {
				return {
					label: label,
					value: val
				}
			},
			async loadData(option) {
				uni.showLoading({
					title: '数据加载中',
				})
				let data = {
					work_id:option? option.work_id:this.work_id
				};
				if (this.userInfo.uid != undefined) {
					data.user_id = this.userInfo.uid;
				}
				await this.request.get(this.api.getWorkDetails, {
					data: data
				}).then(res => {
					if (res.code) this.datas = res.data;
				}).catch(error => {
					console.log('Error:', error);
				})
				uni.hideLoading();
			},
		}
	}
</script>
<style lang="scss" scoped="detail_box_f">
	.detail_box_f {}
</style>
