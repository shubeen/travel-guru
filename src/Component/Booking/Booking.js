import React, { useContext } from 'react';
import Rectangle1 from '../../Image/Rectangle1.png';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { SelectContext } from '../../App';
import './Booking.css'


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
      
    },
  }));

const Booking = () => {

    const style= useStyles();
    let history= useHistory();

    const [placeSelect] = useContext(SelectContext)
     

    const btnBooking =()=>{
        history.push('/searchPlace' );
    }
    
    return (
        <div className='container d-flex justify-content-between' style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${Rectangle1})` }}>
            
            <div className="col-md-7 ">
                <h2 className='text-white'>{placeSelect.name}</h2>
                <p className='text-white'>{placeSelect.description}</p>
            </div>
            <div className='col-md-5'>
                <form className='form' action="">
                    <label className='text-white'  htmlFor="">Origin</label>
                    <input type="text" className='input-field text-white' placeholder='Dhaka'/>
                    <br/>
                    <label htmlFor="" className='text-white'>Destination</label>
                    <input type="text" className='input-field text-white' placeholder={placeSelect.name}/>
                    <form className={style.container} noValidate>
                            <TextField id="date" label="From" type="date" defaultValue={Date} className={style.textField} InputLabelProps={{
                                                        shrink: true,
                                                    }}/>
                                                
                            <TextField  id="date" label="To" type="date" defaultValue={Date} className={style.textField} InputLabelProps={{
                                                        shrink: true,
                                                    }}/>
                                                    <br/>
                            <button className="btn btn-warning font-weight-bold" onClick={btnBooking}>Start Booking</button>
                    </form>
                </form>
            </div>
        </div>
    );
};

export default Booking;