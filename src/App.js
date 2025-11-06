import { Routes, Route, Navigate } from "react-router-dom";
import HomeStudent from "./components/Student/HomeStudent";

import UploadPortfolio from "./pages/UploadPortfolio";
import WorkStatusPage from "./pages/WorkStatusPage";
import EditPage from "./pages/EditPage";
import StudentResubmit from "./pages/StudentResubmit";
import PortfolioFail from "./pages/PortfolioFail";


import ProfilePage from './pages/ProfilePage';
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* เจอ / ให้พาไป /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<HomeStudent />} />
      <Route path="/edit/:projectId" element={<EditPage />} />
      <Route path="/fail-status-error" element={<PortfolioFail />} />
      <Route path="/resubmit/:projectId" element={<StudentResubmit />} />
      <Route path="/status" element={<WorkStatusPage showControls={true} />} />
      <Route path="/portfolio-form" element={<UploadPortfolio />} />
      <Route path="/profile" element={<ProfilePage showControls={false} />}/>
      
      {/* กันพลาดเส้นทางอื่น */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
