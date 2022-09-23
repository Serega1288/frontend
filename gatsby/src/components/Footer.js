import React from 'react';
import { Link } from 'gatsby';
import FooterStyles from '../styles/FooterStyles';
import SignupForm from "./SignupForm";

const Footer = () => (
    <FooterStyles>
        <div className="wrapperForm">
            <legend>
                <span className="formAction">Підписатися </span> на нашу розсилку !
            </legend>
            <SignupForm />
        </div>

        <div className="wrapperMain">
            <Link to="/">Fress Blog </Link>
            &copy; { new Date().getFullYear() }
        </div>

    </FooterStyles>
);

export default Footer;