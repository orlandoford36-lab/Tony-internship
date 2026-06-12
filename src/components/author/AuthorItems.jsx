import React, { useEffect } from "react";
import AuthorThumbnail from "../../images/author_thumbnail.jpg";
import AOS from "aos";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ items, loading }) => {
  useEffect(() => {
    if (!loading) {
      AOS.refresh();
    }
  }, [loading]);

  const renderPlaceholder = (i) => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={"skel-" + i}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Skeleton width="50px" height="50px" borderRadius="50%" />
        </div>
        <div className="nft__item_wrap">
          <Skeleton width="100%" height="180px" />
        </div>
        <div className="nft__item_info">
          <Skeleton width="60%" height="18px" />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <Skeleton width="30%" height="16px" />
            <Skeleton width="20%" height="16px" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderItem = (item) => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
      <div className="nft__item" data-aos="zoom-in">
        <div className="author_list_pp">
          <Link to={`/author/${item.authorId}`}>
            <img
              className="lazy"
              src={item.authorImage || AuthorThumbnail}
              alt={item.authorName || "author"}
            />
            <i className="fa fa-check"></i>
          </Link>
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
            <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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
  );

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, i) => renderPlaceholder(i))
            : (items || []).map((it) => renderItem(it))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
