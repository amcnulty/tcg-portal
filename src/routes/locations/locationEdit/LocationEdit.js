import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import GeneralTabView from '../../../components/generalTabView/GeneralTabView';
import MediaTabView from '../../../components/mediaTabView/MediaTabView';
import PaymentTabView from '../../../components/paymentTabView/PaymentTabView';
import ThumbnailTabView from '../../../components/thumbnailTabView/ThumbnailTabView';
import UnitTabView from '../../../components/unitTabView/UnitTabView';
import { SET_TABVIEW } from '../../../context/ActionTypes';
import { AppContext } from '../../../context/Store';
import { TAB_GENERAL, TAB_MEDIA, TAB_PAYMENT, TAB_THUMBNAIL, TAB_UNIT } from '../../../shared/Constants';
import { API } from '../../../util/API';

const LocationEdit = () => {
    const routeLocation = useLocation();
    const slug = routeLocation.pathname.split('/location/')[1];
    const [location, setLocation] = useState({});
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        API.getLocationBySlug(slug, (res, err) => {
            if (res && res.status === 200) {
                setLocation(res.data);
            }
            else {
                console.log(err);
            }
        });
        return () => {
            dispatch({type: SET_TABVIEW, payload: TAB_GENERAL});
        }
    }, []);

    return (
        <div className='LocationEdit'>
            {
                state.tabView === TAB_GENERAL &&
                <GeneralTabView/>
            }
            {
                state.tabView === TAB_THUMBNAIL &&
                <ThumbnailTabView/>
            }
            {
                state.tabView === TAB_UNIT &&
                <UnitTabView/>
            }
            {
                state.tabView === TAB_MEDIA &&
                <MediaTabView/>
            }
            {
                state.tabView === TAB_PAYMENT &&
                <PaymentTabView/>
            }
        </div>
    );
};

export default LocationEdit;