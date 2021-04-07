<template>
  <exception-page type="500" />
</template>

<script>
export default {
  components: {
    exceptionPage: () => import("@/pages/pc/components/pc/exception/ExceptionPage")
  }
};
</script>
<style scoped></style>
