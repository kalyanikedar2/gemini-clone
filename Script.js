// const typingForm = document.querySelector(".typing-form");
// const chatList = document.querySelector(".chat-list");
// const inputField = document.querySelector(".typing-input");

// // ✅ REPLACE this with your API key
// const API_KEY = "AIzaSyBdxN5HKrESRG8iCJE_VNQxQ6NDKTUxBvk";
// const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// // Create a message element
// const createMessageElement = (content, type) => {
//     const div = document.createElement("div");
//     div.classList.add("message", type);
//     div.innerHTML = content;
//     return div;
// };

// // Typing effect for Gemini response
// const showTypingEffect = (element, text, i = 0) => {
//     if (i < text.length) {
//         element.innerHTML += text.charAt(i);
//         setTimeout(() => showTypingEffect(element, text, i + 1), 15);
//     }
// };

// // Generate Gemini API response
// const generateAPIResponse = async(incomingMessageDiv, userMessage) => {
//     const textElement = incomingMessageDiv.querySelector(".text");

//     try {
//         const response = await fetch(`${API_URL}?key=${API_KEY}`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 contents: [{ role: "user", parts: [{ text: userMessage }] }]
//             })
//         });

//         const data = await response.json();
//         const apiResponse = data ? .candidates ? .[0] ? .content ? .parts ? .[0] ? .text || "⚠️ No response from Gemini.";
//         incomingMessageDiv.classList.remove("loading");
//         showTypingEffect(textElement, apiResponse);
//     } catch (error) {
//         console.error(error);
//         textElement.innerText = "⚠️ Error fetching Gemini response.";
//         incomingMessageDiv.classList.remove("loading");
//     }
// };

// // Loading animation
// const showLoadingAnimation = (userMessage) => {
//     const html = `
//     <div class="message-content">
//       <img src="gemini.png" alt="Gemini" class="avatar">
//       <p class="text"></p>
//     </div>
//     <div class="loading-indicator">
//       <div class="loading-bar"></div>
//       <div class="loading-bar"></div>
//       <div class="loading-bar"></div>
//     </div>`;

//     const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
//     chatList.appendChild(incomingMessageDiv);
//     chatList.scrollTop = chatList.scrollHeight;

//     generateAPIResponse(incomingMessageDiv, userMessage);
// };

// // Handle user message
// const handleOutgoingChat = (e) => {
//     e.preventDefault();
//     const userMessage = inputField.value.trim();
//     if (!userMessage) return;

//     const html = `
//     <div class="message-content">
//       <img src="user.jpg" alt="User" class="avatar">
//       <p class="text">${userMessage}</p>
//     </div>`;

//     const outgoingMessageDiv = createMessageElement(html, "outgoing");
//     chatList.appendChild(outgoingMessageDiv);

//     inputField.value = "";
//     chatList.scrollTop = chatList.scrollHeight;

//     setTimeout(() => showLoadingAnimation(userMessage), 600);
// };

// typingForm.addEventListener("submit", handleOutgoingChat);

const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const inputField = document.querySelector(".typing-input");

// ✅ Replace this with your valid Gemini API key
const API_KEY = "AIzaSyBdxN5HKrESRG8iCJE_VNQxQ6NDKTUxBvk";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Create chat message container
const createMessageElement = (content, type) => {
    const div = document.createElement("div");
    div.classList.add("message", type);
    div.innerHTML = content;
    return div;
};

// Typing animation for Gemini text
const showTypingEffect = (element, text, i = 0) => {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => showTypingEffect(element, text, i + 1), 15);
    }
};

// Generate Gemini API response
const generateAPIResponse = async(incomingMessageDiv, userMessage) => {
    const textElement = incomingMessageDiv.querySelector(".text");

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: userMessage }] }],
            }),
        });

        const data = await response.json();
        console.log(data);

        const apiResponse = data ? .candidates ? .[0] ? .content ? .parts ? .[0] ? .text || "⚠️ No response from Gemini.";

        // Remove loading animation
        incomingMessageDiv.classList.remove("loading");
        const loader = incomingMessageDiv.querySelector(".loading-indicator");
        if (loader) loader.remove();

        // Type out Gemini’s response
        showTypingEffect(textElement, apiResponse);
    } catch (error) {
        console.error(error);
        textElement.innerText = "⚠️ Error fetching Gemini response.";
    }
};

// Show loading animation while waiting for API
const showLoadingAnimation = (userMessage) => {
    const html = `
    <div class="message-content">
        <img src="gemini.png" alt="Gemini" class="avatar">
        <p class="text"></p>
    </div>
    <div class="loading-indicator">
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
        <div class="loading-bar"></div>
    </div>`;

    const incomingMessageDiv = createMessageElement(html, "incoming");
    incomingMessageDiv.classList.add("loading");
    chatList.appendChild(incomingMessageDiv);
    chatList.scrollTop = chatList.scrollHeight;

    generateAPIResponse(incomingMessageDiv, userMessage);
};

// Handle user message submission
const handleOutgoingChat = (e) => {
    e.preventDefault();
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    const html = `
    <div class="message-content">
        <img src="user.jpg" alt="User" class="avatar">
        <p class="text">${userMessage}</p>
    </div>`;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    chatList.appendChild(outgoingMessageDiv);
    inputField.value = "";
    chatList.scrollTop = chatList.scrollHeight;

    // Simulate a slight delay before Gemini response
    setTimeout(() => showLoadingAnimation(userMessage), 600);
};

typingForm.addEventListener("submit", handleOutgoingChat);