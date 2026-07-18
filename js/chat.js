const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const messages = document.getElementById("messages");

sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) return;

    messageInput.value = "";
    messageInput.focus();

    sendBtn.disabled = true;

    messages.insertAdjacentHTML("beforeend", `
        <div class="message user-message">
            ${message}
        </div>
    `);

    messages.insertAdjacentHTML("beforeend", `
        <div class="message ai-message" id="thinking">
            Sha is thinking...
        </div>
    `);

    messages.scrollTop = messages.scrollHeight;

    try {

        const data = await chat(message);

        const thinking = document.getElementById("thinking");

        thinking.textContent = data.response;
        thinking.removeAttribute("id");

    } catch (error) {

        console.error(error);

        const thinking = document.getElementById("thinking");

        thinking.textContent = "Unable to connect to Sha.";
        thinking.removeAttribute("id");

    } finally {

        sendBtn.disabled = false;
        messages.scrollTop = messages.scrollHeight;

    }

}