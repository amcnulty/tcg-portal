import React from 'react';
import { TAB_MEDIA } from '../../shared/Constants';
import TabView from '../tabView/TabView';

const PaymentTabView = () => {
    const handleFormSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className='PaymentTabView'>
            <TabView
                header='Payment Processing'
                description='This section is for enabling payment processing with PayPal for this location. Optional fees can be set which will be added to each payment that is made.'
                previousView={TAB_MEDIA}
            >
                <div className='card editDetailCard p-4'>
                    <form onSubmit={handleFormSubmit}>
                        
                    </form>
                </div>
            </TabView>
        </div>
    );
};

export default PaymentTabView;