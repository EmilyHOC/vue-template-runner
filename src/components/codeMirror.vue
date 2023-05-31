<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript' // 代码高亮必须引入

import 'codemirror/theme/base16-dark.css'
// 括号显示匹配
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/selection/active-line'
// 括号、引号编辑和删除时成对出现
import 'codemirror/addon/edit/closebrackets'
// 折叠代码要用到一些玩意
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/xml-fold'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/display/placeholder.js'

export default {
  name: 'CodeMirror',
  components: {},
  props: {
    jsonCode: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      jsonEditor: '',
    }
  },
  watch: {
    jsonCode(newVal) {
      const editorValue = this.jsonEditor.getValue()
      if (newVal !== editorValue) {
        this.jsonEditor.setValue(
          // 这里是json格式化
          this.jsonCode,
          null,
          2,
        )
        setTimeout(() => {
          this.jsonEditor.refresh()
        }, 1)
      }
    },
    immediate: true,
    deep: true,
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      placeholder: '请编写符合vue模版文件格式的代码',
      mode: 'text/javascript',
      theme: 'base16-dark', // 主题样式
      lint: true,
      tabSize: 2,
      smartIndent: true, // 是否智能缩进
      styleActiveLine: true, // 当前行高亮
      lineNumbers: true, // 显示行号
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter',
        'CodeMirror-lint-markers',
      ],
      lineWrapping: true, // 自动换行
      matchBrackets: true, // 括号匹配显示
      autoCloseBrackets: true, // 输入和退格时成对
      readOnly: this.readonly, // 只读
      foldGutter: true,
      autoRefresh: true,
      extraKeys: {
        F7: function autoFormat(editor) {
          var totalLines = editor.lineCount()
          editor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines })
        }, //代码格式化
      },
    })
    console.log(this.jsonEditor)
    // 这里是json格式化
    this.jsonEditor.on('change', (cm) => {
      this.$emit('change', cm.getValue())
      this.refresh()
    })
  },
  methods: {
    // 这玩意就是为了刷新编辑器的
    refresh() {
      /*
       * refresh: Fires when the editor is refreshed or resized.
       * Mostly useful to invalidate cached values that depend on the editor or character size.
       */
      this.jsonEditor && this.jsonEditor.refresh()
    },
  },
}
</script>

<style>
.json-editor {
  height: 100%;
  width: 100%;
  position: relative;
  text-align: left;
}

/* 高度自适应 */
.json-editor .CodeMirror {
  height: 100%;
}

.json-editor .CodeMirror-scroll {
  height: 100vh;
}

.CodeMirror-foldgutter-folded.CodeMirror-guttermarker-subtle {
  color: black !important;
  font-size: 14px;
}

.CodeMirror-foldgutter-open:after {
  color: black !important;
  font-size: 14px;
}

.json-editor .cm-string {
  color: coral !important;
}
.CodeMirror pre.CodeMirror-placeholder {
  color: #999;
}
</style>
