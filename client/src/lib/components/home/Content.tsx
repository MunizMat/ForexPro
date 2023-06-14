import Button from 'react-bootstrap/Button';

const HomeContent = () => {
  return (
    <>
      <h1 className="display-1 fw-bold">ForexPro</h1>;
      <h3 className="fw-light">
        Empower Your Forex Trading Journey with Real-Time Data and Seamless User
        Experience
      </h3>
      <Button
        href="/signup"
        style={{ width: '75%' }}
        variant="primary"
        size="lg"
      >
        Start trading today
      </Button>
    </>
  );
};

export default HomeContent;
