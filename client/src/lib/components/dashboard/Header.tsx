'use client';
import React, { useContext } from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { IDashboradHeaderProps } from '../../interfaces/props/IDashboardHeaderProps';
import { AuthContext } from '../../contexts/AuthContext';
import { IUser } from 'src/lib/interfaces/IUser';

const Header: React.FC<IDashboradHeaderProps> = ({
  currencyPair,
  dict,
  locale,
}) => {
  const { user } = useContext(AuthContext).authState as { user: IUser };
  const { header } = dict.dashboard;

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <Navbar.Brand>{currencyPair}</Navbar.Brand>
          <Navbar.Text>
            {`${header.accountBalance} £ ${user.accountBalanceGBP.toFixed(
              2
            )} | $ ${user.accountBalanceUSD.toFixed(2)}`}
          </Navbar.Text>
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
