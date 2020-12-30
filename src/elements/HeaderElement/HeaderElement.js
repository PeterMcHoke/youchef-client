import styled from 'styled-components';

export const HeaderElement = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    flex: ${props => props.flexSize};
    padding: 0 2rem;
    align-items: center;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        display: ${props => props.noMobile ? 'none' : 'flex'};
        text-align: center;
        justify-content: space-between
    }
`;
