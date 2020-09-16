const dialogId = ['1', '2', '3', '4', '5'];
const clickDialog = [];

class Dialog {
  async fetchDialog(id) {
    const response = await fetch( `https://e3c50991-d92a-41c4-8db2-37243165f197.mock.pstmn.io/chats/c${id}`);
    const responseDialog = await response.json();
    return responseDialog;
  }

  clickDialogs() {
    for (let i = 0; i < dialogId.length; i++) {
      clickDialog[i] = document.getElementById(`${dialogId[i]}`);
      clickDialog[i].addEventListener('click', this.getDialog.bind(this, dialogId[i]));
    }
  }

  getDialog(id) {
    this.fetchDialog(id).then(data => this.sortDialog(data));
  }

  sortDialog(data) {
    const myMessages = this.sortMessages(data.myMessages);
    const partnerMessages = this.sortMessages(data.partnerMessages);
    for (let i = 0; i < myMessages.length && partnerMessages.length; i++) {
      if (myMessages[i]) {
        myMessages[i].author = 'me';
      }
      if (partnerMessages[i]) {
        partnerMessages[i].author = 'partner';
      }
    }
    const allMessages = [...myMessages, ...partnerMessages];
    const sortedMessages = this.sortMessages(allMessages);
    this.paintDialog(sortedMessages);
  }

  sortMessages(data) {
    let tmp = 0;
    for (let i = 0; i < data.length; i++) {
      for (let j = data.length - 1; j >= i + 1; j--) {
        if (data[j].timestamp < data[j-1].timestamp) {
          tmp = data[j];
          data[j] = data[j - 1];
          data[j-1] = tmp;
        }
      }
    }

    return data;
  }

  paintDialog(data) {
    const chatList = document.getElementById('chat__list');
    this.deleteOldMessages();
    for (let i = 0; i < data.length; i++) {
      const newDialog = document.createElement('li');
      const message = document.createElement('div');
      const messageTime = document.createElement('div');
      message.textContent = data[i]['message-text'];
      messageTime.textContent = data[i]['timestamp'];
      newDialog.className = 'msg__dialog';
      messageTime.className = 'message-time';
      message.className = 'message';

      const msgDate = new Date(messageTime.innerText * 1000).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
      messageTime.innerText = msgDate;

      if (data[i].author === 'me') {
        newDialog.style = `
          background-color:#06e2ffc4; 
          position: relative; 
          left: 45%;
        `;     
      }
      else if (data[i].author === 'partner') {
        newDialog.style = `
          background-color:#353333c4;          
        `;      
      }
      newDialog.appendChild(message);
      newDialog.appendChild(messageTime);
      chatList.appendChild(newDialog);
    }
  }
  
  deleteOldMessages() {
    const oldDialog = document.getElementsByClassName('msg__dialog');
    const chatList = document.getElementById('chat__list');
    while(oldDialog.length > 0) {
      chatList.removeChild(oldDialog[0]);
    }
  }
}