import Slider from "react-slick";
import jewelry from "./../../assets/images/jewelry.jpg";
import chair from "./../../assets/images/child-chair.jpg";
import bag from "./../../assets/images/bag.jpg";
import guitar from "./../../assets/images/guitar.jpg";
import bag2 from "./../../assets/images/bag2.jpg";

export default function HomeSlider() {
  const CustomArrow = ({ onClick, direction }) => (
    <button
      onClick={onClick}
      className={`absolute bottom-[-30px] ${
        direction === "prev"
          ? "left-1/2 -translate-x-6"
          : "left-1/2 translate-x-6"
      } flex items-center justify-center`}
    >
      <div className="w-4 h-2 bg-[#D8D8D8] hover:bg-[#869791] rounded-lg transition"></div>
    </button>
  );

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
  };

  return (
    <section className="py-7 mb-5 relative">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start w-full md:w-4/6 mx-auto px-4 md:px-0 gap-6">
        <div className="w-full md:w-1/2 lg:w-1/3 relative">
          <Slider {...settings}>
            <div>
              <img
                src={bag}
                className="w-full h-auto object-cover rounded-lg"
                alt="jewelry"
              />
            </div>
            <div>
              <img
                src={chair}
                className="w-full h-auto object-cover rounded-lg"
                alt="chair"
              />
            </div>
            <div>
              <img
                src={jewelry}
                className="w-full h-auto object-cover rounded-lg"
                alt="bag"
              />
            </div>
          </Slider>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0">
          <img
            src={bag2}
            className="w-full h-auto object-cover rounded-lg mb-2"
            alt="bag2"
          />
          <img
            src={guitar}
            className="w-full h-auto object-cover rounded-lg"
            alt="guitar"
          />
        </div>
      </div>
    </section>
  );
}
