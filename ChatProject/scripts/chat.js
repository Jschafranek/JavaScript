//adding new chat docs
//setting up a real-time listener to get new chats
//update the username
//update the room

class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message){
        //format a chat object to send to firebase
        const now = new Date(); //storing the timestamp
        const chat = { //created the object needed to make new doc in chats collection
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save to chat docs
        const response = await this.chats.add(chat);  //adds to firebase db
        return response;
    }

    getChats(callback){
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    //update the ui
                    callback(change.doc.data());
                }
            });
        });
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
         this.unsub();
        }
    }
}


