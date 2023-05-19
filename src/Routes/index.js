import { Routes, Route } from "react-router-dom";
import { Customers } from "../pages/Customers";
import { Notifications } from "../pages/Notifications";
import { Users } from "../pages/Users";
import Support from "../pages/Support";
import Emaills from "../pages/Emaills";
import CustomerDetail from "../pages/CustomerDetail";
import CreateAccount from "../pages/CreateAccount";
import ChangePassword from "../pages/ChangePassword";
import Signin from "../pages/Signin";
import Home from "../pages/Home";
import ChapaDetail from "../pages/ChapaDetail";
import Partners from "../pages/partners";
import ViewPartner from "../pages/partners/viewpartners";
import ExpiredLicense from "../pages/Expired";
import Trials from "../pages/trials";
import Marketing from "../pages/marketing";
const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/trials" element={<Trials />} />
      <Route path="/expired" element={<ExpiredLicense />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/viewpartners" element={<ViewPartner />} />
      <Route path="/marketing" element={<Marketing />} />
      <Route path="/users" element={<Users />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/support" element={<Support />} />
      <Route path="/emails" element={<Emaills />} />
      <Route path="/customerdetail" element={<CustomerDetail />} />
      <Route path="/chapadetail" element={<ChapaDetail />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/changepassword" element={<ChangePassword />} />
    </Routes>
  );
};

export default MainRoute;
