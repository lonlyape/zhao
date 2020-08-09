import Vue from 'vue'

function initImgUrl(url) {
	if (!value) return ''
	if (/^\/uploa/.test(url)) {
		return this.api_url + url
	}
}
Vue.filter('initImg', initImgUrl)
