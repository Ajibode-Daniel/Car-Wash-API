
### **📌README.md**  
```md
# 🚗 Car Wash Booking API

### **A Node.js API for scheduling and managing car wash appointments with payment integration via Paystack.**  

## **📌Features**
✅ **User Authentication** (Register & Login)  
✅ **Car Wash Booking System** (Create, View, Cancel)  
✅ **Payment Integration** (Paystack)  
✅ **JWT-Based Authentication**  
✅ **PostgreSQL Database (via Sequelize ORM)**  

---

## **📌 Tech Stack**
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (Sequelize ORM)  
- **Authentication:** JWT (JSON Web Token)  
- **Payments:** Paystack API  
- **Environment Variables:** `dotenv`  

---

## **📌Setup & Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Ajibode-Daniel/Car-Wash-API.git
cd Car-Wash-API
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add:  
```ini
PORT=8080
DATABASE_URL=postgres://your-username:your-password@your-db-host.com:5432/car_wash_db
PAYSTACK_SECRET_KEY=your_live_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_live_paystack_public_key
JWT_SECRET=your_jwt_secret_key
```


---

## **📌 Database Setup**
### **1️⃣ Run Migrations**
```sh
npx sequelize-cli db:migrate
```

### **2️⃣ Seed the Database (Optional)**
```sh
npx sequelize-cli db:seed:all
```

---

## **📌 Start the Server**
```sh
npm start
```
✅ The API should now be running at:  
```
http://localhost:8080
```

---

## **📌 API Endpoints**
### **🔹 Authentication**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | User login |

### **🔹 Bookings**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/bookings` | Get all bookings |
| `DELETE` | `/api/bookings/:id` | Cancel a booking |

### **🔹 Payments**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/payments/initiate` | Initiate a payment (Paystack) |
| `GET` | `/api/payments/verify/:reference` | Verify a payment |

---

## **📌 Testing the API**
### **1️⃣ Using Postman**
- Import the provided **Postman collection** to test API endpoints.
- Ensure to include **Authorization: Bearer {token}** for protected routes.

### **2️⃣ Using cURL**
Example: **Register a new user**
```sh
curl -X POST http://localhost:8080/api/users/register -H "Content-Type: application/json" -d '{"name":"John Doe", "email":"johndoe@example.com", "password":"password123", "phone":"+1234567890"}'
```

---

## **📌 Contribution Guide**
🔹 **Fork this repo**  
🔹 **Create a new branch**  
🔹 **Make your changes**  
🔹 **Submit a Pull Request** 🚀  

---

## **📌 License**
This project is **open-source** under the **MIT License**.

---

### **🚀 Author**
👤 **Ajibode Daniel**  
🔗 [GitHub](https://github.com/Ajibode-Daniel)  

---
```

✅ **What This README Includes:**
- ✅ Project Overview  
- ✅ Features & Tech Stack  
- ✅ Installation Steps  
- ✅ Database Setup  
- ✅ API Endpoints  
- ✅ Testing Guide  
- ✅ Contribution & License  
