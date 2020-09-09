<template>
  <div class="content">
    <s-tradingview
      :marketName="marketName"
      :marketId="marketId"
      :wsUrl="wsUrl"
      :decimal="decimal"
      class="tradingviewView"
    />
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      marketId: this.$route.query.marketId,
      marketName: this.$route.query.marketName,
      decimal: this.$route.query.decimal,
      wsUrl: "ws://请求地址",
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.tradingviewView {
  height: 100vh;
  width: 100vw;
}
</style>