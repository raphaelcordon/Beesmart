import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./StartingPagesRoutes/Home"
import Layout from "./Layout/StartingPageLayout"
import NotFound from "./NotFound"

const Router = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>
    </BrowserRouter>
)
}

export default Router