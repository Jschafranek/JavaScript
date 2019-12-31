//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateName = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new name
updateName.addEventListener('submit', e => {
    e.preventDefault();

    //update the username on the chatroom class
    const newName = updateName.name.value.trim();
    chatroom.updateName(newName);
    updateName.reset();

    //show then hide update message for username change
    updateMssg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMssg.innerText = '', 3000);
});

//update the chatroom
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

//check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';

//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));

});

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

//get chats and render
chatroom.getChats(data => chatUI.render(data));
