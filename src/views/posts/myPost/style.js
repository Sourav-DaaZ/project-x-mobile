import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import Button from '../../../sharedComponents/button'

export const StyledHorizontalScrollView = styled(ScrollView)`
    flex: 1;
    margin-bottom: ${(props) => props.theme.spacing.height * 5}px;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
`;
