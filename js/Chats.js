class Chats {
  constructor() {
    this.urlData = "https://e3c50991-d92a-41c4-8db2-37243165f197.mock.pstmn.io/chats";
  }

  async fetchChats() {
    const response = await fetch( `${this.urlData}` );
    const responseData = await response.json();
    return responseData;
  }
}