import { Route, Routes } from 'react-router-dom';

import Sidebar from '@@components/sections/Sidebar';
import ModalManager from '@@features/Modal/ModalManager';
import Toast from '@@features/Toast';

import SignUp from '@@pages/SignUp';
import SignIn from '@@pages/SignIn';
import Templates from '@@pages/Templates';
import TemplateHome from '@@pages/Template/Home';
import TemplateDatastreams from '@@pages/Template/Datastreams';
import TemplateDashboard from '@@pages/Template/Dashboard';
import Devices from '@@pages/Devices';
import Device from '@@pages/Device';
import Locations from '@@pages/Locations';
import Members from '@@pages/Members';
import UserProfile from '@@pages/Settings/UserProfile';
import PasswordChange from '@@pages/Settings/PasswordChange';
import NotFound from '@@pages/NotFound';

import { ROUTES } from '@@constants/routes';

function App() {
  return (
    <>
      <Sidebar />
      <Toast />
      <ModalManager />
      <Routes>
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
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
        <Route path={ROUTES.DEVICE} element={<Device />} />
        <Route path={ROUTES.LOCATIONS} element={<Locations />} />
        <Route path={ROUTES.MEMBERS} element={<Members />} />
        <Route path={ROUTES.SETTINGS.PROFILE} element={<UserProfile />} />
        <Route
          path={ROUTES.SETTINGS.CHANGE_PASSWORD}
          element={<PasswordChange />}
        />

        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
