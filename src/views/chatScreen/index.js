import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { io } from "socket.io-client";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity, RefreshControl } from 'react-native';
import { StyledSafeAreaView, StyledScrollView, StyledInputView, StyledInput, StyledUserChatView, StyledUserChatViewText, StyledClock, StyledMyChatView, StyledMyChatViewText } from './style';
import { API } from '../../constants/apiConstant';

export function ChatScreen() {
    const socket = io(API.baseUrls[API.currentEnv] + API.noAuthUrls.postSocket);
    const scrollViewRef = useRef();
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [inputValue, setInputValue] = useState('')

    const onLeave = () => {
        socket.emit('close', (error) => {
            console.warn(socket.id);
        });
    }

    useEffect(() => {
        const my_id = 'my';
        const user_id = 'user';
        const room = 'room';

        socket.emit('join', 'application'+my_id, (error) => {
            console.warn(socket.id);
        });
        return onLeave
    }, [])

    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true })
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {
            setRefreshing(false);
        });
    }, []);

    return (
        <StyledSafeAreaView>
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <StyledMyChatView>
                    <StyledMyChatViewText>hihihihihihihihihihihihihisfdfsdbfhskdbfjhsdfjhsdvfjhsdvj</StyledMyChatViewText>
                    <StyledClock style={{ right: 0 }}>2.30pm</StyledClock>
                </StyledMyChatView>
                <StyledUserChatView>
                    <StyledUserChatViewText>hihihihihihih</StyledUserChatViewText>
                    <StyledClock style={{ left: 0 }}>2.30pm</StyledClock>
                </StyledUserChatView>
                <StyledMyChatView>
                    <StyledMyChatViewText>hihihihihihihihihihihihihisfdfsdbfhskdbfjhsdfjhsdvfjhsdvj</StyledMyChatViewText>
                    <StyledClock style={{ right: 0 }}>2.30pm</StyledClock>
                </StyledMyChatView>
                <StyledUserChatView>
                    <StyledUserChatViewText>hihihihihihih</StyledUserChatViewText>
                    <StyledClock style={{ left: 0 }}>2.30pm</StyledClock>
                </StyledUserChatView>
                <StyledMyChatView>
                    <StyledMyChatViewText>hihihihihihihihihihihihihisfdfsdbfhskdbfjhsdfjhsdvfjhsdvj</StyledMyChatViewText>
                    <StyledClock style={{ right: 0 }}>2.30pm</StyledClock>
                </StyledMyChatView>
                <StyledUserChatView>
                    <StyledUserChatViewText>{inputValue}</StyledUserChatViewText>
                    <StyledClock style={{ left: 0 }}>2.30pm</StyledClock>
                </StyledUserChatView>
            </StyledScrollView>
            <StyledInputView>
                <View style={{ width: '85%' }}>
                    <StyledInput ele='input' styleView={{
                        backgroundColor: colors.backgroundDeepColor,
                        borderBottomWidth: 0
                    }}
                        value={inputValue}
                        onInputChange={(val => setInputValue(val))}
                    />
                </View>
                <TouchableOpacity>
                    <Ionicons name='send' size={30} style={{ color: colors.mainColor, marginLeft: 20, marginTop: -15 }} />
                </TouchableOpacity>
            </StyledInputView>
        </StyledSafeAreaView>
    )
}
export default ChatScreen;