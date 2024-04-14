import { Route, Routes } from 'react-router-dom';

import Sidebar from '@@components/sections/Sidebar';

import NotFound from '@@pages/NotFound';
import Locations from '@@pages/Locations';

import { ROUTES } from '@@constants/routes';

function App() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path={ROUTES.LOCATIONS} element={<Locations />} />

        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
