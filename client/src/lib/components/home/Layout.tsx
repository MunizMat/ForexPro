import { IHomeLayoutProps } from 'src/lib/interfaces/props/IHomeLayoutProps';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

const HomeLayout: React.FC<IHomeLayoutProps> = ({ content, image }) => {
  return (
    <Container style={{ background: 'transparent' }} className="mt-5 p-5">
      <Row>
        <Col lg={6} xs={12} data-testid="content-column">
          <Stack gap={4}>{content}</Stack>
        </Col>
        <Col lg={6} xs={12} className="mt-4 mt-lg-0" data-testid="image-column">
          <Image data-testid="home-image" src={image} fluid rounded />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeLayout;
