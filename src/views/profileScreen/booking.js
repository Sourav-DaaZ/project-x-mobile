import React, { useContext, useState, useEffect } from 'react';
import {
    StyledHorizontalScrollView,
    StyledViewButton,
    StyledButtonView,
    StyledButtonActive,
    StyledTouchableOpacity,
    CardWrapper,
    StyledParagraph,
    StyledInput,
    StyledStatus,
    StyledNotesView,
    StyledDotIcon,
    StyledInputView
} from './style';
import InsideAuthApi from '../../services/inSideAuth';
import Card from '../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';
import OutsideAuthApi from '../../services/outSideAuth';
import { BottomShadow } from '../../sharedComponents/bottomShadow';
import ListItem from '../../sharedComponents/listItem';
import Loader from '../../sharedComponents/loader';
import { ThemeContext } from 'styled-components';
import { Avatar, Divider, FAB, Menu } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { dateFormat, timeFormat } from '../../utils';
import Routes from '../../constants/routeConst';
import { TouchableOpacity, View } from 'react-native';
import defaultValue from '../../constants/defaultValue';

const Booking = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(-1);
    const [showNotes, setShowNotes] = useState(-1);
    const [showStatusMenu, setShowStatusMenu] = useState(-1);
    const [addNotes, setAddNotes] = useState('');


    const apiCall = () => {
        setData([]);
        setLoading(true);
        InsideAuthApi(authStore)
            .bookingListApi()
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err.message
                }));
                setLoading(false);
            });
    }

    useEffect(() => {
        apiCall()
    }, [])

    const onEdit = (id, status, note) => {
        const requestData = {
            id: id,
            ...status && { status: status },
            ...note && { note: note },
        }
        setLoading(true);
        InsideAuthApi(authStore)
            .editBookinggApi(requestData)
            .then((res) => {
                apiCall();
                setAddNotes('');
                setShowNotes(-1);
            })
            .catch((err) => {
                setLoading(false);
                dispatch(SnackbarUpdate({
                    type: 'error',
                    msg: err.message
                }))
            })
    }

    return (
        loading ? <Loader /> : <StyledHorizontalScrollView>
            {data.map((x, i) =>
                <Card
                    key={i}
                    profile={<CardWrapper>
                        <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} title={dateFormat(x.startDate) + (x.endDate ? ' - ' + dateFormat(x.endDate) : '') + (x.reportTime ? ' (' + timeFormat(x.reportTime) + ')' : '')} />
                        <Menu
                            visible={showMenu === i}
                            onDismiss={() => setShowMenu(-1)}
                            anchor={<TouchableOpacity onPress={() => setShowMenu(i)}><StyledDotIcon name='dots-three-vertical' size={25} /></TouchableOpacity>}
                        >
                            <Menu.Item onPress={() => {
                                props.navigation.navigate(Routes.editBooking, { data: x })
                                setShowMenu(-1);
                            }} title="Edit Booking" />
                            <Divider />
                        </Menu>
                    </CardWrapper>}
                    title={x.description ? x.description : ''}
                    extraContent={
                        <React.Fragment>
                            <Menu
                                visible={showStatusMenu === i}
                                onDismiss={() => setShowStatusMenu(-1)}
                                anchor={<TouchableOpacity onPress={() => setShowStatusMenu(i)}>
                                    <StyledStatus>
                                        <StyledParagraph>{x.status ? "status: " + x.status[x.status.length - 1] : null}</StyledParagraph>
                                        <StyledParagraph>{x.status?.map((y, i) => y + (i !== x.status.length - 1 ? " -> " : ""))}</StyledParagraph>
                                    </StyledStatus>
                                </TouchableOpacity>}
                            >
                                {defaultValue.bookingStatus.map((y, i) => detailsStore.id.toString() === x.sender_id.toString() && (i === 0 || i === 3) ? <React.Fragment key={i}>
                                    <Menu.Item onPress={() => {
                                        onEdit(x._id, y);
                                        setShowStatusMenu(-1);
                                    }} title={y} />
                                    <Divider />
                                </React.Fragment> : detailsStore.id.toString() === x.user_id.toString() && (i === 1 || i === 2) ? <React.Fragment key={i}>
                                    <Menu.Item onPress={() => {
                                        onEdit(x._id, y);
                                        setShowStatusMenu(-1);
                                    }} title={y} />
                                    <Divider />
                                </React.Fragment> : null)}
                            </Menu>
                            <StyledNotesView>
                                <TouchableOpacity onPress={() => setShowNotes(showNotes === i ? -1 : i)}><StyledParagraph style={{ textAlign: 'center', color: colors.mainByColor }}>{showNotes === i ? "Hide" : "Show"} Notes</StyledParagraph></TouchableOpacity>
                                {showNotes === i && x.notes?.map((y, i) => <StyledParagraph key={i} map={i}>{detailsStore.id === y.user ? 'Me' : 'User'}: {y.msg}</StyledParagraph>)}
                            </StyledNotesView>
                        </React.Fragment>}
                    actionItem={
                        <StyledInputView>
                            <StyledInput onFocus={() => setAddNotes('')} onInputChange={(val) => setAddNotes(val)} value={addNotes} styleView={{
                                borderBottomWidth: 0,
                                width: '80%'
                            }} ele='input' placeholder='Please add a note' />
                            <TouchableOpacity onPress={() => onEdit(x._id, null, addNotes)}>
                                <Ionicons name='send' size={30} style={{ color: colors.mainByColor, marginLeft: 20 }} />
                            </TouchableOpacity>
                        </StyledInputView>
                    } />
            )}
        </StyledHorizontalScrollView>
    )
};

export default Booking;