import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/auth';




const card = (props ,isAuthenticated) => {
    
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const isLoggedIn = props.isAuthenticated;
      console.log(isAuthenticated);
    return (
        <div className='card'>
        <h3 className='card__title'>{props.title}</h3>
        <div className='card__header'>
            <img className='card__header__photo' src={process.env.REACT_APP_API_URL+props.photo_main} alt='House' />
        </div>
        <p className='card__location'>{props.address}, {props.city}, {props.state}</p>
        <div className='row'>
            <div className='col-2-of-3'>
                <p className='card__info'>Price: ${numberWithCommas(props.price)}</p>
                <p className='card__info'>Bedrooms: {props.bedrooms}</p>
                <p className='card__info'>Bathrooms: {props.bathrooms}</p>
            </div>
            <div className='col-1-of-3'>
                <p className='card__saletype'>{props.sale_type}</p>
                <p className='card__hometype'>{props.home_type}</p>
                <p className='card__sqft'>Sqft: {props.sqft}</p>
            </div>
        </div>
        
       {isLoggedIn ? (<Link className='card__link' to={`/listings/${props.slug}`}>View Listing</Link>) : (<Link className='card__link' to='/login'>Go Login</Link>)}
        
    </div>
    );
};

card.propTypes = {
    title: PropTypes.string.isRequired,
    photo_main: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.string.isRequired,
    sale_type: PropTypes.string.isRequired,
    home_type: PropTypes.string.isRequired,
    sqft: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(card);
// export default card;