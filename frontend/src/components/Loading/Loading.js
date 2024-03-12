import React from 'react';
import { useLoading } from '../../hooks/useLoading';
import loadingClass from './loading.module.css';


export default function Loading() {
    const { isLoading } = useLoading();

    // If the loading state is false, return nothing
    if (!isLoading) return;

    // If the loading state is true, return the loading component
    return (
        <div className={loadingClass.container}>
            <div className={loadingClass.loader}>
                <img src="https://i.gifer.com/XOsX.gif" alt="Loading" />
                <h1>Loading...</h1>
            </div>
        </div>
    )
}
