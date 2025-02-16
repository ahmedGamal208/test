import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import Products from "../Products/Products";

const Home = () => {
  return (
    <div className="md:w-[90%] mx-auto">
      <HomeSlider />
      <CategorySlider />
      <Products />
    </div>
  );
};

export default Home;
