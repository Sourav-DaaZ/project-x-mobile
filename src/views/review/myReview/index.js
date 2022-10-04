import React, { useContext, useEffect, useState } from 'react';
import {
    Divider,
    Menu
} from 'react-native-paper';
import {
    StyledParagraph,
    StyledInputView,
    StyledInput,
    StyledNotesView,
    StyledStatus,
    StyledPopupWrapper,
    CardWrapper,
    StyledDotIcon,
    StyledViewButton
} from './style';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import Review from './review';

import Routes from '../../../constants/routeConst';
import Modal from '../../../sharedComponents/modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import ListItem from '../../../sharedComponents/listItem';
import { dateFormat } from '../../../utils';
import InsideAuthApi from '../../../services/inSideAuth';
import { BottomShadow, ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Tabs from '../../../sharedComponents/tab';
import { useIsFocused } from '@react-navigation/native';
import OutsideAuthApi from '../../../services/outSideAuth';

const MyReview = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const [popupData, setPopupData] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [addNotes, setAddNotes] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [globalPost, setGlobalPost] = useState('public');


    const onReviewEdit = (id, note) => {
        const requestData = {
            id: id,
            comment: note,
        }
        InsideAuthApi(authStore)
            .editReviewApi(requestData)
            .then((res) => {
                if (res.data) {
                    setPopupData(res.data);
                }
                setAddNotes('');
            })
            .catch((err) => {
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }))
            })
    }

    useEffect(() => {
        const requestData = {
            id: props.route.params?.id,
        }
        if (props.route.params?.id) {
            OutsideAuthApi()
                .findreviewById(requestData)
                .then((res) => {
                    if (res.data) {
                        setPopupData(res.data);
                        setModalShow(true);
                    }
                    setAddNotes('');
                })
                .catch((err) => {
                    dispatch(snackbarUpdate({
                        type: 'error',
                        msg: err?.message ? err.message : ''
                    }))
                })
        }
    }, [])

    const onClose = () => {
        setModalShow(false);
        setPopupData({});
    }

    return (
        <ShadowWrapperContainer none {...props}>
            <BottomShadow>
                <StyledViewButton>
                    <Tabs select={globalPost === "public"} text='Public' onPress={() => setGlobalPost('public')} />
                    <Tabs select={globalPost === "private"} text='Private' onPress={() => setGlobalPost('private')} />
                    <Tabs select={globalPost === "myReview"} text='My Review' onPress={() => setGlobalPost('myReview')} />
                </StyledViewButton>
            </BottomShadow>
            <Review {...props} colors={colors} isFocused={isFocused} globalPost={globalPost} setPopupData={setPopupData} setModalShow={setModalShow} modalShow={modalShow} />
            {popupData._id ? <Modal show={modalShow} notes={popupData?.comment} onEdit={() => onReviewEdit(popupData._id, addNotes)} popupData={popupData} onClose={onClose} setAddNotes={setAddNotes} addNotes={addNotes} editable={detailsStore.id?.toString() === popupData.sender_id?.toString() || detailsStore.id?.toString() === popupData.receiver_id?.toString()}>
                <CardWrapper>
                    <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(popupData.createdAt)} />
                    {detailsStore.id?.toString() === popupData.sender_id?.toString() ? <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={<TouchableOpacity onPress={() => setShowMenu(true)}><StyledDotIcon name='dots-three-vertical' size={spacing.width * 4} /></TouchableOpacity>}
                    >
                        <Menu.Item onPress={() => {
                            props.navigation.navigate(Routes.editReview, { data: popupData });
                            onClose();
                        }} title="Edit Review" />
                        <Divider />
                    </Menu> : null}
                </CardWrapper>
                <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} title={popupData.description ? popupData.description : ''} />
                <StyledPopupWrapper>
                    <StyledStatus>
                        <StyledParagraph>{popupData.status ? "status: " + popupData.status[popupData.status.length - 1] : null}</StyledParagraph>
                        <StyledParagraph>{popupData.status?.map((y, i) => y + (i !== popupData.status.length - 1 ? " -> " : ""))}</StyledParagraph>
                    </StyledStatus>
                </StyledPopupWrapper>
            </Modal> : null}
        </ShadowWrapperContainer>
    )
}
export default MyReview;