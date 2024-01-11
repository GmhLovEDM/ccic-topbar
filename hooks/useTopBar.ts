import { ref } from 'vue';
import { onPageScroll } from '@dcloudio/uni-app';

/** 获取剩余高度 */
export const useRemainingHeight = (height: number) => {
	return `height: calc(100% - (${height * 2}rpx + env(safe-area-inset-bottom)));`;
};

/** 获取组件参数 */
export const useSlideDirection = () => {
	const showLeft = ref(true);
	const showTitle = ref(false);
	const showBoxShadow = ref(false);
	let prevScrollTop = 0;

	onPageScroll((e) => {
		// 是否显示阴影
		if (e.scrollTop == 0) {
			showBoxShadow.value = false;
		} else showBoxShadow.value = true;
		// 处理IOS回弹
		if (e.scrollTop <= 0) {
			showLeft.value = true;
			showTitle.value = false;
		} else {
			// 判断滑动
			if (e.scrollTop > prevScrollTop) {
				// 向上滑动
				showLeft.value = false;
				showTitle.value = true;
			} else if (e.scrollTop < prevScrollTop) {
				// 向下滑动
				showLeft.value = true;
				showTitle.value = false;
			} else {
				// 没有滑动
				showTitle.value = true;
			}
		}
		// 记录旧的scrollTop
		prevScrollTop = e.scrollTop;
	});

	return {
		showLeft,
		showTitle,
		showBoxShadow,
		// FIXME: 需要多返回一个onPageScroll才能使其生效
		onPageScroll
	};
};
