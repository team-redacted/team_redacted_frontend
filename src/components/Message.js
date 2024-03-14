import React from "react";

export default class Message extends React.Component {

    render() {
        const user = this.props.username;
        const message = this.props.content;
        const isSender = this.props.isSender;

        let clazz = "message";
        let del;
        if (isSender) {
            clazz += " sender";
            del =  (<div className='delete-button' onClick={this.props.deleteMessage}>x</div>);
        } else {
            clazz += " receiver";
        }

        return (
            <div className={clazz}>
                <div className='username'>
                    {user}
                </div>
                <div className='message-content'>
                    {message}
                </div>
               {del}
            </div>
        )
    }
};
