import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import HomePage from "./components/Pages/HomePage";
import TutorSignUp from "./components/Pages/TutorSignUpPage";
import { getAllTutors } from "./store/tutor";
import ProfilePage from "./components/Pages/ProfilePage";
import { getAllUsers } from "./store/user";
import AllServicesBrowser from "./components/Pages/AllServicesBrowser";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getAllServices())
},[dispatch])

useEffect(()=>{
  dispatch(getAllTutors())
  dispatch(getAllUsers())
},[dispatch])






  return (
    <>
      {!! currentUser&& <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

         


          <Route path='/tutorsignup'>
          <TutorSignUp/>
          </Route>
          

          <Route  exact path ='/'>
              { currentUser ?<ServicePage/> : <HomePage/>}
          </Route>

      

          <Route exact path= "/services">
          <AllServicesBrowser/>
          </Route>
        

          <Route exact path= '/services/create_a_service'>
          <CreateServiceForm/>
          </Route>

         
       
``
          <Route exact path= '/services/:serviceId'>
          <ServiceDetailPage/>
          </Route>
          

          <Route path= "/services/:serviceId/editform">
          <EditServiceForm/>
          </Route>

          <Route path= "/services/:serviceId/bookings">
          <CreateBookingForm/>
          </Route>

          
         

          <Route  exact path= "/bookings">
            <Bookings/>
          </Route>
          

          <Route path = "/bookings/:bookingId/editform">
             <EditBookingForm/>
          </Route>

         

          <Route exact path= '/:username'>
          <ProfilePage/>
          </Route>

          
         

        </Switch>
      )}
    </>
  );
}

export default App;
