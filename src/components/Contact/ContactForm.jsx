import { Form } from "react-router-dom";

const ContactForm = ({ actionData }) => {
  const actionMessage = actionData
    ? actionData.success
      ? `Contact request saved. Request ID: ${actionData.data?.name}`
      : `An error occurred: ${actionData.message}`
    : null;

  return (
    <div className="col-lg-7 mb-5">
      <div className="contact-form bg-light p-30">
        <div id="success">
          {actionMessage ? (
            <div
              className={`alert ${actionData.success ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {actionMessage}
            </div>
          ) : null}
        </div>
        <Form method="post" noValidate={false}>
          <div className="control-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              data-validation-required-message="Please enter your name"
            />
            <p className="help-block text-danger"></p>
          </div>
          <div className="control-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Your Email"
              required
              data-validation-required-message="Please enter your email"
            />
            <p className="help-block text-danger"></p>
          </div>
          <div className="control-group">
            <input
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              placeholder="Subject"
              required
              data-validation-required-message="Please enter a subject"
            />
            <p className="help-block text-danger"></p>
          </div>
          <div className="control-group">
            <textarea
              className="form-control"
              rows="8"
              id="message"
              name="message"
              placeholder="Message"
              required
              data-validation-required-message="Please enter your message"
            ></textarea>
            <p className="help-block text-danger"></p>
          </div>
          <div>
            <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">
              Send Message
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;