import styled from 'styled-components';

export const Header = styled.header`
    height: 95vh;
    background: linear-gradient(#00476a, #1476a7);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2rem;
    color: white;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        padding: 2rem 1rem;
        min-height: 40vh;
        max-height: 60vh;
    }

    h1 {
        font-size: 1.5em;
        font-weight: 400;
        @media (max-width: ${({ theme }) => theme.mobile}) {
            font-size: 1.2em;
        }
    }

    h2 {
        font-size: 3em;
        padding: 15px 0px;
        @media (max-width: ${({ theme }) => theme.tablet}) {
            font-size: 2em;
        }
        @media (max-width: ${({ theme }) => theme.mobile}) {
            font-size: 1.5em;
        }
    }

    h3 {
        font-size: 14px;
        font-weight: 400;
    }

    a {
        @media (max-width: ${({ theme }) => theme.mobile}) {
            font-size: 0.9em;
        }
    }
`;
