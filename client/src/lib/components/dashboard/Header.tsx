'use client';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { IDashboradHeaderProps } from '../../interfaces/props/IDashboardHeaderProps';
import AccountBalance from './AccountBalance';

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
          <AccountBalance translation={header.accountBalance} />
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
