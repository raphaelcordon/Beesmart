import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./StartingPagesRoutes/Home";
import Layout from "./Layout/StartingPageLayout";
import NotFound from "./NotFound";
import SignUpEndUser from "./StartingPagesRoutes/SignUpEndUser";
import BusinessSignUp from "./StartingPagesRoutes/BusinessSignUp";
import Login from "./StartingPagesRoutes/Login";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/private-signup" element={<SignUpEndUser />} />
          <Route path="/business-signup" element={<BusinessSignUp />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
