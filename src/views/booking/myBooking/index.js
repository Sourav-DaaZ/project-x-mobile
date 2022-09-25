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
            {popupData._id ? <Modal show={modalShow} notes={popupData?.notes} onEdit={() => onEdit(popupData._id, null, addNotes)} popupData={popupData} onClose={onClose} setAddNotes={setAddNotes} addNotes={addNotes} editable={(detailsStore.id?.toString() === popupData.sender_id?.toString()) || (detailsStore.id?.toString() === popupData.user_id?.toString())}>
                <CardWrapper>
                    <ListItem topStyle={{ maxWidth: '90%' }} description={dateFormat(popupData.startDate) + ' (' + timeFormat(popupData.startDate) + ')' + (popupData.endDate ? ' - ' + dateFormat(popupData.endDate) + ' (' + timeFormat(popupData.endDate) + ')' : '')} />
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
                        <Menu.Item onPress={() => {
                            props.navigation.navigate(Routes.createReview, { data: popupData, booking_id: popupData._id, id: popupData.sender_id });
                            onClose();
                        }} title="Review" />
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
            </Modal> : null}
        </ShadowWrapperContainer>
    )
}
export default MyBooking;