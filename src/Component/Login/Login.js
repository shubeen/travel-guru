import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import './Login.css';
import firebaseConfig from './firebaseConfig'
import { useContext } from 'react';
import { SelectContext} from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);



const Login = () => {
    const [newUser, setNewUser] = useState(false);
  const [loggedInUser,setLoggedInUser]= useContext(SelectContext);
  
  const [user, setUser] = useState({

    isSignedIn : false,
    name: '',
    email:'',
  })
  const history= useHistory();
  const location= useLocation();
  const {from} = location.state || {from: {pathname: '/searchPlace'}};

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName,email} = res.user;
      
      const signedInUser= {
        isSignedIn : true,
        name: displayName,
        email:email
        
      }
      setLoggedInUser(signedInUser);
       console.log(email);
    })
    .catch(err =>{
      console.log(err.message);
      console.log(err.code);
    })
    
  }
  const handleSignOut= ()=>{
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser ={
        isSignedIn : false,
        name: '',
        email:'',
        password:'',
        photo: '',
        error: '',
        success:false
      }
      setLoggedInUser(signedOutUser);
    })  
  }
  const handleBlur = (event)=> {
    // console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if(event.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
      
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length >6;
      const passwordHasNumber = /\d{1}/.test(event.target.value)
      isFieldValid =(isPasswordValid && passwordHasNumber);
    }
    if(isFieldValid){
       const newUserInfo = {...user};
      newUserInfo[event.target.name]= event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit=(e)=>{
    // console.log(user.email , user.password);
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        const newUserInfo = {...user};
        newUserInfo.error='';
        newUserInfo.success= true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        location.raplace(from);
        updateUserName(user.name);
        // console.log(res)
      })
      .catch(error=> {
        // Handle Errors here.
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success= false;
        setUser(newUserInfo);
        // ...
      });

    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        const newUserInfo = {...user};
        newUserInfo.error='';
        newUserInfo.success= true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        history.replace(from);
        location.raplace(from);
        console.log('sign in user info', res.user)
      })
      .catch(error=> {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success= false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }

  const updateUserName = name =>{
    var user = firebase.auth().currentUser;

        user.updateProfile({
                displayName: name
                }).then(()=> {
                console.log('user update successfully')
                }).catch(error=> {
                console.log(error);
                });
                }

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFbLogIn=()=>{
        firebase.auth().signInWithPopup(fbProvider)
        .then(result=> {
            const {displayName,email} = result.user;
            const signedInFbUser= {
                isSignedIn : true,
                name: displayName,
                email:email
                
              }
              setLoggedInUser(signedInFbUser);
          
        }).catch(error=> {
          // Handle Errors here.
          var errorCode = error.code;
          console.log(errorCode);
          
        });
      }
      const handleFbSignOut= ()=>{
        firebase.auth().signOut()
        .then(res => {
          const signedOutFbUser ={
            isSignedIn : false,
            name: '',
            email:'',
            password:'',
           
            error: '',
            success:false
          }
          setLoggedInUser(signedOutFbUser);
        })  
      }


    return (
        <div className='create-container  d-flex flex-column justify-content-center'>
            <div className='card' >
                <div className='card-title'>
                    {newUser ? <h4 className='create-acct'>Create An Account</h4> : <h4 className='login-acct'>Login</h4>}
                    
                    <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="Register" id=""/> 
                    
                    <div className='input-form'>
                        <form onSubmit={handleSubmit}>
                            {newUser && <input className="form-control input-first" onBlur={handleBlur} type="text" name="" placeholder="First Name" required />}
                            {newUser && <input className="form-control input-last" onBlur={handleBlur} type="text" name="" placeholder="Last Name" required />}
                            <input name="email" type="text" className="form-control  input-email" onBlur={handleBlur} placeholder=" Enter your email" required />
                            <input name="password" type="text" className="form-control  input-password" onBlur={handleBlur} placeholder=" Enter your password" required />
                            <input className='btn btn-warning' type="submit" value={newUser ? "Sign up": 'Login'}/>
                        </form>
                        
                        <p  style={{color:'red', textAlign: 'center'}}>{user.error}</p>
                            {user.success && <p style={{color:'green', textAlign: 'center'}}>User {newUser ?'Created': 'logged in'} Successfully</p>}
                    </div>

                </div>

            </div>
            
            <div  style={{textAlign:'center'}}>
                <h4>Continue with Google</h4>
                {
                loggedInUser.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : 
                <button onClick={handleSignIn}>sign In</button>
                }

            </div>
            <div  style={{textAlign:'center'}}>
                <h4>Continue with Facebook</h4>
                {
                loggedInUser.isSignedIn ? <button onClick={handleFbSignOut}>Sign Out</button> : 
                <button onClick={handleFbLogIn}>sign In</button>
                }

            </div>
            
        </div>
        
        
    );
};

export default Login;