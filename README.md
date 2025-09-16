# SkillHub – Course Management API

A full-featured backend API for managing courses, users, and orders.  
Built with **Node.js** and **Express**, using **MongoDB Atlas** for data storage.  
Input validation with **Joi**, password hashing with **bcrypt**, and course images uploaded to **Cloudinary**.  
JWT tokens are used for secure authentication and route protection.

## **Features**

### **User Management**
- Secure Authentication: Registration and login with JWT and bcrypt
- User Profiles: Update personal info (name, email) and password
- Authorization: Manager-only routes for course management

### **Course Management**
- CRUD Operations: Add, update, delete, view courses
- Category Management: Retrieve categories and course counts
- File Upload: Upload course images securely via Cloudinary

### **Order Management**
- CRUD Operations: Place orders, view user orders, delete pending orders

### **Security**
- Passwords are hashed with bcrypt
- JWT authentication for protected routes
- Input validation using Joi
- File uploads restricted and stored securely on Cloudinary


## **Technologies**
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas + Mongoose
- **Authentication & Security:** JWT, bcrypt
- **File Upload:** multer + Cloudinary
- **Environment Management:** dotenv

## **Project Structure**

```
skillhub-api/
├── config/                   # Configuration files for database and Cloudinary
│   ├── cloudinary.js         # Cloudinary setup
│   └── DB.js                 # MongoDB connection setup
├── controllers/              # Business logic for CRUD operations
│   ├── course.js             # Course-related operations
│   ├── order.js              # Order-related operations
│   ├── upload.js             # Image upload handling
│   └── user.js               # User-related operations
├── middlewares/              # Authentication, authorization, and error handling
│   └── isUserIn.js           # Middleware to verify user/manager access
├── modules/                  # MongoDB models
│   ├── course.js             # Course schema
│   ├── order.js              # Order schema
│   └── user.js               # User schema
├── restApi/                  # Full REST API documentation (HTML/CSS)
│   ├── table.css
│   └── table.html
├── routes/                   # API routes
│   ├── course.js             # Routes for courses
│   ├── order.js              # Routes for orders
│   ├── upload.js             # Routes for uploads
│   └── user.js               # Routes for users
├── utils/                    # Helper functions
│   └── generateToken.js      # JWT token generation
├── server.js                 # Main server entry point
├── package-lock.json         # Locked versions of dependencies
├── package.json              # Node.js dependencies
├── .env                      # Environment variables (not committed)
└── README.md                 # Project documentation
```

## Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account for image uploads
 
### 1. Clone the repository

```bash
git clone https://github.com/Hadar-Gerashi/SkillHub-server.git
cd skillhub-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file and configure your environment variables

```bash
cp .env.example .env

# Edit .env with your configuration
```
```
PORT=8000
URL=<Your MongoDB URL>
SECRET_KEY=<JWT Secret Key>
CLOUD_NAME=<Cloudinary Name>
CLOUD_API_KEY=<Cloudinary API Key>
CLOUD_API_SECRET=<Cloudinary API Secret>
```

### 4. Run the Server

```bash
node server
```

Visit [http://localhost:8000](http://localhost:8000) in your browser.

## Requirements.txt Example

```
bcryptjs                   # Password hashing and security
cloudinary                 # Cloud storage for images
cors                       # Enable Cross-Origin Resource Sharing
dotenv                     # Environment variable management
express                    # Fast, unopinionated web framework
express-query-parser       # Parse and sanitize query strings
helmet                     # Security middleware (headers, protection)
joi                        # Input validation
jsonwebtoken               # JWT authentication
mongoose                   # MongoDB object modeling
multer                     # Handling multipart/form-data (file uploads)
multer-storage-cloudinary  # Multer storage engine for Cloudinary
nodemailer                 # Sending emails
```

## Security Features

- **Password Security**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication for protected routes
- **File Upload Security**: Validated image types uploaded securely to Cloudinary
- **Environment Variables**: Sensitive data stored in .env

## File Storage

- **Course Images**: Uploaded and stored on Cloudinary cloud storage
- **File Validation**: Only approved file formats are accepted
- **Cloud Integration**: Automatic optimization and CDN delivery via Cloudinary

## API Endpoints

| Method | Endpoint                               | Description                                 | Auth | Module |
|--------|----------------------------------------|---------------------------------------------|------|--------|
| GET    | `api/user/`                            | Returns all users                           |  V   |  user  |
| GET    | `api/user/:id/`                        | Returns a specific user by id               |  V   |  user  |
| POST   | `api/user/`                            | Add a new user                              |  X   |  user  |
| POST   | `api/user/login/`                      | Login with username + password              |  X   |  user  |
| PUT    | `/api/user/password/:id`               | Update password                             |  V   |  user  |
| PUT    | `/api/user/:id`                        | Update user details (without password)      |  V   |  user  |
| GET    | `/api/course/getCount/limit=?`         | Returns the number of pages, limit per page, and number of courses|  X   | course |
| GET    | `/api/course/categories/`              | Fetch categories associated with courses    |  X   | course |
| GET    | `/api/course/`                         | Returns all courses                         |  X   | course |
| GET    | `/api/course/:id/`                     | Returns a specific course by id             |  X   | course |
| DELETE | `/api/course/:id/`                     | Delete a course                             |  V   | course |
| POST   | `/api/course/`                         | Add a new course                            |  V   | course |
| PUT    | `/api/course/:id/`                     | Update an existing course                   |  V   | course |
| GET    | `api/order/`                           | Returns all existing orders                 |  V   | order  |
| GET    | `api/order/:userId/`                   | All orders of a specific user               |  V   | order  |
| DELETE | `api/order/:id/`                       | Delete an order                             |  V   | order  |
| POST   | `/api/order/`                          | Add a new order                             |  V   | order  |
| POST   | `/api/upload/`                         | Uploading an image to Cloudinary            |  V   | upload |


### **URL Examples:**

- Users: `: http://localhost:8000/api/user`
- Courses: `: http://localhost:8000/api/course`
- Orders: `: http://localhost:8000/api/order`
- Upload Image: `: http://localhost:8000/api/upload`

## Author

**Hadar** - Software Engineering Student  
Developed as part of final studies project

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the maintainer.

**Happy Shopping!**


