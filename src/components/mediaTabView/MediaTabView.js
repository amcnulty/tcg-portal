import React from 'react';
import { TAB_PAYMENT, TAB_UNIT } from '../../shared/Constants';
import TabView from '../tabView/TabView';

const MediaTabView = ({location}) => {
    const handleFormSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className='MediaTabView'>
            <TabView
                header={`Media Upload ${location.name ? '- ' + location.name : ''}`}
                description='This section is for uploading image media which can have optional caption text that will be shown with the image.'
                previousView={TAB_UNIT}
                nextView={TAB_PAYMENT}
            >
                <div className='card editDetailCard p-4'>
                    <form onSubmit={handleFormSubmit}>
                        
                    </form>
                </div>
            </TabView>
        </div>
    );
};

export default MediaTabView;