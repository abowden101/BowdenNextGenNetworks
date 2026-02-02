document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-msg');
    const chatDisplay = document.getElementById('chat-display');
    const message = userInput.value;

    if (!message) return;

    // Show user message
    chatDisplay.innerHTML += `<div class="user-bubble">${message}</div>`;
    userInput.value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        chatDisplay.innerHTML += `<div class="ai-bubble">${data.reply}</div>`;
    } catch (error) {
        chatDisplay.innerHTML += `<div class="ai-bubble error">SOC Connection Error.</div>`;
    }
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
});
