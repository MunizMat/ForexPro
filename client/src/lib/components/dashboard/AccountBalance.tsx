import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { Navbar, Placeholder } from 'react-bootstrap';
export default function AccountBalance({
  translation,
}: {
  translation: string;
}) {
  const { user } = useContext(AuthContext).authState;
  return user ? (
    <Navbar.Text>
      {`${translation} £ ${user.accountBalanceGBP.toFixed(
        2
      )} | $ ${user.accountBalanceUSD.toFixed(2)}`}
    </Navbar.Text>
  ) : (
    <Placeholder
      data-testid="acc-balance"
      bg="primary"
      as={Navbar.Text}
      animation="wave"
    />
  );
}
