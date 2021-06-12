<template>
    <div class="setting-warp">
      <div class="setting-button-group">
        <el-tooltip content="物品" effect="dark">
          <el-button
            @click="handleDialog('object')"
            class="setting-handle-button"
            icon="el-icon-menu"
          >
          </el-button>
        </el-tooltip>
      </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      dialogStatus:{
        object: false
      }
    };
  },
  methods: {
    handleDialog(dialogName) {
      this.$emit("handleDialog", dialogName)
    },
  },
};
</script>

<style scoped>
.setting-warp {
  height: 620px;
  overflow: auto;
  background: rgba(0, 0, 0, 0.185);
  position: fixed;
  top: 20px;
  left: 45%;
  width: 300px;
  border-radius: 40px;
  z-index: 0;
}
.setting-button-group {
  padding-left: 240px;
  padding-top: 50px;
  width: 10px;
}
.setting-handle-button {
  padding: 0 0 0 0px;
}
.setting-handle-button {
  color: rgba(255, 255, 255, 0.548);
  font-size: 40px;
  background: transparent;
  border-color: transparent;
}
.setting-handle-button :hover {
  color: rgb(255, 255, 255);
}
</style>