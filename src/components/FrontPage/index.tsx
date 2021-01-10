import React from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
//REACT-HELMET
import Head from '../../Head';

function FrontPage() {
    return (
        <>
            <Head title="Home"/>

            <div className="frontpage">
                <div className="frontpage_header">
                    <Header
                    />
                </div>
    
                <div className="frontpage_body">
                    <Body
                    />
                </div>
    
                <div className="frontpage_footer">
                    <Footer
                    />
                </div>           
            </div>
        </>
    )
}

export default FrontPage;