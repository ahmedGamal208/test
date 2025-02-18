import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "react-query";

export default function CategorySlider() {
  const { data } = useQuery("categories", getAllCategories);

  async function getAllCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const CustomArrow = ({ onClick, direction }) => (
    <button
      onClick={onClick}
      className={`absolute bottom-[-40px] ${
        direction === "prev"
          ? "left-1/2 -translate-x-1"
          : "left-1/2 translate-x-6"
      } flex items-center justify-center`}
    >
      {direction === "prev" ? (
        <div className="w-4 h-2 bg-[#D8D8D8] hover:bg-[#869791] rounded-lg transition mb-3"></div>
      ) : (
        <div className="w-4 h-2 bg-[#D8D8D8] hover:bg-[#869791] rounded-lg transition mb-3"></div>
      )}
    </button>
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-6 mx-auto relative">
      <Slider {...settings}>
        {data?.data.data.map((item, idx) => (
          <div key={idx} className="p-2">
            <img
              src={item.image}
              className="w-full h-[300px] object-cover rounded-lg"
              alt={item.name}
            />
            <h3 className="text-green-600 text-center font-bold mt-2">
              {item.name}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
