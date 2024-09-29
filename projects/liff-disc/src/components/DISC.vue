<template>
    <div class="container mt-5">
        <h2>แบบสอบถาม DISC Model</h2>
        <div v-if="loading" class="loading-spinner">
            <!-- You can use a spinner component or a simple message -->
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <form v-else @submit.prevent="handleSubmit">
            <div v-for="(question, index) in questions" :key="index" class="mb-3">
                <label :for="'question-' + index" class="form-label">{{ question.text }}</label>
                <div v-for="(option, idx) in question.options" :key="idx" class="form-check">
                    <input :id="'question-' + index + '-option-' + idx" type="radio" v-model="responses[index]"
                        :value="option" class="form-check-input">
                    <label :for="'question-' + index + '-option-' + idx" class="form-check-label">{{ option }}</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import liff from "@line/liff";
export default {
    data() {
        return {
            loading: true,
            idToken: null,
            profile: null,
            questions: [
                {
                    "text": "1. ฉันมีความชอบในการเป็นผู้นำและจัดการงานในกลุ่ม",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "2. ฉันรู้สึกสนุกและมีพลังเมื่อได้ทำงานร่วมกับทีม",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "3. ฉันชอบทำงานตามขั้นตอนและให้ความสำคัญกับรายละเอียด",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "4. ฉันสามารถปรับตัวได้ง่ายเมื่อมีการเปลี่ยนแปลง",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "5. ฉันชอบแก้ปัญหาและตัดสินใจอย่างรวดเร็ว",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "6. ฉันชอบสร้างความสัมพันธ์ที่ดีกับคนอื่นและมีเพื่อนมากมาย",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "7. ฉันชอบงานที่ต้องใช้การวิเคราะห์และการคิดเชิงลึก",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "8. ฉันเป็นคนที่มีความมั่นคงและไม่ชอบการเปลี่ยนแปลงบ่อยๆ",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "9. ฉันชอบความท้าทายและการแข่งขัน",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "10. ฉันชอบการสื่อสารและการพูดคุยกับคนอื่น",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "11. ฉันมีความพิถีพิถันและใส่ใจในรายละเอียดของงานที่ทำ",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "12. ฉันเป็นคนที่มีความสงบและสามารถควบคุมอารมณ์ได้ดี",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "13. ฉันชอบควบคุมสถานการณ์และมีอำนาจในการตัดสินใจ",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "14. ฉันชอบสร้างบรรยากาศที่เป็นมิตรและสนุกสนานในที่ทำงาน",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "15. ฉันมักจะใส่ใจในรายละเอียดและคุณภาพของงานที่ทำ",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "16. ฉันเป็นคนที่ยืดหยุ่นและปรับตัวได้ง่าย",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "17. ฉันชอบที่จะเป็นผู้ริเริ่มและเริ่มต้นโครงการใหม่ๆ",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "18. ฉันให้ความสำคัญกับความสัมพันธ์และการทำงานร่วมกับคนอื่น",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "19. ฉันมักจะทำงานอย่างละเอียดและถูกต้อง",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                },
                {
                    "text": "20. ฉันชอบงานที่มีความมั่นคงและไม่เปลี่ยนแปลงบ่อย",
                    "options": ["ใช่", "บางครั้ง", "ไม่ใช่", "ไม่เคยเลย"]
                }
            ],
            responses: ["ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่", "ใช่",]
        };
    },

    beforeCreate() {
        liff.init({ liffId: "2006202163-1NG6bKV2" }, function (data) { })
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

                    this.idToken = await liff.getIDToken();
                    this.loading = false

                }
            })
        },
        async handleSubmit() {
            this.loading = true
            if (this.hasUnansweredQuestions()) {
                alert("กรุณาตอบคำถามให้ครบทุกข้อ");
                return;
            }
            const answerData = {
                answers: Array.from(this.responses),
            };
            try {
                const response = await axios.post(`http://localhost:5001/workshop-line-develoepr/asia-northeast1/gpt-createAnswerByUserId`,
                    answerData,
                    {
                        headers: {
                            Authorization: `${this.idToken}`,
                        },
                    }
                );
                if (liff.isInClient()) {
                    await liff.sendMessages([
                        {
                            type: "text",
                            text: "ฉันได้ประเมินเรียบร้อยแล้ว",
                        },
                    ]).then(() => {
                        liff.closeWindow()
                        this.loading = false

                    }).catch((err) => {
                        console.log("error", err);
                    });
                } else {
                    alert(`ผลที่ได้คือคุณเป็นกลุ่ม: ${response.data.model}`)
                    this.loading = false

                }

            } catch (error) {
                this.loading = false
                throw new Error(`handleSubmit: ${error}`);
            }

            // ทำการประมวลผลข้อมูลที่ได้จากแบบสอบถาม
        },
        hasUnansweredQuestions() {
            return this.responses.length < this.questions.length || this.responses.includes(undefined);
        }



    },
};
</script>

<style>
.error {
    color: red;
}
</style>