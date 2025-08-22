<template>
	<el-watermark :content="systemTheme.showWatermark ? systemTheme.watermarkContent : ''" style="height: 100%;" :font="{color: systemTheme.watermarkTextColor}">
		<el-container class="h-100">
			<el-scrollbar ref="scrollbarOneRef"
										:style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].one.style"
										:max-height="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].one.max"
										:wrap-style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].one.wrap"
										:view-style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].one.view">
				<QFLayoutHeader />
				<PageTabs />
				<el-scrollbar ref="scrollbarTwoRef"
											:style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].two.style"
											:max-height="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].two.max"
											:wrap-style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].two.wrap"
											:view-style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].two.view">
					<el-container :style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].middle">
						<QFLayoutColumns />
						<QFLayoutAside />
						<el-scrollbar ref="scrollbarThreeRef"
													:style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].three.style"
													:max-height="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].three.max"
													:wrap-style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].three.wrap"
													:view-style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].three.view">
							<el-container :style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].lower">
								<QFLayoutHeader :isTopNav="false" />
								<PageTabs :isTopNav="false" />
								<el-scrollbar ref="scrollbarFourRef"
															:style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].four.style"
															:max-height="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].four.max"
															:wrap-style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].four.wrap"
															:view-style="layoutStyle[systemTheme.layout][systemTheme.affixHeader?1:0].four.view">
									<el-main style="overflow: hidden;">
										<router-view v-slot="{ Component }">
											<Transition enter-active-class="animate__animated animate__fadeInLeft" leave-active-class="animate__animated animate__fadeOutRight">
												<KeepAlive :include="_cachedViews">
													<component :is="Component" :key="route.fullPath" class="w100" />
												</KeepAlive>
											</Transition>
										</router-view>
									</el-main>
									<QFLayoutFooter />
								</el-scrollbar>
								<QFLayoutFooter :isMain="false" />
							</el-container>
						</el-scrollbar>
					</el-container>
				</el-scrollbar>
			</el-scrollbar>
		</el-container>
	</el-watermark>
</template>
<script setup name="FrontLayout">
import { onMounted, ref, watch, defineAsyncComponent, nextTick, computed } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import pinia from '@/Stores/index';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
import { useKeepALiveNames } from '@/Stores/keepAliveNames';
const QFLayoutHeader = defineAsyncComponent(() => import('./Components/QFLayoutHeader.vue'));
const QFLayoutColumns = defineAsyncComponent(() => import('./Components/QFLayoutColumns.vue'));
const QFLayoutAside = defineAsyncComponent(() => import('./Components/QFLayoutAside.vue'));
const QFLayoutFooter = defineAsyncComponent(() => import('./Components/QFLayoutFooter.vue'));
const PageTabs = defineAsyncComponent(() => import('./Components/PageTabs.vue'));
const route = useRoute();
const router = useRouter();
const storesUseAppSettings = useAppSettings(pinia);
const { appSettings, systemTheme } = storeToRefs(useAppSettings());
const { keepAliveNames, cachedViews } = storeToRefs(useKeepALiveNames());
const pageTabHeight = ref(30);
const _cachedViews = computed(() => {
	return cachedViews.value.join(',');
});
const layoutStyle = ref({
	default: {
		1: {
			upper: '', middle: 'height: 100%;', lower: 'flex-direction: column;transition: 0.3s;height: 100%;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			two: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			three: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			four: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' }
		},
		0: {
			upper: '', middle: 'height: 100%;', lower: 'flex-direction: column;transition: 0.3s;height: 100%;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			two: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			three: { style: 'width:100%;', max: '', wrap: '', view: '' },
			four: { style: 'width:100%;', max: '', wrap: '', view: '' }
		}
	},
	horizontal: {
		1: {
			upper: '', middle: 'height: 100%;', lower: 'height: 100%;flex-direction: column;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			two: { style: `width:100%;height:calc(100% - ${systemTheme.value.headerHeight + (systemTheme.value.showPageTabs ? pageTabHeight.value : 0)}px);`, max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			three: { style: 'width:100%;height: 100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			four: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' }
		},
		0: {
			upper: '', middle: 'height: 100%;', lower: 'flex-direction: column;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: height: 100%;' },
			two: { style: 'width:100%;', max: 'fit-content', wrap: 'height: fit-content;', view: 'height: fit-content;' },
			three: { style: 'width:100%;', max: 'fit-content', wrap: 'height: fit-content;', view: 'height: fit-content;' },
			four: { style: 'width:100%;', max: 'fit-content', wrap: 'height: fit-content;', view: 'height: fit-content;' }
		}
	},
	classic: {
		1: {
			upper: '', middle: 'height: 100%;', lower: 'height: 100%;flex-direction: column;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			two: { style: `width:100%;height:calc(100% - ${systemTheme.value.headerHeight}px);`, max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			three: { style: 'width:100%;height: 100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			four: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' }
		},
		0: {
			upper: '', middle: 'height: 100%;', lower: 'height: 100%;flex-direction: column;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			two: { style: `width:100%;height:calc(100% - ${systemTheme.value.headerHeight}px);`, max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			three: { style: 'width:100%;height: 100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			four: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' }
		}
	},
	columns: {
		1: {
			upper: '', middle: 'height: 100%;', lower: 'flex-direction: column;height: 100%;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			two: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			three: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			four: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' }
		},
		0: {
			upper: '', middle: 'height: 100%;', lower: 'flex-direction: column;height: 100%;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			two: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			three: { style: 'width:100%;', max: '', wrap: '', view: '' },
			four: { style: 'width:100%;', max: '', wrap: '', view: '' }
		}
	},
	chapter: {
		1: {
			upper: '', middle: 'height: 100%;', lower: 'flex-direction: column;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			two: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			three: { style: 'width:100%;', max: '', wrap: '', view: '' },
			four: { style: 'width:100%;', max: '', wrap: '', view: '' }
		},
		0: {
			upper: '', middle: 'height: 100%;', lower: 'flex-direction: column;',
			one: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			two: { style: 'width:100%;', max: '100%', wrap: 'height: 100%;', view: 'height: 100%;' },
			three: { style: 'width:100%;', max: '', wrap: '', view: '' },
			four: { style: 'width:100%;', max: '', wrap: '', view: '' }
		}
	}
});
const scrollbarOneRef = ref();
const scrollbarTwoRef = ref();
const scrollbarThreeRef = ref();
const scrollbarFourRef = ref();
const OnResetScrollbar = () => {
	nextTick(() => {
		layoutStyle.value.horizontal["1"].two.style = `width:100%;height:calc(100% - ${systemTheme.value.headerHeight + (systemTheme.value.showPageTabs ? 30 : 0)}px);`
		layoutStyle.value.classic["1"].two.style = `width:100%;height:calc(100% - ${systemTheme.value.headerHeight}px);`
		layoutStyle.value.classic["0"].two.style = `width:100%;height:calc(100% - ${systemTheme.value.headerHeight}px);`
		// layoutStyle.value.horizontal["1"].middle = `height: calc(100% + ${systemTheme.value.showPageTabs ? 30 : 0}px);`
		let _js = 0;
		const scrollbarInterval = setInterval(() => {
			scrollbarOneRef.value?.update();
			scrollbarTwoRef.value?.update();
			scrollbarThreeRef.value?.update();
			scrollbarFourRef.value?.update();
			_js++;
			if (_js > 20) {
				window.clearInterval(scrollbarInterval);
			}
		}, 100);
	});
}
watch(
	() => [systemTheme.value.layout,route.path,
	systemTheme.value.showPageTabs,
	systemTheme.value.affixHeader,
	systemTheme.value.headerHeight,
	systemTheme.value.showFooter],
	() => {
		OnResetScrollbar();
	}
);
onBeforeRouteUpdate((to) => {
	OnResetScrollbar();
});
onMounted(() => {
});
</script>
<style lang="scss" scoped>
</style>
