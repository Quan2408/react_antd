import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ProductsAdminPage from "./pages/admin/Products";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";
import LayoutWebsite from "./layouts/LayoutWebsite";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsAdminPage />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
