import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';

import {
    StyledScrollView,
    StyledChip,
    WrapperView,
    SplashTitle,
    LoginDescription,
    ButtonWrapper,
    UpdateButton,
    CancelText,
    WrapperTagView
} from './style';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import OutsideAuthApi from '../../../services/outSideAuth';
import DashboardLayout from '../../../sharedComponents/layout/dashboardLayout';
import Routes from '../../../constants/routeConst';
import DashboardHeader from '../../dashboard/header';
import { FAB } from 'react-native-paper';
import Loader from '../../../sharedComponents/loader';
import InsideAuthApi from '../../../services/inSideAuth';
import { snackbarUpdate } from '../../../store/actions';
import Modal from '../../../sharedComponents/modal';
import { onShare } from '../../../utils';

const MyTags = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const dispatch = useDispatch();
    const authStore = useSelector((state) => state.auth, shallowEqual);
    const spacing = themeContext.spacing;
    const fonts = themeContext.fonts;
    const detailsStore = useSelector((state) => state.details, shallowEqual);
    const [tag, setTag] = useState([]);
    const [saveTag, setSaveTag] = useState([]);
    const [showMenu, setShowMenu] = useState(null);
    const [showSavedMenu, setShowSavedMenu] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [tagLoader, setTagLoader] = useState(false);

    const apiCall = () => {
        const varParam = {
            user: detailsStore.id
        }
        OutsideAuthApi()
            .tagListApi(varParam)
            .then((res) => {
                if (res.data) {
                    setTag(res.data)
                }
                setShowLoader(false);
            })
            .catch((err) => {
                setShowLoader(false);
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
            });
        InsideAuthApi()
            .getSaveTagApi()
            .then((res) => {
                setTagLoader(false);
                setSaveTag(res.data);
            })
            .catch((err) => {
                setTagLoader(false);
            })
    }

    useEffect(() => {
        setShowLoader(true);
        setTagLoader(true);
        apiCall();
    }, []);

    const onDelete = (id) => {
        const param = {
            id: id,
            delete_tag: true
        }
        InsideAuthApi(authStore)
            .editTagApi(param)
            .then((res) => {
                setShowMenu(null);
                apiCall()
            })
            .catch((err) => {
                setShowMenu(null);
                useDispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
            });
    }
    const onDeleteSaveTag = (id) => {
        const varParam = {
            tag_id: id,
            isDeleted: false
        }
        InsideAuthApi()
            .saveTagApi(varParam)
            .then((res) => {
                setShowSavedMenu(null);
                apiCall();
            })
            .catch((err) => {
                dispatch(snackbarUpdate({
                    type: 'error',
                    msg: err?.message ? err.message : ''
                }));
            })
    }

    return (
        <DashboardLayout {...props}>
            <StyledScrollView>
                {showLoader ? <Loader /> : <WrapperView animation='zoomIn'>
                    <DashboardHeader text='My Tags' />
                    <WrapperTagView>
                        {tag.map((x, i) =>
                            <StyledChip key={i} textStyle={{ fontSize: fonts.regular }} accessibilityLabel={x.details} onLongPress={() => setShowMenu(x)} onPress={() => props.navigation.navigate(Routes.tagChat, { id: x._id, name: 'Tag: ' + x.tag_name })}>
                                {x.tag_name}
                            </StyledChip>)}
                    </WrapperTagView>
                </WrapperView>}
                {tagLoader ? <Loader /> : <WrapperView animation='zoomIn'>
                    <DashboardHeader text='Saved Tags' />
                    <WrapperTagView>
                        {saveTag.tags && saveTag.tags.length > 0 ? saveTag.tags.map((x, i) =>
                            <StyledChip key={i} textStyle={{ fontSize: fonts.regular }} accessibilityLabel={x.details} onLongPress={() => setShowSavedMenu(x._id)} onPress={() => props.navigation.navigate(Routes.tagChat, { id: x._id, name: 'Tag: ' + x.tag_name })}>
                                {x.tag_name}
                            </StyledChip>) : null}
                    </WrapperTagView>
                </WrapperView>}
            </StyledScrollView>
            {authStore.access_token && authStore.access_token !== '' ? <FAB
                style={{
                    position: 'absolute',
                    right: spacing.width * 5,
                    bottom: spacing.height * 3,
                    backgroundColor: colors.mainColor
                }}
                icon="plus"
                label='Tag'
                onPress={() => props.navigation.navigate(Routes.addTag)}
            /> : null}
            <Modal show={showMenu !== null} onClose={() => setShowMenu(null)}>
                <SplashTitle>Tag Action!</SplashTitle>
                <LoginDescription>Are You Want to Delete this tag?</LoginDescription>
                <ButtonWrapper>
                    <UpdateButton mode="outlined" onPress={() => onShare({
                        page: Routes.tagChat,
                        id: showMenu._id,
                        name: 'Tag: ' + showMenu.tag_name
                    }, showMenu.tag_name, 'tag')}>
                        <CancelText>Shere</CancelText>
                    </UpdateButton>
                    <UpdateButton labelStyle={{ color: colors.backgroundColor }} mode="contained" onPress={() => onDelete(showMenu._id)}>
                        delete
                    </UpdateButton>
                </ButtonWrapper>
            </Modal>
            <Modal show={showSavedMenu !== null} onClose={() => setShowSavedMenu(null)}>
                <SplashTitle>Delete Tags!</SplashTitle>
                <LoginDescription>Are You Want to Delete this tag?</LoginDescription>
                <ButtonWrapper>
                    <UpdateButton mode="outlined" onPress={() => setShowSavedMenu(null)}>
                        <CancelText>Cancel</CancelText>
                    </UpdateButton>
                    <UpdateButton labelStyle={{ color: colors.backgroundColor }} mode="contained" onPress={() => onDeleteSaveTag(showSavedMenu)}>
                        delete
                    </UpdateButton>
                </ButtonWrapper>
            </Modal>
        </DashboardLayout>
    )
}
export default MyTags;