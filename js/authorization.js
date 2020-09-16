class User {
  constructor(params) {
    this.login = params.login;
    this.password = params.password;
  }
  clickSignIn() {
    const buttonSignIn = document.getElementById('login__button');
    buttonSignIn.addEventListener('click', this.authorization.bind(this, this.login, this.password));
  }

  showChat() { 
    this.hideAuthorization();
    const containerChat = document.querySelector('.container__chat');
    containerChat.style.display = 'block';
  }

  hideAuthorization() { 
    const loginBox = document.getElementById('login_form');
    loginBox.style.display = 'none';
  }

  authorization() {
    const inputLogin = document.getElementById('username');
    const inputPassword = document.getElementById('password');
    const loginBox = document.getElementById('login_form');
    const login = inputLogin.value;
    const password = inputPassword.value;
    if (this.login === login && this.password === password) {
      this.showChat();
    } else {
      try {
        loginBox.removeChild(error);
      }
      catch {
        inputLogin.style.border = 'solid red 2px';
        inputPassword.style.border = 'solid red 2px';
        const error = document.createElement('p');
        error.id = 'error';
        error.style.color = 'red';
        error.textContent = 'Incorrect data entered';
        loginBox.appendChild(error);
      }
    }
  }
}

const admin = new User({login: 'admin', password: 'admin'});
admin.clickSignIn();