import React, { useContext, useEffect, useState } from 'react';
import {
    Avatar,
    Divider,
    FAB,
    Menu
} from 'react-native-paper';
import {
    StyledProfileView,
    StyledTitle,
    StyledParagraph,
    StyledCenter,
    StyledReviewProfile,
    StyledImage,
    StyledScrollView,
    StyledContainer,
    StyledButtonActive,
    StyledTouchableOpacity,
    StyledButtonView,
    StyledViewButton,
    StyledInputView,
    StyledInput,
    StyledNotesView,
    StyledStatus,
    StyledPopupWrapper,
    CardWrapper,
    StyledDotIcon,
    ImageWrapper
} from './style';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';
import Review from './review';

import Routes from '../../../constants/routeConst';
import OutsideAuthApi from '../../../services/outSideAuth';
import Loader from '../../../sharedComponents/loader';
import { BottomShadow, ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Booking from './booking';
import Modal from '../../../sharedComponents/modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import defaultValue from '../../../constants/defaultValue';
import ListItem from '../../../sharedComponents/listItem';
import { dateFormat, timeFormat } from '../../../utils';
import InsideAuthApi from '../../../services/inSideAuth';

const ProfileScreen = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const dispatch = useDispatch();
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const [data, setData] = useState([]);
    const [popupData, setPopupData] = useState({});
    const [showLoader, setShowLoader] = useState(true);
    const [globalPost, setGlobalPost] = useState('booking');
    const [modalShow, setModalShow] = useState(true);
    const [addNotes, setAddNotes] = useState('');
    const [showNotes, setShowNotes] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        OutsideAuthApi()
            .userDetailsApi(`?user_id=${props.route.params?.id}`)
            .then((res) => {
                setShowLoader(false);
                setData(res.data);
            })
            .catch((err) => {
                setShowLoader(false);
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }))
            });
    }, [])

    const GlobalButton = (select, text, onPress) => (
        select ? <StyledButtonActive labelStyle={{ color: colors.backgroundColor }} mode='contained' onPress={onPress}>{text}</StyledButtonActive> : <StyledTouchableOpacity onPress={onPress}><StyledButtonView>{text}</StyledButtonView></StyledTouchableOpacity>
    )

    const onEdit = (id, status, note) => {
        const requestData = {
            id: id,
            ...status && { status: status },
            ...note && { note: note },
        }
        InsideAuthApi(authStore)
            .editBookinggApi(requestData)
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
        showLoader ? <Loader /> : <ShadowWrapperContainer none>
            <StyledScrollView
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}>
                <React.Fragment>
                    <ImageWrapper>
                        <StyledImage>
                            <Avatar.Image
                                source={{
                                    uri:
                                        data.images ? data.images : 'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
                                }}
                                size={120}
                            />
                        </StyledImage>
                    </ImageWrapper>
                    <StyledProfileView>
                        <StyledTitle>{data?.name}</StyledTitle>
                        {data?.category?.category_name ? <StyledParagraph>{data?.category?.category_name + (data?.subCategory ? ` (${data?.subCategory})` : '')}</StyledParagraph> : null}
                        {data?.contactAddress ? <StyledParagraph>{data.contactAddress}</StyledParagraph> : null}
                        {data?.contactNumber ? <StyledParagraph>Phone: {data.contactNumber}</StyledParagraph> : null}
                    </StyledProfileView>
                    <StyledReviewProfile>
                        <StyledCenter>
                            <FontAwesome style={{ color: colors.mainColor }} name='facebook-square' size={30} />
                        </StyledCenter>
                        <StyledCenter>
                            <FontAwesome style={{ color: colors.mainColor }} name='instagram' size={30} />
                        </StyledCenter>
                        {props.route.params?.id && props.route.params.id !== detailsStore.id ? <StyledCenter>
                            <TouchableOpacity onPress={() => props.navigation.navigate(Routes.userChat, { id: props.route.params.id })}>
                                <Fontisto style={{ color: colors.mainColor }} name='messenger' size={30} />
                            </TouchableOpacity>
                        </StyledCenter> : null}
                    </StyledReviewProfile>
                </React.Fragment>
                <StyledContainer>
                    <BottomShadow>
                        <StyledViewButton>
                            {GlobalButton(globalPost === 'booking', 'Booking', () => setGlobalPost('booking'))}
                            {GlobalButton(globalPost === 'review', 'Review', () => setGlobalPost('review'))}
                        </StyledViewButton>
                    </BottomShadow>
                    {globalPost === 'booking' ? <Booking {...props} colors={colors} myUser={data.user === detailsStore.id} userId={props.route.params?.id} setPopupData={setPopupData} setModalShow={setModalShow} modalShow={modalShow} /> : null}
                    {globalPost === 'review' ? <Review {...props} colors={colors} myUser={data.user === detailsStore.id} userId={props.route.params?.id} setPopupData={setPopupData} setModalShow={setModalShow} modalShow={modalShow} /> : null}
                </StyledContainer>
            </StyledScrollView>
            {props.route.params && props.route.params.id !== detailsStore.id ? <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 30,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label={globalPost === 'booking' ? 'Book' : globalPost === 'review' ? 'Review' : ''}
                onPress={() => { globalPost === 'booking' ? props.navigation.navigate(Routes.createBooking, { id: data.user }) : globalPost === 'review' ? props.navigation.navigate(Routes.createReview, { id: data.user }) : null }}
            /> : null}
            {popupData._id && globalPost === 'booking' ? <Modal show={modalShow} onClose={onClose}>
                <CardWrapper>
                    <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(popupData.startDate) + (popupData.endDate ? ' - ' + dateFormat(popupData.endDate) : '') + (popupData.reportTime ? ' (' + timeFormat(popupData.reportTime) + ')' : '')} />
                    {detailsStore.id?.toString() === popupData.sender_id?.toString() ? <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={<TouchableOpacity onPress={() => setShowMenu(true)}><StyledDotIcon name='dots-three-vertical' size={25} /></TouchableOpacity>}
                    >
                        <Menu.Item onPress={() => {
                            props.navigation.navigate(Routes.editBooking, { data: popupData });
                            onClose();
                        }} title="Edit Booking" />
                        <Divider />
                    </Menu> : null}
                </CardWrapper>
                <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} title={popupData.description ? popupData.description : ''} />
                <StyledPopupWrapper>
                    <Menu
                        visible={showStatusMenu}
                        onDismiss={() => setShowStatusMenu(false)}
                        anchor={<TouchableOpacity onPress={() => setShowStatusMenu(true)}>
                            <StyledStatus>
                                <StyledParagraph>{popupData.status ? "status: " + popupData.status[popupData.status.length - 1] : null}</StyledParagraph>
                                <StyledParagraph>{popupData.status?.map((y, i) => y + (i !== popupData.status.length - 1 ? " -> " : ""))}</StyledParagraph>
                            </StyledStatus>
                        </TouchableOpacity>}
                    >
                        {defaultValue.bookingStatus.map((y, i) => detailsStore.id?.toString() === popupData.sender_id?.toString() && (i === 0 || i === 3) ? <React.Fragment key={i}>
                            <Menu.Item onPress={() => {
                                onEdit(popupData._id, y);
                                setShowStatusMenu(false);
                            }} title={y} />
                            <Divider />
                        </React.Fragment> : detailsStore.id?.toString() === popupData.user_id?.toString() && (i === 1 || i === 2) ? <React.Fragment key={i}>
                            <Menu.Item onPress={() => {
                                onEdit(popupData._id, y);
                                setShowStatusMenu(false);
                            }} title={y} />
                            <Divider />
                        </React.Fragment> : null)}
                    </Menu>
                </StyledPopupWrapper>
                <StyledNotesView>
                    <TouchableOpacity onPress={() => setShowNotes(!showNotes)}><StyledParagraph style={{ textAlign: 'center', color: colors.mainByColor }}>{showNotes ? "Hide" : "Show"} Notes</StyledParagraph></TouchableOpacity>
                    {showNotes && popupData.notes?.map((y, i) => <StyledParagraph key={i} map={i}>{detailsStore.id === y.user ? 'Me' : 'User'}: {y.msg}</StyledParagraph>)}
                </StyledNotesView>
                <StyledInputView>
                    <StyledInput onFocus={() => setAddNotes('')} onInputChange={(val) => setAddNotes(val)} value={addNotes} styleView={{
                        borderBottomWidth: 0,
                        backgroundColor: colors.mainColor,
                        width: "90%"
                    }} ele='input' editable={(detailsStore.id?.toString() === popupData.sender_id?.toString()) || (detailsStore.id?.toString() === popupData.user_id?.toString())} placeholder='Please add a note' />
                    {(detailsStore.id?.toString() === popupData.sender_id?.toString()) || (detailsStore.id?.toString() === popupData.user_id?.toString()) ? <TouchableOpacity onPress={() => onEdit(popupData._id, null, addNotes)}>
                        <Ionicons name='send' size={30} style={{ color: colors.mainByColor, marginLeft: 20 }} />
                    </TouchableOpacity> : null}
                </StyledInputView>
            </Modal> : null}
            {popupData._id && globalPost === 'review' ? <Modal show={modalShow} onClose={onClose}>
                <CardWrapper>
                    <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(popupData.createdAt)} />
                    {detailsStore.id?.toString() === popupData.sender_id?.toString() ? <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={<TouchableOpacity onPress={() => setShowMenu(true)}><StyledDotIcon name='dots-three-vertical' size={25} /></TouchableOpacity>}
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
                    <StyledInput onFocus={() => setAddNotes('')} onInputChange={(val) => setAddNotes(val)} value={addNotes} styleView={{
                        borderBottomWidth: 0,
                        backgroundColor: colors.mainColor,
                        width: "90%"
                    }} ele='input' editable={(detailsStore.id?.toString() === popupData.sender_id?.toString()) || (detailsStore.id?.toString() === popupData.receiver_id?.toString())} placeholder='Please add a comment' />
                    {detailsStore.id?.toString() === popupData.sender_id?.toString() || detailsStore.id?.toString() === popupData.receiver_id?.toString() ? <TouchableOpacity onPress={() => onReviewEdit(popupData._id, addNotes)}>
                        <Ionicons name='send' size={30} style={{ color: colors.mainByColor, marginLeft: 20 }} />
                    </TouchableOpacity> : null}
                </StyledInputView>
            </Modal> : null}
        </ShadowWrapperContainer>
    )
}
export default ProfileScreen;