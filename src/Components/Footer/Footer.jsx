const Footer = () => {
  return (
    <div className="bg-[#F8F9FA] py-10 px-4">
      <div className="container m-auto max-w-screen-xl">
        <div className="flex-container flex justify-between items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <i className="fa-solid fa-cart-shopping nav-icon text-[#4FA74F] text-[2rem]"></i>
            <span className="self-center text-2xl whitespace-nowrap font-semibold text-[1.75rem]">
              fresh cart
            </span>
          </div>
          <div className="text-3xl text-blue-700 font-semibold">Route</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
