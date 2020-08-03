<template>
	<view class="main">
		<view class="login-img">
			<image src="../../static/tx01.png"></image>
		</view>
		<form class="form" @submit="formSubmit" >
			<view class="item">
				<image src="../../static/tel.png"></image>
				<input type="number" maxlength="11" placeholder="请输入手机号" />
			</view>
			<view class="item" style="padding-right:0;">
				<image src="../../static/code.png"></image>
				<input type="number" maxlength="6" placeholder="请输入验证码" style="width:70%;"/>
				<button type="default" size="mini" class="getCode">获取验证码</button>
			</view>
			<view class="item">
				<image src="../../static/pwd.png"></image>
				<input type="text" password="true" maxlength="16" placeholder="请输入密码" />
			</view>
			<view class="submit">
				<button type="default" form-type="submit">找回密码</button>
			</view>
		</form>
		<view class="forget-reg">
			<navigator url="/pages/common/reg" open-type="navigate">注册账号</navigator>
			<text>|</text>
			<navigator url="/pages/common/login" optn-type="navigate">登录账号</navigator>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: white;
	}
	.main{
		padding:100upx 0;
		.login-img{
			text-align: center;
			image{
				width: 180upx;
				height: 180upx;
			}
		}
		.form{
			padding:100upx 30upx 0upx;
			display: block;
			.item{
				padding:30upx 40upx 20upx 0upx;
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #eeeeee;
				input{
					width: 100%;
					height:60upx;
					padding-left: 40upx;
				}
				image{
					width: 50upx;
					height: 50upx;
				}
				.getCode{
					font-size: 24upx;
					background-color: #14aaf7;
					color:white;
					width:160upx;
					padding: 0;
					margin-right:0;
				}
			}
			.submit button{
				background-color: #14aaf7;
				color: white;
				margin: 60upx 120upx;
				box-shadow: #cce4ff 0 0 2upx;
				letter-spacing:10upx;
				border-radius:100upx;
				font-size: 36upx;
			}
		}
		.forget-reg{
			display: flex;
			justify-content: center;
			navigator{
				font-size:28upx;
				color: #14aaf7;
				margin:0upx 30upx;
			}
		}
	}
</style>
