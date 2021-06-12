<template>
  <div class="background">
    <el-row>
      <div>
        <transition name="fade" mode="out-in">
          <div v-if="!headerStartShow" key="before" class="container-before">
            <h2 class="container-before-title">For Asoul.</h2>
            </div>
          <div class="container-header" v-if="headerShow && headerStartShow" key="header">
            <h1 class="title">私信模拟器</h1>
            <el-button
              @click="handleContainerStyle"
              type="success"
              round
              plain
              class="start-button"
              >开始</el-button
            >
          </div>

          <div class="main-container" v-if="!headerShow" key="main">
            <div class="container-outter">
              <div class="header">
                {{ status === "LIST" ? "关注" : character.NAME }}
              </div>
              <div class="container-inner">
                <transition name="fade" mode="out-in">
                  <CharacterList
                    v-if="status === 'LIST'"
                    @gotoDialogPage="gotoDialogPage"
                    @handleContainerStyle="handleContainerStyle"
                    @handleSettingStyle="handleSettingStyle"
                  />
                  <Dialog
                    v-if="status === 'DIALOG'"
                    @gotoListPage="gotoListPage"
                    :objectCharacter="character"
                  />
                </transition>
              </div>
            </div>
          </div>
        </transition>
        <transition name="slide-fade">
          <Setting v-if="settingStatus" @handleDialog="handleDialog" />
        </transition>
        <div class="dialogs">
          <Object :status="dialogStatus.object" @handleDialog="handleDialog" />
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import Dialog from "./components/Dialog";
import CharacterList from "./components/CharacterList";
import Setting from "./components/Setting";
import Object from "./components/Object.vue";
// import CHARACTERLIST from "./constants/CharacterList";
// import db from "./utils/loaclStorage";

export default {
  components: {
    Dialog,
    CharacterList,
    Setting,
    Object,
  },
  data() {
    return {
      character: {},
      status: "LIST",
      containerStyle: "container-down",
      headerShow: true,
      headerStartShow: false,
      settingStatus: false,
      dialogStatus: {
        object: false,
      },
    };
  },
  created() {
    setTimeout(()=>{
      this.headerStartShow = true
    }, 1000)
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
      console.log(character);
      this.status = "BUFFER"; //动画缓冲

      this.status = "DIALOG";
    },
    gotoListPage() {
      this.status = "LIST";
    },
    handleContainerStyle() {
      this.headerShow = !this.headerShow;
      if (this.headerShow) {
        this.settingStatus = false;
      }
    },
    handleSettingStyle() {
      this.settingStatus = !this.settingStatus;
    },
    handleDialog(dialogName) {
      this.dialogStatus[dialogName] = !this.dialogStatus[dialogName];
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

::-webkit-scrollbar {
  color: transparent;
}
/* .el-button:active {
  color: rgb(51, 51, 51);
  border-color: rgb(49, 49, 49);
}
.el-button:hover {
  color: rgb(255, 255, 255);
  border-color: transparent;
  background-color: rgb(93, 93, 93);
} */
body {
  margin: 0px;
}
</style>
<style scope>
.background {
  background: rgb(49, 49, 49);
  height: 100vh;
  overflow: hidden;
  background-image: url("~assets/common/background/background5.jpg");
  background-size: 100% 100%;
}
.background .handle-button {
  flex-direction: row-reverse;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
}
.background .setting-button {
  padding: 5px;
}
.background .container-before{
  margin: auto;
  text-align: center;
  padding-top: 250px;
  background: white;
  height: 100vh;
  position: relative;
  z-index: 2;
}
.background .container-before-title{
  margin: auto;
}
.background .container-header {
  margin: auto;
  padding-top: 100px;
  text-align: center;
  width: 600px;
}
.background .container-header .title {
  font-size: 100px;
  color: white;
  font-family: FZYaoti;
}
.background .main-container {
  position: relative;
  max-width: 300px;
  margin: auto;
  padding-top: 20px;
  z-index: 1;
}
.background .container-outter {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 40px;
  background: white;
  min-width: 300px;
  height: 620px;
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

.start-button {
  font-size: 20px;
  font-family: FZYaoti;
}
.start-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
.start-button span:after {
  content: "»";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.start-button:hover span {
  padding-right: 25px;
}

.start-button:hover span:after {
  opacity: 1;
  right: 0;
}

.container-calandar {
  position: fixed;
  left: 50%;
  width: 50%;
  height: 50%;
}
</style>