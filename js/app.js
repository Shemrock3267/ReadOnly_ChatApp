const chats = new Chats();
const chatsUI = new ChatUI();
const dialog = new Dialog();

async function getChats() { 
  await chats
    .fetchChats().then(data => chatsUI.paintChatList(data));
  
  dialog.clickDialogs();
}

getChats();