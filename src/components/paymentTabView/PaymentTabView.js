import React, { useContext, useEffect, useState } from 'react';
import { UPDATE_PREVIEW } from '../../context/ActionTypes';
import { AppContext } from '../../context/Store';
import { TAB_MEDIA } from '../../shared/Constants';
import { API } from '../../util/API';
import { HELPERS, TOAST_TYPES } from '../../util/helpers';
import TabView from '../tabView/TabView';

const PaymentTabView = ({location}) => {
    const [state, dispatch] = useContext(AppContext);

    const [enablePayments, setEnablePayments] = useState(false);
    const [paypalEmail, setPaypalEmail] = useState('');
    const [markupPercentage, setMarkupPercentage] = useState('');
    const [markupAmount, setMarkupAmount] = useState('');
    const [isPublished, setIsPublished] = useState();

    const [wasValidated, setWasValidated] = useState(false);

    /**
     * Every time a field changes update the preview so when this tab is exited the preview retains its data.
     */
    useEffect(() => {
        updatePreview();
    }, [enablePayments, paypalEmail, markupPercentage, markupAmount, isPublished]);

    useEffect(() => {
        const locationWithChanges = {
            ...location,
            ...state.previewLocation
        };
        setEnablePayments(locationWithChanges.enablePayments ? locationWithChanges.enablePayments : false);
        console.log('setting enable payments with: ', locationWithChanges.enablePayments ? locationWithChanges.enablePayments : false);
        setPaypalEmail(locationWithChanges.paypalEmail ? locationWithChanges.paypalEmail : '');
        setMarkupPercentage(locationWithChanges.paymentMarkupPercent ? (locationWithChanges.paymentMarkupPercent * 100).toFixed(1) : '');
        setMarkupAmount(locationWithChanges.paymentMarkupFixed ? locationWithChanges.paymentMarkupFixed : '');
        setIsPublished(locationWithChanges.isPublished ? locationWithChanges.isPublished: null);
    }, [location]);

    const handleFormSubmit = (e, publish) => {
        if (!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            e.preventDefault();
            const updateRequest = publish ? { ...state.previewLocation, isPublished: true, isDraft: false } : state.previewLocation;
            API.updateLocation_hideToast(updateRequest, (res, err) => {
                if (res && res.status === 200) {
                    console.log('success!');
                    if (publish) {
                        setIsPublished(true);
                        HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Location Published!');
                    }
                    else {
                        HELPERS.showToast(TOAST_TYPES.SUCCESS, 'Update Successful!');
                    }
                }
                else if (err) {
                    console.log(err);
                }
            });
        }
        setWasValidated(true);
    }

    const handlePublish = (e) => {
        e.preventDefault();
        handleFormSubmit(e, true);
    }
    /**
     * Updates the preview in context so when it is time to show the preview data from this tab will be included.
     */
    const updatePreview = () => {
        const previewLocation = {
            ...((enablePayments != null) && {enablePayments}),
            ...(paypalEmail) && {paypalEmail},
            ...(markupPercentage && {paymentMarkupPercent: (markupPercentage / 100).toFixed(3)}),
            ...(markupAmount && {paymentMarkupFixed: markupAmount}),
            ...((isPublished != null) && {isPublished})
        };
        const payload = {
            ...location,
            ...state.previewLocation,
            ...previewLocation
        };
        dispatch({type: UPDATE_PREVIEW, payload: payload});
    }

    return (
        <div className='PaymentTabView'>
            <TabView
                header={`Payment Processing ${state.previewLocation.name ? '- ' + state.previewLocation.name : ''}`}
                description='This section is for enabling payment processing with PayPal for this location. Optional fees can be set which will be added to each payment that is made.'
                previousView={TAB_MEDIA}
                formId='paymentForm'
                isPublished={isPublished}
                updatePreview={updatePreview}
                onPublish={handlePublish}
            >
                <div className='card editDetailCard p-4'>
                    <form id='paymentForm' className={`needs-validation ${wasValidated ? 'was-validated' : ''}`} onSubmit={handleFormSubmit} noValidate>
                        <h5>Payment Information</h5>
                        <p>Use this section to define if you would like to accept PayPal payment for this location, the associated account, and any fees you would like to charge.</p>
                        <div className="d-flex flex-column my-4">
                            <div className="form-check form-switch">
                                <input
                                    id='enablePayments'
                                    className='form-check-input'
                                    type="checkbox"
                                    checked={enablePayments}
                                    onChange={e => setEnablePayments(e.target.checked)}
                                />
                                <label className='form-check-label' htmlFor="enablePayments">Enable Payments</label>
                            </div>
                        </div>
                        {
                            enablePayments &&
                            <>
                                <div className="d-flex flex-column my-4">
                                    <label className='form-label requiredField' htmlFor="paypalEmail">PayPal Primary Email</label>
                                    <small className='text-secondary'>This is the primary email address associated with the PayPal account you wish to receive payments with.</small>
                                    <input
                                        id='paypalEmail'
                                        className='form-control'
                                        type="email"
                                        placeholder='Enter email'
                                        value={paypalEmail}
                                        onChange={e => setPaypalEmail(e.target.value)}
                                        required
                                    />
                                    <div className="invalid-feedback fw-bold">
                                        PayPal Primary Email is a required field please enter an email address above.
                                    </div>
                                </div>
                                <div className="d-flex flex-column my-4">
                                    <label className='form-label requiredField' htmlFor="markupPercentage">Markup Percentage</label>
                                    <small className='text-secondary'>For each payment sent to you an optional markup percentage can be applied. PayPal charges a 2.9% transaction fee for each payment so if you want to cover that cost you can set it to 2.9%. <b>To set no fee enter 0.</b></small>
                                    <div className="input-group">
                                        <input
                                            id='markupPercentage'
                                            className='form-control'
                                            type="number"
                                            placeholder='Enter Markup Percentage'
                                            max='100'
                                            min='0'
                                            step='.1'
                                            value={markupPercentage}
                                            onChange={e => setMarkupPercentage(e.target.value)}
                                            required
                                        />
                                        <span className="input-group-text">%</span>
                                        <div className="invalid-feedback fw-bold">
                                            Markup Percentage is a required field please enter a value above.
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column my-4">
                                    <label className='form-label requiredField' htmlFor="markupAmount">Fixed Markup Amount</label>
                                    <small className='text-secondary'>For each payment sent to you an optional fixed markup amount can be applied. PayPal charges a 30 cent transaction fee for each payment so if you want to cover that cost you can set it to 30 cents. <b>To set no fee enter 0.</b></small>
                                    <div className="input-group">
                                        <span className="input-group-text">$</span>
                                        <input
                                            id='markupAmount'
                                            className='form-control'
                                            type="number"
                                            placeholder='Enter Markup Amount'
                                            min='0'
                                            step='.01'
                                            value={markupAmount}
                                            onChange={e => setMarkupAmount(e.target.value)}
                                            required
                                        />
                                        <div className="invalid-feedback fw-bold">
                                            Markup Amount is a required field please enter a value above.
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </form>
                </div>
            </TabView>
        </div>
    );
};

export default PaymentTabView;