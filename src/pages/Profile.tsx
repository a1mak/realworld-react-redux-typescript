import { useParams } from "react-router-dom";

const Profile: React.FC = () => {
  const params = useParams<{ username: string }>();
  
  return (
    <div>
      <h1>Profile</h1>
      <h2>@{params.username}</h2>
    </div>
  );
};

export default Profile;
