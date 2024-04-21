import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./StartingPagesRoutes/Home";
import Layout from "./Layout/StartingPageLayout";
import NotFound from "./NotFound";
import SignUpEndUser from "./StartingPagesRoutes/SignUpEndUser";
import BusinessSignUp from "./StartingPagesRoutes/BusinessSignUp";
import Login from "./StartingPagesRoutes/Login";
import VerificationSection from "./StartingPagesRoutes/SignUpStepsBusiness/VerificationSection";
import BusinessUserRoutes from "./BusinessUserRoutes/index.jsx";
import EndUserRoutes from "./EndUserRoutes/index.jsx";
import ProtectedRoutes from "./ProtectedRoutes/index.jsx";
import BusinessCongratulationsSection from "./StartingPagesRoutes/SignUpStepsBusiness/CongratulationSection";
import EndUserCongratulationsSection from "./StartingPagesRoutes/SignUpStepsEndUser/CongratulationSection.jsx";
import GetCard from "./GetCard/index.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/private-signup" element={<SignUpEndUser />} />
          <Route path="/business-signup" element={<BusinessSignUp />} />
          <Route path="/business-signup/congratulations" element={<BusinessCongratulationsSection />} />
          <Route path="/private-signup/congratulations" element={<EndUserCongratulationsSection />} />
          <Route path="/business-signup/verification" element={<VerificationSection />} />

          <Route path="/get-card/:id" element={<GetCard />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/business" element={<BusinessUserRoutes />} />
        </Route>

        <Route path="/user/:id" element={<EndUserRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
