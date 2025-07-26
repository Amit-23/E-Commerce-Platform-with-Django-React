import React, { useState } from 'react';
import { useNotifications } from './NotificationProvider';

const NotificationBell = () => {
  const { notifications, isConnected, clearNotification, clearAllNotifications } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order_status_update':
        return '🔄';
      case 'order_created':
        return '🆕';
      default:
        return '🔔';
    }
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case 'order_status_update':
        return 'text-primary';
      case 'order_created':
        return 'text-success';
      default:
        return 'text-secondary';
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="position-relative">
      <button
        className="btn btn-outline-secondary position-relative"
        onClick={() => setIsOpen(!isOpen)}
        style={{ minWidth: '50px' }}
      >
        🔔
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        {!isConnected && (
          <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-warning">
            ⚠️
          </span>
        )}
      </button>

      {isOpen && (
        <div className="position-absolute top-100 end-0 mt-2 bg-white border rounded shadow-lg" style={{ minWidth: '300px', maxHeight: '400px', overflowY: 'auto', zIndex: 1000 }}>
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Notifications</h6>
            {unreadCount > 0 && (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={clearAllNotifications}
              >
                Clear All
              </button>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <div className="p-3 text-center text-muted">
              No notifications
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-3 border-bottom notification-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => clearNotification(notification.id)}
                >
                  <div className="d-flex align-items-start">
                    <span className="me-2" style={{ fontSize: '1.2em' }}>
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-grow-1">
                      <div className={`${getNotificationClass(notification.type)} fw-bold`}>
                        {notification.message}
                      </div>
                      <small className="text-muted">
                        {new Date(notification.timestamp).toLocaleString()}
                      </small>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotification(notification.id);
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell; 