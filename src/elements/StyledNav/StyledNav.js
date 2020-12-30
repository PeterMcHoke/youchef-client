import styled from 'styled-components'

 export const MobileNavHeader = styled.div`
    display: none;
    width: 100%;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 100;
    padding: 12px 0;
    border-bottom: 1px solid #d7d7d7;
    background: ${({ theme }) => theme.primaryLight};
    @media (max-width: ${({ theme }) => theme.mobile}) {
        display: flex;
    }

    h1 {
        color: ${({ theme }) => theme.primaryDark};
        font-size: 1.3em;
        text-align: center;
        font-weight: 600;
    }
`;

export const MobileNav = styled.nav`
    display: none;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    left 0;
    width: 100vw;
    padding: .75rem 0;
    background: ${({ theme }) => theme.primaryLight};
    z-index: 100;
    @media (max-width: ${({ theme }) => theme.mobile}) {
        display: flex;
    }

    a {
        color: ${({ theme }) => theme.primaryAlt};
    }
`;

export const StyledNav = styled.nav`
    @media (max-width: ${({ theme }) => theme.mobile}) {
        display: ${props => props.noMobile ? 'none' : 'flex'};
    }
`;
