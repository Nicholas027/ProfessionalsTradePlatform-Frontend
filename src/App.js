import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import Signup from "./features/auth/Signup";
import RequireAuthTwo from "./features/auth/RequireAuthTwo";
import OlvideMiContraseña from "./components/OlvideMiContraseña";
import WorkWithUs from "./components/WorkWithUs";
import NotFound from "./components/NotFound";
import Professionals from "./components/Professionals";
import ProfessionalDetails from "./components/ProfessionalsDetails";
import ContactRegister from "./components/ContactRegister";
import React from "react";
import ComentarYCalificar from "./components/ComentarYCalificar";
import MisSolicitudes from "./components/MisSolicitudes";
import UltimaSolicitud from "./components/UltimaSolicitud";
import PreguntasFrecuentes from "./components/PreguntasFrecuentes";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";

function App() {
  useTitle("Datazo.com");

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="workWithUs" element={<WorkWithUs />} />
        <Route path="preguntasfrecuentes" element={<PreguntasFrecuentes />} />

        <Route path="/login/missPassword" element={<OlvideMiContraseña />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route
              path="dash"
              element={
                <RequireAuthTwo>
                  <DashLayout />
                </RequireAuthTwo>
              }
            >
              <Route
                path="misSolicitudes"
                element={
                  <RequireAuthTwo>
                    <MisSolicitudes />
                  </RequireAuthTwo>
                }
              ></Route>
              <Route
                path="ultimaSolicitud"
                element={
                  <RequireAuthTwo>
                    <UltimaSolicitud />
                  </RequireAuthTwo>
                }
              ></Route>
              <Route
                path="professionals/:alt"
                element={
                  <RequireAuthTwo>
                    <Professionals />
                  </RequireAuthTwo>
                }
              />
              <Route
                path="professionals/:alt/:id"
                element={
                  <RequireAuthTwo>
                    <ProfessionalDetails />
                  </RequireAuthTwo>
                }
              ></Route>
              <Route
                path="professionals/:alt/:id"
                element={
                  <RequireAuthTwo>
                    <ContactRegister />
                  </RequireAuthTwo>
                }
              ></Route>
              <Route
                path="professionals/:alt/:id/:idSoli/calificacion"
                element={
                  <RequireAuthTwo>
                    <ComentarYCalificar />
                  </RequireAuthTwo>
                }
              ></Route>
            </Route>
            {/* End Dash */}
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
