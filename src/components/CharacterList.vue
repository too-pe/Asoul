<template>
  <div class="character-list-warp">
    <div v-for="(character, index) in characterList" :key="index">
      <el-card @click.native="gotoDialogPage(character)" class="character-button"  shadow="hover">{{
        character.NAME
      }}</el-card>
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
  margin:10px;
}
</style>