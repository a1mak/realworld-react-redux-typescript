import SignUpForm from "features/Authentication/components/SignUpForm";

const Register: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
