<template>
  <exception-page type="403" />
</template>

<script>
export default {
  components: {
    exceptionPage: () => import("@/pages/admin/components/exception/ExceptionPage")
  }
};
</script>

<style scoped></style>
