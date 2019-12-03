import React from 'react';
import Switch from '../components/Input/Switch';
import styled from 'styled-components';

interface ITheme {
  theme: { primaryColor: string };
}

interface IProps {
  toggleTheme: () => void;
  checked: boolean;
}

const Navigation: React.FC<IProps> = (props: IProps) => {
  return (
    <Nav>
      <Switch checked={props.checked} toggleTheme={props.toggleTheme}></Switch>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.div`
  padding: 20px;
  background-color: ${({ theme }: ITheme) => theme.primaryColor};
`;
