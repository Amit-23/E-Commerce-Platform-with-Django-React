import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../axiosInstance';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [lastOrderCheck, setLastOrderCheck] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  // Poll for order updates every 5 seconds
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) return;

    const pollForUpdates = async () => {
      try {
        // Get user's orders to check for status changes
        const response = await API.get('/orders/');
        const currentOrders = response.data;
        
        // Check if any order status has changed since last check
        if (lastOrderCheck) {
          currentOrders.forEach(order => {
            const previousOrder = lastOrderCheck.find(prev => prev.id === order.id);
            if (previousOrder && previousOrder.status !== order.status) {
              // Status changed - add notification
              const newNotification = {
                id: Date.now() + order.id,
                type: 'order_status_update',
                message: `Your order #${order.id} status has been updated to ${order.status}`,
                orderId: order.id,
                status: order.status,
                timestamp: new Date().toISOString()
              };
              
              setNotifications(prev => [newNotification, ...prev]);
              
              // Show browser notification
              if (Notification.permission === 'granted') {
                new Notification('Order Update', {
                  body: newNotification.message,
                  icon: '/favicon.ico'
                });
              }
            }
          });
        }
        
        setLastOrderCheck(currentOrders);
        setIsConnected(true);
      } catch (error) {
        console.error('Error polling for updates:', error);
        setIsConnected(false);
      }
    };

    // Initial check
    pollForUpdates();

    // Set up polling interval
    const interval = setInterval(pollForUpdates, 5000);

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => clearInterval(interval);
  }, [lastOrderCheck]);

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    isConnected,
    clearNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 