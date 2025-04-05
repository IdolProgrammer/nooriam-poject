import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Notification from '../components/Notification';

const Dashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Notification isAuthenticated={isAuthenticated} />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <h2 className="text-center mb-4">Dashboard</h2>
                <div className="mb-4">
                  <h5>User Information</h5>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>User ID:</strong> {user?.id}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <Link to="/welcome">
                    <Button variant="outline-primary">
                      Back to Welcome
                    </Button>
                  </Link>
                  <Button variant="outline-danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            <Card>
              <Card.Body>
                <h5>About This Page</h5>
                <p>
                  This is the Dashboard page where you can see your account details.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
