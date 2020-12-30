import styled from 'styled-components';

export const UserNotice = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 2rem 1.5rem 0rem 1.5rem;
    color: ${({ theme }) => theme.primaryAlt };
`;
