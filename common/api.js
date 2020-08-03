/**
 * 有少部分没有api作为前缀的，是因为做了路由处理
 */
// 手机号登录
const login					=	'/login';
// 微信小程序登录
const wxAppLogin			=	'/api/we_chat/wxAppLogin';
// 检测登录状态
const checkWxAppLogin		=	'/api/we_chat/checkWxAppLogin';
// 发送验证码
const sendSms				=	'/sendSms';
// base64编码转图片
const base64ToImg			=	'/base64ToImg';
// 获取所有地区数据
const getAllRegion			=	'/api/common/getAllRegion';
// 获取幻灯片
const getSlideList 			= 	'/api/common/getSlideList';
// 攻取 workList
const getWorkList			=	'/api/work/lists';
// 获取综合承包
const getChengBaoList 		= 	'/api/work/lists?type=3';
// 获取工人找活
const getZhaoHuoList 		= 	'/api/work/lists?type=2';
// 获取招工信息
const getZhaoGongList		= 	'/api/work/lists?type=1';
// 获取工厂找活
const getGczhList			= 	'/api/work/lists?type=4';
// 获取工厂直聘
const getGczpList			= 	'/api/work/lists?type=5';
// 获取材料详情
const getMaterialsDetail	= 	'/api/work/details';
// 获取承包、找活、招工详情
const getWorkDetails		=	'/api/work/details';
// 获取二手交易列表
const getUsedList			=	'/api/used/lists';
// 获取二手交易详情
const getUsedDetails		=	'/api/used/details';
// 查看承包、找活、招工电话
const lookWorkPhone			=	'/api/work/ViewFullPhone';
// 查看二手交易电话
const lookUsedPhone			=	'/api/used/ViewFullPhone';
// 获取文章
const getArticleList		=	'/api/article/lists';
// 获取文章详情
const getArticleDetails	 	= 	'/api/article/details';
// 修改用户信息
const modifyInfo			=	'/member/modify-person';
// 获取用户发布的招工/找活/承包列表
const getUserWrokList		=	'/api/work/userWrokList';
// 获取用户发布的二手交易列表
const getUserUsedList		=	'/api/used/userUsedList';
// 获取所有的工种分类
const getAllWorkCate		= 	'/api/cate/getAllWorkCate';
// 获取所有的工程承包分类
const getAllContractCate	= 	'/api/cate/getAllContractCate';
// 获取所有的二手交易分类
const getAllUsedCate		= 	'/api/cate/getAllUsedCate';
// 获取所有的材料分类
const getMaterialCate		= 	'/api/cate/getMaterialCate';
// 获取所有的材料所属
const getMaterialMt			= 	'/api/cate/getMaterialMt';
// 获取所有的材料包装规格
const getMaterialPg			= 	'/api/cate/getMaterialPg';
// 获取人员构成
const getStaffComposition	= 	'/api/common/getStaffComposition';
// 获取协议信息
const getTcpInfo			=	'/api/common/getTcpInfo';
// 获取工厂直聘的混合数据
const getGczpRestsData		=	'/api/common/getGczpRestsData';
// 发布招工
const publishZhaoGong		= 	'/member/publish-zhaogong';
// 发布找活
const publishZhaoHuo		= 	'/member/publish-zhaohuo';
// 发布承包
const publishChengBao		= 	'/member/publish-chengbao';
// 发布二手交易
const publishErShou			=	'/member/publish-ershou';
// 发布工厂找活
const publishGczh			=	'/member/publish-gczh';
// 发布工厂直聘
const publishGczp			=	'/member/publish-gczp';
// 发布材料
const publishMaterial		=	'/material/publish-material';
// 获取客服电话
const getServiceTel			=	'/api/common/getServiceTel';
// 获取供货信息的品牌
const getToolShopBrand		=	'/api/cate/lists?type=5';
// 获取供货信息的热卖推荐商品
const getToolShopHotGoods	=	'/api/shop/lists?limit=10&is_hot=1';
// 获取供货信息的专场商品
const getToolShopSpecialGoods=	 '/api/shop/specialGoods';
// 获取供货信息的分类
const getToolShopCate		=	'/api/cate/getAllShopCate';
// 获取供货信息的工种专场
const getToolShopSpecial	=	'/api/cate/lists?type=6';
// 获取供货信息详情
const getToolShopDetails	=	'/api/shop/details';
// 获取供货信息列表
const getToolShopGoodsList	=	'/api/shop/lists';
// 获取豆币列表
const getBeanRechargeList 	= 	'/api/common/getIntegralList';
// 获取用户豆币记录
const getUserBeanRecord		=	'/api/common/getUserBeanRecord';
// 更新招工/找活/承包状态
const updateWorkStatus 		= 	'/member/updateWorkStatus';
// 更新二手交易状态
const updateUsedStatus 		= 	'/member/updateUsedStatus';
// 创建订单
const createOrder			=	'/order/creates';
// 获取防骗指南
const getAntiFraud			=	'/api/common/anti_fraud';
// 获取置顶配置
const getTopConfig			=	'/api/common/top_config';
// 删除招工/找活/承包信息
const deleteWorkInfo		=	'/member/deleteWorkInfo';
// 删除二手交易信息
const deleteUsedInfo		=	'/member/deleteUsedInfo';
// 置顶招工/找活/承包信息
const isTopWork				=	'/member/isTopWork';
// 置顶二手交易
const isTopUsed				=	'/member/isTopUsed';
// 获取用户发布的单条招工/找活/承包数据
const findWorkOneData		=	'/api/work/findWorkOneData';
//获取用户发布的单条二手交易数据
const findUsedOneData		=	'/api/used/findUsedOneData';
// 修改招工
const modifyZhaoGong		=	'/member/modify-zhaogong';
// 修改找活
const modifyZhaoHuo			=	'/member/modify-zhaohuo';
// 修改承包
const modifyChengBao		=	'/member/modify-chengbao';
// 修改二手交易
const modifyErShou			=	'/member/modify-ershou';
// 修改工厂找活
const modifyGczh			=	'/member/modify-gczh';
// 修改工厂直聘
const modifyGczp			=	'/member/modify-gczp';
// 修改招工/找活/承包图片
const modifyWorkImage 		=	'/member/modify-work-image';
// 修改营业执照
const modifyWorkImage2 		=	'/member/modify-work-image2';
// 修改二手交易图片
const modifyUsedImage		=	'/member/modify-used-image';
// 删除上传的招工/找活/承包图片
const deleteWorkImage		=  '/member/delete-work-image';
// 删除上传的二手交易图片
const deleteUsedImage		=  '/member/delete-used-image';
// 留言/建议...
const onlineLeaveWord		=  '/onlineLeaveWord';
// 获取民族
const getNationalityData	=  '/api/common/getNationalityData';
// 实名认证
const certification 		=  '/member/certification';
// 获取实名认证信息
const getCertification		=	'/api/user/getCertification';
// 签到
const signin				=	'/signin';
export default{
	login,
	wxAppLogin,
	checkWxAppLogin,
	sendSms,
	base64ToImg,
	getAllRegion,
	getSlideList,
	getWorkList,
	getChengBaoList,
	getZhaoHuoList,
	getZhaoGongList,
	getGczhList,
	getGczpList,
	getMaterialsDetail,
	getWorkDetails,
	getUsedList,
	getUsedDetails,
	lookWorkPhone,
	lookUsedPhone,
	getArticleList,
	getArticleDetails,
	modifyInfo,
	getUserWrokList,
	getUserUsedList,
	getAllWorkCate,
	getAllContractCate,
	getAllUsedCate,
	getMaterialCate,
	getMaterialMt,
	getMaterialPg,
	getStaffComposition,
	getTcpInfo,
	getGczpRestsData,
	publishZhaoGong,
	publishZhaoHuo,
	publishChengBao,
	publishErShou,
	publishGczh,
	publishGczp,
	publishMaterial,
	getServiceTel,
	getToolShopBrand,
	getToolShopHotGoods,
	getToolShopSpecialGoods,
	getToolShopCate,
	getToolShopSpecial,
	getToolShopDetails,
	getToolShopGoodsList,
	getBeanRechargeList,
	getUserBeanRecord,
	updateWorkStatus,
	updateUsedStatus,
	createOrder,
	getAntiFraud,
	getTopConfig,
	deleteWorkInfo,
	deleteUsedInfo,
	isTopWork,
	isTopUsed,
	findWorkOneData,
	findUsedOneData,
	modifyZhaoGong,
	modifyZhaoHuo,
	modifyChengBao,
	modifyErShou,
	modifyGczh,
	modifyGczp,
	modifyWorkImage,
	modifyWorkImage2,
	modifyUsedImage,
	deleteWorkImage,
	deleteUsedImage,
	onlineLeaveWord,
	getNationalityData,
	certification,
	getCertification,
	signin
}