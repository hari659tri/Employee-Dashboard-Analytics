# Employee Dashboard & Analytics

A **React.js** web application to manage employee data, visualize salaries, and explore employee details. This project demonstrates authentication, API integration, responsive UI, and data visualization using Recharts.

---

## 📖 Project Description

This project provides a simple Employee Dashboard with the following functionality:

- Login system with default credentials (`testuser` / `Test123`)  
- Employee List displayed in a responsive grid  
- Clickable employee cards to view details  
- Salary Bar Chart for the first 10 employees  
- Logout functionality clearing session data  
- Employees are shuffled on page reload to show different employees  

---

## 🛠 Tech Stack

| Layer            | Technology / Tool          |
|-----------------|---------------------------|
| Frontend        | React.js                  |
| Routing         | React Router              |
| State Management| React Hooks (`useState`, `useEffect`) |
| Charts          | Recharts                  |
| Styling         | CSS-in-JS / Inline Styles |
| Backend   | PHP REST API (`gettabledata.php`) |
| Tools           | VSCode, Node.js, npm      |
| Host         | Render(Backend), Vercel(Frontend)     |

---

## 🚀 Features

- **Login System**  
  LocalStorage-based authentication with default credentials.  

- **Employee List**  
  Responsive grid showing employee details: Name, Position, City, Salary.  
  Clickable cards open details page. Employees shuffle on reload.  

- **Salary Bar Chart**  
  Interactive chart with gradient bars, tooltips, and shuffled data on reload.  

- **Logout Button**  
  Clears localStorage and redirects to login page.  

---
## 📂 Project Structure

```bash
src/
├─ components/
│  └─ LogoutButton.jsx
├─ pages/
│  ├─ LoginPage.jsx
│  ├─ ListPage.jsx
│  ├─ DetailsPage.jsx
│  └─ ChartPage.jsx
├─ App.jsx
└─ index.jsx

# Clone the repository
git clone https://github.com/yourusername/employee-dashboard.git
cd employee-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev

