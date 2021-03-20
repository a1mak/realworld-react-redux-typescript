import SignInForm from "features/Authentication/components/SignInForm";

const Login: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
