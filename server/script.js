async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  const chatBox = document.getElementById("chat-box");
  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.textContent = userInput;
  chatBox.appendChild(userMessage);

  document.getElementById("user-input").value = "";

  try {
    const response = await axios.post("http://localhost:3000/api/chat", { message: userInput }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    const responseLines = response.data.response.split('\n').map(line => line.replace(/\*/g, ''));

    // Iterate over each line and append it as a separate paragraph if it's not empty
    responseLines.forEach(line => {
      if (line.trim()) {
        const aiMessage = document.createElement("div");
        aiMessage.className = "message ai-message";
        aiMessage.textContent = line;
        chatBox.appendChild(aiMessage);
      }
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
