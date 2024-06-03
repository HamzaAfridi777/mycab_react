
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import DropdownMenu from "./DropdownMenu";

const Chat = ({ userRole }) => {
    const user_id = localStorage.getItem("user_id");
    const [messageInput, setMessageInput] = useState("");
    const [chatMessages, setChatMessages] = useState(
        JSON.parse(localStorage.getItem("chatMessages")) || []
    );

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
    }, [chatMessages]);

    const sendMessage = async () => {
        try {
            const authToken = localStorage.getItem("authToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await axios.post(
                "/api/send-messages",
                {
                    user_id: user_id,
                    message: messageInput,
                },
                config
            );

            const newMessage = {
                 chat_id: response.data.chat_id, // Get chat_id from response
                user_id: user_id,
                message: messageInput,
                timestamp: new Date().toLocaleString(),
                // user: response.data.user.name, // Assuming user object has a name field
                // image: response.data.user.image, // Assuming user object has an image field
                user: {
                    name: response.data.user.name, // Assuming user object has a name field
                    image: response.data.user.image, // Assuming user object has an image field
                },
            };
    
            console.log("New message:", newMessage); // Debugging line to check new message object

            setChatMessages([...chatMessages, newMessage]);
            setMessageInput("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const deleteChat = async (chat_id) => {
        try {
            console.log("Deleting chat with chatId:", chat_id);
            const authToken = localStorage.getItem("authToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const response = await axios.delete(
                `/api/delete-chat/${chat_id}`,
                config
            );

            if (response.data.success) {
                setChatMessages(
                    chatMessages.filter((msg) => msg.chat_id !== chat_id)
                );
            } else {
                console.error(
                    "Failed to delete chat message:",
                    response.data.message
                );
            }
        } catch (error) {
            console.error("Error deleting chat message:", error);
        }
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="box box-primary direct-chat direct-chat-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Direct Chat</h3>
                        <div className="box-tools pull-right">
                            <span
                                data-toggle="tooltip"
                                title="3 New Messages"
                                className="badge bg-light-blue"
                            >
                                3
                            </span>
                            <button
                                type="button"
                                className="btn btn-box-tool"
                                data-widget="collapse"
                            >
                                <i className="fa fa-minus"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-box-tool"
                                data-toggle="tooltip"
                                title="Contacts"
                                data-widget="chat-pane-toggle"
                            >
                                <i className="fa fa-comments"></i>
                            </button>
                            <button
                                type="button"
                                className="btn btn-box-tool"
                                data-widget="remove"
                            >
                                <i className="fa fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div className="box-body">
                        <div className="direct-chat-messages">
                            {chatMessages.map((msg, index) => (
                                <div className="direct-chat-msg" key={msg.chat_id}>
                                    <div className="direct-chat-info clearfix">
                                        <span className="direct-chat-name pull-left">
                                            {msg.user.name}
                                        </span>
                                        <span className="direct-chat-timestamp pull-right">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                    <img
                                    style={{ width: 25, height: 25 }}
                                    className="direct-chat-img"
                                    src={`${axios.defaults.baseURL}storage/images/${msg.user.image}`} // Assuming the image URL is relative
                                    alt="User Image"
                                    // onError={(e) => {
                                    //     console.error('Image failed to load:', e.target.src); // Debugging line for image errors
                                    //     e.target.src = 'http://127.0.0.1:8000/storage/images/default-user.png'; // Fallback image
                                    // }}
                                />
                                    <div className="direct-chat-text" style={{backgroundColor:"#90ee90",padding:1}}>
                                        {msg.message}
                                        <div
                                            className="dropdown"
                                            style={{
                                                position: "relative",
                                                display: "inline-block",
                                                float: "right",
                                                paddingLeft: "24px",
                                            }}
                                        >
                                            <button
                                                className="dropdown-toggle"
                                                type="button"
                                                id={`dropdownMenuButton${index}`}
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="fa fa-ellipsis-v"></i>
                                            </button>
                                            <DropdownMenu
                                                onDelete={() =>
                                                    deleteChat(msg.chat_id)
                                                }
                                                style={{
                                                    margin: "0px",
                                                    position: "relative",
                                                    zIndex: "1",
                                                    right: "0",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="box-footer">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage();
                            }}
                        >
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="message"
                                    placeholder="Type Message ..."
                                    className="form-control"
                                    value={messageInput}
                                    onChange={(e) =>
                                        setMessageInput(e.target.value)
                                    }
                                />
                                <span className="input-group-btn">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-flat"
                                    >
                                        Send
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;