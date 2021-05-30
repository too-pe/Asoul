<template>
  <div class="background">
    <div class="header-button">
      <el-tooltip effect="dark" content="开启/关闭">
        <el-button
          @click="handleContainerStyle"
          circle
          icon="el-icon-user-solid"
        ></el-button>
      </el-tooltip>
    </div>
    <el-row :gutter="20" :class="containerStyle" type="flex" justify="center">
      <el-col :span="6" class="container-outter">
        <div class="header">
          {{ status === "LIST" ? "MY SUBSCRIBE" : character.NAME }}
        </div>
        <div class="container-inner">
          <CharacterList
            v-if="status === 'LIST'"
            @gotoDialogPage="gotoDialogPage"
          />
          <Dialog
            v-if="status === 'DIALOG'"
            @gotoListPage="gotoListPage"
            :objectCharacter="character"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Dialog from "./components/Dialog";
import CharacterList from "./components/CharacterList";
// import CHARACTERLIST from "./constants/CharacterList";
// import db from "./utils/loaclStorage";

export default {
  components: {
    Dialog,
    CharacterList,
  },
  data() {
    return {
      character: {},
      status: "LIST",
      containerStyle: "container-down",
    };
  },
  created() {
    // this.autoMessage();
  },
  methods: {
    // autoMessage() {
    //   setInterval(() => {
    //     //对面自动发送消息
    //     const index = Math.floor(Math.random() * CHARACTERLIST.length); //定位到人
    //     console.log(CHARACTERLIST[index].EN_NAME)
    //     if (!db.get("likeWith" + CHARACTERLIST[index].EN_NAME).length) {
    //       db.save(
    //         "likeWith" + CHARACTERLIST[index].EN_NAME,
    //         CHARACTERLIST[index].LIKABILITY_NUM
    //       );
    //     } else {
    //       var like = db.get("likeWith" + CHARACTERLIST[index].EN_NAME);
    //     }
    //     if (like < 50) return; //如果好感度小于50对面就不会自动发送消息
    //     const message = Math.floor(
    //       Math.random() * CHARACTERLIST[index].AUTO_MESSAGE.length
    //     ); //定位到某一套对话
    //     for (var i in CHARACTERLIST[index].AUTO_MESSAGE[message]) {
    //       var dialogList = [];
    //       if (!db.get("dialogWith" + CHARACTERLIST[index].EN_NAME).length) {
    //         db.save("dialogWith" + CHARACTERLIST[index].EN_NAME, []);
    //       } else {
    //         dialogList = db.get("dialogWith" + CHARACTERLIST[index].EN_NAME);
    //       }

    //       dialogList.push({
    //         object: CHARACTERLIST[index].EN_NAME,
    //         text: CHARACTERLIST[index].AUTO_MESSAGE[message][i],
    //       });
    //       db.save("dialogWith" + CHARACTERLIST[index].EN_NAME, dialogList);
    //       // if(!db.get("newMessageWith" + CHARACTERLIST[index].EN_NAME).length){
    //       //   db.save("newMessageWith" + CHARACTERLIST[index].EN_NAME,0)
    //       // }
    //       // else{
    //       //   this.newMessage[CHARACTERLIST[index]] = db.get("newMessageWith" + CHARACTERLIST[index].EN_NAME);
    //       //   this.newMessage[CHARACTERLIST[index]] ++;

    //       //   db.save("newMessageWith" + CHARACTERLIST[index].EN_NAME,this.newMessage[CHARACTERLIST[index]])
    //       // }
    //       this.$message(CHARACTERLIST[index].EN_NAME + "给你发送了一条消息！")

    //     }
    //   }, 3000000);
    // },
    gotoDialogPage(character) {
      this.character = character;
      console.log(character)
      this.status = "DIALOG";
    },
    gotoListPage() {
      this.status = "LIST";
    },
    handleContainerStyle() {
      if (this.containerStyle === "container-down") {
        this.containerStyle = "container-up";
      } else {
        this.containerStyle = "container-down";
      }
    },
  },
};
</script>
<style>
::-webkit-scrollbar {
  color: transparent;
}
.el-button:active{
  color:rgb(51, 51, 51);
  border-color: rgb(49, 49, 49);
}
.el-button:hover{
  color:rgb(255, 255, 255);
  border-color:transparent;
  background-color: rgb(93, 93, 93);
}
body {
  margin: 0px;
}
</style>
<style scope>
.background {
  flex-direction: center;
  background: rgb(49, 49, 49);
  height: 100vh;
  overflow: hidden;
  background-image: url("~assets/common/background/background1.jpg");
  background-size: 100% 100%;
}
.background .header-button{
  text-align: center;
  top:90%;
  position: relative;
}
.background .container-down {
  bottom: -600px;
  transform: translateY(3px);
  transition: transform 0.3s ease-in-out, bottom 1s ease-in-out;
}
.background .container-up {
  bottom: 25px;
  transform: translateY(3px);
  transition: transform 0.3s ease-in-out, bottom 1s ease-in-out;
}
.background .container-outter {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 40px;
  background: white;
  min-width: 300px;
}
.background .header {
  text-align: center;
  color: rgb(119, 119, 119);
  background: rgba(255, 255, 255, 0);
  font-size: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: bolder;
}
</style>