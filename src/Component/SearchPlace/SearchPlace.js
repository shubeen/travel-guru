import React, { useContext, useEffect, useState } from 'react';
import { SelectContext } from '../../App';
import hotelData from '../../hotelData/hotelData';
import './SearchPlace.css';

const SearchPlace = () => {
    const [placeSelect, setPlaceSelect]= useContext(SelectContext);

    const hotels = hotelData.slice(0,3) ;
    const [hotel] = useState(hotels);
    useEffect(()=>{
        setPlaceSelect(hotel[0])
    },[])
    

    return (
        <div className='container-fluid'>
            <div className='row d-flex justify-content-between'>
                <div className='col-md-8'>
                <h3>Stay in {placeSelect.place}</h3>
                    {
                        hotel.map(hotel=>{
                            return(
                                
                                <div className='row d-flex  align-items-center'>
                                    
                                    <div className='col-md-6'>
                                        <img src={hotel.img} alt=""/>
                                    </div>
                                    <div className='col-md-6 '>
                                        <h3>{hotel.hotelName}</h3>
                                        <p>{hotel.spec}</p>
                                        <h4>  BDT : {hotel.price} / per night</h4>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            
            
        </div>
    );
};

export default SearchPlace;