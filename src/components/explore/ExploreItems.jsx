import React, { useEffect, useState } from "react";
import AOS from "aos";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if (filter) url += `?filter=${filter}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Explore fetch failed", err);
        setItems([]);
        setLoading(false);
      });
  }, [filter]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = (params.get("search") || "").trim();
    setSearchTerm(q);
  }, [location.search]);

  useEffect(() => {
    if (!loading) AOS.refresh();
  }, [loading]);

  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = searchTerm
    ? (items || []).filter((it) => (it.title || "").toLowerCase().includes(searchTerm.toLowerCase()))
    : items || [];

  useEffect(() => {
    // initialize visible count based on available items (8 initially)
    setVisibleCount(Math.min(8, (filtered || []).length));
  }, [filtered]);

  const sellers = loading ? new Array(visibleCount).fill({}) : filtered.slice(0, visibleCount);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (expiryDate, nowTs) => {
    if (!expiryDate) return null;
    const expiry = typeof expiryDate === "number" ? expiryDate : Date.parse(expiryDate);
    const distance = expiry - nowTs;
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

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={(e) => setFilter(e.target.value)}>
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
                <Link to={`/author/${item.authorId}`} data-bs-toggle="tooltip" data-bs-placement="top">
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

              {loading ? (
                <div className="de_countdown">
                  <Skeleton width={120} height={16} borderRadius={8} />
                </div>
              ) : (
                item.expiryDate ? <div className="de_countdown">{formatCountdown(item.expiryDate, now)}</div> : null
              )}

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
        {!loading && filtered && visibleCount < filtered.length ? (
          <button id="loadmore" className="btn-main lead" onClick={() => setVisibleCount((c) => Math.min(filtered.length, c + 4))}>
            Load more
          </button>
        ) : null}
      </div>
    </>
  );
};

export default ExploreItems;
