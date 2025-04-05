import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { registerMessageHandler } from '../services/websocket';

interface NotificationProps {
  isAuthenticated: boolean;
}

const Notification: React.FC<NotificationProps> = ({ isAuthenticated }) => {
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string }>>([]);
  
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const unregister = registerMessageHandler((data) => {
      if (data.type === 'new_user') {
        const newNotification = {
          id: Date.now(),
          message: `New user registered: ${data.email}`
        };
        setNotifications(prev => [...prev, newNotification]);
      }
    });
    
    return () => {
      unregister();
    };
  }, [isAuthenticated]);
  
  const handleClose = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  if (!isAuthenticated) return null;
  
  return (
    <ToastContainer position="top-end" className="p-3">
      {notifications.map(notification => (
        <Toast 
          key={notification.id} 
          onClose={() => handleClose(notification.id)}
          show={true}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">System Notification</strong>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default Notification;
