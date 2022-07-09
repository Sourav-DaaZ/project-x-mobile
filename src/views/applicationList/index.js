import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { FAB } from 'react-native-paper';
import {
    StyledHorizontalScrollView,
    StyledViewButton,
    StyledButtonView,
    StyledButtonActive,
    StyledTouchableOpacity
} from './style';
import OutsideAuthApi from '../../services/outSideAuth';
import InsideAuthApi from '../../services/inSideAuth';
import Card from '../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate, loader } from '../../store/actions';
import Routes from '../../constants/routeConst';

const ApplicationList = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);


    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            setData([]);
            dispatch(loader(true));
            InsideAuthApi(authStore)
                .getAllApplicationsApi(props.route.params?.id ? "?post_id=" + props.route.params.id : '')
                .then((res) => {
                    setData(res.data);
                    dispatch(loader(false));
                })
                .catch((err) => {
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err.message
                    }));
                    dispatch(loader(false));
                });
        })
        return () => unsubscribe
    }, [])

    return (
        <React.Fragment>
            <StyledHorizontalScrollView>
                {data.map((x, i) =>
                    <Card key={i} message={x.details} onViewPress={() => props.navigation.navigate(Routes.applicationDetails, { id: x._id })} />
                )}
            </StyledHorizontalScrollView>
        </React.Fragment>
    )
};

export default ApplicationList;