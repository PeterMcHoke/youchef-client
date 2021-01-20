import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLinkWrapper = styled.div`
    margin-top: 2.5rem;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin-top: 1.5rem;
    }
    text-align: ${props => props.center ? 'center' : ''}
`;


export const StyledLink = styled(Link)`
    padding: .5rem .9rem;
    border-radius: 6px;
    box-shadow: none;
    border: 2px solid ${props => (props.white ? 'white' : '#00476A')};
    color: ${props => (props.white ? 'white' : '#00476A')};

    &:hover {
        background-color: ${props => (props.white ? 'white' : '#00476A')};
        color: ${props => (props.white ? '#00476A': 'white')};
    }
`;
