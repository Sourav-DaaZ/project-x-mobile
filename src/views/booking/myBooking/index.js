import React, { useContext, useState } from 'react';
import {
    Divider,
    Menu
} from 'react-native-paper';
import {
    StyledParagraph,
    StyledScrollView,
    StyledContainer,
    StyledViewButton,
    StyledInputView,
    StyledInput,
    StyledNotesView,
    StyledStatus,
    StyledPopupWrapper,
    CardWrapper,
    StyledDotIcon,
} from './style';
import { ThemeContext } from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { snackbarUpdate } from '../../../store/actions';

import Routes from '../../../constants/routeConst';
import { BottomShadow, ShadowWrapperContainer } from '../../../sharedComponents/bottomShadow';
import Booking from './booking';
import Modal from '../../../sharedComponents/modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import defaultValue from '../../../constants/defaultValue';
import ListItem from '../../../sharedComponents/listItem';
import { dateFormat, timeFormat } from '../../../utils';
import InsideAuthApi from '../../../services/inSideAuth';
import Tabs from '../../../sharedComponents/tab';

const MyBooking = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const spacing = themeContext.spacing;
    const dispatch = useDispatch();
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const [popupData, setPopupData] = useState({});
    const [globalPost, setGlobalPost] = useState('booking');
    const [modalShow, setModalShow] = useState(true);
    const [addNotes, setAddNotes] = useState('');
    const [showNotes, setShowNotes] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

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

    const onClose = () => {
        setModalShow(false);
        setPopupData({});
        setShowNotes(false);
    }

    return (
        <ShadowWrapperContainer none {...props}>
            <StyledScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StyledContainer>
                    {authStore.access_token && authStore.access_token !== '' ? <BottomShadow>
                        <StyledViewButton>
                            <Tabs select={globalPost === 'booking'} text='Booking' onPress={() => setGlobalPost('booking')} />
                            <Tabs select={globalPost === 'past_booking'} text='Past Booking' onPress={() => setGlobalPost('past_booking')} />
                        </StyledViewButton>
                    </BottomShadow> : null}
                    <Booking {...props} userId={props.route.params?.id} bookingType={globalPost === 'past_booking'} setPopupData={setPopupData} setModalShow={setModalShow} modalShow={modalShow} />
                </StyledContainer>
            </StyledScrollView>
            {popupData._id ? <Modal show={modalShow} onClose={onClose}>
                <CardWrapper>
                    <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(popupData.startDate) + (popupData.endDate ? ' - ' + dateFormat(popupData.endDate) : '') + (popupData.reportTime ? ' (' + timeFormat(popupData.reportTime) + ')' : '')} />
                    {detailsStore.id?.toString() === popupData.sender_id?.toString() ? <Menu
                        visible={showMenu}
                        onDismiss={() => setShowMenu(false)}
                        anchor={<TouchableOpacity onPress={() => setShowMenu(true)}><StyledDotIcon name='dots-three-vertical' size={spacing.width * 4} /></TouchableOpacity>}
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
                    <View style={{ width: "85%" }}>
                        <StyledInput onFocus={() => setAddNotes('')} onInputChange={(val) => setAddNotes(val)} value={addNotes} styleView={{
                            borderBottomWidth: 0,
                            backgroundColor: colors.mainColor,
                        }} ele='input' editable={(detailsStore.id?.toString() === popupData.sender_id?.toString()) || (detailsStore.id?.toString() === popupData.user_id?.toString())} placeholder='Please add a note' />
                    </View>
                    {(detailsStore.id?.toString() === popupData.sender_id?.toString()) || (detailsStore.id?.toString() === popupData.user_id?.toString()) ? <TouchableOpacity style={{ width: '15%' }} onPress={() => onEdit(popupData._id, null, addNotes)}>
                        <Ionicons name='send' size={spacing.width * 9} style={{ color: colors.mainByColor, marginLeft: spacing.width * 4 }} />
                    </TouchableOpacity> : null}
                </StyledInputView>
            </Modal> : null}
        </ShadowWrapperContainer>
    )
}
export default MyBooking;