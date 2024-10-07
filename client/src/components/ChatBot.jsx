import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { onGoogleLogoutSuccess } from "../utils/googleOAuth";
import { googleClientId } from "../utils/util";

const ChatBot = () => {
    const { state } = useLocation();
    const [chatHistory, setChatHistory] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [streamingAnswer, setStreamingAnswer] = useState("");
    const chatContainerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/chat/${state.data.userId}`);
                if (response.data.chatExist === true) {
                    setChatHistory(response.data.chatHistory);
                }
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };

        fetchChatHistory();
    }, []);

    const handleSendQuestion = async () => {
        if (!currentQuestion.trim()) return;

        try {
            const newChatEntry = { question: currentQuestion, answer: "" };
            setChatHistory((prev) => [...prev, newChatEntry]);

            setCurrentQuestion("");
            setStreamingAnswer("");
            const response = await axios.post(`http://localhost:3001/chat/create/${state.data.userId}`, { question: newChatEntry.question });
            const fullAnswer = response.data.answer;

            let words = fullAnswer.split(" ");
            words.forEach((word, index) => {
                setTimeout(() => {
                    setStreamingAnswer((prev) => prev + (index > 0 ? " " : "") + word);
                }, 200 * index);
            });

            setTimeout(() => {
                setChatHistory((prev) => {
                    let updatedHistory = [...prev];
                    updatedHistory[updatedHistory.length - 1].answer = fullAnswer;
                    return updatedHistory;
                });
                setStreamingAnswer("");
            }, 200 * words.length);
        } catch (error) {
            console.error("Error sending question:", error);
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, streamingAnswer]);

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-200">
            <div className="bg-gray-100 text-white px-10 py-3 flex justify-between items-center shadow-md">
                <h2 className="text-lg text-black">Welcome, {state?.data?.firstName} {state?.data?.lastName}!</h2>
                {state.data?.googleId ?
                    (<div>
                        <GoogleLogout
                            clientId={googleClientId}
                            buttonText="Logout"
                            onLogoutSuccess={(res) => onGoogleLogoutSuccess(navigate)}
                            className="flex justify-center w-full rounded-sm px-4 py-2 text-white bg-red-600 hover:bg-red-700 transition-colors"
                        />
                    </div>)
                    :
                    (<button
                        onClick={handleLogout}
                        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>)

                }
            </div>

            <div className="p-5 flex justify-center items-center">
                <div className="w-full h-full bg-gray-100 shadow-lg rounded-lg p-4 flex flex-col" style={{ maxWidth: "800px", maxHeight: "90vh" }}>
                    <div className="text-center mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">AI Assistant</h1>
                        <p className="text-gray-600">Ask me anything and I'll try my best to respond.</p>
                    </div>

                    <div
                        className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg"
                        style={{ height: "60vh" }}
                        ref={chatContainerRef}
                    >
                        {chatHistory.length === 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-500 text-xl">Ask me anything!</p>
                            </div>
                        ) : (
                            chatHistory.map((chat, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-end">
                                        <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs text-right shadow-md">
                                            {chat.question}
                                        </div>
                                    </div>
                                    <div className="flex justify-start mt-2">
                                        <div className="bg-gray-300 text-black p-3 rounded-lg max-w-xs text-left shadow-md">
                                            {index === chatHistory.length - 1 && streamingAnswer
                                                ? streamingAnswer
                                                : chat.answer}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex">
                        <input
                            type="text"
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            placeholder="Type your question..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendQuestion();
                                }
                            }}
                            className="flex-grow p-2 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={() => handleSendQuestion()}
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
                        >
                            Send
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChatBot;
