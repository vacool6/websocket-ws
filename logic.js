const sendBtn = document.querySelector("#send");
const messages = document.querySelector("#messages");
const messageBox = document.querySelector("#inputBox");

let ws;

function showMessage(message) {
  if (message instanceof Blob) {
    reader = new FileReader();
    reader.readAsText(message);
    reader.onload = () => {
      messages.textContent += `\n> ${reader.result}`;
    };
  } else {
    messages.textContent += `\n> ${message}`;
  }

  messages.scrollTop = messages.scrollHeight;
  messageBox.value = "";
}

function init() {
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  ws = new WebSocket("ws://localhost:8080");
  ws.onopen = () => {
    console.log("Connection opened!");
  };
  ws.onmessage = ({ data }) => showMessage(data);
  ws.onclose = function () {
    ws = null;
  };
}

sendBtn.onclick = function () {
  if (!ws) {
    showMessage("No WebSocket connection :(");
    return;
  }

  ws.send(messageBox.value);
  showMessage(messageBox.value);
};

init();
