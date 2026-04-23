import { useActionData } from "react-router-dom";
import ContactForm from "../components/Contact/ContactForm";
import Location from "../components/Contact/Location";
import db from "../utils/db";

const ContactPage = () => {
  const actionData = useActionData();

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5">
        <ContactForm actionData={actionData} />
        <Location />
      </div>
    </div>
  );
};

export async function contactAction({ request }) {
  const formData = await request.formData();

  const contactData = Object.fromEntries(formData);

  try {
    const response = await db.post("contacts", contactData);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || error.message || "An unknown error occurred.",
    };
  }
}

export default ContactPage;