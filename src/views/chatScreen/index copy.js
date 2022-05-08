import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, InputToolbar, Bubble, Send, LeftAction, ChatInput, SendButton } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, KeyboardAvoidingView } from 'react-native'
export function ChatScreen() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 23131212,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'Hello developers',
                createdAt: new Date(),
                user: {
                    _id: 231312312,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const customtInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                placeholder="Type your message here..."
                containerStyle={{
                    margin: 5,
                    marginHorizontal: 15,
                    paddingLeft: 5,
                    borderColor: 'grey',
                    borderTopWidth: 0,
                    borderRadius: 20
                }}
                textInputStyle={{ color: "green" }}
            />
        );
    };

    const customtView = props => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'yellow',
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: 'red',
                    },
                }}
                timeTextStyle={{
                    right: { color: 'red' }
                }}

            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <Ionicons
                    name="send"
                    style={{
                        fontSize: 25,
                        color: '#3A97F9',
                        marginBottom: 8
                    }}
                />
            </Send>
        );
    }

    return (
        <GiftedChat
            messages={messages}
            listViewProps={{
                style: {
                    backgroundColor: 'white',
                    marginBottom: 40,
                    padding: 10,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    shadowColor: "black",
                    shadowOffset: { width: 9, height: 9 },
                    shadowOpacity: 0.9,
                    // shadowRadius: 3,
                },
            }}
            onSend={messages => onSend(messages)}
            renderInputToolbar={props => customtInputToolbar(props)}
            renderSend={renderSend}
            alwaysShowSend={true}
            renderBubble={(props) => customtView(props)}
            // onLoadEarlier
            user={{
                _id: 5,
            }}
        />
    )
}
export default ChatScreen;