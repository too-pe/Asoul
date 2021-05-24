<template>
  <div class="background">
    <el-row>
      <el-col :span="6" :offset="9" class="container-outter">
        <div class="header">{{status === "LIST"?"MY SUBSCRIBE":character.NAME}}</div>
        <div class="container-inner">
          <CharacterList
            v-if="status === 'LIST'"
            @gotoDialogPage="gotoDialogPage"
          />
          <Dialog v-if="status === 'DIALOG'" :objectCharacter="character"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Dialog from "./components/Dialog";
import CharacterList from "./components/CharacterList";

export default {
  components: {
    Dialog,
    CharacterList,
  },
  data() {
    return {
      character: {},
      status: "LIST",
    };
  },
  created() {},
  methods: {
    gotoDialogPage(character) {
      this.character = character;
      this.status = "DIALOG";
    },
  },
};
</script>
<style>
::-webkit-scrollbar {
  color:transparent;
}
</style>
<style scope>
.background {
  flex-direction: center;
}
.background .container-outter {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 40px;
}
.background .header{
  text-align: center;
  color: rgb(119, 119, 119);
  background: rgb(255, 255, 255);
  font-size: 30px;
  padding-top:10px;
  padding-bottom: 10px;
  font-weight:bolder
}
</style>