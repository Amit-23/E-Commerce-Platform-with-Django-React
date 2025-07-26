# EnLog - E-Commerce Platform

A full-stack e-commerce platform built with Django REST Framework (Backend) and React (Frontend) featuring real-time notifications, order management, and user authentication.

## 🚀 Features

### User Features
- **User Authentication**: JWT-based login/register system
- **Product Browsing**: View products with pagination (10 products per page)
- **Product Filtering**: Filter by category and search by name
- **Order Management**: Place orders and view order history
- **Real-time Notifications**: Get notified when order status changes
- **Order Status Tracking**: Track orders from pending to delivered

### Admin Features
- **Product Management**: Add, edit, and manage products
- **Category Management**: Create and manage product categories
- **Order Management**: View all orders and update their status
- **Admin Dashboard**: Centralized admin interface

### Technical Features
- **Pagination**: Efficient product listing with 10 products per page
- **Real-time Updates**: Polling-based notification system
- **Responsive Design**: Bootstrap-based responsive UI
- **JWT Authentication**: Secure token-based authentication
- **RESTful API**: Clean and well-structured API endpoints

## 🛠️ Tech Stack

### Backend
- **Django 5.2.4** - Web framework
- **Django REST Framework 3.16.0** - API framework
- **Django Channels 4.2.2** - WebSocket support
- **PostgreSQL** - Database
- **JWT Authentication** - Token-based auth
- **Django CORS Headers** - Cross-origin resource sharing
- **psycopg2-binary** - PostgreSQL adapter

### Frontend
- **React 19.1.0** - UI library
- **Vite 7.0.4** - Build tool
- **React Router DOM 7.7.1** - Client-side routing
- **Axios 1.11.0** - HTTP client
- **Bootstrap 5.3.7** - CSS framework
- **React Icons 5.5.0** - Icon library
- **JWT Decode 4.0.0** - JWT token handling

## 📁 Project Structure

```
enlog/
├── backend/
│   ├── backend/
│   │   ├── backend/
│   │   │   ├── __init__.py
│   │   │   ├── asgi.py
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   └── wsgi.py
│   │   ├── users/
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   └── urls.py
│   │   ├── products/
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   └── urls.py
│   │   ├── orders/
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   └── urls.py
│   │   ├── notifications/
│   │   │   ├── consumers.py
│   │   │   ├── routing.py
│   │   │   └── signals.py
│   │   ├── manage.py
│   │   └── requirements.txt
│   └── myenv/ (virtual environment)
└── frontend/
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── auth/
        │   │   │   ├── LoginForm.jsx
        │   │   │   ├── RegisterForm.jsx
        │   │   │   └── Logout.jsx
        │   │   ├── user/
        │   │   │   ├── UserDashboard.jsx
        │   │   │   └── OrderHistory.jsx
        │   │   ├── admin/
        │   │   │   ├── AdminDashboard.jsx
        │   │   │   ├── AddProduct.jsx
        │   │   │   ├── AddCategory.jsx
        │   │   │   └── OrderManagement.jsx
        │   │   ├── NotificationBell.jsx
        │   │   └── NotificationProvider.jsx
        │   ├── App.jsx
        │   ├── axiosInstance.js
        │   └── main.jsx
        ├── package.json
        ├── vite.config.js
        └── index.html
```

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone "https://github.com/Amit-23/E-Commerce-Platform-with-Django-React/tree/main"
   cd enlog
   ```

2. **Set up Python virtual environment**
   ```bash
   cd backend
   python3 -m venv myenv
   source myenv/bin/activate  # On Windows: myenv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb enlog_db
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE enlog_db;
   \q
   ```

5. **Configure database settings**
   Edit `backend/backend/backend/settings.py` and update database credentials:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'enlog_db',
           'USER': 'your_username',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

6. **Run database migrations**
   ```bash
   cd backend/backend
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

8. **Start the backend server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend/frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 📋 Available Commands

### Backend Commands
```bash
# Run development server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic

# Run tests
python manage.py test

# Show all URLs
python manage.py show_urls
```

### Frontend Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:password@localhost:5432/enlog_db
```

### API Endpoints

#### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout

#### Products
- `GET /api/products/products/` - List products (with pagination)
- `POST /api/products/products/` - Create product (admin only)
- `GET /api/products/categories/` - List categories
- `POST /api/products/categories/` - Create category (admin only)

#### Orders
- `GET /api/orders/` - List user orders
- `POST /api/orders/` - Create order
- `PATCH /api/orders/{id}/` - Update order status (admin only)

#### Admin
- `GET /api/auth/admin-orders/` - List all orders (admin only)
- `PATCH /api/auth/admin-orders/{id}/` - Update order status (admin only)

## 🎯 Key Features Explained

### Pagination
- Products are paginated with 10 items per page
- Configurable page size via `page_size` parameter
- Bootstrap-styled pagination controls

### Real-time Notifications
- Polling-based notification system
- Browser desktop notifications
- Order status change notifications

### Order Management
- Order status flow: Pending → Accepted → Shipped → Delivered
- Admin can update order status
- Users receive notifications on status changes

### Authentication
- JWT-based authentication
- Token refresh mechanism
- Role-based access control (User/Admin)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in settings.py
   - Verify database exists

2. **Module Not Found Errors**
   - Activate virtual environment
   - Install requirements: `pip install -r requirements.txt`

3. **Port Already in Use**
   - Kill existing processes: `pkill -f "manage.py runserver"`
   - Use different port: `python manage.py runserver 8001`

4. **CORS Errors**
   - Ensure CORS headers are properly configured
   - Check frontend URL in CORS settings


## 👥 Author

- **Amit Singh**


