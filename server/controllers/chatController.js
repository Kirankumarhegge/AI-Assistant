let logI = "-- INFO -- CHAT SERVICE :: ";
let logE = "-- ERROR -- CHAT SERVICE :: ";
const { chat } = require("../schema/chatSchema.js");
const { openai } = require("../utils/openAi.js");


const getChat = async (req, res) => {
    try{
        let userChatHistory = await chat.find(
            { pk: req.params.userId, sk: "CHAT" }, 
            { question: 1, answer: 1, createdAt: 1, _id: 0 }
        );
        
        if(userChatHistory){
            userChatHistory = userChatHistory.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            res.status(200).json({ chatExist : true, chatHistory : userChatHistory });
        }
        else{
            res.status(200).json({ chatExist : false });
        }
    }
    catch(err){
        console.log(logE, "Check chat :: ", JSON.stringify(err.message));
        return res.status(404).json({ message: err.message });
    }
}


const createChat = async (req, res) => {
    try{
        console.log(logI, "create Chat :: ", req.body);

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { 
                    role: "system", 
                    content: [{
                        "type": "text",
                        "text": `You are a helpful assistant and only respond in plain text with single paragraph and try to keep response with in 50 to 100 tokens.
                        exmaple: user - is js async or sync
                        output - JavaScript is asynchronous. Though most of the core API is synchronous, it's designed to allow host environments to provide their own asynchronous APIs, which you see with things like addEventListener, fetch, fs, etc. Being the language of the web, js needs to be asynchronous to be able to support things like button events. It probably wouldn't be very useful otherwise.
                                The only core API which is inherently asynchronous is the Promise API. Anything awaited or in a then() callback is always executed asynchronously. Core JavaScript also has no concept of the progression of time. APIs dealing with time (setTimeout, requestAnimationFrame, etc.) are provided by the host environment (though that will technically soon change with proposed Atomics.waitAsync which supports a timeout argument).
                        `
                    }] 
                },
                {
                    role: "user",
                    content: [{
                        "type": "text",
                        "text": req.body.question
                    }]
                },
            ],
            max_tokens: 100,
            temperature: 0
        });

        let chatDetails = {
            pk : req.params.userId,
            userId : req.params.userId,
            question : req.body.question,
            answer : response.choices[0].message.content
        }
        
        await chat.create(chatDetails);

        res.status(200).json({ answer : response.choices[0].message.content, question : req.body.question });
    }
    catch(err){
        console.log(logE, "create Chat :: ", JSON.stringify(err.message));
        return res.status(404).json({ message: err.message });
    }
}


module.exports = {
    getChat,
    createChat
}