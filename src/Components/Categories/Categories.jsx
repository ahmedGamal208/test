import axios from "axios";
import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";

const Categories = () => {
  async function getCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { isLoading, data } = useQuery("categories", getCategories);

  if (isLoading) {
    return (
      <div className="h-screen bg-green-700 flex justify-center items-center">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
        />
      </div>
    );
  }

  const categories = data?.data.data;

  return (
    <div className="md:w-[90%] mx-auto">
      <h2 className="text-2xl font-bold text-center my-5">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 px-20">
        {categories.map((category) => (
          <div
            key={category._id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[24rem] object-cover rounded-md"
            />
            <h3 className="text-center mt-3 text-lg font-semibold text-green-700">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
