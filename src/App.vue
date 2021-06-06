<template>
  <div class="background">
    <el-row>
      <el-col>
        <transition name="fade" mode="out-in">
          <el-col class="container-header" v-show="headerShow">
            <h1 class="title">私信模拟器</h1>
            <el-button
              @click="handleContainerStyle"
              type="success"
              round
              plain
              class="start-button"
              >开始</el-button
            >
          </el-col>
        </transition>
      </el-col>
      <el-col :class="containerStyle">
        <div class="container-outter">
          <div class="header">
            {{ status === "LIST" ? "关注" : character.NAME }}
          </div>
          <div class="container-inner">
            <transition name="fade" mode="out-in">
              <CharacterList
                v-if="status === 'LIST'"
                @gotoDialogPage="gotoDialogPage"
              />
              <Dialog
                v-if="status === 'DIALOG'"
                @gotoListPage="gotoListPage"
                :objectCharacter="character"
              />
            </transition>
            <transition name="slide-fade">
              <Setting v-if="settingStatus"/>
            </transition>
            <div class="header-button">
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
                  @click="handleSettingStatus"
                  circle
                  type="warning"
                  icon="el-icon-s-tools"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Dialog from "./components/Dialog";
import CharacterList from "./components/CharacterList";
import Setting from "./components/Setting";
// import CHARACTERLIST from "./constants/CharacterList";
// import db from "./utils/loaclStorage";

export default {
  components: {
    Dialog,
    CharacterList,
    Setting
  },
  data() {
    return {
      character: {},
      status: "LIST",
      containerStyle: "container-down",
      headerShow: true,
      settingStatus: false,
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
      console.log(character);
      this.status = "BUFFER"; //动画缓冲
      
        this.status = "DIALOG"
    
     
      
    },
    gotoListPage() {
      
        this.status = "LIST"
      
    },
    handleContainerStyle() {
      if (this.containerStyle === "container-down") {
        this.headerShow = false;
        setTimeout(() => {
          this.containerStyle = "container-up";
        }, 300);
      } else {
        setTimeout(() => {
          this.headerShow = true;
        }, 300);
        this.containerStyle = "container-down";
      }
    },
    handleSettingStatus(){
      this.settingStatus = !this.settingStatus
    }
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
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
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
.background .header-button {
  text-align: center;
  padding-bottom: 20px;
  position: fixed;
  bottom:2%;
  right:15%;
  z-index: 10;
}
.background .setting-button {
  text-align: center;
  padding-bottom: 20px;
  position: fixed;
  bottom:2%;
  right:35%;
  z-index: 10;
}
.background .container-header {
  text-align: center;
  position: fixed;
  right: 28%;
  top: 20%;
  width: 600px;
}
.background .container-header .title {
  font-size: 100px;
  color: white;
  font-family: FZYaoti;
}
.background .container-down {
  right: -1350px;
  bottom: -10px;
  position: relative;
  transform: translateX(3px);
  transition: transform 0.3s ease-in-out, right 1s ease-in-out;
  width: 230px;
}
.background .container-up {
  right: -550px;
  bottom: -10px;
  position: relative;
  transform: translateX(3px);
  transition: transform 0.3s ease-in-out, right 1s ease-in-out;
  width: 230px;
}
.background .container-outter {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 40px;
  background: white;
  min-width: 300px;
  height:620px;
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
  font-size:20px;
  font-family: FZYaoti;
}
.start-button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
.start-button span:after {
  content: '»';
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
</style>