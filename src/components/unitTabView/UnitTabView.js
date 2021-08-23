import React from 'react';
import { TAB_MEDIA, TAB_THUMBNAIL } from '../../shared/Constants';
import TabView from '../tabView/TabView';

const UnitTabView = () => {
    const handleFormSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className='UnitTabView'>
            <TabView
                header='Unit Information'
                description='This section is for editing unit information including a summary of the units at this location and a list of what units are currently available.'
                previousView={TAB_THUMBNAIL}
                nextView={TAB_MEDIA}
            >
                <div className='card editDetailCard p-4'>
                    <form onSubmit={handleFormSubmit}>
                        
                    </form>
                </div>
            </TabView>
        </div>
    );
};

export default UnitTabView;