import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if (filter) url += `?filter=${filter}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Explore fetch failed", err);
        setLoading(false);
      });
  }, [filter]);

  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  const sellers = loading ? new Array(8).fill({}) : items;

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      <div className="row">
        {sellers.map((item, index) => (
          <div
            key={item.id || index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item" data-aos="fade-up">
              <div className="author_list_pp">
                <Link to={`/author?author=${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
                  {loading ? (
                    <Skeleton width={60} height={60} borderRadius="50%" />
                  ) : (
                    <>
                      <img className="lazy" src={item.authorImage} alt={item.authorName} />
                      <i className="fa fa-check"></i>
                    </>
                  )}
                </Link>
              </div>

              <div className="de_countdown">{!loading && item.expiryDate ? new Date(item.expiryDate).toLocaleString() : (loading ? <Skeleton width={120} height={16} borderRadius={8} /> : null)}</div>

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    {loading ? (
                      <Skeleton width="100%" height={36} borderRadius={12} />
                    ) : (
                      <>
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {loading ? (
                  <Skeleton width="100%" height={240} borderRadius={16} />
                ) : (
                  <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
                  </Link>
                )}
              </div>

              <div className="nft__item_info">
                {loading ? (
                  <>
                    <Skeleton width={120} height={16} borderRadius={8} />
                    <div style={{ height: 6 }} />
                    <Skeleton width={80} height={14} borderRadius={8} />
                  </>
                ) : (
                  <>
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
