class WebsocketService {

    static instance = null;
    callbacks = {};


    static getInstance () {
        if(!WebsocketService.instance){
            WebsocketService.instance = new WebsocketService();
        }
        return WebsocketService.instance;
    }

    constructor () {
        this.socketRef = null;
    }

    connect(chatURL) {
        const path = `ws://127.0.0.1:8000/ws/chat/${chatURL}/`;
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log('websocket open');
        };
        // this.socketNewMessage(JSON.stringify({
        //     command: 'fetch_messages'
        // }))
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data)
        }
        this.socketRef.onerror = e => {
            console.log(e.message);
        }
        this.socketRef.onclose = () => {
            console.log('websocket closed');
            this.connect();
        }
    }

    disconnect() {
        console.log('in disconnect')
        this.socketRef.close();
    }

    socketNewMessage (data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if ( Object.keys(this.callbacks).length === 0 ) {
            return;
        }
        if ( command === 'messages' ) {
            this.callbacks[command](parsedData.messages);
        }
        if ( command === 'new_message' ) {
            this.callbacks[command](parsedData.message);
        }
    }

    fetchMessages(username, chatID) {
        this.sendMessage({
            command: 'fetch_messages',
            username: username,
            chatID: chatID
        });
    }

    newChatMessage(message) {
        this.sendMessage({
            command: 'new_message',
            from: message.from,
            message: message.content,
            chatID: message.chatID
        });
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage(data) {
        try{
            this.socketRef.send(JSON.stringify({ ...data }))
        }catch (error) {
            console.log(error.message)
        }
    }

    state() {
        return this.socketRef.readyState;
    }

    waitForSocketConnection(callback) {
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
            function() {
                if(socket.readyState === 1) {
                    console.log('connection is secure')
                    if(callback != null) {
                        callback();
                    }
                    return;
                } else {
                    console.log('waiting for connection')
                    recursion(callback)
                }
        }, 1);
    } 
}

const WebsocketInstance = WebsocketService.getInstance()

export default WebsocketInstance;