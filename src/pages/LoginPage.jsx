import { useActionData } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
  const actionData = useActionData();

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 justify-content-center">
        <LoginForm actionData={actionData} />
      </div>
    </div>
  );
};

export default LoginPage;
