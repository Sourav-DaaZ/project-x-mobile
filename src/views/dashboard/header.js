import React from 'react';

import {StyledHeaderView, StyledHeaderHeadline} from './style';

const DashboardHeader = (props) => {
    return (
        <StyledHeaderView>
            <StyledHeaderHeadline>{props.text}</StyledHeaderHeadline>{props.goNext}
        </StyledHeaderView>

    )
};

export default DashboardHeader;