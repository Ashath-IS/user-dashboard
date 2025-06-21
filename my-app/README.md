# 📊 User Dashboard - React + Chakra UI

A user management dashboard built using **React**, **Chakra UI**, and **TypeScript**. This application lists users from a public API with features like:

- 🔍 Column-wise Filtering
- 📄 Pagination
- ➕ Modal Form to Add Local Users
- 💾 Local Storage Support

---

## 🚀 Features

### ✅ User Table
- Fetches user data from [`https://dummyjson.com/users`](https://dummyjson.com/users)
- Column-wise filtering (Name)
- Paginated display using custom table + Chakra UI Pagination

### ✅ Search
- Built-in search using `?q=` parameter for API-based filtering
- Dynamically updates results with debounce-like behavior

### ✅ Add Users Locally
- Add users via modal form
- Locally created users are stored in `localStorage` and persist across reloads
- Local users are marked with `is_local: true`

### ✅ Chakra UI Components
- Built with Chakra UI for consistent styling and accessibility
- Fully responsive table and modal

---

### ✅ HOW TO RUN:
- Clone repository
- npm install
- npm run dev

---