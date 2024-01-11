<template>
	<ccicTopBar leftText="商品监控系统" titleText="首页" :showLeft="showLeft" :showTitle="showTitle" :showBoxShadow="showBoxShadow" @remainingHeight="setPageHeight"></ccicTopBar>
	<view class="list" v-for="(item, index) in 100" :key="index">{{ item }}</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import ccicTopBar from '@/components/ccic-topbar';
	import { useSlideDirection, useRemainingHeight } from '@/hooks/useTopBar';

	// 顶部topbar参数
	const { showLeft, showTitle, showBoxShadow, onPageScroll } = useSlideDirection();
	void onPageScroll;

	// 获取除顶部topbar外剩余高度
	const pageHeight = ref('');
	const setPageHeight = (height: number) => {
		pageHeight.value = useRemainingHeight(height);
	};
</script>

<style></style>
