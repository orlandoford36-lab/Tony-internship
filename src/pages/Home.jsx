import React, { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
 import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const ITEMS_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
const HOT_ENDPOINT =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [hotCollections, setHotCollections] = useState([]);
  const [loadingHot, setLoadingHot] = useState(true);

  useEffect(() => {
    setLoadingItems(true);
    fetch(ITEMS_ENDPOINT)
      .then((res) => res.json())
      .then((data) => setItems(data || []))
      .catch(() => setItems([]))
      .finally(() => setLoadingItems(false));

    setLoadingHot(true);
    fetch(HOT_ENDPOINT)
      .then((res) => res.json())
      .then((data) => setHotCollections(data || []))
      .catch(() => setHotCollections([]))
      .finally(() => setLoadingHot(false));
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections collections={hotCollections} loading={loadingHot} />
        <NewItems items={items} loading={loadingItems} /> 
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
