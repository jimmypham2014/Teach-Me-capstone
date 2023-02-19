import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateServiceForm from "./components/Forms/CreateServiceForm";
import ServicePage from "./components/Pages/ServicePage";
import EditServiceForm from "./components/Forms/EditServiceForm";
import ServiceDetailPage from "./components/Pages/SingleServicePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const {serviceId} = useParams()
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route exact path ='/'>
          <CreateServiceForm/>
          <ServicePage/>
          </Route>

          <Route path= '/services/:serviceId'>
          <ServiceDetailPage/>
          <EditServiceForm/>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
