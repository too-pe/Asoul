<template>
  <div class="character-list-warp">
    <div v-for="(character, index) in characterList" :key="index">
      <el-card
        @click.native="gotoDialogPage(character)"
        class="character-button"
        shadow="hover"
      >
        <el-row>
          <el-col :span="8">
          <img
            :src="require('../../public/photo/' + character.EN_NAME + '.jpg')"
            class="img"
          />
          </el-col>
          <el-col :span="16">
            <span class="name">{{ character.NAME }}</span>
            <div class="sign">{{ character.SIGN }}</div>
          </el-col>
        </el-row>
         
      </el-card>
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
  },
};
</script>

<style>
.character-list-warp {
  height: 500px;
  overflow: auto;
}
.character-button {
  margin: 10px;
}
.img {
  border-radius: 50%;
  width: 60%;
  height: 60%;
}
.name{
  position:relative;
  color: rgb(138, 138, 138);
  font-size:25px;
}
.sign{
  font-size:2px;
  color: rgb(189, 189, 189);
}
.el-card__body{
  padding:5px;
}
</style>