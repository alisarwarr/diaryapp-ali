import React from 'react';
import Header from './Header';
import List from './List';
import Footer from '../FrontPage/Footer';
//REACT-HELMET
import Head from '../../Head';

function HisPublicDiariesPage() {
    return (
        <>
            <Head title="HisPublicDiaries"/>

            <div className="diariespage">
                <div className="diariespage_header">
                    <Header
                    />
                </div>
    
                <div className="diariespage_body full">
                    <div className="diariespage_body_list full_width">
                        <List
                        />
                    </div>
                </div>
    
                <div className="diariespage_footer">
                    <Footer
                    />
                </div>
            </div>
        </>
    )
}

export default HisPublicDiariesPage;