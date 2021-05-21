<template>
  <div class="character-list-warp">
    <div v-for="(character, index) in characterList" :key="index">
      <el-button @click="gotoDialogPage(character)" class="character-button">{{
        character.NAME
      }}</el-button>
    </div>
  </div>
</template>

<script>
import CHARACTERLIST from "../constants/CharacterList";
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
.character-list-warp{
  height: 550px;
  overflow: auto;
}
.character-button {
  width: 100%;
  text-align: start;
  font-weight: bolder;
  color: white;
  background: rgb(255, 183, 193);
  border-color: transparent;
}
.character-button:hover {
  background: rgb(255, 137, 153);
  color: white;
  border-color: transparent;
}
</style>