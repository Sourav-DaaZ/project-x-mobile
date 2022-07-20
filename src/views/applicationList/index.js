import React, { useState, useEffect } from 'react';
import {
    StyledHorizontalScrollView,
} from './style';
import InsideAuthApi from '../../services/inSideAuth';
import Card from '../../sharedComponents/card';
import { useSelector, shallowEqual } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SnackbarUpdate } from '../../store/actions';
import Routes from '../../constants/routeConst';
import { ShadowWrapperContainer } from '../../sharedComponents/bottomShadow';
import Loader from '../../sharedComponents/loader';

const ApplicationList = (props) => {
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);


    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            setData([]);
            setShowLoader(true);
            InsideAuthApi(authStore)
                .getAllApplicationsApi(props.route.params?.id ? "?post_id=" + props.route.params.id : '')
                .then((res) => {
                    setData(res.data);
                    setShowLoader(false);
                })
                .catch((err) => {
                    dispatch(SnackbarUpdate({
                        type: 'error',
                        msg: err.message
                    }));
                    setShowLoader(false);
                });
        })
        return () => unsubscribe
    }, [])

    return (
        showLoader ? <Loader /> : <ShadowWrapperContainer animation='pulse'>
            <StyledHorizontalScrollView>
                {data.map((x, i) =>
                    <Card key={i} message={x.details} onViewPress={() => props.navigation.navigate(Routes.applicationDetails, { id: x._id })} />
                )}
            </StyledHorizontalScrollView>
        </ShadowWrapperContainer>
    )
};

export default ApplicationList;