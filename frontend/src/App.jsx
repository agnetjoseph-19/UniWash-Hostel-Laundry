import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PickupBanner from "./components/PickupBanner";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import WhyUniWash from "./components/WhyUniWash";
import Footer from "./components/Footer";

import Login from "./components/Login";
import Register from "./components/Register";
import StudentDashboard from "./components/StudentDashboard";
import BookLaundry from "./components/BookLaundry";
import BookingSummary from "./components/BookingSummary";
import Payment from "./components/Payment";
import PaymentSuccess from "./components/PaymentSuccess";
import MyBookings from "./components/MyBookings";
import LaundryStatus from "./components/LaundryStatus";
import Complaints from "./components/Complaints";
import AdminDashboard from "./components/AdminDashboard";
import StaffDashboard from "./components/StaffDashboard";

import "./App.css";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PickupBanner />
      <Services />
      <HowItWorks />
      <WhyUniWash />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/book-laundry"
          element={<BookLaundry />}
        />

        <Route
          path="/booking-summary"
          element={<BookingSummary />}
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="/laundry-status"
          element={<LaundryStatus />}
        />

        <Route
          path="/complaints"
          element={<Complaints />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/staff-dashboard"
          element={<StaffDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;