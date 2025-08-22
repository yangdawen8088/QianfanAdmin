<template>
	<PageContainer>
		<template #Default>
			<!-- <div class="block-container">
				<div class="block-item"
						 v-for="item in dataStatistics"
						 :key="item"
						 :style="{'background-image': item.bgColor}">
					<div class="flex-between-center">
						<div class="item-title">
							<i class="iconfont"
								 :class="item.icon" />
							<span>{{item.title}}</span>
						</div>
						<span>{{item.subCount}}</span>
					</div>
					<span class="count">{{item.count}}</span>
					<i class="block-icon iconfont"
						 :class="item.icon" />
				</div>
				<div class="block-item-ts"
						 id="chart1Ref">
				</div>
			</div> -->
			<div class="body-container">
				<div class="left">
					<div class="item-lr m-b-10">
						<div class="block-item"
								 style="width: 100%; height: 100%;"
								 id="chart2Ref"></div>
					</div>
					<div class="item-lr m-t-10 m-b-10">
						<div class="block-item"
								 style="width: 100%; height: 100%;"
								 id="chart7Ref"></div>
					</div>
					<div class="item-lr m-t-10">
						<div class="block-item"
								 style="width: 100%; height: 100%;"
								 id="chart8Ref"></div>
					</div>
				</div>
				<div class="center">
					<div class="item-ct m-b-10">
						<div class="block-item"
								 style="width: 100%; height: 100%;border:none;"
								 id="chart9Ref"></div>
					</div>
					<div class="item-cd">
						<div class="block-item"
								 style="width: 100%; height: 100%;"
								 id="chart3Ref"></div>
					</div>
				</div>
				<div class="right">
					<div class="item-lr m-b-10">
						<div class="block-item"
								 style="width: 100%; height: 100%;"
								 id="chart4Ref"></div>
					</div>
					<div class="item-lr m-b-10 m-t-10">
						<div class="block-item"
								 style="width: 100%; height: 100%;"
								 id="chart5Ref"></div>
					</div>
					<div class="item-lr m-t-10">
						<div class="block-item"
								 style="width: 100%; height: 100%;"
								 id="chart6Ref"></div>
					</div>
				</div>
			</div>
		</template>
	</PageContainer>
</template>
<script setup name="Dashboard">
import { ref, onMounted, nextTick, onBeforeUnmount, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppSettings } from '@/Stores/appSettings';
import * as echarts from 'echarts';
import 'echarts-gl';
import geoJson from './mapData.json';
const { appSettings } = storeToRefs(useAppSettings());
const dataStatistics = ref([{
	icon: 'icon-shifuguanli',
	title: '下载量统计',
	count: '126,560',
	subCount: '周同比 12% ↑',
	bgColor: 'linear-gradient(120deg, rgb(165 205 255) 0%, rgb(123 176 255) 100%)'
}, {
	icon: 'icon-beikongshuiwupingtaimenhu-tubiao_duogongnengxunjianjiqiren',
	title: '分享量分析',
	count: '2563',
	subCount: '周同比 12% ↑',
	bgColor: 'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)'
}, {
	icon: 'icon-guanyuwo',
	title: '项目完成情况',
	count: '5874',
	subCount: '周同比 12% ↑',
	bgColor: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
}, {
	icon: 'icon-dingzhihuafuwu2',
	title: '需求完成情况',
	count: '689',
	subCount: '周同比 12% ↑',
	bgColor: 'linear-gradient(to right, #c0c0aa , #1cefff )'
}, {
	icon: 'icon-xiangmu',
	title: '源码浏览量',
	count: '152',
	subCount: '周同比 12% ↑',
	bgColor: 'linear-gradient(-20deg, rgb(165 210 230) 0%, rgb(137 193 221) 100%)'
},]);
const themeColor = ref('')
const chartInit1Ref = ref();
const chartInit2Ref = ref();
const chartInit3Ref = ref();
const chartInit4Ref = ref();
const chartInit5Ref = ref();
const chartInit6Ref = ref();
const chartInit7Ref = ref();
const chartInit8Ref = ref();
const chartInit9Ref = ref();
const LoadChart5 = () => {
	if (!document.getElementById('chart5Ref')) return;
	const chart = echarts.init(document.getElementById('chart5Ref'));
	// 定义起始和结束角度
	const startAngle = 240;
	const endAngle = -60;

	// 初始化 ECharts 实
	// 更新图表选项的函数
	function updateChart () {
		// 生成一个在 0 到 10 之间的随机数，并保留两位小数
		const randomValue = (Math.random() * 10).toFixed(2);

		// 定义图表的配置项
		let option = {
			backgroundColor: 'transparent',
			title: [
				{
					text: `{value|${randomValue}%}\n{name|${'需求量'}}`,
					left: 'center',
					bottom: '42%',
					textStyle: {
						rich: {
							value: {
								fontSize: '38',
								fontFamily: 'Digi',
								color: '#ffffff',
								padding: [8, 0]
							},
							name: {
								fontSize: '12',
								color: '#ffffff'
							}
						}
					}
				}
			],
			series: [
				{
					name: '最外层-刻度尺',
					type: 'gauge',
					radius: '95%',
					startAngle,
					endAngle,
					axisLine: {
						lineStyle: {
							color: [[1, 'rgba(25, 235, 255, 1)']],
							width: 1
						}
					},
					axisTick: {
						distance: -6,
						length: 7,
						lineStyle: {
							color: 'rgba(25, 235, 255, 1)'
						},
						splitNumber: 10
					},
					splitLine: {
						distance: -11,
						length: 14,
						lineStyle: {
							color: 'rgba(25, 235, 255, 1)',
							width: 1
						}
					},
					axisLabel: {
						show: false
					},
					pointer: {
						show: false
					}
				},
				// 内层带指针
				{
					name: '内层带指针',
					type: 'gauge',
					radius: '82%',
					startAngle,
					endAngle,
					axisLine: {
						lineStyle: {
							color: [[1, 'rgba(25, 235, 255, 0.2)']],
							width: 20
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						show: false
					},
					detail: {
						show: false
					},
					pointer: {
						show: false,
						length: '86%',
						offsetCenter: [0, '-24%'],
						width: 12,
						icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
					},
					progress: {
						show: false,
						width: 40,
					},
					data: [
						{
							value: 43
						}
					]
				},
				// 中心效果圆
				{
					name: '中心效果圆',
					type: 'gauge',
					radius: '54%',
					startAngle: 0,
					endAngle: 360,
					axisLine: {
						lineStyle: {
							color: [[1, '#0AFFE9']],
							width: 1
						}
					},
					axisTick: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						show: false
					},
					detail: {
						show: false
					},
					pointer: {
						show: false
					},
					progress: {
						show: true,
						width: 80,
						itemStyle: {
							color: {
								type: 'radial',
								x: 0.5,
								y: 0.5,
								r: 0.5,
								colorStops: [
									{
										offset: 0,
										color: 'rgb(0, 224, 205, 0)'
									},
									{
										offset: 0.7,
										color: 'rgba(0, 224, 205, 0)'
									},
									{
										offset: 1,
										color: 'rgba(10, 255, 233, 1)'
									}
								]
							}
						}
					},
					data: [
						{
							value: 100
						}
					]
				},
				{
					type: 'pie',
					radius: ['90%', '89.5%'],
					hoverAnimation: false,
					clockWise: false,
					itemStyle: {
						normal: {
							color: 'rgba(5, 79, 123, 1)'
						}
					},
					label: {
						show: false
					},
					data: [100]
				}
			]
		};
		chart.setOption(option);
	}

	// 初始化图表
	updateChart(); // 首次加载图表
	// 每 2000 毫秒（即 2 秒）更新一次图表
	setInterval(updateChart, 2000);

	chartInit5Ref.value = chart;
}
const LoadChart6 = () => {
	if (!document.getElementById('chart6Ref')) return;
	const chart = echarts.init(document.getElementById('chart6Ref'));
	var data = [];

	// 定义自定义数据
	const customData = [
		{
			name: '数据1',
			value: [0, 0, 10],
			itemStyle: {
				color: '#25b8d2'
			}
		},
		{
			name: '数据2',
			value: [0, 4, 78],
			itemStyle: {
				color: '#00e086',
			}
		},
		{
			name: '数据3',
			value: [2, 1, 62],
			itemStyle: {
				color: '#067bd1'
			}
		},
		{
			name: '数据4',
			value: [4, 0, 42],
			itemStyle: {
				color: '#b78437',
			}
		}
	];

	// 生成 10x10 网格数据
	for (let x = -5; x < 6; x++) {
		for (let y = -5; y < 6; y++) {
			// 查找是否有自定义数据
			const customItem = customData.find(item => item.value[0] === x && item.value[1] === y);
			const z = customItem ? customItem.value[2] : 0; // 使用自定义的 z 值，缺省为 0

			data.push({
				name: customItem ? customItem.name : `数据(${x},${y})`, // 名称为自定义名称或默认名称
				value: [x, y, z],
				itemStyle: {
					color: customItem ? customItem.itemStyle.color : '#25b8d2' // 自定义颜色或默认颜色
				}
			});
		}
	}

	const option = {
		backgroundColor: 'transparent',
		title: {
			show: false,
			text: '',
			textStyle: {
				fontSize: 10,
				fontWeight: 200
			},
			subtext: '',
			subtextStyle: {
				fontSize: 10,
			},
		},
		tooltip: {
			show: false, // 关闭 tooltip
		},
		visualMap: {
			show: false,
		},
		xAxis3D: {
			show: false,
			name: '',
			type: 'category',
		},
		yAxis3D: {
			show: false,
			name: '',
			type: 'category',
		},
		zAxis3D: {
			show: false,
			name: '',
			type: 'value',
		},
		grid3D: {
			boxWidth: 120,
			boxDepth: 120,
			axisLine: {
				show: true,
				lineStyle: {
					width: 0
				}
			},
			axisLabel: {
				show: false,
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false,
			},
			axisPointer: {
				show: false,
			},
			light: {
				main: {
					intensity: 1.2,
					shadow: true,
				},
				ambient: {
					intensity: 0.7,
					shadow: true,
				},
			},
			viewControl: {
				alpha: 30, // Y 轴角度
				beta: 30, // X 轴角度
				zoomSensitivity: 0.5, // 鼠标缩放灵敏度
				autoRotate: true, // 启用自动旋转
				autoRotateAfterStill: 5, // 停顿后自动旋转时间
				distance: 150, // 视距
			},
		},
		series: [
			{
				type: 'bar3D',
				name: '数量',
				data: data,
				bevelSize: 0.1,
				shading: 'lambert',
				label: {
					show: false, // 不显示标签
					distance: 1,
					textStyle: {
						color: '#fff',
						fontSize: 18,
						borderWidth: 0,
						borderColor: 'none',
						backgroundColor: 'rgba(255,255,255,0)',
						fontFamily: 'impact, Simhei',
					},
				},
				itemStyle: {
					opacity: 0.6,
				},
			},
		],
	};

	chart.setOption(option);
	chartInit6Ref.value = chart;
}
const LoadChart1 = () => {
	if (!document.getElementById('chart1Ref')) return;
	const chart = echarts.init(document.getElementById('chart1Ref'));
	const getVirtulData = () => {
		var today = echarts.number.parseDate(new Date());
		var dayTime = 3600 * 24 * 1000;
		var thatday = today - dayTime * 365;

		var data = [];
		for (var time = thatday; time < today; time += dayTime) {
			data.push([
				echarts.format.formatTime('yyyy-MM-dd', time),
				Math.floor(Math.random() * 10000)
			]);
		}
		return {
			data,
			today: echarts.format.formatTime('yyyy-MM-dd', today),
			thatday: echarts.format.formatTime('yyyy-MM-dd', thatday)
		};
	}
	var option = {
		visualMap: {
			min: 0,
			max: 10000,
			inRange: {
				color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196027']
			},
			show: true
		},
		backgroundColor: 'transparent',
		grid: {
			bottom: '0',
			top: '0',
			left: '0',
			right: '0',
		},
		calendar: {
			cellSize: [13, 13],
			left: 50,
			top: 20,
			range: [getVirtulData()['thatday'], getVirtulData()['today']],
			itemStyle: {
				borderColor: '#fff',
				borderWidth: 1
			},
			splitLine: {
				show: false
			},
			yearLabel: { show: false }
		},
		series: {
			type: 'heatmap',
			coordinateSystem: 'calendar',
			data: getVirtulData()['data']
		}
	};
	chart.setOption(option);
	chartInit1Ref.value = chart;
}
const LoadChart2 = () => {
	if (!document.getElementById('chart2Ref')) return;
	const chart = echarts.init(document.getElementById('chart2Ref'));
	const options = (type) => {
		const colorList = [
			{
				colorStart: '#fdd6ce',
				colorEnd: '#f3a78b',
			},
			{
				colorStart: '#85b0dc',
				colorEnd: '#add9ed',
			},
			{
				colorStart: '#6bd7fc',
				colorEnd: '#4fcafc',
			},
			{
				colorStart: '#c8bbf8',
				colorEnd: '#9581ec',
			},
			{
				colorStart: '#ffbabd',
				colorEnd: '#ff6c72',
			},
			{
				colorStart: '#ffd375',
				colorEnd: '#ffbc3c',
			},
			{
				colorStart: '#a5d9c9',
				colorEnd: '#51c4a5',
			},
			{
				colorStart: '#FCCB8E',
				colorEnd: '#ECBE89',
			},

			{
				colorStart: '#29DDE4',
				colorEnd: '#11B5EE',
			},
			{
				colorStart: '#6B71D8',
				colorEnd: '#7258B4',
			},
			{
				colorStart: '#DADCD9',
				colorEnd: '#CE9FF2',
			},
			{
				colorStart: '#EE609B',
				colorEnd: '#BB67D5',
			},
		]

		const itemGap = type ? 6 : 5
		const height = type ? 200 : 200
		const fz = type ? 8 : 10
		const nameWidth = type ? 40 : 50
		const valueWidth = type ? 40 : 50
		let richLabel = []

		if (type) {
			colorList.forEach((item, idx) => {
				richLabel.push({
					['icon' + idx]: {
						color: item['colorStart'],
						fontSize: 10,

					},
					['value' + idx]: {
						color: item['colorStart'],
						fontSize: 10,
						padding: 5,
					},
					['proportion' + idx]: {
						color: item['colorStart'],
						fontSize: 10,
						align: 'center',
						padding: [0, 10],
					},
					['name' + idx]: {
						color: '#fff',
						fontSize: 10,
						align: 'center',
					},
				})
			})
		}
		return {
			backgroundColor: '#333',
			tooltip: {
				trigger: 'item',
			},
			legend: {
				show: true,
				// type: "scroll",
				icon: 'circle',
				orient: 'vartical',
				x: 'left',
				top: 'center',
				left: '68%',
				bottom: '0%',
				itemWidth: 8,
				itemHeight: 8,
				// width: 500,
				height: height,
				itemGap: itemGap,
				// 这个 textStyle 无法去掉
				textStyle: {
					color: '#fff',
					fontSize: fz,
					rich: {
						name: {
							// color: '#a4b5be',
							fontSize: fz,
							width: nameWidth,
						},
						value: {
							color: '#fff',
							width: valueWidth,
							fontSize: fz,
						},
					},
				},
				data: [],
			},

			series: [
				//小圆
				{
					type: 'pie',
					radius: ['5%', '8%'],
					center: ['30%', '50%'],
					emphasis: {
						scale: false,
					},
					label: {
						show: false,
					},
					tooltip: {
						show: false,
					},
					itemStyle: {
						color: (list) => {
							// 注意 ！！！！！ 这里的数组一定要和实际的类目长度相等或大于，不然会缺少颜色报错
							return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
								{
									//左、下、右、上
									offset: 0,
									color: colorList[list.dataIndex]['colorStart'],
								},
								{
									offset: 1,
									color: colorList[list.dataIndex]['colorEnd'],
								},
							])
						},
					},
					labelLine: {
						show: true,
						length: 30,
						length2: 55,
					},
					emphasis: {
						show: false,
						scale: false,
					},
					data: [
						{
							value: 25,
							// name: "IDS",
						},
						{
							value: 25,
							// name: "VPN",
						},
						{
							value: 25,
							// name: "交换机",
						},
						{
							value: 25,
							// name: "防火墙",
						},
					],
				},
				// 数据圆
				{
					stack: 'pie',
					type: 'pie',
					radius: ['30%', '45%'],
					center: ['30%', '50%'],
					zlevel: 5,
					itemStyle: {
						borderColor: '#141c3d',
						borderWidth: 1,
						color: (list) => {
							return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
								{
									//左、下、右、上
									offset: 0,
									color: colorList[list.dataIndex]['colorStart'],
								},
								{
									offset: 1,
									color: colorList[list.dataIndex]['colorEnd'],
								},
							])
						},
					},
					label: {
						show: type ? true : false,
						position: 'outside',
						// minMargin: 30,
						rich: Object.assign({}, ...richLabel),
						// rich: {}
					},

					labelLine: {
						show: true,
						showAbove: true,
						length: 25,
						// length2: -25,
					},
					emphasis: {
						show: false,
						scale: true,
					},
					data: [],
				},
				{
					stack: 'pie',
					type: 'pie',
					radius: ['18%', '20%'],
					center: ['30%', '50%'],
					emphasis: {
						scale: false,
						show: false,
					},
					label: {
						show: false,
					},
					tooltip: {
						show: false,
					},
					labelLine: {
						show: false,
					},
					data: [
						{
							name: '',
							value: 0,
							itemStyle: {
								color: '#141c3d',
							},
						},
					],
				},
				//大圆
				{
					type: 'pie',
					radius: ['30%', '55%'],
					center: ['30%', '50%'],
					emphasis: {
						scale: false,
						show: false,
					},
					label: {
						show: false,
					},
					tooltip: {
						show: false,
					},
					labelLine: {
						show: false,
					},
					data: [
						{
							name: '',
							value: 0,
							itemStyle: {
								color: '#141c3d',
							},
						},
					],
				},

				{
					stack: 'pie',
					type: 'pie',
					radius: ['65%', '68%'],
					center: ['30%', '50%'],
					emphasis: {
						scale: false,
						show: false,
					},
					label: {
						show: false,
					},
					tooltip: {
						show: false,
					},
					labelLine: {
						show: false,
					},
					data: [
						{
							name: '',
							value: 0,
							itemStyle: {
								color: '#141c3d',
							},
						},
					],
				},
			],
		}
	}

	const data = [
		{ name: '一月', value: 150, proportion: 12 },
		{ name: '二月', value: 200, proportion: 24 },
		{ name: '三月', value: 300, proportion: 36 },
		{ name: '四月', value: 220, proportion: 48 },
		{ name: '五月', value: 310, proportion: 60 },
		{ name: '六月', value: 260, proportion: 72 },
		{ name: '七月', value: 180, proportion: 84 },
		{ name: '八月', value: 240, proportion: 96 },
		{ name: '九月', value: 260, proportion: 108 },
		{ name: '十月', value: 270, proportion: 120 },
		{ name: '十一月', value: 280, proportion: 132 },
		{ name: '十二月', value: 250, proportion: 144 },
	]

	const option = options(1)
	option.backgroundColor = 'transparent';

	option.tooltip = {
		show: true, // 弹层数据去掉
		borderColor: themeColor.value,
		backgroundColor: '#000d2660',
		textStyle: {
			color: '#fff',
			fontWeight: '100',
			fontSize: 10
		}
	},
		option.legend.data = data
	option.series[1].data = data
	option.series[1].label.formatter = (params) => {
		if (params.data.name)
			return [
				//
				`{icon${params.dataIndex}| ● }{value${params.dataIndex}|${params.data.value}}`,
				`{proportion${params.dataIndex}|${params.data.proportion}%}{name${params.dataIndex}|${params.data.name}}`,
			].join('\n')
		else return ''
	}

	option.legend.formatter = (name) => {
		let i = data.find((item) => item.name === name)
		return `{name|${i.name}}{value|${i.value}}{proportion|${i.proportion}%}`
	}

	chart.setOption(option);
	chartInit2Ref.value = chart;
}
const LoadChart3 = () => {
	if (!document.getElementById('chart3Ref')) return;
	const chart = echarts.init(document.getElementById('chart3Ref'));
	var category = [
		"市区",
		"万州",
		"江北",
		"南岸",
		"北碚",
		"綦南",
		"长寿",
		"永川",
		"璧山",
		"江津",
		"城口",
		"大足",
		"垫江",
		"丰都",
		"奉节",
		"合川",
		"江津区",
		"开州",
		"南川",
		"彭水",
		"黔江",
		"石柱",
		"铜梁",
		"潼南",
		"巫山",
		"巫溪",
		"武隆",
		"秀山",
		"酉阳",
		"云阳",
		"忠县",
		"川东",
		"检修",
	];
	var dottedBase = [];
	var lineData = [
		18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 56061,
		62677, 59521, 67560, 18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715,
		48444, 50415, 36097, 39867, 44715, 48444, 50415, 50061, 32677, 49521, 32808,
	];
	var barData = [
		4600, 5000, 5500, 6500, 7500, 8500, 9900, 12500, 14000, 21500, 23200, 24450,
		25250, 33300, 4600, 5000, 5500, 6500, 7500, 8500, 9900, 22500, 14000, 21500,
		8500, 9900, 12500, 14000, 21500, 23200, 24450, 25250, 7500,
	];
	var rateData = [];
	32808;
	for (var i = 0; i < 33; i++) {
		// var date = i+2001;
		// category.push(date)
		var rate = barData[i] / lineData[i];
		rateData[i] = rate.toFixed(2);
	}

	// option
	const option = {
		backgroundColor: "transparent",
		tooltip: {
			trigger: "axis",
			borderColor: themeColor.value,
			backgroundColor: '#000d2660',
			textStyle: {
				color: '#fff',
				fontSize: 10,
			},
			axisPointer: {
				type: "shadow",
				label: {
					show: true,
					backgroundColor: "#7B7DDC",
				},
			},
		},
		legend: {
			data: ["已贯通", "计划贯通", "贯通率"],
			textStyle: {
				color: "#B4B4B4",
			},
			top: "10",
			right: "30px",
		},
		grid: {
			left: 20,
			top: 50,
			bottom: 20,
			right: 20,
			containLabel: true
		},
		xAxis: {
			data: category,
			axisLine: {
				lineStyle: {
					color: "#B4B4B4",
				},
			},
			axisTick: {
				show: false,
			},
		},
		yAxis: [
			{
				splitLine: { show: false },
				axisLine: {
					lineStyle: {
						color: "#B4B4B4",
					},
				},

				axisLabel: {
					formatter: "{value} ",
				},
			},
			{
				splitLine: { show: false },
				axisLine: {
					lineStyle: {
						color: "#B4B4B4",
					},
				},
				axisLabel: {
					formatter: "{value} ",
				},
			},
		],

		series: [
			{
				name: "贯通率",
				type: "line",
				smooth: true,
				showAllSymbol: true,
				symbol: "emptyCircle",
				symbolSize: 8,
				yAxisIndex: 1,
				itemStyle: {
					normal: {
						color: "#F02FC2",
					},
				},
				data: rateData,
			},

			{
				name: "已贯通",
				type: "bar",
				barWidth: 3,
				itemStyle: {
					normal: {
						barBorderRadius: 5,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "#956FD4" },
							{ offset: 1, color: "#3EACE5" },
						]),
					},
				},
				data: barData,
			},

			{
				name: "计划贯通",
				type: "bar",
				barGap: "-100%",
				barWidth: 3,
				itemStyle: {
					normal: {
						barBorderRadius: 5,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: "rgba(156,107,211,0.5)" },
							{ offset: 0.2, color: "rgba(156,107,211,0.3)" },
							{ offset: 1, color: "rgba(156,107,211,0)" },
						]),
					},
				},
				z: -12,

				data: lineData,
			},
		],
	};
	chart.setOption(option);
	chartInit3Ref.value = chart;
}
const LoadChart4 = () => {
	if (!document.getElementById('chart4Ref')) return;
	const chart = echarts.init(document.getElementById('chart4Ref'));

	var normaldata = [
		{
			"nameValue": "业务部门01",
			"Attributes": {
				"MAINDIMMEMBER_KEYCOLUMN": "业务部门01",
				"MAINDIM_KEYCOLUMN": "GLBM",
				"C_ZBNAME": "SL",
				"DRILL_DOWN": "false"
			},
			"emphasis": {
				"label": {
					"color": "rgba(0,207,255,1.00)",
					"show": false,
					"position": "right",
					"textStyle": {
						"fontFamily": "微软雅黑",
						"color": "rgba(242,242,242,1.00)",
						"fontSize": 10
					}
				}
			},
			"itemStyle": {
				"normal": {
					"color": "rgba(0,207,255,1.00)"
				}
			},
			"label": {
				"color": "rgba(0,207,255,1.00)",
				"show": false,
				"position": "right",
				"textStyle": {
					"fontFamily": "微软雅黑",
					"color": "rgba(242,242,242,1.00)",
					"fontSize": 10
				}
			},
			"value": 1115
		},
		{
			"nameValue": "业务部",
			"Attributes": {
				"MAINDIMMEMBER_KEYCOLUMN": "业务部",
				"MAINDIM_KEYCOLUMN": "GLBM",
				"C_ZBNAME": "SL",
				"DRILL_DOWN": "false"
			},
			"emphasis": {
				"label": {
					"color": "rgba(0,207,255,1.00)",
					"show": false,
					"position": "right",
					"textStyle": {
						"fontFamily": "微软雅黑",
						"color": "rgba(242,242,242,1.00)",
						"fontSize": 10
					}
				}
			},
			"itemStyle": {
				"normal": {
					"color": "rgba(255,89,89,1.00)"
				}
			},
			"label": {
				"color": "rgba(0,207,255,1.00)",
				"show": false,
				"position": "right",
				"textStyle": {
					"fontFamily": "微软雅黑",
					"color": "rgba(242,242,242,1.00)",
					"fontSize": 10
				}
			},
			"value": 1113
		},
		{
			"nameValue": "财务部",
			"Attributes": {
				"MAINDIMMEMBER_KEYCOLUMN": "财务部",
				"MAINDIM_KEYCOLUMN": "GLBM",
				"C_ZBNAME": "SL",
				"DRILL_DOWN": "false"
			},
			"emphasis": {
				"label": {
					"color": "rgba(0,207,255,1.00)",
					"show": false,
					"position": "right",
					"textStyle": {
						"fontFamily": "微软雅黑",
						"color": "rgba(242,242,242,1.00)",
						"fontSize": 10
					}
				}
			},
			"itemStyle": {
				"normal": {
					"color": "rgba(24,145,254,1.00)"
				}
			},
			"label": {
				"color": "rgba(0,207,255,1.00)",
				"show": false,
				"position": "right",
				"textStyle": {
					"fontFamily": "微软雅黑",
					"color": "rgba(242,242,242,1.00)",
					"fontSize": 10
				}
			},
			"value": 909
		},
		{
			"nameValue": "研发部",
			"Attributes": {
				"MAINDIMMEMBER_KEYCOLUMN": "研发部",
				"MAINDIM_KEYCOLUMN": "GLBM",
				"C_ZBNAME": "SL",
				"DRILL_DOWN": "false"
			},
			"emphasis": {
				"label": {
					"color": "rgba(0,207,255,1.00)",
					"show": false,
					"position": "right",
					"textStyle": {
						"fontFamily": "微软雅黑",
						"color": "rgba(242,242,242,1.00)",
						"fontSize": 10
					}
				}
			},
			"itemStyle": {
				"normal": {
					"color": "rgba(246,207,50,1.00)"
				}
			},
			"label": {
				"color": "rgba(0,207,255,1.00)",
				"show": false,
				"position": "right",
				"textStyle": {
					"fontFamily": "微软雅黑",
					"color": "rgba(242,242,242,1.00)",
					"fontSize": 10
				}
			},
			"value": 106
		},
		{
			"nameValue": "研发",
			"Attributes": {
				"MAINDIMMEMBER_KEYCOLUMN": "研发",
				"MAINDIM_KEYCOLUMN": "GLBM",
				"C_ZBNAME": "SL",
				"DRILL_DOWN": "false"
			},
			"emphasis": {
				"label": {
					"color": "rgba(0,207,255,1.00)",
					"show": false,
					"position": "right",
					"textStyle": {
						"fontFamily": "微软雅黑",
						"color": "rgba(242,242,242,1.00)",
						"fontSize": 10
					}
				}
			},
			"itemStyle": {
				"normal": {
					"color": "rgba(92,249,235,1.00)"
				}
			},
			"label": {
				"color": "rgba(0,207,255,1.00)",
				"show": false,
				"position": "right",
				"textStyle": {
					"fontFamily": "微软雅黑",
					"color": "rgba(242,242,242,1.00)",
					"fontSize": 10
				}
			},
			"value": 96
		},
		{
			"nameValue": "职能部门01",
			"Attributes": {
				"MAINDIMMEMBER_KEYCOLUMN": "职能部门01",
				"MAINDIM_KEYCOLUMN": "GLBM",
				"C_ZBNAME": "SL",
				"DRILL_DOWN": "false"
			},
			"emphasis": {
				"label": {
					"color": "rgba(0,207,255,1.00)",
					"show": false,
					"position": "right",
					"textStyle": {
						"fontFamily": "微软雅黑",
						"color": "rgba(242,242,242,1.00)",
						"fontSize": 10
					}
				}
			},
			"itemStyle": {
				"normal": {
					"color": "rgba(205,86,246,1.00)"
				}
			},
			"label": {
				"color": "rgba(0,207,255,1.00)",
				"show": false,
				"position": "right",
				"textStyle": {
					"fontFamily": "微软雅黑",
					"color": "rgba(242,242,242,1.00)",
					"fontSize": 10
				}
			},
			"value": 2
		},
		{
			"nameValue": "折旧部门",
			"Attributes": {
				"MAINDIMMEMBER_KEYCOLUMN": "折旧部门",
				"MAINDIM_KEYCOLUMN": "GLBM",
				"C_ZBNAME": "SL",
				"DRILL_DOWN": "false"
			},
			"emphasis": {
				"label": {
					"color": "rgba(0,207,255,1.00)",
					"show": false,
					"position": "right",
					"textStyle": {
						"fontFamily": "微软雅黑",
						"color": "rgba(242,242,242,1.00)",
						"fontSize": 10
					}
				}
			},
			"itemStyle": {
				"normal": {
					"color": "rgba(254,143,141,1.00)"
				}
			},
			"label": {
				"color": "rgba(0,207,255,1.00)",
				"show": false,
				"position": "right",
				"textStyle": {
					"fontFamily": "微软雅黑",
					"color": "rgba(242,242,242,1.00)",
					"fontSize": 10
				}
			},
			"value": 1
		}
	];
	var myColor = [
		{ color1: 'rgba(255, 0, 108, .12)', color2: 'rgba(255, 0, 108, 1)' },
		{ color1: 'rgba(239, 157, 83,.12)', color2: 'rgba(239, 157, 83, 1)' },
		{ color1: 'rgba(237, 223, 67,.12)', color2: 'rgba(237, 223, 67, 1)' },
		{ color1: 'rgba(36, 166, 237,.12)', color2: 'rgba(36, 166, 237, 1)' }
	];
	var valdata = []
	var titlename = []
	normaldata.forEach((item, index) => {
		valdata.push(normaldata[0].value + 100)
		titlename.push(item.nameValue)
		var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
			{
				offset: 0,
				color: myColor[index < 3 ? index : 3].color1
			},
			{
				offset: 1,
				color: myColor[index < 3 ? index : 3].color2
			}
		]);
		item.itemStyle.normal = {
			barBorderRadius: 30,
			color: color
		};
	});

	const option = {
		backgroundColor: 'transparent',
		xAxis: {
			show: false
		},
		grid: {
			top: 0,
			left: 120,
			right: 60,
			bottom: 0
		},
		yAxis: [
			{
				nameLocation: 'start',
				data: titlename,
				axisLine: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				inverse: true,
				axisLabel: {
					// margin:80,
					// align:'right',
					color: 'rgba(1, 255, 255, 1)',
					formatter: function (value, index) {
						return ['{lg|' + (index + 1) + '}' + '{title|' + value + '} '].join(
							'\n'
						);
					},
					rich: {
						lg: {
							color: '#fff',
							padding: 5,
							// width: 25,
							align: 'left'
						},
						title: {
							width: 60,
							align: 'left'
						}
					}
				}
			},
			{
				show: true,
				inverse: true,
				data: normaldata,
				axisLabel: {
					textStyle: {
						fontSize: 10,
						color: function (value, index) {
							var num = myColor.length;
							return myColor[index < 3 ? index : 3].color2;
						}
					}
				},
				axisLine: {
					show: false
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				}
			}
		],
		series: [
			{
				name: '条',
				type: 'bar',
				yAxisIndex: 0,
				data: normaldata,
				barWidth: 4
			},
			{
				name: '框',
				type: 'bar',
				yAxisIndex: 1,
				barGap: '-100%',
				data: valdata,
				barWidth: 10,
				z: 1,
				itemStyle: {
					normal: {
						color: 'rgba(255, 255, 255, .3)',
						barBorderRadius: 5
					}
				}
			}
		]
	};
	chart.setOption(option);
	chartInit4Ref.value = chart;
}
const LoadChart7 = () => {
	if (!document.getElementById('chart7Ref')) return;
	const chart = echarts.init(document.getElementById('chart7Ref'));

	let legendData = ["空调", "照明", "插座", "强电箱"];
	let colors = ["#FF9671", "#24DBDA", "#845EC2", "#4A95FF"];
	var getDate = function () {
		let dateArray = []
		//获取今天日期
		let myDate = new Date()
		let today = (myDate.getMonth() + 1) + "/" + myDate.getDate();
		myDate.setDate(myDate.getDate() - 14)
		let dateTemp;  // 临时日期数据
		let flag = 1;
		for (let i = 0; i < 14; i++) {
			dateTemp = (myDate.getMonth() + 1) + "/" + myDate.getDate()
			dateArray.push({
				date: dateTemp
			})
			myDate.setDate(myDate.getDate() + flag);
		}
		dateArray.push({
			date: today
		})
		let arr = []
		let newArr = []
		dateArray.forEach(item => {
			arr.push(item.date.split('-'))
		})
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][1] < 10) {
				arr[i][1] = "0" + arr[i][1]
			}
			if (arr[i][2] < 10) {
				arr[i][2] = "0" + arr[i][2]
			}
		}
		for (let j = 0; j < arr.length; j++) {
			newArr.push(arr[j].join("-"))
		}
		return newArr
	};
	var xData2 = function () {
		var data = [];
		for (var i = 0; i < 15; i++) {
			data.push(Math.floor(Math.random() * (1000 - 100)) + 100);
		}
		return data;
	};
	let serieData = [];
	let metaDate = [
		xData2(),
		xData2(),
		xData2(),
		xData2(),
	];
	for (var v = 0; v < legendData.length; v++) {
		var serie = {
			name: legendData[v],
			type: "line",
			symbol: "circle",
			symbolSize: 5,
			data: metaDate[v],
			lineStyle: {
				normal: {
					width: 1,
					color: colors[v]
				}
			}
		};
		serieData.push(serie);
	}
	const option = {
		backgroundColor: 'transparent',
		legend: {
			show: true,
			left: "right",
			bottom: 0,
			itemGap: 24,
			itemWidth: 5,
			align: "right",
			textStyle: {
				color: "#fff",
				fontSize: "10",
			},
			data: legendData,
			y: "0",
			itemWidth: 18,
			itemHeight: 12,
			textStyle: { color: "#fff", fontSize: 10 },
		},
		// color: colors,
		grid: {
			left: "5px",
			top: "30px",
			bottom: "0",
			right: "30px",
			containLabel: true,
		},
		tooltip: {
			trigger: "axis",
			borderColor: themeColor.value,
			backgroundColor: '#000d2660',
			textStyle: {
				color: '#fff',
				fontSize: 10,
			},
			axisPointer: {
				type: "shadow",
				label: {
					show: true,
					backgroundColor: "#7B7DDC",
				},
			},
		},
		xAxis: [
			{
				name: "日",
				type: "category",
				axisLine: { show: true, lineStyle: { color: "#bac0c0" } },
				axisLabel: { interval: 0, textStyle: { color: "#bac0c0", fontSize: 10 } },
				axisTick: { show: false },
				data: getDate(),
			},
		],
		yAxis: [
			{
				name: "KW",
				axisTick: { show: true },
				splitLine: { show: false },
				axisLabel: { textStyle: { color: "#bac0c0", fontSize: 10 } },
				axisLine: { show: true, lineStyle: { color: "#bac0c0" } },
			},
		],
		series: serieData,
	};

	chart.setOption(option);
	chartInit3Ref.value = chart;
}
const LoadChart8 = () => {
	if (!document.getElementById('chart8Ref')) return;
	const chart = echarts.init(document.getElementById('chart8Ref'));
	const color = ['#3c90ff', '#fff225', '#24ffdf', '#ff9c3c', '#7536ff']
	const indicator = [
		{
			text: '文明村',
			min: 0,
			max: 100
		},
		{
			text: '卫生村',
			min: 0,
			max: 100
		},
		{
			text: '森林村庄',
			min: 0,
			max: 100
		},
		{
			text: '全面小康',
			min: 0,
			max: 100
		},
		{
			text: '景区村庄',
			min: 0,
			max: 100
		}
	]
	const Data = [80, 61, 70, 86, 77]

	function setData () {
		return [
			{
				value: Data,
				itemStyle: {
					normal: {
						lineStyle: {
							color: '#4BFFFC',
							shadowColor: '#4BFFFC',
							shadowBlur: 5
						},
						shadowColor: '#4BFFFC',
						shadowBlur: 5
					}
				},
				areaStyle: {
					normal: {
						// 单项区域填充样式
						color: {
							type: 'radial',
							x: 0.5, //右
							y: 0.5, //下
							r: 1,
							colorStops: [
								{
									offset: 1,
									color: '#4BFFFC'
								},
								{
									offset: 0,
									color: 'rgba(0,0,0,0)'
								}
							],
							globalCoord: false
						},
						opacity: 0.8 // 区域透明度
					}
				}
			}
		]
	}

	function setgauge (i) {
		return {
			type: 'gauge',
			detail: false,
			splitNumber: 10, //刻度数量
			radius: '80%', //图表尺寸
			center: ['50%', '50%'],
			startAngle: 90 + 72 * i + 18, //开始刻度的角度
			endAngle: 90 + 72 * (i + 1) - 18, //结束刻度的角度
			axisLine: {
				show: false
			},
			axisTick: {
				show: true,
				lineStyle: {
					color: '#66ccff',
					width: 1
				},
				length: 6,
				splitNumber: 1
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				show: false
			}
		}
	}
	function setSpot () {
		var scatterData = []
		Data.map((o, i) => {
			scatterData.push({
				value: [o, i],
				itemStyle: {
					normal: {
						color: color[i],
						borderColor: '#fff',
						borderWidth: 1,
						shadowColor: color[i],
						shadowBlur: 8
					}
				}
			})
		})
		return scatterData
	}

	const option = {
		backgroundColor: 'transparent',
		polar: {
			center: ['50%', '50%'],
			radius: '60%'
		},
		radar: {
			shape: 'circle',
			center: ['50%', '50%'],
			radius: '80%',
			indicator: indicator,
			axisName: {
				color: '#b7e9fd',
				fontSize: 10,
				padding: 0
			},
			nameGap: 3,
			splitNumber: 4,
			splitArea: {
				// 坐标轴在 grid 区域中的分隔区域，默认不显示。
				show: true,
				areaStyle: {
					// 分隔区域的样式设置。
					color: ['rgba(27, 50, 66, 0.4)']
				}
			},
			axisLine: {
				//指向外圈文本的分隔线样式
				lineStyle: {
					color: '#5aa3d0'
				}
			},
			splitLine: {
				lineStyle: {
					color: 'rgba(99,192,251,0.2)', // 分隔线颜色
					width: 2 // 分隔线线宽
				}
			}
		},
		angleAxis: {
			type: 'category',
			data: name,
			minInterval: 1,
			boundaryGap: false,
			clockwise: false,
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			}
		},
		radiusAxis: {
			min: 0,
			max: 100,
			interval: 25,
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLine: {
				//指向外圈文本的分隔线样式
				lineStyle: {
					color: '#5aa3d0'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#5aa3d0',
				align: 'left',
				margin: -5
			}
		},
		series: [
			setgauge(0),
			setgauge(1),
			setgauge(2),
			setgauge(3),
			setgauge(4),
			{
				type: 'radar',
				silent: true,
				lineStyle: {
					color: '#66ffff'
				},
				areaStyle: {
					color: 'rgba(102, 255, 255, 0.31)'
				},
				data: setData()
			},
			{
				type: 'scatter',
				coordinateSystem: 'polar',
				symbolSize: 8,
				data: setSpot()
			}
		]
	};

	chart.setOption(option);
	chartInit2Ref.value = chart;
}
const LoadChart9 = () => {
	if (!document.getElementById('chart9Ref')) return;
	const myChart = echarts.init(document.getElementById('chart9Ref'));
	echarts.registerMap("zhongguo", geoJson);
	myChart.hideLoading();
	var geoCoordMap = {
		海南: [110.17, 19.92],
		河南: [113.700339, 34.751827],
		河北: [114.54095, 38.058913],
		湖北: [114.289984, 30.5942],
		广东: [113.293215, 23.102603],
		湖南: [113.03042, 28.188898],
		江西: [115.911671, 28.658012],
		黑龙江: [126.629804, 45.774197],
		四川: [104.112035, 30.630737],
		安徽: [117.321109, 31.850184],
	};
	var data = [
		{
			name: "海南",
			value: 99925.73,
		},
		{
			name: "河南",
			value: 17737.01,
		},
		{
			name: "河北",
			value: 13177.64,
		},
		{
			name: "湖北",
			value: 12174.96,
		},
		{
			name: "广东",
			value: 8230.15,
		},
		{
			name: "湖南",
			value: 8173.05,
		},
		{
			name: "江西",
			value: 7423.08,
		},
		{
			name: "黑龙江",
			value: 6829.69,
		},
		{
			name: "四川",
			value: 6158.43,
		},
		{
			name: "安徽",
			value: 5930.8,
		},
	];
	var max = 100000,
		min = 900; // todo
	var maxSize4Pin = 100,
		minSize4Pin = 20;

	var convertData = function (data) {
		var res = [];
		for (var i = 0; i < data.length; i++) {
			var geoCoord = geoCoordMap[data[i].name];
			if (geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value),
				});
			}
		}
		return res;
	};

	const option = {
		title: {
			text: "购买对象所在省份TOP10",
			subtext: "销售面积区间",
			x: "center",
			textStyle: {
				color: themeColor.value,
			},
		},
		tooltip: {
			trigger: "item",
			borderColor: themeColor.value,
			backgroundColor: '#000d2660',
			textStyle: {
				color: '#fff',
				fontSize: 10,
			},
			axisPointer: {
				type: "shadow",
				label: {
					show: true,
					backgroundColor: "#7B7DDC",
				},
			},
			formatter: function (params) {
				if (typeof params.value[2] == "undefined" && params.value) {
					return params.name + " : " + params.value;
				} else if (params.value[2]) {
					return params.name + " : " + params.value[2];
				}
			},
		},
		legend: {
			orient: "vertical",
			y: "bottom",
			x: "right",
			data: ["sell_area"],
			textStyle: {
				color: "#fff",
			},
		},
		visualMap: {
			show: false,
			min: 0,
			max: 500,
			left: "left",
			top: "bottom",
			text: ["高", "低"], // 文本，默认为数值文本
			calculable: true,
			seriesIndex: [1],
			inRange: {
				// color: ['#3B5077', '#031525'] // 蓝黑
				// color: ['#ffc0cb', '#800080'] // 红紫
				// color: ['#3C3B3F', '#605C3C'] // 黑绿
				color: ["#0f0c29", "#302b63", "#24243e"], // 黑紫黑
				// color: ['#23074d', '#cc5333'] // 紫红
				// color: ['#00467F', '#A5CC82'] // 蓝绿
				// color: ['#1488CC', '#2B32B2'] // 浅蓝
				// color: ['#00467F', '#A5CC82'] // 蓝绿
				// color: ['#00467F', '#A5CC82'] // 蓝绿
				// color: ['#00467F', '#A5CC82'] // 蓝绿
				// color: ['#00467F', '#A5CC82'] // 蓝绿
			},
		},
		// toolbox: {
		//     show: true,
		//     orient: 'vertical',
		//     left: 'right',
		//     top: 'center',
		//     feature: {
		//             dataView: {readOnly: false},
		//             restore: {},
		//             saveAsImage: {}
		//             }
		// },
		geo: {
			show: true,
			map: "zhongguo",
			label: {
				normal: {
					show: false,
				},
				emphasis: {
					show: false,
				},
			},
			roam: true,
			itemStyle: {
				normal: {
					areaColor: "#031525",
					borderColor: "#3B5077",
				},
				emphasis: {
					areaColor: "#2B91B7",
				},
			},
		},
		series: [
			{
				name: "credit_pm2.5",
				type: "scatter",
				coordinateSystem: "geo",
				data: convertData(data),
				symbolSize: function (val) {
					return val[2] / 10000;
				},
				label: {
					normal: {
						formatter: "{b}",
						position: "right",
						show: true,
					},
					emphasis: {
						show: true,
					},
				},
				itemStyle: {
					normal: {
						color: "#05C3F9",
					},
				},
			},
			{
				type: "map",
				map: "zhongguo",
				geoIndex: 0,
				aspectScale: 0.75, //长宽比
				showLegendSymbol: false, // 存在legend时显示
				label: {
					normal: {
						show: false,
					},
					emphasis: {
						show: false,
						textStyle: {
							color: "#fff",
						},
					},
				},
				roam: true,
				itemStyle: {
					normal: {
						areaColor: "#031525",
						borderColor: "#3B5077",
					},
					emphasis: {
						areaColor: "#2B91B7",
					},
				},
				animation: false,
				data: data,
			},
			{
				name: "点",
				type: "scatter",
				coordinateSystem: "geo",
				symbol: "pin",
				symbolSize: function (val) {
					var a = (maxSize4Pin - minSize4Pin) / (max - min);
					var b = minSize4Pin - a * min;
					b = maxSize4Pin - a * max;
					return a * val[2] + b;
				},
				label: {
					normal: {
						show: true,
						textStyle: {
							color: "#fff",
							fontSize: 9,
						},
					},
				},
				itemStyle: {
					normal: {
						color: themeColor.value, //标志颜色
					},
				},
				zlevel: 6,
				data: convertData(data),
			},
			{
				name: "Top 5",
				type: "effectScatter",
				coordinateSystem: "geo",
				data: convertData(
					data
						.sort(function (a, b) {
							return b.value - a.value;
						})
						.slice(0, 5)
				),
				symbolSize: function (val) {
					return val[2] / 5000;
				},
				showEffectOn: "render",
				rippleEffect: {
					brushType: "stroke",
				},
				hoverAnimation: true,
				label: {
					normal: {
						formatter: "{b}",
						position: "right",
						show: false,
					},
				},
				itemStyle: {
					normal: {
						color: "#05C3F9",
						shadowBlur: 10,
						shadowColor: "#05C3F9",
					},
				},
				zlevel: 1,
			},
		],
	};

	myChart.setOption(option);
	chartInit2Ref.value = myChart;
}
const ChartResize = () => {
	// chartInit1Ref.value && chartInit1Ref.value.resize();
	chartInit2Ref.value && chartInit2Ref.value.resize();
	chartInit3Ref.value && chartInit3Ref.value.resize();
	chartInit4Ref.value && chartInit4Ref.value.resize();
	chartInit6Ref.value && chartInit6Ref.value.resize();
	chartInit5Ref.value && chartInit5Ref.value.resize();
	chartInit7Ref.value && chartInit7Ref.value.resize();
	chartInit8Ref.value && chartInit8Ref.value.resize();
	chartInit9Ref.value && chartInit9Ref.value.resize();
}
watch(
	() => [appSettings.value.viewHeight, appSettings.value.viewWidth],
	() => {
		setTimeout(() => {
			ChartResize();
		}, 1000);
	}
);
onMounted(() => {
	themeColor.value = getComputedStyle(document.documentElement)
		.getPropertyValue('--el-color-primary');
	nextTick(() => {
		setTimeout(() => {
			// LoadChart1();
			LoadChart2();
			LoadChart3();
			LoadChart4();
			LoadChart5();
			LoadChart6();
			LoadChart7();
			LoadChart8();
			LoadChart9();
		}, 1000);
	});
});
</script>
<style lang="scss" scoped>
.block-container {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	.block-item {
		flex: 1 1 200px;
		max-width: 380px;
		min-width: 250px;
		height: 120px;
		border-radius: 8px;
		padding: 18px 12px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #fff;
		position: relative;
		transition: 0.3s;
		overflow: hidden;
		&:hover {
			box-shadow: 0 3px 6px var(--el-border-color-dark);
		}
		.item-title {
			font-size: 13pt;
			font-weight: bold;
			i {
				font-size: 18pt;
				font-weight: bold;
				margin-right: 8px;
			}
		}
		.count {
			font-size: 24pt;
			font-weight: bold;
			color: #fff;
		}
		.block-icon {
			font-size: 55pt;
			position: absolute;
			right: -8px;
			bottom: -8px;
			color: #fff;
			transform: rotate(-30deg);
			opacity: 0.3;
			transition: 0.3s;
			filter: blur(2px);
		}
	}
	.block-item:hover .block-icon {
		transform: scale(1.5) rotate(-45deg);
		opacity: 0.1;
		filter: blur(0px);
	}
	.block-item-ts {
		flex: 1;
		height: 120px;
		min-width: 300px;
		border-radius: 8px;
	}
}

.body-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: calc(100% - 2px);
}
.block-item {
	width: 100%;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
	// background-color: var(--el-border-color);
	border: 1px solid var(--el-border-color);
	border-radius: 8px;
	overflow: hidden;
}
.left {
	width: 450px;
	height: 100%;
}
.center {
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}
.right {
	width: 450px;
	height: 100%;
}
.item-lr {
	width: calc(100% - 10px);
	height: calc((100% - 20px) / 3);
	pointer-events: auto;
}
.item-cu {
	width: calc(100% - 10px);
	height: 100px;
	pointer-events: auto;
}
.item-ct {
	width: calc(100% - 10px);
	height: calc(((100% - 10px) / 3) * 2);
	pointer-events: auto;
}
.item-cd {
	width: calc(100% - 10px);
	height: calc((100% - 20px) / 3);
	pointer-events: auto;
}
</style>
