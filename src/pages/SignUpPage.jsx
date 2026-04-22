import { useActionData } from "react-router-dom";
import SignUpForm from "../components/Auth/SignUpForm";

const SignUpPage = () => {
  const actionData = useActionData();

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 justify-content-center">
        <SignUpForm actionData={actionData} />
      </div>
    </div>
  );
};

export default SignUpPage;
