<template>

    <div class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                   <slot name="phoneNum">
                       <p></p>
                   </slot>
            </div>
        </div>
        <div v-show="show" class="modal-backup" ></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: true
            }
        }

    }
</script>

<style scoped lang="scss">
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1001;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        overflow: scroll;
        margin: 30px auto;
    }
    
    .modal-dialog {
        position: absolute;
        left: 50%;
        top: 17%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
        width: 90%;
        padding: 20px 20px;
        /* background: #fff; */
        z-index: 1000;
    }
    
    .modal-content {
        width: 100%;
        img {
            width: 100%;
        }
    }
    
    .modal-backup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
    }
</style>