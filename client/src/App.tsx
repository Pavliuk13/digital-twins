import { Route, Routes } from 'react-router-dom';

import Sidebar from '@@components/sections/Sidebar';
import ModalManager from '@@features/Modal/ModalManager';
import Toast from '@@features/Toast';

import Templates from '@@pages/Templates';
import TemplateHome from '@@pages/Template/Home';
import TemplateDatastreams from '@@pages/Template/Datastreams';
import TemplateDashboard from '@@pages/Template/Dashboard';
import Devices from '@@pages/Devices';
import Locations from '@@pages/Locations';
import NotFound from '@@pages/NotFound';

import { ROUTES } from '@@constants/routes';

function App() {
  return (
    <>
      <Sidebar />
      <Toast />
      <ModalManager />
      <Routes>
        <Route path={ROUTES.TEMPLATES.INDEX} element={<Templates />} />
        <Route path={ROUTES.TEMPLATES.HOME_ROUTE} element={<TemplateHome />} />
        <Route
          path={ROUTES.TEMPLATES.DATASTREAMS_ROUTE}
          element={<TemplateDatastreams />}
        />
        <Route
          path={ROUTES.TEMPLATES.DASHBOARD_ROUTE}
          element={<TemplateDashboard />}
        />
        <Route path={ROUTES.DEVICES} element={<Devices />} />
        <Route path={ROUTES.LOCATIONS} element={<Locations />} />

        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
