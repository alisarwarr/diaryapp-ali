import React from 'react';
import Header from './Header';
import List from './List';
import Data from './Data';
import Footer from '../FrontPage/Footer';
//REACT-HELMET
import Head from '../../Head';

function DiariesPage() {
    return (
        <>
            <Head title="Diaries"/>
   
            <div className="diariespage">
                <div className="diariespage_header">
                    <Header
                    />
                </div>
    
                <div className="diariespage_body">
                    <div className="diariespage_body_data">
                        <Data
                        />
                    </div>
                    <div className="diariespage_body_list">
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

export default DiariesPage;