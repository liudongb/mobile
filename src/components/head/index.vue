<template>
  <div class="head">
    <div></div>
    <div>
      <van-popover
        v-model="show"
        trigger="click"
        :actions="actions"
        :overlay="true"
        placement="bottom-start"
      >
        <template #reference>
          <div @click.stop="popupShow">
            <span>{{ $route.meta.title }}</span>
            <van-icon name="arrow-down" />
          </div>
        </template>
      </van-popover>
    </div>
    <div>
      <van-icon name="wap-home" />
      <span>返回首页</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      actions: [
        { text: "名称自主申报", icon: "add-o", disabled: true },
        { text: "设立登记", icon: "music-o", disabled: true },
        { text: "申领发票", icon: "more-o", disabled: true },
        { text: "社保登记", icon: "add-o", disabled: true },
        { text: "公积金登记", icon: "music-o", disabled: true },
        { text: "克制公章", icon: "more-o", disabled: true },
        { text: "银行开户", icon: "more-o", disabled: true },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.actions.forEach((el) => {
        if (el.text == this.$route.meta.title) {
          el.disabled = false;
        }
      });
    },
    backHome() {},
    popupShow() {
      this.show = true;
    },
  },
};
</script>
<style lang="less" scoped>
.head {
  height: 50px;
  font-size: 16px;
  color: #fff;
  background: #50a4ff;
  display: flex;
  align-items: center;
  position: relative;
  top: 0px;
  z-index: 9999;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div:nth-of-type(1) {
    width: 5px;
    height: 40%;
    background: #fff;
    margin: 0px 10px;
    i {
      margin-left: 5px;
    }
  }
  > div:nth-of-type(3) {
    margin-left: auto;
    padding-right: 10px;
    i {
      margin-right: 5px;
    }
  }
}
</style>