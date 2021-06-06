<template>
  <div class="setting-warp">
      <div class="setting-button-group">
          <el-button circle class="setting-handle-button"></el-button>
          <el-button circle class="setting-handle-button"></el-button>
          <el-button circle class="setting-handle-button"></el-button>
          <el-button circle class="setting-handle-button"></el-button>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.setting-warp{
    height:620px;
    overflow: auto;
    background: rgba(0, 0, 0, 0.185);
    position:fixed;
    top:0%;
    left:30%;
    width:300px;
    border-radius: 40px;
    z-index:-1;
}
.setting-button-group{
    padding-left:220px;
    padding-top: 50px;
    width:10px;
}
.setting-handle-button{
    padding:20px;
    margin:20px;
}
</style>