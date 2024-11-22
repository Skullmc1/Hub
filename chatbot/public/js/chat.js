function getTimeString() {
    return new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const messagesContainer = document.getElementById('chat-messages');
    
    if (input.value.trim() === '') return;

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = input.value;
    userMessage.setAttribute('data-time', getTimeString());
    messagesContainer.appendChild(userMessage);

    const userInput = input.value;
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        // Add typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message';
        typingIndicator.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Make API call to our backend server
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userInput
            })
        });

        const data = await response.json();
        
        // Remove typing indicator
        messagesContainer.removeChild(typingIndicator);

        // Add bot response
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = data.candidates[0].content.parts[0].text;
        botMessage.setAttribute('data-time', getTimeString());
        messagesContainer.appendChild(botMessage);

    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message bot-message';
        errorMessage.textContent = 'Sorry, there was an error processing your request.';
        errorMessage.setAttribute('data-time', getTimeString());
        messagesContainer.appendChild(errorMessage);
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add input focus effect
const input = document.getElementById('user-input');
input.addEventListener('focus', () => {
    document.querySelector('.chat-input').style.backgroundColor = '#fff';
});

input.addEventListener('blur', () => {
    document.querySelector('.chat-input').style.backgroundColor = '#f8f9fa';
});

// Allow sending message with Enter key
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Mouse movement interaction with shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const factor = (index + 1) * 20;
        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});

// Optional: Add touch support for mobile devices
document.addEventListener('touchmove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.touches[0].clientX / window.innerWidth;
    const y = e.touches[0].clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const factor = (index + 1) * 10; // Reduced factor for mobile
        shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
}); 