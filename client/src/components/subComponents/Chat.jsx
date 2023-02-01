import React from "react";

function Chat() {
    function hello(e) {
        e.preventDefault();
        // console.log('hello');
        window.open('https://chat.openai.com/chat', '_blank');
    }

    return (
        <div>
            <h1>Chat</h1>
            <form onSubmit={hello}>
                <button>chat</button>
            </form>
            
        </div>
    )
}


export default Chat;