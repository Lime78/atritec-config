import { Link, NavLink, Outlet } from "react-router-dom"
import React, { useEffect } from 'react';
import './router.jsx'

function Root() {
    return (
        <>
            <section className="mainContent" aria-hidden></section>
            <NavLink to="/advance" className="Advance-button">Advance</NavLink>
            <NavLink to="/" className="Back-button">Back</NavLink>
            <Outlet />
            </>
    );
}


export default Root; 