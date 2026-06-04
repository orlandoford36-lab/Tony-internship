import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!nftId) return;

    setLoading(true);
    fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Item details fetch failed", error);
        setError("Unable to load item details.");
        setLoading(false);
      });
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center" data-aos="fade-right">
                {loading ? (
                  <Skeleton width="100%" height="440px" borderRadius="20px" />
                ) : item ? (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={item.title}
                  />
                ) : (
                  <div className="text-center">{error || "Item not found."}</div>
                )}
              </div>

              <div className="col-md-6" data-aos="fade-left">
                <div className="item_info">
                  <h2>{loading ? <Skeleton width="60%" height="32px" borderRadius="8px" /> : item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? <Skeleton width="40px" height="18px" borderRadius="8px" /> : item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? <Skeleton width="30px" height="18px" borderRadius="8px" /> : item.likes}
                    </div>
                  </div>

                  <p>
                    {loading ? (
                      <Skeleton width="100%" height="16px" borderRadius="8px" />
                    ) : (
                      item.description
                    )}
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={item ? `/author?author=${item.ownerId}` : "/author"}>
                            {loading ? (
                              <Skeleton width="50px" height="50px" borderRadius="50%" />
                            ) : (
                              <>
                                <img className="lazy" src={item.ownerImage} alt={item.ownerName} />
                                <i className="fa fa-check"></i>
                              </>
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={item ? `/author?author=${item.ownerId}` : "/author"}>
                            {loading ? <Skeleton width="120px" height="18px" borderRadius="8px" /> : item.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={item ? `/author?author=${item.creatorId}` : "/author"}>
                            {loading ? (
                              <Skeleton width="50px" height="50px" borderRadius="50%" />
                            ) : (
                              <>
                                <img className="lazy" src={item.creatorImage} alt={item.creatorName} />
                                <i className="fa fa-check"></i>
                              </>
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={item ? `/author?author=${item.creatorId}` : "/author"}>
                            {loading ? <Skeleton width="120px" height="18px" borderRadius="8px" /> : item.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{loading ? <Skeleton width="40px" height="18px" borderRadius="8px" /> : item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
