import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { io } from "socket.io-client";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity, RefreshControl, Text, KeyboardAvoidingView, Platform } from 'react-native';
import {
    StyledSafeAreaView,
    StyledScrollView,
    StyledInputView,
    StyledInput,
    StyledUserChatView,
    StyledUserChatViewText,
    StyledClock,
    StyledMyChatView,
    StyledMyChatViewText,
    StyledButtonLoadMore,
    StyledTimeView,
    WrapperView,
    HeaderText
} from './style';
import { API } from '../../../constants/apiConstant';
import { timeFormat, dateFormat } from '../../../utils';
import { useSelector, shallowEqual } from 'react-redux';
import { BottomShadow } from '../../../sharedComponents/bottomShadow';
import { CustomHeader } from '../../../routes/custom';
import defaultValue from '../../../constants/defaultValue';

const TagChat = (props) => {
    const scrollViewRef = useRef();
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [inputValue, setInputValue] = useState('');
    const [chats, setChats] = useState([]);
    const [dataLoader, setDataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const socket = io(API.baseUrls[API.currentEnv] + API.noAuthUrls.tagSocket);

    const onLeave = () => {
        socket.emit('close', props.route.params.id, (error) => {
            console.warn(error);
            socket.disconnect();
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
        const room = props.route.params.id;
        socket.emit('loadData', room, page, ((data) => {
            if (data.error) {
                console.warn(data.error);
            }
            if (data.data && page > 0) {
                let varData = data.data;
                varData = varData.concat(chats)
                setChats(varData);
            } else {
                setChats(data.data);
            }
            if (data.data && data.data.length < defaultValue.paginationLength) {
                setDataLoader(false)
            }
        }));
    }, [page])

    socket.on('receivedMessage', (data) => {
        if (data?.data?.user !== detailsStore.id) {
            let varChat = chats;
            let varChats = varChat.concat(data.data);
            setChats(varChats);
            setInputValue('');
            scrollViewRef.current?.scrollToEnd({ animated: true })
        }
    });

    const changeInput = () => {
        if (inputValue.trim().length > 0) {
            const room = props.route.params.id;
            socket.emit('sendMessage', room, detailsStore.id, inputValue, (data) => {
                if (data?.error) {
                    console.warn(data.error);
                }
                let varChat = chats;
                varChat = varChat.concat(data.data)
                setChats(varChat);
                setInputValue('');
                scrollViewRef.current.scrollToEnd({ animated: true })
            });
        }
    }

    return (
        <StyledSafeAreaView>
            <BottomShadow>
                <CustomHeader
                    left={<Ionicons name="chevron-back" color={colors.iconColor} size={30} onPress={() => props.navigation.goBack()} />}
                    logo={<HeaderText>{props.route.params?.name}</HeaderText>}
                />
            </BottomShadow>
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={() => setPage(page + 1)}>Load More</StyledButtonLoadMore> : null}
                {chats?.map((x, i) => (
                    <WrapperView key={i}>
                        {i === 0 && x.time ? <StyledTimeView>{dateFormat(x.time, undefined)}</StyledTimeView> : dateFormat(x.time, chats[i - 1].time) ? <StyledTimeView>{dateFormat(x.time, chats[i - 1].time)}</StyledTimeView> : null}
                        {x?.user === detailsStore.id ? <StyledMyChatView>
                            <StyledMyChatViewText>{x.msg}</StyledMyChatViewText>
                            <StyledClock style={{ right: 0 }}>{timeFormat(x.time)}</StyledClock>
                        </StyledMyChatView> : <StyledUserChatView>
                            <StyledUserChatViewText>{x.msg}</StyledUserChatViewText>
                            <StyledClock style={{ left: 0 }}>{timeFormat(x.time)}</StyledClock>
                        </StyledUserChatView>}
                    </WrapperView>
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
export default TagChat;