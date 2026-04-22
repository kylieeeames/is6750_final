const Location = () => {
  return (
    <div className="col-lg-5 mb-5">
      <div className="bg-light p-30 mb-30">
        <iframe
          title="MultiShop Location"
          style={{ width: "100%", height: "250px", border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.01935129513!2d-122.4194150846813!3d37.7749297797599!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815d4a8f6a5d%3A0x0!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1710000000000"
          frameBorder="0"
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
        />
      </div>
      <div className="bg-light p-30 mb-3">
        <p className="mb-2">
          <i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA
        </p>
        <p className="mb-2">
          <i className="fa fa-envelope text-primary mr-3"></i>info@example.com
        </p>
        <p className="mb-2">
          <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
        </p>
      </div>
    </div>
  );
};

export default Location;