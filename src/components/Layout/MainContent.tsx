import styled from 'styled-components';

interface ITheme {
  theme: { primaryColor: string };
}

export const MainContent = styled.div`
  padding: 50px 0;
  background: ${({ theme }: ITheme) => theme.primaryColor};
  display: flex;
  justify-content: center;
`;

export const LogoArea = styled.div`
  background-color: ${({ theme }: ITheme) => theme.primaryColor};
  display: flex;
  justify-content: center;
`;
