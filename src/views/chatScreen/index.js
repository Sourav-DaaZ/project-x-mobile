import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { io } from "socket.io-client";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';
import { StyledSafeAreaView, StyledScrollView, StyledInputView, StyledInput, StyledUserChatView, StyledUserChatViewText, StyledClock, StyledMyChatView, StyledMyChatViewText } from './style';
import { API } from '../../constants/apiConstant';
import { timeFormat } from '../../utils';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate, loader } from '../../store/actions';
export function ChatScreen(props) {
    const scrollViewRef = useRef();
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [inputValue, setInputValue] = useState('');
    const [chats, setChats] = useState([]);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const socket = io(API.baseUrls[API.currentEnv] + API.noAuthUrls.postSocket);
    const my_id = '61f1b96a60a42d2d13c92db2';

    const onLeave = () => {
        socket.emit('close', props.route.params.id, (error) => {
            console.warn(error);
        });
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            const room = props.route.params.id;

            socket.emit('join', room, ((data) => {
                if (data.error) {
                    console.warn(data.error);
                }
                setChats(data.data);
            }));
        })
        return () => { unsubscribe; onLeave() }
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

    useEffect(() => {
        socket.on('receivedMessage', (data) => {
            console.warn(data)
            const varChat = [...chats, data.data]
            setChats(varChat);
            setInputValue('');
            scrollViewRef.current.scrollToEnd({ animated: true })
        });
    }, [socket]);

    const changeInput = () => {
        const room = props.route.params.id;
        socket.emit('sendMessage', room, detailsStore.id, inputValue, (data) => {
            if (data?.error) {
                console.warn(data.error);
            }
            const varChat = [...chats, data.data]
            setChats(varChat);
            setInputValue('');
            scrollViewRef.current.scrollToEnd({ animated: true })
        });
    }

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
                {chats.map((x, i) => (
                    x?.user === detailsStore.id ? <StyledMyChatView key={i}>
                        <StyledMyChatViewText>{x.msg}</StyledMyChatViewText>
                        <StyledClock style={{ right: 0 }}>{timeFormat(x.time)}</StyledClock>
                    </StyledMyChatView> : <StyledUserChatView key={i}>
                        <StyledUserChatViewText>{x.msg}</StyledUserChatViewText>
                        <StyledClock style={{ left: 0 }}>{timeFormat(x.time)}</StyledClock>
                    </StyledUserChatView>
                ))}
            </StyledScrollView>
            <StyledInputView>
                <View style={{ width: '85%' }}>
                    <StyledInput ele='input' styleView={{
                        backgroundColor: colors.mainColor,
                        borderBottomWidth: 0
                    }}
                        value={inputValue}
                        onInputChange={(val) => setInputValue(val)}
                    />
                </View>
                <TouchableOpacity onPress={changeInput}>
                    <Ionicons name='send' size={30} style={{ color: colors.mainByColor, marginLeft: 20, marginTop: 10 }} />
                </TouchableOpacity>
            </StyledInputView>
        </StyledSafeAreaView>
    )
}
export default ChatScreen;