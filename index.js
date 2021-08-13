let messages = [
  {
    text: "Hello My Ma - Happy Mother's Day to You!",
    timestamp: new Date("December 17, 1995 00:01:00"),
    iSentIt: true
  },

  {
    text: "Thank you sweet baby! Have you eaten?",
    timestamp: new Date(),
    iSentIt: false
  }
];
updateHTML();

function sendMessage(event) {
  event.preventDefault();
  const messageInput = document.getElementById("messageInput");
  messages.push({
    text: messageInput.value,
    iSentIt: true,
    timestamp: new Date()
  });

  console.log(printArray(messages));
  messageInput.value = "";
  updateHTML();

  generateIncomingMessage();
}

function printArray(arr) {
  return arr.map((message) => message.text).join(" | ");
}

function generateIncomingMessage() {
  messages.push({
    text: `typing response.. .`,
    iSentIt: false,
    timestamp: new Date()
  });

  updateHTML();

  const secondsToWait = Math.random() * 10;
  console.log(`Milliseconds until send: ${secondsToWait * 1000}`);
  setTimeout(function () {
    messages.splice(messages.length - 1, 1);
    console.log(printArray(messages));

    messages.push({
      text: "Computer generated response.",
      iSentIt: false,
      timestamp: new Date()
    });
    console.log(printArray(messages));

    updateHTML();
  }, secondsToWait * 1000);
}

//function formatDate(timestamp) {
// let hours = timestamp.getHours();
//  let minutes = timestamp.getMinutes();
//  let seconds = timestamp.getSeconds();
//  let isAm = true;
//  if (hours === 12) {
//    isAm = false;
//  } else if (hours === 0) {
//    isAm = true;
//  } else if (hours > 12) {
//    isAm = false;
//    hours -= 12;
//  }
//  if (minutes < 10) {
//    minutes = `0${minutes}`;
//  }
//  if (seconds < 10) {
//    seconds = `0${seconds}`;
//  }
//  return `${hours}:${minutes}:${seconds} ${isAm ? "am" : "pm"}`;
//}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }).format(timestamp);
}

function editMessage(index) {
  const newMessageText = window.prompt("What should the message state?");

  messages[index].text = newMessageText;
  updateHTML();
}

function deleteMessage(index) {
  if (
    window.confirm(
      "Are you positive you want to delete this - it'll be gone forever?!"
    )
  ) {
    messages.splice(index, 1);
    updateHTML();
  }
}

function updateHTML() {
  const messagesDiv = document.getElementById("messages");

  let htmlToUpdate = "";

  for (const [index, message] of messages.entries()) {
    if (message.iSentIt) {
      htmlToUpdate += `<div class="row message"><div class="col-2"></div>
      <div class="col-10 text-end">
      
      <div class="buttons">
      <a onclick="editMessage(${index})">EDIT</a> |
      <a onclick="deleteMessage(${index})">DELETE</a>
      </div>


      <img
      id="daughterImg"
      src="images/daughter.jpg"
      style="width: 10%"
      alt="daughter face"
    />


      <span class="messageText"
          >${message.text}</span
        >

        <div class="boundStamp">
       outgoing</div>

        <div class="timestamp">${formatDate(message.timestamp)}</div>
      </div>
    </div>`;
    } else {
      htmlToUpdate += `<div class="row message">
      <div class="col-10">
      
      
      <img
      id="momImg"
      src="images/mother.jpg"
      style="width: 10%"
      alt="mother profile"
    />

        <span style="font-style: ${
          message.text.includes("typing") ? "italic" : "normal"
        }" class="messageText userMessageText"
          >${message.text}</span
        >

        <div class="boundStamp">
       incoming</div>

        <div class="timestamp">${formatDate(message.timestamp)}</div>
      </div>
    </div>`;
    }
  }
  messagesDiv.innerHTML = htmlToUpdate;
}
