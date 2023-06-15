'use client';
import React, { useContext } from 'react';
import {
  Navbar,
  NavDropdown,
  Nav,
  Container,
  Placeholder,
} from 'react-bootstrap';
import { IDashboradHeaderProps } from '../../interfaces/props/IDashboardHeaderProps';
import { AuthContext } from '../../contexts/AuthContext';

function AccountBalance() {
  const { user } = useContext(AuthContext).authState;
  return (
    <Navbar.Text>
      {user &&
        `Account balance: £ ${user.accountBalanceGBP.toFixed(
          2
        )} | $ ${user.accountBalanceUSD.toFixed(2)}`}
      {!user && <Placeholder />}
    </Navbar.Text>
  );
}

const Header: React.FC<IDashboradHeaderProps> = ({
  currencyPair,
  dict,
  locale,
}) => {
  const { header } = dict.dashboard;

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <Navbar.Brand>{currencyPair}</Navbar.Brand>
          <AccountBalance />
        </div>
        <Nav>
          <NavDropdown title={header.currencyPair} id="currency-dropdown">
            <NavDropdown.Item href={`/${locale}/dashboard/gbpusd`}>
              GBP/USD
            </NavDropdown.Item>
            <NavDropdown.Item href={`/${locale}/dashboard/usdgbp`}>
              USD/GBP
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#trade-history">{header.tradeHistory}</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
