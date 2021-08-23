import React from 'react';
import { TAB_THUMBNAIL } from '../../shared/Constants';
import TabView from '../tabView/TabView';

const GeneralTabView = () => {
    const handleFormSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className='GeneralTabView'>
            <TabView
                header='General'
                description='This section is for editing the general details about the location including the name, description, address, contact and coordinates.'
                nextView={TAB_THUMBNAIL}
            >
                <div className='card editDetailCard p-4'>
                    <form onSubmit={handleFormSubmit}>
                        
                    </form>
                </div>
            </TabView>
        </div>
    );
};

export default GeneralTabView;