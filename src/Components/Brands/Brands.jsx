import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

const Brands = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { isLoading, data } = useQuery("brands", getBrands);

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

  const brands = data?.data.data;

  return (
    <div className="md:w-[90%] mx-auto">
      <h2 className="text-2xl font-bold text-center my-5">Brands</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5">
        {brands.map((brand) => (
          <div
            key={brand._id}
            onClick={() => setSelectedBrand(brand)}
            className="p-4 border rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="text-center mt-3 text-lg font-semibold text-green-700">
              {brand.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedBrand && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={() => setSelectedBrand(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-green-700">
              {selectedBrand.name}
            </h2>
            <img
              src={selectedBrand.image}
              alt={selectedBrand.name}
              className="w-full h-40 object-cover rounded-md mt-3"
            />
            <button
              onClick={() => setSelectedBrand(null)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
