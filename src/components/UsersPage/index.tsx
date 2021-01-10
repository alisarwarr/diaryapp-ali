import React from 'react';
import Header from './Header';
import List from './List';
import Data from './Data';
import Footer from '../FrontPage/Footer';
//MATERIAL-UI
import Hidden from '@material-ui/core/Hidden';
//REACT-HELMET
import Head from '../../Head';

function UsersPage() {
    return (
        <>
            <Head title="Users"/>
   
            <div className="userspage">
                <div className="userspage_header">
                    <Header
                    />
                </div>
    
                <div className="userspage_body">
                    <Hidden smDown>
                    <div className="userspage_body_list">
                        <List
                        />
                    </div>
                    </Hidden>
    
                    <div className="userspage_body_data">
                        <Data
                        />
                    </div>
    
                    <Hidden mdUp>
                    <div className="userspage_body_list">
                        <List
                        />
                    </div>
                    </Hidden>
                </div>
    
                <div className="userspage_footer">
                    <Footer
                    />
                </div>
            </div>
        </>
    )
}

export default UsersPage;