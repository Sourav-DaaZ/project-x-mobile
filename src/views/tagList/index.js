import React, { useContext, useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { ThemeContext } from 'styled-components';

import {
    StyledScrollView,
    StyledDivider,
    StyledChip
} from './style';

import OutsideAuthApi from '../../services/outSideAuth';
import DashboardLayout from '../../sharedComponents/layout/dashboardLayout';

const TagList = (props) => {
    const themeContext = useContext(ThemeContext);
    const colors = themeContext.colors[themeContext.baseColor];
    const [tag, setTag] = useState([]);
    const [showMsg, setShowMsg] = useState('');
    const [showLoader, setShowLoader] = useState('');


    useEffect(() => {
        setShowLoader(true);
        OutsideAuthApi()
            .tagListApi(100, 20, 8000000)
            .then((res) => {
                setShowLoader(false);
                setTag(res.data);
            })
            .catch((err) => {
                setShowLoader(false);
                setShowMsg(err.message)
            });
    }, []);


    return (
        <React.Fragment>
            <DashboardLayout fab={false} showLoader={showLoader} showMsg={showMsg} setShowMsg={() => setShowMsg('')}>
                <StyledScrollView>
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>{tag.map((x, i) =>
                        <StyledChip key={i} accessibilityLabel={x.details} onPress={() => props.navigation.navigate('Posts', { data: x })}>
                            {x.tag_name}
                        </StyledChip>
                    )}</View>
                </StyledScrollView>
            </DashboardLayout>
        </React.Fragment>
    )
}
export default TagList;