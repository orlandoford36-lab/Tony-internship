import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const FollowButton = ({ initialCount = 0 }) => {
  const [following, setFollowing] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleFollow = () => {
    if (following) {
      setCount((c) => Math.max(0, c - 1));
    } else {
      setCount((c) => c + 1);
    }
    setFollowing((f) => !f);
  };

  return (
    <button className="btn-main" onClick={toggleFollow} aria-pressed={following}>
      {following ? "Following" : "Follow"}
      <span style={{ marginLeft: 8 }} className="small-text">{count}</span>
    </button>
  );
};

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authorId } = useParams();

  useEffect(() => {
    const id = authorId || "73855012";

    setLoading(true);
    fetch(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    )
      .then((res) => res.json())
      .then((data) => setAuthor(data))
      .catch(() => setAuthor(null))
      .finally(() => setLoading(false));
  }, [authorId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={AuthorBanner ? `url(${AuthorBanner}) top` : undefined}
          style={{ background: `url(${author?.banner || AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img
                          src={author?.authorImage || "/images/author_thumbnail.jpg"}
                          alt="author"
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width="240px" height="20px" />
                          ) : (
                            <>
                              {author?.authorName}
                              <span className="profile_username">@{author?.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {author?.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {loading ? <Skeleton width="80px" height="20px" /> : `${author?.followers} followers`}
                        </div>
                        {loading ? (
                          <button className="btn-main" disabled>Follow</button>
                        ) : (
                          <FollowButton initialCount={author?.followers || 0} />
                        )}
                      </div>
                    </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={author?.nftCollection} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
