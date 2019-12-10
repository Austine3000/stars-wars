import styled from 'styled-components';

interface ITheme {
  theme: { secondaryColor: string };
}

export const CrawlWrapper = styled.div`
  overflow: hidden;
  color: ${({ theme }: ITheme) => theme.secondaryColor};
`;
