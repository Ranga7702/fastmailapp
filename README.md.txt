## 📦 QuickMail - Package Delivery Web App

**QuickMail** is a React-based frontend demo app for booking, tracking, and managing intercity package deliveries. It supports both customers and delivery partners.

---

### ✨ Features

* **Dual Mode:** Customer and Partner view
* **Package Booking:** Select cities, package type, speed, and address
* **Real-Time Price Calculation:** Based on urgency, city, and fragile settings
* **Partner Dashboard:** Delivery stats, available routes, incoming requests
* **Tracking System:** Order status, driver details, and update history

---

### 🛠️ Tech Stack

* **React.js** (Functional components)
* **Lucide-React Icons** for UI visuals
* **Tailwind CSS** for layout (assumed via className usage)

---

### 📁 Project Structure (Suggested Split)

Currently, everything is in one `.tsx` file. You can split it like:

```
/src
├── components
│   ├── BookingForm.tsx
│   ├── TrackingView.tsx
│   ├── PartnerDashboard.tsx
│   └── HomeView.tsx
├── data
│   ├── cities.ts
│   ├── packageTypes.ts
│   ├── urgencyOptions.ts
│   └── mockOrders.ts
├── utils
│   └── priceCalculator.ts
├── App.tsx
└── index.tsx
```

---

### 🚀 How to Run

1. **Install dependencies**

```bashs
npm install
```

2. **Start the server**

```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

---

### 🧠 How it Works (Code Summary)

* `useState` manages the app state: user type, booking info, order tracking, etc.
* `calculatePrice()` dynamically computes price using multipliers
* `useEffect` triggers price calculation when input changes
* Booking view allows city selection, package details, contact info
* Partner view shows performance stats, available delivery routes, and mock requests

---

### 📌 Notes

* No backend/API integration — currently uses **mock data**
* You can expand it by:

  * Adding authentication
  * Storing orders in Firebase/Backend
  * Adding map for live tracking

---

### 👨‍💻 Author & License

* Made for demo & learning purposes
* MIT License
