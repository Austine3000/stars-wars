import { createGlobalStyle } from 'styled-components';

interface ITheme {
  theme: { body: string; text: string; primaryColor: string };
}
export const GlobalStyles = createGlobalStyle`

  body {
    background-color: ${({ theme }: ITheme) => theme.primaryColor};
    color: ${({ theme }: ITheme) => theme.text};
   
    font-family: "Poppins", sans-serif;
  }
`;
