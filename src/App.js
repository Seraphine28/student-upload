// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// 🟡 Student Pages
import HomeStudent from "./components/Student/HomeStudent";
import HomeRecruiter from "./components/Recruiter/HomeRecruiter";

import UploadPortfolio from "./pages/UploadPortfolio";
import WorkStatusPage from "./pages/WorkStatusPage";
import EditPage from "./pages/EditPage";
import StudentResubmit from "./pages/StudentResubmit";
import PortfolioFail from "./pages/PortfolioFail";
import CommentPage from './pages/CommentPage';


// 💗 Advisor Pages
import VerifyPortfolioAdvisor from "./components/AdminAdvisor/VerifyPortfolio"; // ชื่อให้ชัดว่าเป็น Advisor
import AdvisorReview from "./pages/AdvisorReview";

// 👑 Super Admin Pages
import VerifyPortfolioSuper from "./components/SuperAdmin/VerifyPortfolioDone"; // หน้า list ของ super (ตามที่คุณตั้งชื่อ)
import VerifyAcc from "./components/SuperAdmin/VerifyAcc"; // ✅ หน้า verify account ของ super
import SuperReview from "./pages/SuperReview.jsx";
import UserApprovalDetail from "./pages/UserApprovalDetail.jsx";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* 🏠 Default: Redirect to student home */}
      <Route path="/" element={<Navigate to="/student/home" replace />} />

      {/* 🟡 STUDENT ROUTES */}
      <Route path="/student/home" element={<HomeStudent />} />
      <Route path="/student/portfolio-form" element={<UploadPortfolio />} />
      <Route path="/student/status" element={<WorkStatusPage showControls={true} />} />
      <Route path="/student/edit/:id" element={<EditPage />} />
      <Route path="/student/resubmit/:id" element={<StudentResubmit />} />  {/* ✅ ทำให้สม่ำเสมอ */}
      <Route path="/student/fail-status-error" element={<PortfolioFail />} />
      <Route path="/project/:projectId/comments" element={<CommentPage />} />

      <Route path="/recruiter/home" element={<HomeRecruiter/>} />

      {/* 💗 ADVISOR ROUTES */}
      <Route path="/advisor/verify" element={<VerifyPortfolioAdvisor />} />
      <Route path="/advisor/review/:id" element={<AdvisorReview />} />

      {/* 👑 SUPER ADMIN ROUTES */}
      <Route path="/super/verify" element={<VerifyPortfolioSuper />} />
      <Route path="/super/review/:id" element={<SuperReview />} />
      <Route path="/super/verify-acc" element={<VerifyAcc />} />         {/* ✅ ใช้หน้า VerifyAcc ของ super */}
      <Route path="/super/user-approval/:id" element={<UserApprovalDetail />} />
      
      {/* 🚧 Fallback */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

