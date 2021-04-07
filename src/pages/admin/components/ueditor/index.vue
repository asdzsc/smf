<template>
  <div>
    <script
      id="editor"
      type="text/plain"
      :style="{ width: width, height: height }"
    ></script>
  </div>
</template>

<script>
export default {
  name: "ueditor",
  props: {
    value: {
      type: String,
      default() {
        return "";
      }
    },
    config: {},
    width: {
      type: String,
      default() {
        return "100%";
      }
    },
    height: {
      type: String,
      default() {
        return "300px";
      }
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      editor: null
    };
  },
  mounted() {
    const vm = this;
    this.editor = window.UE.getEditor("editor", vm.config);
    this.editor.addListener("ready", function() {
      vm.editor.setContent(vm.value);
    });
  },
  methods: {
    getUEContent() {
      return this.editor.getContent();
    }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>
