import React from 'react';
import { Button, Card, Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Notification from '../components/Notification';

const Welcome: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <Notification isAuthenticated={isAuthenticated} />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body className="text-center">
                <div className="d-flex justify-content-center mb-4">
                  <Image 
                    src={`${process.env.PUBLIC_URL}/images/img.png`}
                    alt="Abstract colorful face" 
                    style={{
                      maxWidth: '300px',
                      height: 'auto',
                      borderRadius: '12px',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.22), 0 10px 10px rgba(0,0,0,0.2)'
                    }}
                  />
                </div>
                <h1 className="mb-4">Welcome to Nooriam App!</h1>
                <h3 className="mb-4">Hello, {user?.email}</h3>
                <p className="lead mb-4">
                  Thank you for joining our platform.
                </p>
                <div className="d-grid gap-3 d-md-flex justify-content-md-center">
                  <Link to="/dashboard">
                    <Button variant="primary" size="lg">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
