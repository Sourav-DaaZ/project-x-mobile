import React, { useContext, useState, useRef, useEffect, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import { io } from "socket.io-client";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity } from 'react-native';
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
    HeaderText,
    StyledSmallImage,
    StyledRemove,
    StyledImage
} from './style';
import { API } from '../../../constants/apiConstant';
import { timeFormat, dateFormat, apiEncryptionData, apiDecryptionData, truncate } from '../../../utils';
import { useSelector, shallowEqual } from 'react-redux';
import { BottomShadow, ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import { CustomHeader } from '../../../routes/custom';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePreview from '../../../sharedComponents/imagePreview';
import OutsideAuthApi from '../../../services/outSideAuth';
import ListItem from '../../../sharedComponents/listItem';
import { Avatar } from 'react-native-paper';
import Routes from '../../../constants/routeConst';

const UserChat = (props) => {
    const scrollViewRef = useRef();
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [inputValue, setInputValue] = useState('');
    const [chats, setChats] = useState([]);
    const [data, setData] = useState([]);
    const [newChat, setNewChat] = useState({});
    const [dataLoader, setDataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [image, setImage] = useState('');
    const [loader, setLoader] = useState(false);
    const [newChatloader, setNewChatloader] = useState(false);
    const [show, setShow] = useState('');
    const socket = io(API.baseUrls[API.currentEnv] + API.noAuthUrls.ChatSocket, {
        transports: ['websocket'],
        upgrade: false,
        // forceNew: true,
    });

    const onLeave = () => {
        const varParam = {
            users: [detailsStore.id, props.route.params.id]
        }
        socket.emit('close', varParam, (error) => {
            console.warn(error);
            socket.disconnect();
        });
    }

    useEffect(() => {
        const varParam = {
            users: [detailsStore.id, (props.route.params?.id ? props.route.params.id : '')]
        }
        socket.emit('join', varParam, ((qData) => {
            const data = apiDecryptionData(qData);
            if (data.error) {
                console.warn(data.error);
            }
            setPage(data.data?.lastPage ? data.data.lastPage : 0);
            setChats(data.data?.data ? data.data.data : []);
            if (data.data && data.data.lastPage <= 0) {
                setDataLoader(false);
            }
            scrollViewRef.current?.scrollToEnd({ animated: true })
        }));
        return () => { onLeave() }
    }, [])

    useEffect(() => {
        OutsideAuthApi()
            .userDetailsApi(`?user_id=${props.route.params?.id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }))
            });
    }, [])

    useMemo(() => {
        if (newChat?.time) {
            const varData = newChat;
            let varChat = chats;
            varChat.push(varData);
            setChats(varChat);
            setNewChatloader(false);
        }
        scrollViewRef.current?.scrollToEnd({ animated: true })
    }, [newChat])

    const onChangePage = () => {
        const vPage = page;
        const varParam = apiEncryptionData({
            users: [detailsStore.id, (props.route.params?.id ? props.route.params.id : '')],
            page: vPage
        })
        socket.emit('loadData', varParam, ((qData) => {
            const data = apiDecryptionData(qData);
            if (data.error) {
                console.warn(data.error);
            }
            if (data.data && data.data.data && vPage > 0) {
                let varData = data.data.data;
                varData = varData.concat(chats)
                setChats(varData);
                setPage(data.data?.lastPage ? data.data.lastPage : 0);
            } else {
                setChats(data.data?.data ? data.data.data : []);
                setPage(data.data?.lastPage ? data.data.lastPage : 0);
            }
            if (data.data && data.data.lastPage <= 0) {
                setDataLoader(false)
            }
        }));
    }

    const changeInput = () => {
        setLoader(true);
        const varParam = apiEncryptionData({
            users: [detailsStore.id, (props.route.params?.id ? props.route.params.id : '')],
            msg: inputValue,
            image: image,
            my_id: detailsStore.id,
            user_id: props.route.params?.id ? props.route.params.id : ''
        })
        socket.emit('sendMessage', varParam, (qData) => {
            const data = apiDecryptionData(qData);
            if (data?.error) {
                console.error(data.error);
            }
            if (data?.success) {
                setImage('');
                setInputValue('');
            }
            setLoader(false);
        });
    }

    const uploadImg = async () => {
        const options = {
            includeBase64: true,
            maxWidth: 500,
            maxHeight: 500,
            quality: .5,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        try {
            const result = await launchImageLibrary(options);
            setImage('data:image/png;base64,' + result.assets[0].base64);
        } catch (e) {
            console.log(e)
        }
    }

    socket.on('receivedMessage', (qData) => {
        setNewChatloader(true);
        const data = apiDecryptionData(qData);
        setNewChat(data.data);
    });

    const chatUI = (x, i, load) => {
        return (<WrapperView key={i}>
            {i === 0 && x.time ? <StyledTimeView>{dateFormat(x.time, undefined)}</StyledTimeView> : dateFormat(x.time, chats[i - 1]?.time) ? <StyledTimeView>{dateFormat(x.time, chats[i - 1]?.time)}</StyledTimeView> : null}
            {x?.user === detailsStore.id ? <StyledMyChatView>
                {x.image ? <TouchableOpacity onPress={() => setShow(x.image)}>
                    <StyledImage source={{ uri: x.image }} />
                </TouchableOpacity> : null}
                <StyledMyChatViewText>{x.msg}</StyledMyChatViewText>
                <StyledClock style={{ right: 0 }}>{timeFormat(x.time)}</StyledClock>
            </StyledMyChatView> : <StyledUserChatView>
                {x.image ? <TouchableOpacity onPress={() => setShow(x.image)}>
                    <StyledImage source={{ uri: x.image }} />
                </TouchableOpacity> : null}
                <StyledUserChatViewText>{x.msg}</StyledUserChatViewText>
                <StyledClock style={{ left: 0 }}>{timeFormat(x.time)}</StyledClock>
            </StyledUserChatView>}
            {load && i === load ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text'>Loading</StyledButtonLoadMore> : null}
        </WrapperView>)
    }

    return (
        <StyledSafeAreaView>
            <BottomShadow>
                <CustomHeader
                    left={
                        <React.Fragment>
                            <Ionicons name="chevron-back" color={colors.iconColor} size={spacing.width * 10} onPress={() => props.navigation.goBack()} />
                            {props.route.params?.id ? <TouchableOpacity onPress={() => props.navigation.navigate(Routes.profile, { id: props.route.params.id ? props.route.params.id : '' })}>
                                <ListItem
                                    topStyle={{ marginBottom: 0, paddingTop: 0, paddingBottom: 0, marginLeft: spacing.width }}
                                    title={truncate(data.name)}
                                    image={<Avatar.Image style={{ margin: spacing.width }} size={spacing.width * 12} source={{ uri: data.images ? data.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png' }} />}
                                />
                            </TouchableOpacity> : null}
                        </React.Fragment>}
                />
            </BottomShadow>
            <StyledScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}>
                <ShadowWrapperContainer none>
                    {dataLoader ? <StyledButtonLoadMore labelStyle={{ color: colors.mainByColor }} mode='text' onPress={onChangePage}>Load More</StyledButtonLoadMore> : null}
                    {newChatloader ? chats?.map((x, i) => chatUI(x, i, chats.length - 1)) : chats?.map((x, i) => chatUI(x, i))}
                </ShadowWrapperContainer>
            </StyledScrollView>
            <StyledInputView>
                {image !== '' ? <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <StyledSmallImage source={{ uri: image }} />
                    <TouchableOpacity onPress={() => setImage('')}>
                        <StyledRemove labelStyle={{ color: colors.mainByColor }} mode='text'>Remove</StyledRemove>
                    </TouchableOpacity>
                </View> : null}
                <View style={{ width: '85%' }}>
                    <StyledInput ele='input' styleView={{
                        backgroundColor: colors.mainColor,
                        borderBottomWidth: 0
                    }}
                        value={inputValue}
                        onInputChange={(val) => setInputValue(val)}
                    />
                </View>
                {(inputValue !== '' || image !== '') ? <TouchableOpacity onPress={!loader ? changeInput : null} style={{ width: '15%', opacity: loader ? .5 : 1 }}>
                    <Ionicons name='send' size={spacing.width * 11} style={{ color: colors.mainByColor, marginLeft: spacing.width * 2, marginTop: spacing.height }} />
                </TouchableOpacity> : <TouchableOpacity onPress={!loader ? uploadImg : null} style={{ width: '15%', opacity: loader ? .5 : 1 }}>
                    <Ionicons name='md-add-circle-sharp' size={spacing.width * 11} style={{ color: colors.mainByColor, marginLeft: spacing.width * 2, marginTop: spacing.height }} />
                </TouchableOpacity>}
            </StyledInputView>
            <ImagePreview show={show !== ''} images={[{ url: show }]} setShowFalse={() => setShow('')} />
        </StyledSafeAreaView>
    )
}
export default UserChat;