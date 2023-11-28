import { useNavigate } from "react-router-dom";

const navbar = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/"); // Mengarahkan kembali ke halaman utama ('/')
  };
  return (
    <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto fixed top-0 z-50 ">
      <header className="bg-black text-white py-4 px-4 flex justify-between items-center w-full ">
        <div className="flex items-center w-full justify-center ">
          <div className="pokemon-logo">
            <img
              src="https://pokemon-iota-jet.vercel.app/_next/image?url=%2FPokeBall.ico&w=64&q=75"
              alt="Pokemon Logo"
              className="w-14 h-auto cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>
        </div>
        <div className="">
          <i className="fa-solid fa-palette text-3xl"></i>
        </div>
      </header>
    </div>
  );
};

export default navbar;
