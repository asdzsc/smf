<template>
  <div class="codeedit">
    <!-- <textarea
      ref="mycode"
      class="codesql"
      v-model="code"
      :style="'height:' + height + ';width:' + width + ';'"
    ></textarea> -->

    <codemirror ref="mycode" :value="code" :options="cmOptions" class="code">
    </codemirror>
  </div>
</template>
<script>
import { codemirror } from "vue-codemirror";
import "codemirror/theme/ambiance.css"; // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require("codemirror/mode/javascript/javascript"); // 这里引入的模式的js，根据设置的mode引入，一定要引入！！

// 折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";

// import "codemirror/theme/ambiance.css";
// import "codemirror/lib/codemirror.css";
// import "codemirror/addon/hint/show-hint.css";

// let CodeMirror = require("codemirror/lib/codemirror");
// require("codemirror/addon/edit/matchbrackets");
// require("codemirror/addon/selection/active-line");
// require("codemirror/mode/javascript/javascript");
// require("codemirror/addon/hint/show-hint");
// require("codemirror/addon/hint/html-hint");
// require("codemirror/addon/hint/css-hint");
// require("codemirror/addon/hint/javascript-hint");

export default {
  name: "codeMirror",
  components: {
    codemirror
  },
  props: {
    width: {
      type: String,
      default() {
        return "100%";
      }
    },
    height: {
      type: String,
      default() {
        return "200px";
      }
    }
  },
  data() {
    return {
      code: "",
      cmOptions: {
        value: "",
        mode: "text/javascript",
        theme: "cobalt", //ambiance
        readOnly: false,
        // 显示行号
        lineNumbers: true,
        line: true,
        foldGutter: true,
        lineWrapping: true,
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers"
        ]
      }
    };
  },
  mounted() {},
  methods: {
    loadData(cont) {
      this.code = cont;
      // this.editor.setValue(this.code);
    },
    getData() {
      return this.$refs.mycode.codemirror.getValue();
    }
  }
};
</script>
<style lang="less" scoped>
.codeedit {
  border: 1px solid #dddddd;
}
.codesql {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
}
</style>
