<template>
  <div class="profile-card" v-if="profile">
    <div class="profile-header">
      <img :src="profile.pictureUrl" alt="User Picture" class="profile-pic">
      <h2 class="profile-name">{{ profile.displayName }}</h2>
    </div>
    <div class="profile-body">
      <div class="profile-item">
        <span class="label">Status Message:</span>
        <span>{{ profile.statusMessage || 'No status message' }}</span>
      </div>
      <div class="profile-item">
        <span class="label">Email:</span>
        <span>{{ email || 'No email available' }}</span>
      </div>
      <div class="profile-item">
        <span class="label">User ID:</span>
        <span>{{ profile.userId }}</span>
      </div>
      <div class="profile-item">
        <span class="label">Friend Ship:</span>
        <span>{{ friendShip }}</span>
      </div>
      <div class="profile-item">
        <span class="label">Operating System:</span>
        <span>{{ os }}</span>
      </div>
      <div class="profile-item">
        <span class="label">App Language:</span>
        <span>{{ appLanguage }}</span>
      </div>
      <div class="profile-item">
        <span class="label">LIFF Language:</span>
        <span>{{ liffLanguage }}</span>
      </div>
      <div class="profile-item">
        <span class="label">LIFF SDK Version:</span>
        <span>{{ liffVersion }}</span>
      </div>
      <div class="profile-item">
        <span class="label">LINE App Version:</span>
        <span>{{ lineVersion }}</span>
      </div>
      <div class="profile-item">
        <span class="label">Is in LINE Client:</span>
        <span>{{ isInClient }}</span>
      </div>
      <div class="profile-item">
        <span class="label">API Availability:</span>
        <span>{{ isApiAvailable }}</span>
      </div>
    </div>

    <!-- ปุ่มสำหรับการส่งข้อความและเปิด browser-->
    <div class="button-group">
      <button v-if="isShowButton" @click="sendMessage" class="btn">Send Message</button>
      <button @click="openWindowModule" class="btn">Open Windown</button>
    </div>
    <!-- ปุ่มสำหรับการแชร์และ แสกน qrcode-->
    <div class="button-group">
      <button @click="shareMessage" class="btn">Share via LINE</button>
      <button v-if="isShowButton" @click="openQRCodeModule" class="btn">Scan QR</button>
    </div>
  </div>

</template>

<script>
import liff from "@line/liff";
export default {
  beforeCreate() {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        this.message = "LIFF init succeeded.";
      })
      .catch((e) => {
        this.message = "LIFF init failed.";
        this.error = `${e}`;
      });
  },
  data() {
    return {
      profile: null,
      friendShip: null,
      email: null,
      os: null,
      appLanguage: null,
      liffLanguage: null,
      liffVersion: null,
      lineVersion: null,
      isInClient: null,
      isApiAvailable: null,
      isShowButton: false,
      message: "",
      error: ""
    };
  },
  async mounted() {
    await this.checkLiffLogin()
  },
  methods: {
    async checkLiffLogin() {
      await liff.ready.then(async () => {
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location })
        } else {

          const profile = await liff.getProfile();
          this.profile = profile;
          const friendShip = await liff.getFriendship()
          this.friendShip = friendShip.friendFlag
          // console.log(friendShip);
          // ดึงข้อมูลอีเมล
          const deIdToken = liff.getDecodedIDToken();
          console.log(deIdToken);
          this.email = deIdToken.email;

          const idToken = liff.getIDToken();
          console.log(idToken);



          // ดึงข้อมูลต่าง ๆ ของ LIFF
          this.os = liff.getOS();
          this.appLanguage = liff.getAppLanguage();
          this.liffLanguage = liff.getLanguage();
          this.liffVersion = liff.getVersion();
          this.lineVersion = liff.getLineVersion();
          this.isInClient = liff.isInClient();
          if (liff.isInClient()) {
            this.isShowButton = true
          }
          this.isApiAvailable = liff.isApiAvailable('shareTargetPicker'); // ตัวอย่างการตรวจสอบ API

        }
      })
    },

    // 
    async openWindowModule() {
      await liff.openWindow({
        url: "https://line.me",
        external: true,
      });
    },

    async openQRCodeModule() {
      if (this.isInClient) {
        await liff
          .scanCodeV2()
          .then((result) => {
            alert(JSON.stringify(result))
          })
          .catch((error) => {
            console.log("error", error);
          });

      }
    },

    // ฟังก์ชันสำหรับส่งข้อความ
    async sendMessage() {
      if (this.isInClient) {
        try {
          await liff.sendMessages([{
            'type': 'text',
            'text': 'This is a message from LIFF!'
          }]).then(
            alert('Message sent!')
          ).catch(function (res) {
            console.log("Failed to launch ShareTargetPicker")
          });
          await liff.closeWindow()

        } catch (error) {
          console.error('Error sending message:', error);
          alert('Failed to send message.');
        }
      }

    },

    // ฟังก์ชันสำหรับแชร์ข้อความผ่าน LINE
    async shareMessage() {
      try {
        if (liff.isApiAvailable('shareTargetPicker')) {
          const options = {
            isMultiple: true // เปลี่ยนเป็น false ถ้าต้องการให้เลือกผู้รับได้แค่หนึ่งคน
          };
          liff.shareTargetPicker([
            {
              type: 'text',
              text: 'Check this out!'
            },
            {
              "type": "flex",
              "altText": "Flex Message",
              "contents": {
                "type": "bubble",
                "hero": {
                  "type": "image",
                  "url": this.profile.pictureUrl,
                  "size": "full",
                  "aspectRatio": "1:1",
                  "aspectMode": "cover"
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": this.profile.displayName,
                      "weight": "bold",
                      "size": "xl",
                      "align": "center",
                      "margin": "md"
                    },
                    {
                      "type": "box",
                      "layout": "vertical",
                      "margin": "lg",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "box",
                          "layout": "baseline",
                          "spacing": "sm",
                          "contents": [
                            {
                              "type": "text",
                              "text": "User ID:",
                              "color": "#aaaaaa",
                              "size": "sm",
                              "flex": 2
                            },
                            {
                              "type": "text",
                              "text": this.profile.userId,
                              "wrap": true,
                              "color": "#666666",
                              "size": "sm",
                              "flex": 4
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            }
          ], options)
            .then(
              console.log("ShareTargetPicker was launched")
            ).catch(function (res) {
              console.log("Failed to launch ShareTargetPicker")
            })
        }

      } catch (error) {
        console.error('Error sharing message:', error);
        alert('Failed to share message.');
      }
    }
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.profile-card {
  max-width: 400px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
}

.profile-pic {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 20px;
}

.profile-name {
  font-size: 24px;
  margin: 0;
}

.profile-body {
  padding: 20px;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.profile-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: #555;
}

@media (max-width: 600px) {
  .profile-card {
    padding: 10px;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-pic {
    margin: 0 0 10px 0;
  }

  .profile-name {
    font-size: 20px;
  }
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  background-color: #00c300;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #009e00;
}
</style>