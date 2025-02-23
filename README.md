# PackD – AI-Powered Packing Assistant ✈️🧳

## Overview

**PackD** is an AI-powered web app that helps travelers generate **personalized packing lists** based on their destination, trip purpose, and planned activities. It ensures users pack efficiently by providing tailored recommendations while allowing them to **save, edit, and share** their lists.

## Problem

Packing for a trip can be stressful and time-consuming. Travelers often forget essentials, overpack, or struggle to determine what they truly need based on their trip details. **PackD** solves this problem by leveraging **AI-powered insights** and **community-driven packing lists** to help users pack smarter.

## User Profile

- **Frequent travelers** looking for efficient and customized packing lists
- **Vacationers & backpackers** who need tailored lists based on their trip type
- **Business travelers** who require minimal and professional packing solutions
- **Festival-goers, hikers, and campers** who need specialized packing recommendations
- **Organized travelers** who want to reuse, save, and modify their lists for future trips

## Features

### **Access & User Authentication**

- 🏠 **Non-logged-in users** can **view the homepage**
- 🔑 **Logged-in users** can access the **dashboard**, generate personalized packing lists, and save lists to their profile
- 🔄 Users can **sign up, log in, and log out** to manage their lists

### **Packing List Generation (Logged-in Users Only)**

- 📝 Generate a **custom packing list** based on:
  - **Destination** (city & country)
  - **Dates** (duration)
  - **Trip purpose** (business, leisure)
  - **Accommodation type** (hotel, Airbnb, camping etc)
  - **Transport method** (car, plane, train, ship)
  - **Activities** (camping, hiking, beach, festivals, fitness, sightseeing, etc.)
- ✂️ **Edit, rename, and remove** items from generated lists

### **User Dashboard & Saved Lists (Logged-in Users Only)**

- 📂 **View and manage all saved lists** on the dashboard
- ⭐ **Favorite public lists** for quick access
- 🗑️ **Delete or rename** lists for better organization

### **Public Lists & Community Features (Logged-in users only)**

- 🔍 **Search public lists** by **destination or activity**
- 💾 **Copy a public list** and modify it for personal use
- ❤️ **Save a public list** to a user’s profile


---

## Sitemap

- Home page
- User Dashboard:
  - Create New List
  - Recent Trips & Saved Trips
  - Destination Insights 

## Mockup

- [Wireframe](https://wireframe.cc/pro/pp/a7af9a4cd863849)

## **Tech Stack**

### **Frontend:**

- React.js
- React Router
- Axios
- SCSS
- Google Places API (for autofill location search)

### **Backend:**

- Node.js
- Express.js
- MySQL
- Knex
- OpenAI API (for AI-powered packing insights)
- Google Places API (for photo generation)

## **Data Structure**

### **Users Table**

| Column   | Type     | Description            |
| -------- | -------- | ---------------------- |
| id       | INT (PK) | Unique ID for the user |
| email    | STRING   | User’s email (unique)  |
| password | STRING   | Hashed password        |
| username | STRING   | User’s name            |

### **Trip Details Table**

| Column       | Type     | Description                 |
| ------------ | -------- | --------------------------- |
| id           | INT (PK) | Unique ID for the trip      |
| user_id (FK) | INT      | Links trip to a user        |
| destination  | STRING   | City, country               |
| trip_purpose | ENUM     | Business, Pleasure          |
| activities   | ARRAY    | List of selected activities |
| trip_name    | ARRAY    | List Name                   |
| IsFavorite   | BOOLEAN  | Mark as favorite (yes/no)    |
| isPublic     | BOOLEAN  | Publicly accessible (yes/no) |

### **Trip Items Table**

| Column       | Type     | Description                  |
| ------------ | -------- | ---------------------------- |
| id           | INT (PK) | Unique ID for each item list |
| user_id (FK) | INT      | Links list to user           |
| trip_id (FK) | INT      | Links list to trip details   |
| category     | STRING   | Item category                |
| item         | STRING   | List item                    |
| link         | STRING   | Relevant link (if any)       |


---

## **Endpoints**

**API**

🔹 **POST /api/packinglist** – Generate a list based on user inputs using openAI

- Parameter: FormData

Response:

```
{
    "trip": {
          "destination": "Pasris France",
          "trip_purpose": "Pleasure",
          "activities": ["Sightseeing", "Dining", "Museum visits"]
      },
    "items": [
        {
            "category": "Clothing",
            "items": [
                {
                    "item": "Casual outfits",
                    "quantity": 4,
                    "link": ""
                },
                {
                    "item": "Comfortable shoes",
                    "quantity": 1,
                    "link": ""
                }
            ]
        },
        {
            "category": "Toiletries",
            "items": [
                {
                    "item": "Toothbrush",
                    "quantity": 1,
                    "link": ""
                },
                {
                    "item": "Shampoo",
                    "quantity": 1,
                    "link": ""
                }
            ]
        }

    ]
}
```

**Trips**

🔹 **POST /trips** – Save a generated trip to the user’s profile & **POST /items** Save a generated items to the user’s profile

Post Body:

```
{
    "user_id" :1, 
    "destination": "Paris, France",
    "trip_purpose": "Pleasure",
    "activities": ["Sightseeing", "Dining", "Museum visits"],
    "isSaved": false,
    "isPublic": false
 }
 
```

Response:

```

{   "id":1,
    "user_id" :1, 
    "destination": "Paris, France",
    "trip_purpose": "Pleasure",
    "activities": ["Sightseeing", "Dining", "Museum visits"],
    "isSaved": false,
    "isPublic": false
 }

```

🔹 **GET /trips** – Retrieve all trips

Response:

```
{
    "user_id": 1,
    "id": 1,
    "destination": "Paris, France",
    "tripPurpose": "Pleasure",
    "activities": ["Dining and going out", "Sightseeing", "Shopping"],
    "tripName": "Fashion week in France",
    "isSaved": false,
    "isPublic": false
}

```

🔹 **GET /trips/:id/items** – Retrieve items for a trip

Response:

```
{  "trip_id":1,
   "user_id":1,
   "id":1,
   "category": "before-you-go",
   "item": "Brush up my french basics",
   "quantity": 1,
   "link": "https://www.duolingo.com/course/fr/en/Learn-French"
  }


```

🔹 **PATCH /trips/:id/items/:id** – edit items in a given list

Post Body:

```
  {
  "trip_id":1,
  "user_id":1,
  "quantity": 1,
}

```

Response:

```
  {
  "id": 2,
  "trip_id":1,
  "user_id":1,
  "quantity": 3,
  "category": "clothes"
  "item": "Comfortable sneakers"
}
```

🔹 **POST /trips/:id/items** – Add items to user's list

Post Body:

```
{
  "user_id": 1,
  "trip_id":1,
  "category": "clothes",
  "item": "Hat",
  "quantity": 1,
  "link": ""
}
```

Response:

```
{
  "user_id": 1,
  "trip_id": 1,
  "id": 3,
  "category": "clothes",
  "item": "Hat,
  "quantity": 1,
  "link": ""
}
```

🔹 **DELETE /lists/:id** – Delete a saved list

### **Public Lists & Sharing**

🔹 **GET /lists/public** – Retrieve publicly shared lists  
🔹 **GET /lists/search?query=destination/activity** – Search public lists

---

## **User Flow**

1️⃣ **User lands on the homepage** and learns about the app  
2️⃣ **Non-logged-in users can browse homepage navlinks** but cannot generate/save lists/have access to public lists  
3️⃣ **User logs in or signs up** → Redirected to the **Dashboard**  
4️⃣ **User fills out the form** to generate a personalized packing list  
5️⃣ **User can edit, rename, delete, or save the list** to their profile  
6️⃣ **Saved lists appear on the dashboard** for future access  
7️⃣ **User can browse and save public lists** from other travelers

---

## **Roadmap**

✅ **MVP (Minimum Viable Product)**

- AI-generated packing lists
- Saving & editing lists
- Public list browsing


🔜 **Phase 2 Enhancements**

- Search & filtering for public lists
- User authentication
- Destination Insights

🚀 **Future Goals**

- Community upvoting for lists
- Search & filtering for public lists
- User authentication
- AI-powered weather-based suggestions
- Shared lists for group travels
- Desktop App

## **Project Setup Guide**

First set up the server

1. Download the server repository zip file and extract it to a folder.
2. Open the folder in VSCode.
3. Open the terminal in VSCode and run the following command to install dependencies: **npm i**
4. Create a .env file using the .env.sample
5. Create a new schema on MySQL Workbench using the same DB_NAME from .env
6. In the terminal, use command **npm run migrate**
7. Then, use command **npm run seed**
8. Then, use command **npm start**
9. Server should now be successfully running

Then set up the client

1. Download the zip file of this repository
2. Open the folder in VSCode
3. Create a .env file using the .env.sample
4. Open the terminal and use command **npm i**
5. Then, use command **npm run dev**
6. Client should now be successfully running, and connected to the

---
