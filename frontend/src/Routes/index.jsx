import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./StartingPagesRoutes/Home";
import Layout from "./Layout/StartingPageLayout";
import NotFound from "./NotFound";
import SignUpEndUser from "../Components/SignUpComponents/SignUpEndUser";
import SignUpBusiness from "../Components/SignUpComponents/SignUpBusiness.jsx";
import Login from "./StartingPagesRoutes/Login";
import VerificationSection from "../Components/SignUpComponents/SignUpStepsBusiness/VerificationSection";
import BusinessUserRoutes from "./BusinessUserRoutes/index.jsx";
import EndUserRoutes from "./EndUserRoutes/index.jsx";
import ProtectedRoutes from "./ProtectedRoutes/index.jsx";
import BusinessCongratulationsSection from "../Components/SignUpComponents/SignUpStepsBusiness/CongratulationSection.jsx";
import EndUserCongratulationsSection from "../Components/SignUpComponents/SignUpStepsEndUser/CongratulationSection.jsx";
import GetCard from "./GetCard/index.jsx";
import GetStarted from "./StartingPagesRoutes/GetStarted.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/private-signup" element={<SignUpEndUser />} />
          <Route path="/business-signup" element={<SignUpBusiness />} />
          <Route path="/business-signup/congratulations" element={<BusinessCongratulationsSection />} />
          <Route path="/private-signup/congratulations" element={<EndUserCongratulationsSection />} />
          <Route path="/business-signup/verification" element={<VerificationSection />} />

          <Route path="/get-card/:id" element={<GetCard />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/business" element={<BusinessUserRoutes />} />
          <Route path="/user/:id" element={<EndUserRoutes />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
