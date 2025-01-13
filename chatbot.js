document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const typingIndicator = document.getElementById('typing-indicator');

    function addMessage(message, isUser) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`;
        bubble.innerHTML = `
            ${message}
            <span class="timestamp">${new Date().toLocaleTimeString()}</span>
        `;
        chatWindow.appendChild(bubble);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function simulateAIResponse(userMessage) {
        typingIndicator.classList.remove('hidden');
        typingIndicator.innerHTML = '<div class="thinking-icon"></div> AI is thinking...';
        
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
            const responses = [
                "That's an interesting point. Can you tell me more?",
                "I understand. Here's what I think about that...",
                "Based on what you've said, I would suggest...",
                "That's a great question. Let me find some information for you."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, false);
        }, 2000);
    }

    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            simulateAIResponse(message);
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});
