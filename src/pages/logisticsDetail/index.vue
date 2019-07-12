<template>
  <div class="logistics">
    <van-steps steps="steps" direction="vertical" active-color="#f44" />
  </div>
</template>

<script>
import { host } from "../../utils";
import { orderDetail } from "../../api/order";
export default {
  created() {
    orderDetail({ id: "42" })
      .then(res => {
        console.log(res.data, "678");
      })
      .catch(err => {});
  },
  onShow() {},
  data() {
    return {
      steps: [
        {
          text: "步骤一",
          desc: "描述信息"
        },
        {
          text: "步骤二",
          desc: "描述信息"
        },
        {
          text: "步骤三",
          desc: "描述信息"
        },
        {
          text: "步骤四",
          desc: "描述信息"
        }
      ]
    };
  },
  components: {},
  methods: {},
  computed: {}
};
</script>
<style lang='scss' scoped>
@import "./style";
button[disabled] {
  background: #ccc;
}
</style>
