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

const MyPost = (props) => {
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
                .getMyPostApi('')
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
                    <Card key={i} title={x.title} message={x.message} onViewPress={() => props.navigation.navigate('Posts', { id: x._id })} />
                )}
            </StyledHorizontalScrollView>
            {authStore.access_token && authStore.access_token !== '' ? <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 30,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Post'
                onPress={() => props.navigation.navigate('CreatePost', { category: { name: props.route.params.data.category_name, id: props.route.params.data._id } })}
            /> : null}
        </React.Fragment>
    )
};

export default MyPost;