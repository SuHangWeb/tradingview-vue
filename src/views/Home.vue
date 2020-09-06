<template>
  <div class="content">
    <s-tradingview wsUrl="ws://请求地址..." class="tradingviewView" />
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {},
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.tradingviewView {
  height: 100vh;
  width: 100vw;
}
</style>