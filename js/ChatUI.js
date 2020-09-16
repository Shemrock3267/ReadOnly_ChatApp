class ChatUI { 
  constructor() { 
    this.list = document.querySelector('.conversation__list');
  }

   paintChatList(data) { 
     const paintMarkup = data.chats.map(el => {
       
       const liContainer = document.createElement('li');
       liContainer.classList = 'msg__container';
       
       liContainer.id = el.id;
       
       const author = document.createElement('span');
       author.classList = 'msg__author';
       author.innerText = el.partnerName;       
       
       const post = document.createElement('div');
       post.classList = 'msg__post';
       post.innerText = `${el.lastMessage.substring(0, 36)}...`;
       
       
       const time = document.createElement('span');
       time.classList = 'msg__time';
       const msgDate = new Date(el.timestamp * 1000);
       const formatter = new Intl.DateTimeFormat("UTC", {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric'
       })
       time.innerText = formatter.format(msgDate);
       
       const avatarContainer = document.createElement('span');
       avatarContainer.classList = 'msg__avatar-container';
       avatarContainer.innerHTML = `<img src=${el.avatar}>`;
       
       post.style.marginBottom = '10px';
       
       liContainer.style.width = 'auto';

       liContainer.appendChild(avatarContainer);
       liContainer.appendChild(author);
       liContainer.appendChild(post);
       liContainer.appendChild(time);
       this.list.appendChild(liContainer);
     });
     return paintMarkup;
  }
}