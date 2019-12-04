import { createGlobalStyle } from 'styled-components';

interface ITheme {
  theme: { body: string; text: string };
}
export const GlobalStyles = createGlobalStyle`

  body {
    background-color: ${({ theme }: ITheme) => theme.body};
    color: ${({ theme }: ITheme) => theme.text};
   
    font-family: "Poppins", sans-serif;
  }
`;
