<template>
	<div class="feedback team">
		<van-toast id="van-toast" />
		<div class="title">
			上级代理信息
		</div>
		<div class="connect" style="height: 120px; width: 100%; text-align: center">
			<img style="width: 80px; height: 80px; border-radius: 50%;margin: 0 auto;" :src="teamForm.avatar" />
		</div>
		<div class="connect">
			<label>
				你的姓名:
			</label>
			<input type="text" disabled v-model="teamForm.lastName">
		</div>
		<div class="connect">
			<label>
				联系电话:
			</label>
			<input type="text" disabled v-model="teamForm.mobile">
		</div>
		<div class="connect">
			<label>
				所在地区:
			</label>
			<input type="text" disabled v-model="teamForm.city">
		</div>
	</div>
</template>

<script>
  import { myParentInfo } from "../../api/superior/index";
  export default {
    data() {
      return {
        userInfo: {},

        teamForm: {
          city: '',
          address: '',
          name: '',
          mobile: '',
          latitude: '',
          longitude: ''
        },
        btnLoading: false
      };
    },
    components: {},
    onShow() {
      this.getData();
    },
    methods: {
	    // 获取上级
      async getData() {
        let data = await myParentInfo();
        this.teamForm = data.data.result.memberInfo;
        console.log(this.teamForm);
      },

    },
    computed: {}
  };

</script>
<style lang="scss">
	.van-toast {
		view, text {
			color: #fff;
		}
	}
	.btnStyle {
		width: 90%;
		margin: 70px 0 0 5%;
	}
	.btnView {
		.van-button {
			background: #ab2b2b!important;
			border: 1px solid #ab2b2b!important;
			view, text {
				color: #fff;
			}
		}
	}
</style>
<style lang='scss' scoped>
	@import "./style";
</style>
