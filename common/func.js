export default {
	// 提示
	msg:function (title, duration=1500, mask=false, icon='none') {
		if(Boolean(title) === false){
			return;
		}
		uni.showToast({
			title,
			duration,
			mask,
			icon
		});
	},
	VerifyPhone:function(phone){
		let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		let bool = true;
		if(!reg.test(phone)){
			bool = false;
		}
		return bool;
	},
	/**
	 * 处理富文本里的图片宽度自适应
	 * 1.去掉img标签里的style、width、height属性
	 * 2.img标签添加style属性：max-width:100%;height:auto
	 * 3.修改所有style里的width属性为max-width:100%
	 * 4.去掉<br/>标签
	 * @param html
	 * @returns {void|string|*}
	 */
	formatRichText:function(html){
		let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
			match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
			match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
			return match;
		});
		newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
			match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
			return match;
		});
		newContent = newContent.replace(/<br[^>]*\/>/gi, '');
		newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
		return newContent;
	}
}