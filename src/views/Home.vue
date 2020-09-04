<template>
  <div class="content">
    <s-tradingview wsUrl="" class="tradingviewView" />
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
    // this.getData()
  },
};
</script>
<style lang="scss" scoped>
.tradingviewView {
  height: 100vh;
  width: 100vw;
}
</style>