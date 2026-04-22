import { useContext, useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import db from "../../utils/db";
import ProductContext from "../../store/product-context";
import CartContext from "../../store/cart-context";

const ProductDetail = ({ productID }) => {
  // Retrieve product data from context
  const prodCtx = useContext(ProductContext);
  const cartCtx = useContext(CartContext);
  const userData = useRouteLoaderData("root");
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const product = prodCtx.getProduct(productID);

  const addToCartHandler = () => {
    if (!product) return;

    cartCtx.addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: Number(quantity),
    });
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await db.get(`/reviews/${productID}.json`);
      const reviewData = response.data;

      if (reviewData) {
        const loadedReviews = Object.entries(reviewData).map(([id, review]) => ({
          id,
          ...review,
        }));
        setReviews(loadedReviews);
      } else {
        setReviews([]);
      }
    };

    fetchReviews();
  }, [productID]);

  const submitReviewHandler = async (event) => {
    event.preventDefault();

    if (!userData) {
      setReviewMessage("Please log in to leave a review.");
      return;
    }

    try {
      const reviewData = {
        reviewText,
        userId: userData.localId,
        productId: Number(productID),
        date: new Date().toISOString(),
        name: `${userData.firstname} ${userData.lastname}`.trim(),
        email: userData.email,
      };

      await db.post(`/reviews/${productID}.json`, reviewData);
      setReviewText("");
      setReviewMessage("Review saved.");

      const response = await db.get(`/reviews/${productID}.json`);
      const reviewDataList = response.data;

      if (reviewDataList) {
        const loadedReviews = Object.entries(reviewDataList).map(([id, review]) => ({
          id,
          ...review,
        }));
        setReviews(loadedReviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      setReviewMessage(error.response?.data?.error || error.message || "An unknown error occurred.");
    }
  };

  if (product)
    return (
      // <!-- Product Detail Start -->
      <div className="container-fluid pb-5">
        {/* <!-- Product Info Start --> */}
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div
              id="product-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner bg-light">
                {product.images?.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        className="w-100 h-100"
                        src={image}
                        alt={product.title}
                      />
                    </div>
                  );
                })}
              </div>
              <a
                className="carousel-control-prev"
                href="#product-carousel"
                data-slide="prev"
              >
                <i className="fa fa-2x fa-angle-left text-dark"></i>
              </a>
              <a
                className="carousel-control-next"
                href="#product-carousel"
                data-slide="next"
              >
                <i className="fa fa-2x fa-angle-right text-dark"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{product.title}</h3>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star-half-alt"></small>
                  <small className="far fa-star"></small>
                </div>
                <small className="pt-1">(99 Reviews)</small>
              </div>
              <h3 className="font-weight-semi-bold mb-4">
                ${product.price.toFixed(2)}
              </h3>
              <p className="mb-4">{product.description}</p>
              <div className="d-flex mb-3">
                <strong className="text-dark mr-3">Sizes:</strong>
                <form>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-1"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-1">
                      XS
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-2"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-2">
                      S
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-3"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-3">
                      M
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-4"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-4">
                      L
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="size-5"
                      name="size"
                    />
                    <label className="custom-control-label" htmlFor="size-5">
                      XL
                    </label>
                  </div>
                </form>
              </div>
              <div className="d-flex mb-4">
                <strong className="text-dark mr-3">Colors:</strong>
                <form>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-1"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-1">
                      Black
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-2"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-2">
                      White
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-3"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-3">
                      Red
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-4"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-4">
                      Blue
                    </label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      className="custom-control-input"
                      id="color-5"
                      name="color"
                    />
                    <label className="custom-control-label" htmlFor="color-5">
                      Green
                    </label>
                  </div>
                </form>
              </div>
              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: "130px" }}
                >
                  <input
                    type="number"
                    className="form-control bg-secondary border-0 text-center"
                    min="1"
                    value={quantity}
                    onChange={(event) => {
                      const nextQuantity = Number(event.target.value);
                      setQuantity(nextQuantity > 0 ? nextQuantity : 1);
                    }}
                  />
                </div>
                <button className="btn btn-primary px-3" onClick={addToCartHandler}>
                  <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                </button>
              </div>
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Share on:</strong>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="/temp">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="text-dark px-2" href="/temp">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="text-dark px-2" href="/temp">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="text-dark px-2" href="/temp">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Product Info End --> */}

        {/* <!-- Product Specs Start --> */}
        <div className="row px-xl-5">
          <div className="col">
            <div className="bg-light p-30">
              <div className="nav nav-tabs mb-4">
                <a
                  className="nav-item nav-link text-dark active"
                  data-toggle="tab"
                  href="#tab-pane-1"
                >
                  Description
                </a>
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-2"
                >
                  Information
                </a>
                <a
                  className="nav-item nav-link text-dark"
                  data-toggle="tab"
                  href="#tab-pane-3"
                >
                  Reviews ({reviews.length})
                </a>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-pane-1">
                  <h4 className="mb-3">Product Description</h4>
                  {product.description}
                </div>
                <div className="tab-pane fade" id="tab-pane-2">
                  <h4 className="mb-3">Additional Information</h4>
                  <p>
                    Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                    sea. Consetetur vero aliquyam invidunt duo dolores et duo
                    sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod
                    consetetur invidunt sed sed et, lorem duo et eos elitr,
                    sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed
                    tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing,
                    eos dolores sit no ut diam consetetur duo justo est, sit
                    sanctus diam tempor aliquyam eirmod nonumy rebum dolor
                    accusam, ipsum kasd eos consetetur at sit rebum, diam kasd
                    invidunt tempor lorem, ipsum lorem elitr sanctus eirmod
                    takimata dolor ea invidunt.
                  </p>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">
                          Sit erat duo lorem duo ea consetetur, et eirmod
                          takimata.
                        </li>
                        <li className="list-group-item px-0">
                          Amet kasd gubergren sit sanctus et lorem eos
                          sadipscing at.
                        </li>
                        <li className="list-group-item px-0">
                          Duo amet accusam eirmod nonumy stet et et stet eirmod.
                        </li>
                        <li className="list-group-item px-0">
                          Takimata ea clita labore amet ipsum erat justo
                          voluptua. Nonumy.
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">
                          Sit erat duo lorem duo ea consetetur, et eirmod
                          takimata.
                        </li>
                        <li className="list-group-item px-0">
                          Amet kasd gubergren sit sanctus et lorem eos
                          sadipscing at.
                        </li>
                        <li className="list-group-item px-0">
                          Duo amet accusam eirmod nonumy stet et et stet eirmod.
                        </li>
                        <li className="list-group-item px-0">
                          Takimata ea clita labore amet ipsum erat justo
                          voluptua. Nonumy.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="mb-4">Reviews for "{product.title}"</h4>
                      {reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                      ) : (
                        reviews.map((review) => (
                          <div className="media mb-4" key={review.id}>
                            <img
                              src="img/user.jpg"
                              alt="User"
                              className="img-fluid mr-3 mt-1"
                              style={{ width: "45px" }}
                            />
                            <div className="media-body">
                              <h6>
                                {review.name}
                                <small>
                                  {" "}
                                  - <i>{new Date(review.date).toLocaleDateString()}</i>
                                </small>
                              </h6>
                              <p>{review.reviewText}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="col-md-6">
                      {userData ? (
                        <>
                          <h4 className="mb-4">Leave a review</h4>
                          {reviewMessage ? <p className="mb-2">{reviewMessage}</p> : null}
                          <form onSubmit={submitReviewHandler}>
                            <div className="form-group">
                              <label htmlFor="message">Your Review *</label>
                              <textarea
                                id="message"
                                cols="30"
                                rows="5"
                                className="form-control"
                                value={reviewText}
                                onChange={(event) => setReviewText(event.target.value)}
                                required
                              ></textarea>
                            </div>
                            <div className="form-group">
                              <label htmlFor="name">Your Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={`${userData.firstname} ${userData.lastname}`.trim()}
                                readOnly
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="email">Your Email *</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={userData.email}
                                readOnly
                              />
                            </div>
                            <div className="form-group mb-0">
                              <input
                                type="submit"
                                value="Leave Your Review"
                                className="btn btn-primary px-3"
                              />
                            </div>
                          </form>
                        </>
                      ) : (
                        <div>
                          <h4 className="mb-4">Leave a review</h4>
                          <p>
                            Please <Link to="/login">log in</Link> to leave a review.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Product Specs End --> */}
      </div>
      // * <!-- Product Detail End -->
    );
};

export default ProductDetail;
