import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "../UI/Skeleton";
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
}

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

const HotCollections = ({ collections = [], loading = false }) => {
  const [visibleItems, setVisibleItems] = useState(8);

  const displayItems = (collections || []).slice(0, visibleItems);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  const skeletonCards = Array.from({ length: 4 }, (_, index) => (
    <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
      <div className="nft_coll">
        <div className="nft_wrap">
          <Skeleton width="100%" height="240px" borderRadius="16px" />
        </div>
        <div
          className="nft_coll_pp"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: -30,
          }}
        >
          <Skeleton width="60px" height="60px" borderRadius="50%" />
        </div>
        <div className="nft_coll_info">
          <Skeleton width="70%" height="18px" borderRadius="10px" />
          <div style={{ marginTop: 10 }}>
            <Skeleton width="45%" height="14px" borderRadius="10px" />
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <div className="col-12">
              <div className="row">{skeletonCards}</div>
            </div>
          ) : (
            <div className="col-12">
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
                swipeToSlide={true}
                draggable={true}
                prevArrow={<PrevArrow />}
                nextArrow={<NextArrow />}
                responsive={[
                  { breakpoint: 1200, settings: { slidesToShow: 3 } },
                  { breakpoint: 992, settings: { slidesToShow: 2 } },
                  { breakpoint: 576, settings: { slidesToShow: 1 } },
                ]}
              >
                {displayItems.map((item) => (
                  <div key={item.id} className="px-2">
                    <div className="nft_coll" data-aos="fade-right">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy img-fluid"
                            alt={item.title}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${item.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={item.authorImage}
                            alt={item.title}
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        {item.code ? <span>ERC-{item.code}</span> : null}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>

              {visibleItems < collections.length && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <button
                    className="btn-main"
                    onClick={() => setVisibleItems((prev) => prev + 4)}
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
