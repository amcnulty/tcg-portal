import React from 'react';
import { TAB_GENERAL, TAB_UNIT } from '../../shared/Constants';
import TabView from '../tabView/TabView';

const ThumbnailTabView = ({location}) => {
    const handleFormSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className='ThumbnailTabView'>
            <TabView
                header={`Thumbnail ${location.name ? '- ' + location.name : ''}`}
                description='This section is for editing the thumbnail image and short description that will be shown on the map view when users click on the marker for this location.'
                previousView={TAB_GENERAL}
                nextView={TAB_UNIT}
            >
                <div className='card editDetailCard p-4'>
                    <form onSubmit={handleFormSubmit}>
                        
                    </form>
                </div>
            </TabView>
        </div>
    );
};

export default ThumbnailTabView;