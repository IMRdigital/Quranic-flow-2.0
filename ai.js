const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Suggested question buttons
document.querySelectorAll(".suggestion").forEach(btn => {
    btn.addEventListener("click", () => {
        input.value = btn.innerText;
        sendMessage();
    });
});

// Send button
sendBtn.addEventListener("click", sendMessage);

// Enter key
input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});

function sendMessage(){

    const text = input.value.trim();

    if(text === "") return;

    addUserMessage(text);

    input.value = "";

    typingAnimation();

    setTimeout(()=>{
        removeTyping();

        addAIMessage(
            "🤖 AI integration is coming soon. Next step we will connect Google Gemini API so I can answer your Islamic questions."
        );

    },1500);

}

function addUserMessage(text){

    chatBox.innerHTML += `
        <div class="user-message">
            <div class="message">${text}</div>
        </div>
    `;

    scrollBottom();

}

function addAIMessage(text){

    chatBox.innerHTML += `
        <div class="ai-message">

            <div class="avatar">🤖</div>

            <div class="message">
                ${text}
            </div>

        </div>
    `;

    scrollBottom();

}

function typingAnimation(){

    chatBox.innerHTML += `
        <div class="ai-message" id="typing">

            <div class="avatar">🤖</div>

            <div class="message">
                Typing...
            </div>

        </div>
    `;

    scrollBottom();

}

function removeTyping(){

    const typing=document.getElementById("typing");

    if(typing){
        typing.remove();
    }

}

function scrollBottom(){

    chatBox.scrollTop = chatBox.scrollHeight;

}