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
        let param = `?myBooking=true`
        if(props.bookingType){
            param = `?myBooking=true&past=true`
        }
        setData([]);
        setLoading(true);
        InsideAuthApi(authStore)
            .bookingListApi(param)
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
    }, [props.modalShow, props.bookingType])


    return (
        loading ? <Loader /> : <StyledHorizontalScrollView>
            {data.map((x, i) =>
                <TouchableOpacity key={i} onPress={() => {
                    props.setPopupData(x);
                    props.setModalShow(true);
                }}>
                    <Card
                        profile={
                            <ListItem topStyle={{ marginBottom: 0, maxWidth: '90%' }} description={dateFormat(x.startDate) + (x.endDate ? ' - ' + dateFormat(x.endDate) : '') + (x.reportTime ? ' (' + timeFormat(x.reportTime) + ')' : '')} />
                        }
                        title={x.description ? x.description : ''}
                        extraContent={
                            <StyledStatus>
                                <StyledParagraph>{x.status ? "status: " + x.status[x.status.length - 1] : null}</StyledParagraph>
                                <StyledParagraph>{x.status?.map((y, i) => y + (i !== x.status.length - 1 ? " -> " : ""))}</StyledParagraph>
                            </StyledStatus>
                        }
                    />
                </TouchableOpacity>
            )}
        </StyledHorizontalScrollView>
    )
};

export default Booking;