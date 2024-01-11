<template>
	<view class="page">
		<!-- 状态栏高度 -->
		<view class="top-status" :style="{ height: heightAttribute.statusBarHeight + 'px' }"></view>
		<!-- 标题栏容器 -->
		<view class="top-bar" :style="{
			height: heightAttribute.musicheadHeight + 'px',
			boxShadow: props.showBoxShadow ? '0px 8rpx 15rpx 0rpx rgba(0, 0, 0, 0.08)' : ''
		}">
			<!-- 返回 & 副标题 -->
			<view class="top-bar-left" :class="props.showLeft ? 'showLeft' : 'hideLeft'">
				<template v-if="props.leftText === 'return-black'">
					<image @tap="clickReturn" src="../../static/return-black.png" style=""></image>
				</template>
				<template v-if="props.leftText === 'return-white'">
					<image @tap="clickReturn" src="../../static/return-white.png" style=""></image>
				</template>
				<template v-else>
					<text>{{ props.leftText }}</text>
				</template>
			</view>
			<!-- 标题 -->
			<text class="top-bar-title" :class="props.showTitle ? 'showTitle' : 'hideTitle'">{{ props.titleText }}</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { reactive } from "vue";
	import { onReady } from '@dcloudio/uni-app'
	const props = defineProps<{
		// 左侧
		leftText : 'return-white' | 'return-black' | string | number;
		// 标题
		titleText : string | number;
		// 是否显示左侧
		showLeft : boolean;
		// 是否显示标题
		showTitle : boolean;
		// 是否显示阴影
		showBoxShadow : boolean;
	}>();
	const emit = defineEmits<{
		(e: 'remainingHeight', height: number): void;
		(e: 'currentHeight', height: number): void;
	}>();

	const heightAttribute = reactive({
		// 胶囊按钮信息
		menuButtonInfo: {
			width: 0,
			height: 0,
			top: 0
		},
		// 状态栏高度
		statusBarHeight: 0,
		// 导航栏高度
		musicheadHeight: 0,
	})

	onReady(() => {
		// #ifdef  MP-WEIXIN
		// 获取状态栏高度
		const { statusBarHeight, windowHeight, screenHeight } = uni.getSystemInfoSync()
		heightAttribute.statusBarHeight = statusBarHeight

		// 获取胶囊按钮信息
		const { width, height, top } = uni.getMenuButtonBoundingClientRect()
		heightAttribute.menuButtonInfo = { width, height, top }

		// 胶囊按钮相对于离导航栏的上边距
		const topDistance = heightAttribute.menuButtonInfo.top - heightAttribute.statusBarHeight;

		// 计算导航栏高度
		heightAttribute.musicheadHeight = heightAttribute.menuButtonInfo.height + topDistance * 2;
		
		// 传递导航栏高度
		emit('currentHeight', heightAttribute.menuButtonInfo.height + topDistance * 2)
		
		// 传递页面剩余高度
		emit('remainingHeight', heightAttribute.statusBarHeight + heightAttribute.musicheadHeight);
		// #endif
	})
	
	// 点击返回
	const clickReturn = () => uni.navigateBack()
</script>

<style lang="scss" scoped>
	.showLeft {
		transform: translateX(0px);
		opacity: 1;
	}

	.hideLeft {
		transform: translateX(-80px);
		opacity: 0;
	}

	.showTitle {
		transform: translateX(0px);
		opacity: 1;
	}

	.hideTitle {
		transform: translateY(-60px);
		opacity: 0;
	}

	.page {
		position: sticky;
		top: 0;
		z-index: 3001;
	}

	.top-status {
		transition: all 1s;
		background-color: #409eff;
	}

	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #409eff;
		transition: all 0.6s;

		.top-bar-left {
			// width: 50rpx;
			height: 50rpx;
			position: absolute;
			left: 24rpx;
			transition: all 1s;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			text {
				font-family: PingFang SC;
				font-style: normal;
				font-weight: 400;
				font-size: 36rpx;
				color: #FFFFFF;
			}
		}

		.top-bar-title {
			margin: 0 auto;
			font-family: PingFang SC;
			font-style: normal;
			font-weight: 400;
			font-size: 36rpx;
			color: #FFFFFF;
			transition: all 1s;
		}
	}
</style>