<template>
  <div class="dialog-warp">
    <div class="dialog-container" id="inner">
      <el-row
        v-for="(item, index) in dialogList"
        :key="index"
        class="item-container"
      >
        <el-col>
          <el-button :class="dialogObjectStyle(item.object)" circle>{{
            item.object[0]
          }}</el-button>
          <span :class="dialogItemStyle(item.object)">{{ item.text }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="handle-container">
      <el-select
        v-model="currentMessage"
        clearable
        filterable
        class="handle-select"
      >
        <el-option
          v-for="(dialog, index) in character.DIALOG"
          :key="index"
          :value="dialog.MESSAGE"
          >{{ dialog.MESSAGE }}</el-option
        >
      </el-select>
      <el-button @click="sentMessage" type="primary">发送</el-button>
    </div>
  </div>
</template>

<script>
import db from "../utils/loaclStorage";
export default {
  props: ["objectCharacter"],
  data() {
    return {
      currentMessage: "",
      dialogList: [],
      character: this.objectCharacter,
    };
  },
  created() {
    if (!db.get("dialogWith" + this.character.EN_NAME).length) {
      db.save("dialogWith" + this.character.EN_NAME, []);
      db.save(
        "likeWith" + this.character.EN_NAME,
        this.objectCharacter.LIKABILITY_NUM
      );
    } else {
      this.dialogList = db.get("dialogWith" + this.character.EN_NAME);
      this.character.LIKABILITY_NUM = db.get(
        "likeWith" + this.character.EN_NAME
      );
    }

    this.goDown()
  },
  updated(){
    this.goDown()
  },
  methods: {
    sentMessage() {
      if (!this.currentMessage) return; //nothing to reply

      const currentDialog = this.character.DIALOG.find(
        (item) => item.MESSAGE === this.currentMessage
      );
      const likability = this.changelikability(currentDialog.LIKABILITYCHANGE);
      console.log(likability);
      const replyGroup = currentDialog.REPLY[likability];
      var reply = "";
      if (replyGroup) {
        const index = Math.floor(Math.random() * replyGroup.length);
        reply = replyGroup[index];
      }
      const message = currentDialog.MESSAGE;

      this.dialogList.push({
        object: "player",
        text: message,
      });

      setTimeout(() => {
        if (reply) {
          this.dialogList.push({
            object: this.character.NAME,
            text: reply,
          });
        }
      }, Math.ceil(Math.random() * 5000));

      db.save("dialogWith" + this.character.EN_NAME, this.dialogList);
    },
    changelikability(num) {
      this.character.LIKABILITY_NUM +=
        num * (Math.ceil(Math.random() * 10) - 4);
      if (this.character.LIKABILITY_NUM < 0) this.character.LIKABILITY_NUM = 0;
      if (this.character.LIKABILITY_NUM > 100)
        this.character.LIKABILITY_NUM = 100;
      db.save(
        "likeWith" + this.character.EN_NAME,
        this.character.LIKABILITY_NUM
      );
      if (this.character.LIKABILITY_NUM > 80) return "BEST";
      else if (this.character.LIKABILITY_NUM > 60) return "GOOD";
      else if (this.character.LIKABILITY_NUM > 40) return "AVERAGE";
      else if (this.character.LIKABILITY_NUM > 20) return "BAD";
      else return "WORST";
    },
    dialogItemStyle(object) {
      if (object === this.character.NAME) {
        return "left";
      } else {
        return "right";
      }
    },
    dialogObjectStyle(object) {
      if (object === this.character.NAME) {
        return "left-object";
      } else {
        return "right-object";
      }
    },
    goDown() { //页面滑到最底部
      this.$nextTick(() => {
        let msg = document.getElementById("inner"); // 获取对象
        msg.scrollTop = msg.scrollHeight; // 滚动高度
      });
    },
  },
};
</script>

<style scoped>
.dialog-container {
  height: 450px;
  overflow: auto;
  margin: 5px;
  background: rgb(248, 248, 248);
  border-radius: 10px;
}
.handle-container {
  height: 100px;
  margin: 10px;
}
.handle-container .handle-select {
  width: 350px;
  padding-right: 10px;
}
.el-input__suffix-inner {
  visibility: hidden;
}
.item-container {
  width: 100%;
  margin-top: 5px;
}
.left {
  text-align: left;
  float: left;
  color: white;
  background: rgb(174, 189, 255);
  border-radius: 0px 20px 20px 20px;
  padding: 15px;
  max-width: 150px;
  width: fit-content;
}
.right {
  text-align: right;
  float: right;
  color: white;
  background: rgb(71, 255, 132);
  border-radius: 20px 0px 20px 20px;
  padding: 15px;
  max-width: 150px;
  width: fit-content;
}
.left-object {
  float: left;
  color: rgb(133, 131, 255);
  background: rgb(255, 255, 255);
  margin: 0px 5px 5px 5px;
  border: transparent;
}
.right-object {
  float: right;
  color: rgb(131, 255, 137);
  background: rgb(255, 255, 255);
  margin: 0px 5px 5px 5px;
  border: transparent;
}
</style>