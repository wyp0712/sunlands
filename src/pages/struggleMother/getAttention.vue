<template>
   <div class="getAttentionWrap">
        <div class="header">
           <img :src="opt.getSuccessUrl" alt="">
        </div>
        <div class="main">
            
            <ul class="main-inner" v-for="(item,index) in getAttention">
              <li>
                <img :src="item.logox" alt="">
              </li>
              <li>
                  <div class="top">
                       {{item.title}}
                  </div>
                  <div class="bottom">
                   {{item.desc}}
                  </div>
              </li>
                <li>
                    <img @click="changeBg(index,item.serviceUrl)" src='/static/img/attentionBtn.png' alt="">
                </li>
            </ul>

        </div>
   </div>
</template>

<script>
    export default {
        name: "getAttention",
        data() {
            return {
                getAttention: [],
                opt: {
                    getSuccessUrl: "/static/img/getSuccessFlag.png",
                    isShow: false,
                },
                imgList: [{
                    course: '/static/img/1.png',
                    course2: '/static/img/attentionBtn.png',
                    course3: '/static/img/hasAttentionBtn.png',
                    show: 1,
                }, {
                    course: '/static/img/2.png',
                    course2: '/static/img/attentionBtn.png',
                    course3: '/static/img/hasAttentionBtn.png',
                    show: 2,
                }, {
                    course: '/static/img/3.png',
                    course2: '/static/img/attentionBtn.png',
                    course3: '/static/img/hasAttentionBtn.png',
                    show: 3,
                }, {
                    course: '/static/img/4.png',
                    course2: '/static/img/attentionBtn.png',
                    course3: '/static/img/hasAttentionBtn.png',
                    show: 4,
                }, {
                    course: '/static/img/5.png',
                    course2: '/static/img/attentionBtn.png',
                    course3: '/static/img/hasAttentionBtn.png',
                    show: 5,
                }]
            }
        },
        created(){
            var that=this;
                    this.$http.get(this.config.api.getAttention)
                            .then(function(res) {
                                if(res.data.code==that.singer.code.SUCCESS){
                                    console.log(res.data)
                                     that.getAttention = res.data.items ;
                                }
                               
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
        },
        methods: {
            changeBg(index, item) {
               
                  console.log(item)
                this.$router.push(item)
                //   this.$router.push({path: '/login?url=' + this.$route.path});
            }
        }
    }
</script>
<style scoped lang="scss">
    .getAttentionWrap {
        width: 100%;
        .header {
            width: 100%;
            img {
                width: 100%;
            }
        }
        .main {
            width: 100%;
            .main-inner {
                width: 100%;
                border-bottom: 1px solid #eee;
                li {
                    display: inline-block;
                }
                li:nth-child(1) {
                    width: 24%;
                    /* line-height: 60px; */
                    vertical-align: bottom;
                    img {
                        width: 100%;
                    }
                }
                li:nth-child(2) {
                    width: 40%;
                    text-align: left;
                    .top {
                        font-weight: bold;
                        line-height: 30px;
                    }
                    .bottom {
                        line-height: 20px;
                    }
                }
                li:nth-child(3) {
                    width: 30%;
                    line-height: 60px;
                    img {
                        width: 77%;
                    }
                }
            }
        }
    }
</style>