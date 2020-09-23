import fakeData from '../../fakeData/dataBase';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SelectContext } from '../../App';

import './HomaPage.css';


const HomePage = () => {
    let history = useHistory();
    
    const [placeSelect, setPlaceSelect] = useContext(SelectContext);
    
    const [dataBase]= useState(fakeData);
    
    const handleClickPlace = (id)=>{
        const placeClicked = dataBase.find(placeClicked => placeClicked.id === id);
        console.log(placeClicked);
        setPlaceSelect(placeClicked);

    }

    useEffect(()=>{
        setPlaceSelect(dataBase[0]);
        console.log(dataBase);
    },[]);
    const booking = (click)=>{
        history.push('/booking/' + click.name)
    }
    
    

    return (
        <div className="home-container d-flex justify-content-between ">
            <div className="col-md-4">
               <h1>{placeSelect.name}</h1>
               <p>{placeSelect.description}</p>
            <Link className="btn btn-warning font-weight-bold" onClick ={()=>booking(placeSelect)}>Booking >></Link>
           </div>
           <div className="col-md-8 d-md-flex">
               {
                   dataBase.map(place=>{
                       return(
                        <div className="homepage-img" >
                            <Link key={place.id} name={place.name}  onClick={()=> handleClickPlace(place.id)}>
                                <img className="image" src={place.img} alt=""/>
                                <h3 className="text-dark">{place.name}</h3>
                            </Link>
                        
                        </div>
                       )
                       
                   })
               } 
           </div>
        </div>
    );
};

export default HomePage;
