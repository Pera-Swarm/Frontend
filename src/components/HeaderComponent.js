import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { FaExclamation } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';


class Header extends Component {
    render() {
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <div className="row">
                            <NavbarBrand className="mr-auto" href="/">
                                Swarm Admin
                        </NavbarBrand>
                        </div>
                        <div className="row row-header">
                            <span><FaExclamation size={25} /></span>
                            <span>&nbsp;</span>
                            <span>&nbsp;</span>
                            <span> <FiSettings size={25} /></span>
                        </div>
                    </div>
                </Navbar>


            </>
        );
    }
}

export default Header;