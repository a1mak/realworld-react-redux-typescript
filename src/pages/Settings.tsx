import { AppDispatch } from "app/store";
import { logout } from "features/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <div>
      <h1>Settings</h1>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Settings;
