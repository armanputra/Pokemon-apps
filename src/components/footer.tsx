import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToMyPokemon = () => {
    navigate('/mypokemon');
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto fixed bottom-0 z-50">
      <footer className="bg-black text-white py-4 px-4 flex justify-between items-center w-full h-20 ">
        <div className="flex justify-between items-center w-full p-4">
          <div className="flex items-center justify-start">
            <div className="text-center cursor-pointer" onClick={navigateToHome}>
              <i className="fa-solid fa-house text-4xl"></i>
              <h1 className="text-xl mt-2 font-press-start">Home</h1>
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <div className="text-center cursor-pointer" onClick={navigateToMyPokemon}>
              <i className="fa-regular fa-eye text-4xl"></i>
              <h1 className="text-xl mt-2 font-press-start">My Pokemon</h1>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
