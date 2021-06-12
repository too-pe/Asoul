<template>
  <div class="character-list-warp">
    <div class="character-list">
      <div v-for="(character, index) in characterList" :key="index">
        <el-card
          @click.native="gotoDialogPage(character)"
          class="character-button"
          shadow="hover"
        >
          <el-row type="flex" justify="center">
            <img
              :src="require('../../public/photo/' + character.EN_NAME + '.jpg')"
              class="img"
            />
            <!-- <el-col :span="16">
              <span class="name">{{ character.NAME }}</span>
              <div class="sign">{{ character.SIGN }}</div>
            </el-col> -->
          </el-row>
        </el-card>
      </div>
    </div>
    <div class="handle-button">
      <div class="setting-button">
        <el-tooltip effect="dark" content="关闭">
          <el-button
            @click="handleContainerStyle"
            circle
            type="danger"
            icon="el-icon-message-solid"
          ></el-button>
        </el-tooltip>
      </div>
      <div class="setting-button">
        <el-tooltip effect="dark" content="设置">
          <el-button
            @click="handleSettingStyle"
            circle
            type="warning"
            icon="el-icon-s-tools"
          ></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import CHARACTERLIST from "../../public/constants/CharacterList";
export default {
  data() {
    return {
      characterList: CHARACTERLIST,
    };
  },
  methods: {
    gotoDialogPage(character) {
      this.$emit("gotoDialogPage", character);
    },
    handleContainerStyle() {
      this.$emit("handleContainerStyle");
    },
    handleSettingStyle() {
      this.$emit("handleSettingStyle");
    },
  },
};
</script>

<style>
.character-list-warp {
  height: 500px;
}
.character-list {
  height: 430px;
  overflow: auto;
}
.character-button {
  margin: 10px;
}
.img {
  border-radius: 50%;
  width: 30%;
  height: 30%;
}
.name {
  position: relative;
  color: rgb(138, 138, 138);
  font-size: 25px;
}
.sign {
  font-size: 2px;
  color: rgb(189, 189, 189);
}
.el-card__body {
  padding: 5px;
}
</style>