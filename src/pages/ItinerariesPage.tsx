import React from 'react';
import MyCard from '../components/MyCard';
import "./Home.css";
import MyHeader from '../components/MyHeader';

const ItinerariesPage: React.FC = () => {
    return (
        <MyHeader title='Itinerari' backButton>
            <div className='container'>
                <MyCard title='ciao' subtitle='questa è una card' content='Esempio di Card' />
            </div>
        </MyHeader>
    )
}

export default ItinerariesPage;