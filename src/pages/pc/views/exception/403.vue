<template>
  <exception-page type="403" />
</template>

<script>
export default {
  components: {
    exceptionPage: () => import("@/pages/pc/components/pc/exception/ExceptionPage")
  }
};
</script>

<style scoped></style>
