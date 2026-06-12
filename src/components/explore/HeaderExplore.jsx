import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderExplore = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = (query || "").trim();
    if (trimmed) navigate(`/explore?search=${encodeURIComponent(trimmed)}`);
    else navigate(`/explore`);
  };

  return (
    <div className="col-lg-12">
      <div className="items_filter">
        <form
          className="row form-dark"
          id="form_quick_search"
          name="form_quick_search"
          onSubmit={handleSubmit}
        >
          <div className="col text-center">
            <input
              className="form-control"
              id="name_1"
              name="name_1"
              placeholder="search item here..."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />{" "}
            <button id="btn-submit" type="submit">
              <i className="fa fa-search bg-color-secondary"></i>
            </button>
            <div className="clearfix"></div>
          </div>
        </form>

        <div id="item_category" className="dropdown">
          <a href="#" className="btn-selector">
            All categories
          </a>
          <ul>
            <li className="active">
              <span>All categories</span>
            </li>
            <li>
              <span>Art</span>
            </li>
            <li>
              <span>Music</span>
            </li>
            <li>
              <span>Domain Names</span>
            </li>
            <li>
              <span>Virtual World</span>
            </li>
            <li>
              <span>Trading Cards</span>
            </li>
            <li>
              <span>Collectibles</span>
            </li>
            <li>
              <span>Sports</span>
            </li>
            <li>
              <span>Utility</span>
            </li>
          </ul>
        </div>

        <div id="buy_category" className="dropdown">
          <a href="#" className="btn-selector">
            Buy Now
          </a>
          <ul>
            <li className="active">
              <span>Buy Now</span>
            </li>
            <li>
              <span>On Auction</span>
            </li>
            <li>
              <span>Has Offers</span>
            </li>
          </ul>
        </div>

        <div id="items_type" className="dropdown">
          <a href="#" className="btn-selector">
            All Items
          </a>
          <ul>
            <li className="active">
              <span>All Items</span>
            </li>
            <li>
              <span>Single Items</span>
            </li>
            <li>
              <span>Bundles</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderExplore;
