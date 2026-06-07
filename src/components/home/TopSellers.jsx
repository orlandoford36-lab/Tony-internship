import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((response) => response.json())
      .then((data) => {
        setTopSellers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Top sellers fetch failed", error);
        setLoading(false);
      });
  }, []);

  const sellers = loading ? new Array(12).fill({}) : topSellers.slice(0, 12);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {sellers.map((seller, index) => (
                <li key={seller.id || index}>
                  <div className="author_list_pp">
                    <Link to={seller.authorId ? `/author/${seller.authorId}` : "/author"}>
                      {loading ? (
                        <div
                          className="skeleton-box"
                          style={{ width: 60, height: 60, borderRadius: "50%" }}
                        />
                      ) : (
                        <>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt={seller.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </>
                      )}
                    </Link>
                  </div>
                  <div className="author_list_info">
                    {loading ? (
                      <>
                        <div
                          className="skeleton-box"
                          style={{ width: 120, height: 16, borderRadius: 8, marginBottom: 8 }}
                        />
                        <div
                          className="skeleton-box"
                          style={{ width: 80, height: 14, borderRadius: 8 }}
                        />
                      </>
                    ) : (
                        <>
                        <Link to={seller.authorId ? `/author/${seller.authorId}` : "/author"}>{seller.authorName}</Link>
                        <span>{seller.price} ETH</span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
