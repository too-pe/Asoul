<template>
  <el-dialog title="物品" :visible.sync="status" width="50%" @close="handleDialog">
    
  </el-dialog>
</template>

<script>
export default {
  props: ["status"],
  data: function () {
    return {
    };
  },
  methods:{
      handleDialog(){
          this.$emit("handleDialog","object")
      }
  }
};
</script>

<style>
</style>