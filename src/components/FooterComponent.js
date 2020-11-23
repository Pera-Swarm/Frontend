import React from 'react';
import { FaGithub } from 'react-icons/fa';

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-left">
                    <div className="text-center">
                        <span>
                            <FaGithub size={25} />
                        </span>
                        <span>&nbsp;</span>
                        <span>
                            <a href="http://google.com/+">
                                <u>https://github.com/Pera-Swarm</u>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
