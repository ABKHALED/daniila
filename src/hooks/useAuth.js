import { useSelector } from "react-redux";
import { selectCurrentToken } from "../components/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "customer";

  if (token) {
    const decoded = jwtDecode(token);
    const user = decoded.UserInfo._doc;
    const {
      firstName,
      lastName,
      picturePath,
      email,
      favorite,
      orders,
      phoneNumber,
      roles,
      _id,
    } = user;
    isManager = roles.includes("customer");
    isAdmin = roles.includes("admin");
    if (isManager) status = "customer";
    if (isAdmin) status = "admin";

    return {
      firstName,
      lastName,
      picturePath,
      email,
      favorite,
      orders,
      phoneNumber,
      roles,
      _id,
      status,
      isManager,
      isAdmin,
    };
  }

  return {
    firstName: null,
    lastName: null,
    picturePath: null,
    email: null,
    favorite: null,
    orders: null,
    phoneNumber: null,
    _id: null,
    roles: [],
    isManager,
    isAdmin,
    status,
  };
};
export default useAuth;
