import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages';
import PokemonDetail from '@/pages/detail/detail-pokemon';
import Cacth from '@/pages/catch';
import MyPokemon from '@/pages/catch/mypokemon';

export default function Router() {
  const routes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/pokemon/:id',
      element: <PokemonDetail />,
    },
    {
      path: '/pokemon',
      element: <PokemonDetail />,
    },
    {
      path: '/pokemon-form/:id',
      element: <Cacth />,
    },
    {
      path: '/mypokemon',
      element: <MyPokemon />,
    },
    {
      path: '*',
      element: <div>404 page not found</div>,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
