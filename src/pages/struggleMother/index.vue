<<<<<<< HEAD
<template>
  <div class="baoma" :class="{slideAnimation:isCourse===true}">

    <audio id="audioPlay" preload="auto" src="/static/audio/nyzy.mp3"></audio>
    <getMsg></getMsg>

    <!-- <div class="title" v-title data-title="baoma"></div>-->

    <div class="wrap_img" id="wrap" v-for="item in backImg">
      <a class="imgItem">
        <img :src="item.imgurl"/>
      </a>
      <a class="loading" v-if="loadingState">
        <img :src="otherImgUrl.loadingImg" alt="">
      </a>
    </div>

    <div class="wrap_icon">
      <div class="iconItem" ref="itemIcon" v-for="(item,index) in iconImgList">
        <!-- <div v-if="index===10">
        <img :src="item.imgurl" v-if="item.isShow" :class="{active:index===10}" />
        </div> -->
        <img :src="item.imgurl" :class="{active:index===10}"/>
      </div>

    </div>

    <div class="decidedPage">
      <img :src="otherImgUrl.decidedPageUrl" alt="">

      <div class="handAnimation">
        <img :src="otherImgUrl.handAnimationUrl" alt="">
      </div>
      <div class="decidedBtn" @click="decidedClick()">
        <img :src="decidedState? '/static/img/noClickBtn.png':'/static/img/clickBtn.png' " alt="">
      </div>
    </div>

    <div class="coursePage">
      <img :src="otherImgUrl.coursePageUrl" alt="">

      <div class="courseOne" @click="changeBgOne()">
        <img :src="flagone?'/static/img/mba.png':'/static/img/mbaClick.png' " alt="">
      </div>
      <div class="courseTwo" @click="changeBgTwo()">
        <img :src="flagtwo?'/static/img/mba.png':'/static/img/mbaClick.png' " alt="">
      </div>
      <div class="courseThree" @click="changeBgThree()">
        <img :src="flagthree?'/static/img/mba.png':'/static/img/mbaClick.png' " alt="">
      </div>
      <div class="courseFour" @click="changeBgFour()">
        <img :src="flagfour?'/static/img/mba.png':'/static/img/mbaClick.png' " alt="">
      </div>
    </div>
    <!-- <model></model> -->
  </div>
</template>

<script>
  import getMsg from '@/components/getMsg';
  import config from '@/views/js/api.js'
  // import model from './components/dialog.vue'
  export default {
    components: {
      getMsg,
      // model
    },
    name: 'struggleMother',
    data(){
    return {
      isCourse: false,
      flagone: false,
      flagtwo: false,
      flagthree: false,
      flagfour: false,
      decidedState: false,
      isShow: false,
      state: false,
      loadingState: true,
      courseUrl: [{
        imgUrl: "/static/img/mab.png",
        imgUrl: "/static/img/resource.png",
        imgUrl: "/static/img/mab.png",
        imgUrl: "/static/img/mab.png"
      }],
      otherImgUrl: {
        decidedPageUrl: "/static/img/decidedPage.png",
        coursePageUrl: "/static/img/coursePage.png",
        handAnimationUrl: "/static/img/handAnimation.png",
        loadingImg: "/static/img/loading.gif",
        decidedBtnUrl: "/static/img/noClickBtn.png",
        decidedBtnClickUrl: "/static/img/clickBtn.png"
      },
      backImg: [{
        imgurl: '/static/img/strMother.png'
      }],
      iconImgList: [{
        imgurl: '/static/img/home-font.png',
        isShow: true
      }, {
        imgurl: '/static/img/1-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/2-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/3-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/4-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/5-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/6-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/7-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/8-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/9-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/10-font.png',
        isShow: false
      }, {
        imgurl: '/static/img/11-font.png',
        isShow: false
      }],

    }
  }
  ,
  created()
  {

  }
  ,
  methods: {
    changeBgOne()
    {
      this.flagone = !this.flagone;
    }
  ,
    changeBgTwo()
    {
      this.flagtwo = !this.flagtwo;
    }
  ,
    changeBgThree()
    {
      this.flagthree = !this.flagthree;
    }
  ,
    changeBgFour()
    {
      this.flagfour = !this.flagfour;
    }
  ,
    decidedClick()
    {
      this.decidedState = !this.decidedState;
      //vue动画 可以点击添加类名
      this.isCourse = true;
    }
  ,
    autoPlay()
    {
      let audioPlay = document.getElementById('audioPlay');
      /*在这里建议使用原生来获取，使用jQuery会有点问题*/
      audioPlay.play();
      audioPlay.onended = function () {
        audioPlay.play();
      }
    }
  }
  ,
  mounted()
  {
    this.wxShare.wxDefaultShare("GOOD_MORNING_VERTICAL_PIC");
    //调用音乐
    // this.autoPlay();
    var that = this,
      div = document.querySelectorAll(".wrap_icon .iconItem"),
      imgItem = document.querySelectorAll(".iconItem img");
    var temp = []
    for (var i = 0; i < div.length; i++) {
      temp.push(div[i].offsetTop)
    }
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    window.onscroll = function () {
      var top = document.body.scrollTop || document.documentElement.scrollTop;
      //滚动条滚动的高度
      if (top > 150) {
        console.log('dayu 50');
        that.loadingState = false;
      } else {
        that.loadingState = true;
      }
      for (var j = 0; j < temp.length; j++) {
        if ((top + 250) > temp[j]) {
          that.iconImgList.forEach(function (val, n) {
            if (j == n) {
              that.$refs.itemIcon[10].style.opacity = 0.4
              val.isShow = true;
            }
          })
        }
      }
    }
  }
  ,
  }
  ;
</script>

<style scoped lang="scss">
  #audioPlay {
    display: none;
  }

  .baoma {
    width: 100%;
    position: relative;
  }

  .slideAnimation {
    animation: slideAnimaed 1s;
    -moz-animation: slideAnimaed 1s;
    -webkit-animation: slideAnimaed 1s;
    -o-animation: slideAnimaed 1s;
    animation-fill-mode: forwards;
  }

  @keyframes slideAnimaed {
    100% {
      transform: translate(0, -550px)
    }
  }

  .decidedPage,
  .coursePage {
    position: relative;
    width: 100%;

  .courseOne {
    position: absolute;
    left: 5%;
    top: 40%;
    width: 43%;
  }

  .courseTwo {
    position: absolute;
    left: 48%;
    top: 40%;
    width: 43%;
  }

  .courseThree {
    position: absolute;
    left: 5%;
    top: 64%;
    width: 43%;
  }

  .courseFour {
    position: absolute;
    left: 48%;
    top: 64%;
    width: 43%;
  }

  img {
    width: 100%;
  }

  .handAnimation {
    position: absolute;
    left: 23%;
    top: 60%;
    animation: myfirst .5s infinite;
    -moz-animation: myfirst .5s infinite;
    /* Firefox */
    -webkit-animation: myfirst .5s infinite;
    /* Safari 和 Chrome */
    -o-animation: myfirst .5s infinite;

  /* Opera */
  img {
    width: 88%;
  }

  }
  .decidedBtn {
    position: absolute;
    left: 10%;
    top: 79%;

  img {
    width: 83%;
  }

  }
  }

  @keyframes myfirst {
    0% {
      top: 60%;
    }
    50% {
      top: 65%;
    }
    100% {
      top: 60%;
    }
  }

  .wrap_img {
    width: 100%;
    position: relative;

  .loading {
    position: absolute;
    width: 28%;
    left: 38%;
    top: 10%;
  }

  }

  .wrap_img img {
    width: 100%;
  }

  .wrap_icon {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;

  .iconItem {
    position: relative;

  &
  .iconItem:nth-child(1) {
    width: 100%;
    height: 674px;

  img {
    width: 91%;
    position: absolute;
    left: 3%;
    top: 19%;
  }

  }
  &
  .iconItem:nth-child(2) {
    width: 100%;
    height: 330px;

  img {
    width: 50%;
    position: absolute;
    left: 178px;
    top: 24px;
  }

  }
  &
  .iconItem:nth-child(3) {
    width: 100%;
    height: 346px;

  img {
    width: 74%;
    position: absolute;
    left: 3%;
    top: 10%;
  }

  }
  &
  .iconItem:nth-child(4) {
    width: 100%;
    height: 335px;

  img {
    width: 58%;
    position: absolute;
    left: 1%;
    top: 3%;
  }

  }
  &
  .iconItem:nth-child(5) {
    width: 100%;
    height: 335px;

  img {
    width: 97%;
    position: absolute;
    left: 1%;
    top: 47%;
  }

  }
  &
  .iconItem:nth-child(6) {
    width: 100%;
    height: 371px;

  img {
    width: 84%;
    position: absolute;
    left: 3%;
    top: 45%;
  }

  }
  &
  .iconItem:nth-child(7) {
    width: 100%;
    height: 314px;

  img {
    width: 78%;
    position: absolute;
    left: 15%;
    top: 6%;
  }

  }
  &
  .iconItem:nth-child(8) {
    width: 100%;
    height: 276px;

  img {
    width: 92%;
    position: absolute;
    left: 6%;
    top: 29%;
  }

  }
  &
  .iconItem:nth-child(9) {
    width: 100%;
    height: 254px;

  img {
    width: 75%;
    position: absolute;
    left: 10%;
    top: 4%;
  }

  }
  &
  .iconItem:nth-child(10) {
    width: 100%;
    height: 425px;

  img {
    width: 95%;
    position: absolute;
    left: 3%;
    top: 55%;
  }

  }
  &
  .iconItem:nth-child(11) {
    background: black;
    /* opacity: .6; */
    width: 100%;
    height: 544px;

  img {
    width: 96%;
    position: absolute;
    left: 3%;
    top: 26%;
    z-index: 100000;
  }

  }
  &
  .iconItem:nth-child(12) {
    width: 100%;
    height: 683px;

  img {
    width: 95%;
    position: absolute;
    left: 3%;
    top: 27%;
  }

  }
  }
  }
</style>
=======
<template>
  <div class="baoma">

    <audio id="audioPlay" preload="auto" src="/static/audio/baoAudio.mp3"></audio>

    <!-- <div class="title" v-title data-title="struggleMother"></div>-->

    <div class="wrap_img" id="wrap" v-for="item in backImg">
        <a class="imgItem">
            <img :src="item.imgurl" />
        </a>
        <transition name="fade">
            <a class="loading" v-if="loadingState">
                <img :src="otherImgUrl.loadingImg" alt="">
            </a>
        </transition>
        
        <div class="audioFlag" @click="audioSwitch()" >
            <img :src="audioFlag ? '/static/img/audioOut.png' : '/static/img/audioOpen.png' " alt=""> 
        </div>
    </div>

    <div class="wrap_icon">
      <div class="iconItem" ref="itemIcon" v-for="(item,index) in iconImgList">
        <transition name="fade">
            <!-- <p v-if="show">hello</p> -->
            <img :src="item.imgurl" v-if="item.isShow" :class="{active:index===10}" />
        </transition>
       
      </div>
    </div>

    <div class="decidedPage">
       <img :src="otherImgUrl.decidedPageUrl" alt="">
       
       <div class="handAnimation">
        <img :src="otherImgUrl.handAnimationUrl" alt="">
       </div>
       
       <div class="decidedBtn">
            <img @click="decidedClick()" :src="decidedState? '/static/img/noClickBtn.png':'/static/img/clickBtn.png' " alt="">
        </div>

    </div>

    <div class="coursePage" v-show="decidedState"  ref="bottom" id="bottom" >
        <img :src="otherImgUrl.coursePageUrl" alt="">

        <div class="courseOne" @click="changeBgOne()">
            <img :src="flagone?'/static/img/mba.png':'/static/img/mbaHas.png' " alt="">
        </div>
        <div class="courseTwo" @click="changeBgTwo()">
            <img :src="flagtwo?'/static/img/resource.png':'/static/img/resourceHas.png' " alt="">
        </div>
        <div class="courseThree" @click="changeBgThree()">
            <img :src="flagthree?'/static/img/teach.png':'/static/img/teachHas.png' " alt="">
        </div>
        <div class="courseFour" @click="changeBgFour()">
            <img :src="flagfour?'/static/img/security.png':'/static/img/securityHas.png' " alt="">
        </div>
    </div>	
 
    <modal v-if="opt.modalisShow">
        <div slot="img">
            <img @click="giveOpt()" src="../../../static/img/giveOportunity.png" alt="">
        </div>
    </modal> 

    <modalPhonenNum v-if="opt.modalPhoneShow">
        <div class="phoneNum" slot="phoneNum">
                <img src="../../../static/img/getSuccess.png" alt=""> 
                <div class="getPhone">
                    <div class="getPhoneNum">
                        <input type="text" ref="input" maxlength="11" name="" value="">
                    </div>
                    <div class="getBtn" @click="getPhone()">
                        <img :src="opt.getState?'/static/img/click.png':'/static/img/hasclick.png' " alt="">
                    </div>
                </div>
        </div>
    </modalPhonenNum>

  </div>
</template>

<script>
    import getMsg from '@/components/getMsg';
    import modal from './components/modal.vue';
    import modalPhonenNum from './components/modalphone.vue';

    export default {
        components: {
            getMsg,
            modal,
            modalPhonenNum
        },
        name: 'struggleMother',
        data() {
            return {
                audioFlag: false,
                opt: {
                    modalisShow: false,
                    getState: false,
                    modalPhoneShow: false,
                },
                courseUrl: [{
                    imgUrl: "/static/img/mab.png",
                    imgHasUrl: "/static/img/mbaHas.png",
                }, {
                    imgUrl: "/static/img/resource.png",
                    imgHasUrl: "/static/img/resourceHas.png",
                }, {
                    imgUrl: "/static/img/teach.png",
                    imgHasUrl: "/static/img/teachHas.png",
                }, {
                    imgUrl: "/static/img/security.png",
                    imgHasUrl: "/static/img/securityHas.png",
                }],
                isCourse: false,
                flagone: false,
                flagtwo: false,
                flagthree: false,
                flagfour: false,
                decidedState: false,
                isShow: false,
                state: false,
                loadingState: true,
                otherImgUrl: {
                    decidedPageUrl: "/static/img/decidedPage.png",
                    coursePageUrl: "/static/img/coursePage.png",
                    handAnimationUrl: "/static/img/handAnimation.png",
                    loadingImg: "/static/img/loading.gif",
                    decidedBtnUrl: "/static/img/noClickBtn.png",
                    decidedBtnClickUrl: "/static/img/clickBtn.png"
                },
                backImg: [{
                    imgurl: '/static/img/strMother.png'
                }],
                iconImgList: [{
                    imgurl: '/static/img/home-font.png',
                    isShow: true
                }, {
                    imgurl: '/static/img/1-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/2-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/3-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/4-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/5-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/6-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/7-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/8-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/9-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/10-font.png',
                    isShow: false
                }, {
                    imgurl: '/static/img/11-font.png',
                    isShow: false
                }],
            }
        },
        created() {
            // this.$http.get('/rest/weixin/tdf-services')
            //     .then(function(res) {
            //         this.getAttention = res;
            //         console.log(res);
            //     })
            //     .catch(function(err) {
            //         console.log(err);
            //     });
        },
        methods: {  
            shareFun(){
                var that=this;
                console.log(this.wxShare)
                var reg = /^[1][34578][0-9]{9}$/;
               if(this.wxShare.wxDefaultShare){
                 this.$http.get(this.config.api.getUserme)
                    .then(function(res) {
                        if(res.data.code==that.singer.code.SUCCESS){
                            if(res.data.item && reg.test(res.data.phone)){
                              that.$router.path('/h6/getAttention')
                            }else{
                              that.opt.modalisShow=!that.opt.modalisShow;
                              that.opt.modalPhoneShow=!that.opt.modalPhoneShow
                            }
                          
                        }
                        
                    })
                    .catch(function(err) {
                        console.log(err);
                    }); 
               }
                
            },
            audioSwitch(item) {
                this.audioFlag = !this.audioFlag;
                if (this.audioFlag) {
                    this.autoOut();
                } else {
                    this.autoPlay()
                }
            },
            getPhone() {
             var that=this;
                this.opt.getState = !this.opt.getState
                var reg = /^[1][34578][0-9]{9}$/;
                if (reg.test(this.$refs.input.value)) {
                    this.opt.modalPhoneShow = !this.opt.modalPhoneShow;
                    this.$http.post(this.config.getPhone,{type:this.$refs.input.value})
                    .then(function(res) {
                        if(res.data.code==that.singer.code.SUCCESS){
                             that.$router.push('/h6/getAttention')
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    });  

                } else {
                    alert("手机号填写要正确哦")
                }
            },
            giveOpt() {
                this.opt.modalisShow = !this.opt.modalisShow
            },
            changeBgOne() {
                this.flagone = !this.flagone;
                this.opt.modalisShow = !this.opt.modalisShow;
                this.shareFun();
            },
            changeBgTwo() {
                this.flagtwo = !this.flagtwo;
                this.opt.modalisShow = !this.opt.modalisShow
                this.shareFun();
            },
            changeBgThree() {
                this.flagthree = !this.flagthree;
                this.opt.modalisShow = !this.opt.modalisShow
                 this.shareFun();
            },
            changeBgFour() {
                this.flagfour = !this.flagfour;
                this.opt.modalisShow = !this.opt.modalisShow
                 this.shareFun();
            },
            decidedClick() {
                var that = this;
                this.decidedState = !this.decidedState;
                //vue动画 可以点击添加类名
                this.isCourse = true;
                var bottom = that.$refs.bottom.offsetTop;
                var speed = 5424;
                
                var timer = setInterval(() => {
                    speed += 10
                    this.$refs.bottom.offsetTop
                    window.scrollTo(100, speed)
                    if (speed >this.$refs.bottom.offsetTop) {
                        clearInterval(timer)
                    }
                }, 100);

            },
            autoPlay() {
                let audioPlay = document.getElementById('audioPlay');
                audioPlay.play();
                audioPlay.onended = function() {
                    audioPlay.play();
                }
            },
            autoOut: function() {
                let audioPlay = document.getElementById('audioPlay');
                /*在这里建议使用原生来获取，使用jQuery会有点问题*/
                audioPlay.pause();
            }
        },
        mounted() {
            this.autoPlay();
            //dom渲染完成之后执行
            this.$nextTick(function() {
                var that = this,
                    div = document.querySelectorAll(".wrap_icon .iconItem"),
                    imgItem = document.querySelectorAll(".iconItem img");
                var temp = [];
                for (var i = 0; i < div.length; i++) {
                    console.log(div[i].offsetTop)
                    temp.push(div[i].offsetTop)
                }
                console.log(temp)
                var top = document.body.scrollTop || document.documentElement.scrollTop;
                window.onscroll = function() {
                    var top = document.body.scrollTop || document.documentElement.scrollTop;
                    //滚动条滚动的高度
                    var str = parseFloat(document.querySelector('html').style.fontSize);
                    for (var j = 0; j < temp.length; j++) {
                        console.log(top)
                        if ((top + 250) > temp[j] ) {
                            that.iconImgList.map(function(val, n) {
                                if (j == n) {
                                    val.isShow = true;
                                    setTimeout(()=>{
                                      that.$refs.itemIcon[10].style.opacity = 0.4
                                    },500)
                                }
                            })
                        }
                    }
                    if (top > 250) {
                        that.loadingState = false;
                    } else {
                        that.loadingState = true;
                    }
                }
            })



        },
    };
</script>

<style scoped lang="scss">
    html {
        transtion: all 3s;
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1s
    }
    
    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }
    
    #audioPlay {
        display: none;
    }
    
    .baoma {
        width: 100%;
        position: relative;
    }
    
    .phoneNum {
        position: relative;
        .getPhone {
            position: absolute;
            left: 19%;
            top: 44%;
            .getPhoneNum {
                width: 74%;
                height: 39px;
                border: 1px solid black;
                border-radius: 40px;
                line-height: 39px;
                    padding-left: 10%;
                input {
                    width: 70%;
                    height: 60%;
                    border: none;
                    outline: none
                }
            }
            .getBtn {
                width: 74%;
                height: 45px;
                margin-top: 30px;
                border-radius: 40px;
            }
        }
    }
    
    .slideAnimation {
        /* animation: slideAnimaed 1s;
        -moz-animation: slideAnimaed 1s;
        -webkit-animation: slideAnimaed 1s;
        -o-animation: slideAnimaed 1s;
        animation-fill-mode: forwards; */
    }
    
    @keyframes slideAnimaed {
        100% {
            /* transform: translate(0, -550px) */
        }
    }
    
    .decidedPage,
    .coursePage {
        position: relative;
        width: 100%;
        .courseOne {
            position: absolute;
            left: 5%;
            top: 40%;
            width: 43%;
        }
        .courseTwo {
            position: absolute;
            left: 48%;
            top: 40%;
            width: 43%;
        }
        .courseThree {
            position: absolute;
            left: 5%;
            top: 64%;
            width: 43%;
        }
        .courseFour {
            position: absolute;
            left: 48%;
            top: 64%;
            width: 43%;
        }
        img {
            width: 100%;
        }
        .handAnimation {
            position: absolute;
            left: 23%;
            top: 60%;
            animation: myfirst .5s infinite;
            -moz-animation: myfirst .5s infinite;
            /* Firefox */
            -webkit-animation: myfirst .5s infinite;
            /* Safari 和 Chrome */
            -o-animation: myfirst .5s infinite;
            /* Opera */
            img {
                width: 88%;
            }
        }
        .decidedBtn {
            position: absolute;
            left: 17%;
            top: 79%;
            img {
                width: 83%;
            }
        }
    }
    
    @keyframes myfirst {
        0% {
            top: 60%;
        }
        50% {
            top: 65%;
        }
        100% {
            top: 60%;
        }
    }
    
    .wrap_img {
        width: 100%;
        position: relative;
        .audioFlag {
            position: absolute;
            left: 82%;
            top: 2%;
            z-index: 1000000;
            img {
                width: 57%;
            }
        }
        .loading {
            position: absolute;
            width: 28%;
            left: 38%;
            top: 10%;
        }
    }
    
    .wrap_img img {
        width: 100%;
    }
    
    .wrap_icon {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        .iconItem {
            position: relative;
            &.iconItem:nth-child(1) {
                width: 100%;
                height: 27rem;
                img {
                    width: 91%;
                    position: absolute;
                    left: 3%;
                    top: 19%;
                }
            }
            &.iconItem:nth-child(2) {
                width: 100%;
                height: 13rem;
                img {
                    width: 50%;
                    position: absolute;
                    left: 48%;
                    top: 24px;
                }
            }
            &.iconItem:nth-child(3) {
                width: 100%;
                height: 14rem;
                img {
                    width: 74%;
                    position: absolute;
                    left: 3%;
                    top: 10%;
                }
            }
            &.iconItem:nth-child(4) {
                width: 100%;
                height: 13.5rem;
                img {
                    width: 58%;
                    position: absolute;
                    left: 1%;
                    top: 3%;
                }
            }
            &.iconItem:nth-child(5) {
                width: 100%;
                height: 13.5rem;
                img {
                    width: 97%;
                    position: absolute;
                    left: 1%;
                    top: 47%;
                }
            }
            &.iconItem:nth-child(6) {
                width: 100%;
                height: 15rem;
                img {
                    width: 84%;
                    position: absolute;
                    left: 3%;
                    top: 45%;
                }
            }
            &.iconItem:nth-child(7) {
                width: 100%;
                height: 12.5rem;
                img {
                    width: 78%;
                    position: absolute;
                    left: 15%;
                    top: 6%;
                }
            }
            &.iconItem:nth-child(8) {
                width: 100%;
                height: 11rem;
                img {
                    width: 92%;
                    position: absolute;
                    left: 6%;
                    top: 29%;
                }
            }
            &.iconItem:nth-child(9) {
                width: 100%;
                height: 10rem;
                img {
                    width: 75%;
                    position: absolute;
                    left: 10%;
                    top: 4%;
                }
            }
            &.iconItem:nth-child(10) {
                width: 100%;
                height: 17rem;
                img {
                    width: 95%;
                    position: absolute;
                    left: 3%;
                    top: 55%;
                }
            }
            &.iconItem:nth-child(11) {
                background: black;
                width: 100%;
                height: 22rem;
                img {
                    width: 96%;
                    position: absolute;
                    left: 3%;
                    top: 26%;
                    z-index: 100000;
                }
            }
            &.iconItem:nth-child(12) {
                width: 100%;
                height: 27rem;
                img {
                    width: 95%;
                    position: absolute;
                    left: 3%;
                    top: 27%;
                }
            }
        }
    }
</style>
>>>>>>> 85b43d8adb25dc0d4021598e85f6e4f6cdf53b3e
