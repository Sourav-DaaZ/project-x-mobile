import React, { useContext, useState } from 'react';
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
    const [showNotes, setShowNotes] = useState(false);
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

    const onClose = () => {
        setModalShow(false);
        setPopupData({});
        setShowNotes(false);
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
            <Review {...props} colors={colors} userId={props.route.params?.id} isFocused={isFocused} globalPost={globalPost} setPopupData={setPopupData} setModalShow={setModalShow} modalShow={modalShow} />
            {popupData._id ? <Modal show={modalShow} onClose={onClose}>
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
                <StyledNotesView>
                    <TouchableOpacity onPress={() => setShowNotes(!showNotes)}>
                        <StyledParagraph style={{ textAlign: 'center', color: colors.mainByColor }}>{showNotes ? "Hide" : "Show"} Notes</StyledParagraph>
                    </TouchableOpacity>
                    {showNotes && popupData.comment?.map((y, i) => <StyledParagraph key={i} map={i}>{detailsStore.id === y.user ? 'Me' : 'User'}: {y.msg}</StyledParagraph>)}
                </StyledNotesView>
                <StyledInputView>
                    <View style={{ width: "85%" }}>
                        <StyledInput onFocus={() => setAddNotes('')} onInputChange={(val) => setAddNotes(val)} value={addNotes} styleView={{
                            borderBottomWidth: 0,
                            backgroundColor: colors.mainColor,
                        }} ele='input' editable={(detailsStore.id?.toString() === popupData.sender_id?.toString()) || (detailsStore.id?.toString() === popupData.receiver_id?.toString())} placeholder='Please add a comment' />
                    </View>
                    {detailsStore.id?.toString() === popupData.sender_id?.toString() || detailsStore.id?.toString() === popupData.receiver_id?.toString() ? <TouchableOpacity style={{ width: '15%' }} onPress={() => onReviewEdit(popupData._id, addNotes)}>
                        <Ionicons name='send' size={spacing.width * 9} style={{ color: colors.mainByColor, marginLeft: spacing.width * 4 }} />
                    </TouchableOpacity> : null}
                </StyledInputView>
            </Modal> : null}
        </ShadowWrapperContainer>
    )
}
export default MyReview;