// const chatInput = document.querySelector('.chat-input textarea')
// const sendChatBtn = document.querySelector('.chat-input span')
// const chatbox = document.querySelector('.chatbox')



// let userMessage;
// const API_KEY = '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';

// const creatChatLi = (message, className)=>{
//     // Create a chat <li> element with passed messge and className
//     const chatLi = document.createElement('li');
//     chatLi.classList.add('chat', className);
//     let chatContent = className === "outgoing" ? `<p>${message}</p>`: `<span class="material-symbols-outlined">smart_toy</span>`
//     chatLi.innerHTML = chatContent
//     return chatLi
// }

// const generateResponse =(incomingChatli)=>{
//     const API_URL = "https://api.openai.com/v1/chat/completions";
//     const messageElement = incomingChatli.querySelector('p')

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${API_KEY}`
//         },
//         body: JSON.stringify({
// model: 'gpt-3.5-turbo',
// message: [{role: 'user', content: userMessage}]
//         }) 
//     }

//     // Send Post request to API, get Response
//     fetch(API_KEY, requestOptions).then(res => res.json()).then(data=>{
//       messageElement.textContent = data.choices[0].message.content.trim();
//     }).catch((error)=>{
//             messageElement.textContent = "Ooops! something went wrong. Please try again."
//     })
// }

// const handleChat = ()=>{
//     userMessage = chatInput.value.trim();
//     if(!userMessage) return;


//     // Append the users message to the chatbox
//     chatbox.appendChild(creatChatLi(userMessage, 'outgoing'));

//     setTimeout(()=>{
//         // Display the Processing meaasge while waiting for the response 
//     const incomingChatli = creatChatLi('Processing...', 'incoming')
//         chatbox.appendChild(incomingChatli)
//         generateResponse(incomingChatli);
//     },600)
// }

// sendChatBtn.addEventListener('click', handleChat);

// '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Processing...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));