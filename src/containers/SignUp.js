import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import { setAlert } from '../actions/alert';



const SignUp = ({ setAlert, signup, isAthenticated }) => {
 
  const [formData, setFormData ] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
  });

  const {name, email, password, password2} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (password !== password2)
        setAlert('Passwords do not match', 'error');
    else
        signup({name, email, password, password2});

  };

  if(isAthenticated)
      return <Navigate to='/' />;


  return (
    <div className='auth'>
        <Helmet>
            <title>Realest Estate - Sign Up</title>
            <meta 
              name='description'
              content='sign up page'
             />
        </Helmet>
        <h1 className='auth__title'>Sign Up</h1>
        <p className='auth__lead'>Create your Account</p>
        <form className='auth__form' onSubmit={e => onSubmit(e)}>
        <div className='auth__form__group'>
              <input 
                  className='auth__form__input'
                  type='text'
                  placeholder='Name'
                  name='name'
                  value={name}
                  onChange={e => onChange(e)}
               />
            </div>

            <div className='auth__form__group'>
              <input 
                  className='auth__form__input'
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
               />
            </div>

            <div className='auth__form__group'>
              <input 
                  className='auth__form__input'
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                  minLength='6'
               />
            </div>

            <div className='auth__form__group'>
              <input 
                  className='auth__form__input'
                  type='password'
                  placeholder=' Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={e => onChange(e)}
                  minLength='6'
               />
            </div>
            <button className='auth__form__button'>Register</button>
        </form>
        <p className='auth__authtext'>
          Already have an account? <Link className='auth__authtext__link' to='/login'>Sign In</Link>
        </p>
    </div>
  )


};


SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAthenticated:PropTypes.bool
};

const mapStateToProps = state => ({
  isAthenticated: state.auth.isAthenticated
});



export default connect(mapStateToProps, {setAlert, signup})(SignUp);