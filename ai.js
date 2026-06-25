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
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    addUserMessage(text);

    input.value = "";

    typingAnimation();

    try {

        const reply = await askAI(text);

        removeTyping();

        addAIMessage(reply);

    } catch (error) {

        removeTyping();

        addAIMessage("❌ Sorry! AI is unavailable right now.");

        console.error(error);

    }

}

async function askAI(message) {

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message
        })
    });

    if (!response.ok) {
        throw new Error("Server Error");
    }

    const data = await response.json();

    return data.reply;

}

function addUserMessage(text) {

    chatBox.innerHTML += `
        <div class="user-message">
            <div class="message">${text}</div>
        </div>
    `;

    scrollBottom();

}

function addAIMessage(text) {

    chatBox.innerHTML += `
        <div class="ai-message">
            <div class="avatar">🤖</div>
            <div class="message">${text}</div>
        </div>
    `;

    scrollBottom();

}

function typingAnimation() {

    chatBox.innerHTML += `
        <div class="ai-message" id="typing">
            <div class="avatar">🤖</div>
            <div class="message">Typing...</div>
        </div>
    `;

    scrollBottom();

}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) typing.remove();

}

function scrollBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;

}