import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
    const history = useHistory();
    const locationId = routeLocation.pathname.split('/location/')[1];
    const [location, setLocation] = useState({});
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {
        API.getLocationById(locationId, (res, err) => {
            if (res && res.status === 200) {
                setLocation(res.data);
            }
            else {
                console.log(err);
                if (err.response.status === 401) {
                    history.push('/locations');
                }
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
                <GeneralTabView location={location}/>
            }
            {
                state.tabView === TAB_THUMBNAIL &&
                <ThumbnailTabView location={location}/>
            }
            {
                state.tabView === TAB_UNIT &&
                <UnitTabView location={location}/>
            }
            {
                state.tabView === TAB_MEDIA &&
                <MediaTabView location={location}/>
            }
            {
                state.tabView === TAB_PAYMENT &&
                <PaymentTabView location={location}/>
            }
        </div>
    );
};

export default LocationEdit;