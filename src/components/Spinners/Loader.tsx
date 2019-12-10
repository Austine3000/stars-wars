import styled, { keyframes } from 'styled-components';

interface ITheme {
  theme: { secondaryColor: string };
}

const spin = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border: 16px solid #000;
  border-radius: 50%;
  border-top: 16px solid ${({ theme }: ITheme) => theme.secondaryColor};
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: ${spin} 2s linear infinite;
`;
