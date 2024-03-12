import React from 'react';
import { PageLayout } from '../components/page-layout'; // Adjust the import path as needed
import './pricing-page.css';

const PricingPage = () => {
    return (
        <PageLayout>
            <div className="pricing-container">
                <div className="plan">
                    <h2>Starter</h2>
                    <p>Basic features for personal projects.</p>
                </div>
                <div className="plan">
                    <h2>Pro</h2>
                    <p>Advanced features for professionals.</p>
                </div>
                <div className="plan">
                    <h2>Enterprise</h2>
                    <p>Full suite for large organizations.</p>
                </div>
            </div>
        </PageLayout>
    );
};

export default PricingPage;

