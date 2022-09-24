import React from 'react';
import  styled, {ThemeProvider} from 'styled-components';
import { Helmet } from 'react-helmet';
import 'normalize.css';
import  GlobalStyles from '../styles/GlobalStyles';
import  Header from './Header';
import  Footer from './Footer';

const theme = {
    black: '#262626',
    yellow: '#ffc600',
    lightgrey: '#efefef',
    grey: '#3a3a3a',
}

// const Layout = props => {
//     console.log(props);
//     return (
//         <div>
//             <Header/>
//             <div>{props.children}</div>
//             <Footer/>
//         </div>
//     )
// };


const Layout = ( {children} ) => (
    <ThemeProvider theme={theme}>
        <StyledPage>
            <Helmet>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <GlobalStyles />
            <Header/>
            <Content>{children}</Content>
            <Footer/>
        </StyledPage>
    </ThemeProvider>
);

export default Layout;

const StyledPage = styled.div`
    background: #fff;
    color: ${props => props.theme.block};
`;

const Content = styled.div`
    max-width: 600px;
    min-height: 40vw;
    padding: 6rem 1rem; 
    margin: 0 auto;
`;