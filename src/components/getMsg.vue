<template>
  <div class="getMsg">

    <section class="weChat">
      <slot name="weChat"></slot>
    </section>

    <section class="phoneNum">
      <slot name="phoneNum"></slot>
    </section>

    <section class="weChat_phoneNum">
      <slot name="weixin"></slot>
      <slot name="phone"></slot>
    </section>

  </div>


</template>
<script>
  export default {
    data() {
      return {
        // resImgUrl: localStorage.getItem('air__src'),
        // mLink: localStorage.getItem('air__Link')
      }
    },
    methods: {
      // getParams() {
      //     // 取到路由带过来的参数
      //     const routerParams = this.$route.params.localUrl
      //         // 将数据放在当前组件的数据内
      //     this.resImgUrl = routerParams
      // }
    },

  }
</script>

<style>

</style>
