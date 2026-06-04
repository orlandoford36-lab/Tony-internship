import Slider from "react-slick";

function HotCollections() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      <div><h3>Collection 1</h3></div>
      <div><h3>Collection 2</h3></div>
      <div><h3>Collection 3</h3></div>
    </Slider>
  );
}