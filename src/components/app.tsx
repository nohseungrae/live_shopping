import React from 'react';
import { ViewPage } from '../pages/view_page';

export const App: React.FC = () => {
    console.log('render');

    localStorage.setItem('userID', '437214');
    return <ViewPage />;
};
