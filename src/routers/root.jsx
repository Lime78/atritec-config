import { Link, NavLink, Outlet } from "react-router-dom"
import React, { useEffect } from 'react';
import './router.jsx'

function Root() {
    return (
        <>
    <section className="mainContent" aria-hidden></section>
         <NavLink to="/advanceAnnotation" className="Advance-button"></NavLink>
            {/* <NavLink to="/" className="Back-button">Back</NavLink> */}
              <NavLink to="/advanceWeb" className="AdvanceWeb-button"></NavLink>
                 <NavLink to="/advanceCirrus" className="AdvanceCirrus-button"></NavLink>
            <Outlet />
           </>
    );
}


export default Root; 