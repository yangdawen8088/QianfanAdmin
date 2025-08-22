import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    rules: {
      // 代码风格规则
      'semi': [2, 'never'], // 不使用分号
      'indent': [
        2,
        4,
        { SwitchCase: 1 } // switch 语句中的 case 分支使用 1 个空格缩进
      ],
      'no-multi-spaces': 2, // 不允许多个连续的空格
      'space-unary-ops': [2, { words: true, nonwords: false }], // 一元运算符后必须有空格
      'space-infix-ops': 2, // 中缀操作符周围必须有空格
      'space-before-blocks': [2, 'always'], // 代码块前必须有空格
      'no-mixed-spaces-and-tabs': 2, // 不允许混合使用空格和制表符
      'no-multiple-empty-lines': [2, { max: 1 }], // 连续空行不超过 1 行
      'no-trailing-spaces': 2, // 行尾不允许有空格
      'no-whitespace-before-property': 2, // 属性名和点运算符之间不能有空格
      'no-irregular-whitespace': 2, // 不允许出现不规则的空白字符
      'space-in-parens': [2, 'never'], // 圆括号内不能有空格
      'comma-dangle': [2, 'never'], // 逗号不允许有拖尾
      'array-bracket-spacing': [2, 'never'], // 数组括号内不允许有空格
      'object-curly-spacing': [2, 'never'], // 对象括号内不允许有空格
      'max-len': ['error', { code: 120 }], // 行宽最大为 120 字符
      'operator-linebreak': [2, 'before'], // 运算符换行时，运算符在行首
      'comma-style': [2, 'last'], // 逗号风格：换行时在行尾
      'no-extra-semi': 2, // 不允许出现多余的分号
      'curly': [2, 'all'], // 使用大括号包裹所有控制结构
      'key-spacing': [2, { beforeColon: false, afterColon: true }], // 属性名与冒号之间不能有空格，冒号后必须有空格
      'comma-spacing': [2, { before: false, after: true }], // 逗号后必须有空格
      'semi-spacing': [2, { before: false, after: true }], // 分号后必须有空格
      'camelcase': [1, { properties: 'always' }], // 强制使用驼峰命名法
      'new-cap': ['error', { newIsCap: true, capIsNew: false }], // 构造函数首字母必须大写
      'spaced-comment': [2, 'always'], // 注释后必须有空格
      'no-inline-comments': 2, // 不允许行内注释
      'eqeqeq': [2, 'always', { null: 'ignore' }], // 强制使用全等 (===) 运算符
      'no-else-return': [1, { allowElseIf: false }], // 禁止 else 语句，如果 if 语句中已返回值
      'no-loop-func': 2, // 禁止在循环中定义函数
      'no-restricted-syntax': [
        1,
        {
          selector: 'BinaryExpression[operator=\'instanceof\']',
          message: 'Use \'instanceof\' for object type detection.' // 不建议使用 instanceof 来检测对象类型
        },
        {
          selector: 'BinaryExpression[operator=\'typeof\']',
          message: 'Use \'typeof\' for type detection.' // 不建议使用 typeof 来检测类型
        },
        {
          selector: 'CallExpression[callee.name=\'parseInt\']',
          message: 'Use Math.floor, Math.round, or Math.ceil instead of parseInt to remove decimal points.' // 不建议使用 parseInt 来移除小数点
        }
      ],
      'no-implicit-coercion': [1, { allow: ['!!'] }], // 禁止隐式类型转换
      'radix': [2, 'always'], // parseInt 函数必须指定进制
      'quotes': [2, 'single'], // 强制使用单引号
      'no-array-constructor': 2, // 不允许使用 Array 构造函数
      'max-lines-per-function': [
        1,
        {
          max: 50, // 函数最大行数为 50 行
          skipComments: true, // 跳过注释行
          skipBlankLines: true, // 跳过空行
          IIFEs: true // 对立即调用的函数表达式 (IIFE) 应用规则
        }
      ],
      'max-params': [1, 6], // 函数参数最大数量为 6
      'no-eval': 2, // 禁止使用 eval
      'prefer-const': 1, // 建议使用 const 声明不变的变量
      'no-var': 1, // 建议使用 let/const 替代 var
      'prefer-destructuring': [
        1,
        { object: true, array: false } // 建议使用解构赋值
      ],
      'prefer-template': 1, // 建议使用模板字符串
      'template-curly-spacing': [2, 'never'], // 模板字符串中的花括号内不允许有空格
      'no-duplicate-imports': 2, // 禁止重复导入
      // TypeScript 特定规则
      '@typescript-eslint/no-unused-vars': 'error', // 禁止未使用的变量
      '@typescript-eslint/explicit-module-boundary-types': 'off' // 允许省略函数的返回类型
    }
  },
  pluginVue.configs["flat/essential"],
]);
