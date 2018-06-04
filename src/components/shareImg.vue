<template>
  <div>
    <img id="resImg" :src="resImgUrl" alt="">
    <div class="resImg_save">长按保存图片,可分享到朋友圈</div>
    <a id="link" v-singerlog:click='msg' class="imgBox" :href="mLink">
      <img  class="mlink"  src="https://img.tdf.ministudy.com/common/book__mlink.png" alt="">
    </a>
  </div>


 </template>
<script>

  export default {
    data () {
      return {
        msg:'我被点击了',
        resImgUrl: localStorage.getItem('air__src'),
        mLink: localStorage.getItem('air__Link')
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数
        const routerParams = this.$route.params.localUrl
        // 将数据放在当前组件的数据内
        this.resImgUrl = routerParams
      }
    },
    created:function () {
    },
    mounted:function () {
    }

  }
</script>
<!-- <style lang="scss" scoped> -->
<style>
#resImg{
    width: 17.25rem;
    margin:0.85rem auto;
    -moz-box-shadow:0px 0px 60px #e4e4e4;
    -webkit-box-shadow:0px 0px 60px #e4e4e4;
    box-shadow:0px 0px 60px #e4e4e4;
}
.resImg_save{
    color:rgb(252,199,0);
    width:100%;
    text-align:center;
    font-size:18px;
    margin-top:0.7rem;
}
.imgBox{
    display: block;
}
.mlink{
    width:100%;
    margin-top:2.1rem;
}
</style>
