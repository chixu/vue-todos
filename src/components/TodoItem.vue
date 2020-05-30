<template>
  <div>
    <h4>{{title}}</h4>
    <p>{{time}}</p>
  </div>
</template>
<script>
export default {
  props: ["title", "time"]
};
</script>
<style scoped>
</style>