<template>
	<el-dialog v-model="dialogVisible"
						 v-if="dialogVisible"
						 title="调色器"
						 :width="500"
						 :close-on-click-modal="false"
						 align-center
						 draggable>
		<el-form :model="colorForm"
						 label-width="auto"
						 label-position="Top">
			<el-form-item label="取色板：">
				<el-color-picker v-model="colorForm.color"
												 :show-alpha="isGradient"
												 color-format="hex"
												 :predefine="predefineColors" />
			</el-form-item>
			<el-form-item label="颜色值：">
				<el-input v-model="colorForm.color"
									:autosize="{ minRows: 2, maxRows: 4 }"
									type="textarea"
									resize="none"
									:readonly="!isGradient"
									placeholder="如果您需要手动输入颜色值，请在此处输入。" />
			</el-form-item>
			<el-form-item label="颜色效果展示">
				<div class="color-preview"
						 :style="{'background-color':OnCheckColor(colorForm.color,'color'),'background-image':OnCheckColor(colorForm.color,'image')}"></div>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary"
									 @click="OnCommit">
					确定
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>
<script setup name="SelectColorDialog">
import { ref } from 'vue';

const emit = defineEmits(['commitColor']);
const dialogVisible = ref(false);
const predefineColors = ref([
	'#ff4500',
	'#ff8c00',
	'#ffd700',
	'#90ee90',
	'#00ced1',
	'#1e90ff',
	'#c71585',
	'rgba(255, 69, 0, 0.68)',
	'rgb(255, 120, 0)',
	'hsv(51, 100, 98)',
	'hsva(120, 40, 94, 0.5)',
	'hsl(181, 100%, 37%)',
	'hsla(209, 100%, 56%, 0.73)',
	'#c7158577',
]);
const colorForm = ref({
	color: '',
});
const isGradient = ref(true);
const OnCommit = () => {
	dialogVisible.value = false;
	emit('commitColor', colorForm.value.color);
};
const openDialog = (color, _isGradient) => {
	isGradient.value = _isGradient;
	colorForm.value.color = color;
	dialogVisible.value = true;
};
const OnCheckColor = (color, type) => {
	switch (type) {
		case 'color':
			if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl') || color.startsWith('hsv')) {
				return color;
			} else {
				return '';
			}
			break;
		case 'image':
			if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl') || color.startsWith('hsv')) {
				return '';
			} else {
				return color;
			}
	}
}
defineExpose({
	openDialog,
});
</script>
<style lang="scss" scoped>
.color-preview {
	height: 150px;
	width: 100%;
	border-radius: 12px;
	box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);
}
</style>
