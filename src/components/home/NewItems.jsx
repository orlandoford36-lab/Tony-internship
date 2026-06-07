import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const arrowBaseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  zIndex: 3,
  width: 44,
  height: 44,
  background: "#ffffff",
  border: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 6px 14px rgba(13,38,59,0.08)",
  borderRadius: "50%",
  cursor: "pointer",
  color: "#111",
  padding: 0,
};

const PrevArrow = ({ className, style, onClick }) => (
  <button
    type="button"
    aria-label="Previous"
    className={className}
    style={{ ...style, ...arrowBaseStyle, left: 6 }}
    onClick={onClick}
  >
    <i
      className="fa fa-chevron-left"
      style={{
        fontSize: 18,
        lineHeight: 1,
        display: "block",
        color: "#111",
        position: "relative",
        left: -1,
      }}
    ></i>
  </button>
);

const NextArrow = ({ className, style, onClick }) => (
  <button
    type="button"
    aria-label="Next"
    className={className}
    style={{ ...style, ...arrowBaseStyle, right: 6 }}
    onClick={onClick}
  >
    <i
      className="fa fa-chevron-right"
      style={{ fontSize: 18, lineHeight: 1, display: "block", color: "#111" }}
    ></i>
  </button>
);

const formatCountdown = (expiryDate, now) => {
  if (!expiryDate) return "Live now";
  const distance = expiryDate - now;
  if (distance <= 0) return "Expired";

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("New items fetch failed", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-12">
            {loading ? (
              <div className="row">
                {new Array(4).fill(0).map((_, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <div className="skeleton-box" style={{ width: 60, height: 60, borderRadius: "50%" }} />
                      </div>
                      <div className="de_countdown">
                        <div className="skeleton-box" style={{ width: 120, height: 18, borderRadius: 8 }} />
                      </div>
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <div className="skeleton-box" style={{ width: "100%", height: 36, borderRadius: 12 }} />
                          </div>
                        </div>
                        <div className="skeleton-box" style={{ width: "100%", height: 240, borderRadius: 16 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Slider {...sliderSettings}>
                {items.map((item) => (
                  <div key={item.id} className="px-2">
                    <div className="nft__item" data-aos="flip-left">
                      <div className="author_list_pp">
                        <Link
                          to={`/author?author=${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.title}`}
                        >
                          <img className="lazy" src={item.authorImage} alt={item.title} />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      <div className="de_countdown">
                        {formatCountdown(item.expiryDate, now)}
                      </div>

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <button type="button" className="share-btn" aria-label="Share on Facebook">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </button>
                                <button type="button" className="share-btn" aria-label="Share on Twitter">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </button>
                                <button type="button" className="share-btn" aria-label="Share by Email">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </button>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
