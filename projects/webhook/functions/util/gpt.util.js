const OpenAI = require("openai");
const context = require("../context/context");
const cache = require('../util/cache.util');

const openai = new OpenAI({
    apiKey: `${process.env.OPEN_AI_API_KEY}`
});

exports.openaiTextRequest = async (message,userId) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        user: userId,
        messages: [{ 
            role: "user",
            content: message, 
        }],
      });
    console.log(JSON.stringify(completion));
    return completion.choices[0].message.content;
}


// ตอบคำถามจาก Context ที่เตรียมไว้
exports.openaiTextRequestContext = async (message, userId) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        user: userId,
        messages: [{
            role: "user",
            content: `ตอบคำถามโดยการอ้างอิงจาก ข้อมูลรายการอาหารนี้เท่านั้น ${JSON.stringify(context.food())}`,
        }, {
            role: "user",
            content: message
        }],
    });
    return completion.choices[0].message.content;
}


exports.openaiImageRequest = async (message) => {
    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: message,
        size: "1024x1024"
    });
    return image.data[0].url;
}

exports.chatHistory = async (prompt, userId) => {

    const initialMessage = {
        role: "system",
        content: `กล่าวต้อนรับและ ตอบคำถามโดยอ้างอิงจากข้อมูลรายการอาหารนี้เท่านั้น ${JSON.stringify(context.food())}`,
    }
    let chatHistory = cache.getCache("cashe_chat_" + userId) || [initialMessage];


    chatHistory.push({ role: 'user', content: prompt });

    const result = {
        role: "system",
        content: `หากผู้ใช้งานพิมพ์ คิดเงิน ให้ตอบเป็น Format json ให้คล้ายตัวอย่งนี้ { "items": [ { "name": "ยำวุ้นเส้นทะเล", "price": 80 }, { "name": "ข้าวกล้องผัดกระเพราปลาทู", "price": 70 } ], "total": 150 } และหากพิมพ์ ชำระเงินแล้ว หรือ ขอบคุณ ให้กลับมาเป็น Format text เหมือนเดิมและ กล่าวลาให้ โอกาสหน้าได้กลับมาใช้บริการใหม่`,
    }
    chatHistory.push(result);

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        user: userId,
        messages: chatHistory
    });

    const reply = completion.choices[0].message.content

    chatHistory.push({ role: 'assistant', content: reply });

    cache.setCache("cashe_chat_" + userId,chatHistory,600)

    return reply
}

exports.openaiTextRequestDISC = async (message, userId) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        user: userId,
        messages: [{
            role: "system",
            content: "การวิเคราะห์แบบ DISC เป็นกระบวนการที่ใช้เพื่อทำความเข้าใจลักษณะพฤติกรรมและบุคลิกภาพของบุคคลตามโมเดล DISC ซึ่งแบ่งออกเป็นสี่ประเภทหลักคือ: Dominance (D) - คนประเภท D มักมีลักษณะเป็นผู้นำ ชอบควบคุมสถานการณ์ และรับผิดชอบในการตัดสินใจ พวกเขามักจะมุ่งมั่นและมีจุดมุ่งหมายที่ชัดเจนในการดำเนินงาน.Influence (I) - คนประเภท I เป็นผู้ที่มีความสนใจในการสร้างความสนุกและความมีชีวิตชีวา ชอบทำงานเป็นทีมและมีความสามารถในการสร้างความสัมพันธ์และเชื่อมโยงกับผู้คน.Steadiness (S) - คนประเภท S มีความมั่นคงและมั่นใจ ชอบงานที่มีความเป็นระเบียบและมีความสำคัญกับความเสถียรภาพ พวกเขามักจะเป็นคนใจเย็นและให้ความสำคัญกับความรู้สึกของผู้อื่น.Conscientiousness (C) - คนประเภท C เป็นคนที่มีความพิถีพิถันในการทำงาน ชอบความแม่นยำและการวิเคราะห์ข้อมูล พวกเขามักจะเน้นที่รายละเอียดและคุณภาพของงาน.การทำการวิเคราะห์แบบ DISC จะช่วยให้เราเข้าใจลักษณะทางพฤติกรรมของบุคคลในด้านต่างๆ ซึ่งสามารถนำไปใช้ในการพัฒนาทักษะการทำงานทีม การจัดการทรัพยากรบุคคล หรือการสร้างสภาพแวดล้อมทำงานที่เหมาะสมกับแต่ละบุคคลได้ดีขึ้น",
        }, {
            role: "system",
            content: "ตอบคำถามโดยอ้างอิงจากคำถามชุดนี้ นี้เท่านั้น\n" + JSON.stringify(context.disc),
        }, {
            role: "user",
            content: "จากคำตอบนี้ " + message + " ช่วยพิจารณาว่าฉันเป็นกลุ่มใดใน DISC Model โดยคำให้คำตอบที่โดดเด่นที่สุด 1 Model และ อยู่ในรูปแบบ JSON ตัวอย่าง โดยประกอบไปด้วย filed Model และ Description ตัวอย่างดังนี้ {\"model\":\"Dominance\",\"description\":\"คนประเภท D มักมีลักษณะเป็นผู้นำ ชอบควบคุมสถานการณ์ และรับผิดชอบในการตัดสินใจ พวกเขามักจะมุ่งมั่นและมีจุ"
        }],
    });
    return completion.choices[0].message.content;
}