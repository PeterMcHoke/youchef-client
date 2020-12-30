import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  *, *::after, *::before {
    box-sizing: border-box;
    transition: all 0.2s ease-in-out;
  }

  body {
    background: ${({ theme }) => theme.primaryLight};
    color: ${({ theme }) => theme.primaryDark};
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: 'Rubik', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin-top: 44px;
        margin-bottom: 2rem;
    }
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
      font-size: 1.75rem;
  }

  a {
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    background: none;
    transition: all 0.2s ease-in-out;
  }

  `
