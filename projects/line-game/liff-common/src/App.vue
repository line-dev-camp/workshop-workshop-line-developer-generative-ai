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

    <!-- ปุ่มสำหรับการแชร์และ แสกน qrcode-->
    <div class="button-group">
      <button v-if="isShowButton" @click="openQRCodeModule" class="btn">Scan QR</button>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
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
      error: "",
      idToken: null,
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

          this.idToken = liff.getIDToken();
          console.log(this.idToken);



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
    async openQRCodeModule() {
      if (this.isInClient) {
        await liff
          .scanCodeV2()
          .then(async (result) => {
            const response = await axios.post(import.meta.env.VITE_LIFF_API,
              result,
              {
                headers: {
                  Authorization: `${this.idToken}`,
                },
              }
            );
            await alert(response.data.message)
            // await liff.closeWindow();


          })
          .catch((error) => {
            console.log("error", error);
          });

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-name {
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
}

.profile-body {
  width: 100%;
  margin-top: 20px;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.btn {
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}
</style>