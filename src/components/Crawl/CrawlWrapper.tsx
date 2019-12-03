import styled from 'styled-components';

interface ITheme {
  theme: { primaryColor: string };
}

export const CrawlWrapper = styled.div`
  overflow: hidden;
  color: ${({ theme }: ITheme) => theme.primaryColor};
`;
