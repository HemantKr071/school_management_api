# School Management API

## Project Description
The **School Management API** is a backend service built using **Node.js, Express, and MySQL**. It allows users to:
- Add new schools with their name, address, latitude, and longitude.
- Retrieve a list of schools sorted by distance from a given location.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Validation:** Zod
- **Environment Variables:** dotenv

## Installation and Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
cd backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MYSQL_URL= "Your MySql Connection Url"
```

### 5️⃣ Start the Server
```sh
npm start
```

The API should now be running at `http://localhost:3000/`.

---

## 📌 API Endpoints

### 1️⃣ Add a School
**Endpoint:** `POST /api/v1/add_school`

**Request Body:**
```json
{
  "name": "XYZ High School",
  "address": "123 Main Street, City",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

**Response:**
```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

---

### 2️⃣ List Schools (Sorted by Distance)
**Endpoint:** `GET /api/v1/list_schools?latitude=28.7041&longitude=77.1025`

**Response:**
```json
[
  {
    "id": 1,
    "name": "XYZ High School",
    "address": "123 Main Street, City",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance": 0.0
  },
  ...
]
```



## 📜 License
This project is **MIT Licensed**.

---

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repo.
2. Create a new branch (`feature-newFeature`).
3. Commit changes and push.
4. Submit a PR.


