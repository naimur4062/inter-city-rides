import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { EmailUserContext, UserContext } from '../../App';
import './Login.css';
import googleImg from '../../images/google.png';
import fbImg from '../../images/facebook.png'
import Header from '../Header/Header';
import { Button } from '@material-ui/core';
import { Card, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [emailUser, setEmailUser] = useContext(EmailUserContext);
    const [signedInUser, setSignedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // google sign in
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                };
                setUser(signedInUser);
                setSignedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                const email = error.email;
                console.log(errorMessage, email)
            });
    }

    //fb sign in
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { displayName, email };
                setSignedInUser(signedInUser);
                history.replace(from);
                console.log(signedInUser)
            })
            .catch((error) => {
                const errorMessage = error.message;
                const email = error.email;
                console.log(errorMessage, email)
            });
    }
    // email sign in
    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const { displayName, email } = userCredential.user;
                    const signedInUser = { displayName, email };
                    setSignedInUser(signedInUser);
                    history.replace(from);
                    setUser(signedInUser);
                    updateUserName(user.name);
                    setEmailUser(user.name);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const { displayName, email } = userCredential.user;
                    const signedInUser = { displayName, email };
                    setSignedInUser(signedInUser);
                    history.replace(from);
                    setUser(signedInUser);
                    setEmailUser(displayName);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('name updated success')
        }).catch(function (error) {
            console.log(error)
        });
    }
    return (
        <div>
            <Header />
            <div>
                <div className="col-md-4 m-auto">
                    <Card style={{ width: '100%', padding: '4%', marginTop: '50px' }}>
                        <Card.Body>
                            {newUser && <Card.Title>Create An Account</Card.Title>}
                            {!newUser && <Card.Title>Login</Card.Title>}
                            <Form onSubmit={handleSubmit} className="mt-5">

                                {newUser && <Form.Group controlId="formBasicName">
                                    <Form.Control type="name" onBlur={handleBlur} name="name" style={{ border: 'none', borderBottom: '1px solid gray' }} placeholder="Your Name" required />
                                </Form.Group>}

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" onBlur={handleBlur} name="email" style={{ border: 'none', borderBottom: '1px solid gray' }} placeholder="username or email" required />
                                </Form.Group>

                                <Form.Group className="mt-2" controlId="formBasicPassword">
                                    <Form.Control type="password" onBlur={handleBlur} name="password" style={{ border: 'none', borderBottom: '1px solid gray' }} placeholder="password" required />
                                </Form.Group>

                                {newUser && <Form.Group className="mt-2" controlId="formBasicPassword">
                                    <Form.Control type="password" onBlur={handleBlur} name="password" style={{ border: 'none', borderBottom: '1px solid gray' }} placeholder="Conform Password" required />
                                </Form.Group>}


                                {newUser && <Button className="mt-5 rounded-0" style={{ width: '100%', backgroundColor: '#ff6e40', color: 'white' }} type="submit">
                                    Create an Account
                               </Button>}
                                {!newUser && <Button className="mt-5 rounded-0" style={{ width: '100%', backgroundColor: '#ff6e40', color: 'white' }} type="submit">
                                    Login
                               </Button>}

                                <Form.Text className="text-center mt-3" style={{ fontSize: '17px' }}>
                                    <Form.Group>
                                        <Form.Check
                                            onChange={() => setNewUser(!newUser)}
                                            label="New User Sign Up"
                                            feedback="You must agree before submitting."
                                        />
                                    </Form.Group>
                                </Form.Text>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <p className="or">or</p>
            <div className="login">
                <button className="fb" onClick={handleFacebookSignIn}>
                    <img src={fbImg} alt="" />
                    Continue With Facebook
                </button>
                <br />
                <button onClick={handleGoogleSignIn}>
                    <img src={googleImg} alt="" />
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default Login;