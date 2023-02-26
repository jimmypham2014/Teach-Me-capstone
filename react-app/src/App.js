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
import { getAllServices } from "./store/service";
import CreateBookingForm from "./components/Forms/CreateBookingForm";
import Bookings from "./components/Pages/BookingPage";
import EditBookingForm from "./components/Forms/EditBookingForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  


  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getAllServices())
},[dispatch])






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

          <Route exact path= '/services/:serviceId'>
          <ServiceDetailPage/>
          </Route>

          <Route path= "/services/:serviceId/editform">
          <EditServiceForm/>
          </Route>

          <Route path= "/services/:serviceId/bookings">
          <CreateBookingForm/>
          </Route>

          <Route exact path= "/bookings">
          <Bookings/>
          </Route>

          <Route path = "/bookings/:bookingId/editform">
             <EditBookingForm/>
          </Route>


        </Switch>
      )}
    </>
  );
}

export default App;
