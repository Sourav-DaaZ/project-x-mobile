import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import Button from '../../sharedComponents/button';

export const StyledScrollView = styled(ScrollView)`
    margin: ${(props) => props.theme.spacing.height * 2}px ${(props) => props.theme.spacing.width * 3}px;
    margin-top: 0px;
`;

export const StyledButtonLoadMore = styled(Button)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.height * 2}px;
`;
