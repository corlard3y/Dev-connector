import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import  { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history}) => {
  
    const [ formData, setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });
  
    return (
        <Fragment>
          <div className='saka'>
          <h1 className="large text-primary centered">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fa fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <div className='centered'> 
        <small>* = required field</small>
      </div>
      <form className="form"
      onSubmit={e => {
        e.preventDefault();
        addEducation(formData, history);
    }}
      style={{textAlign:'center'}}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school} onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree} onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy"
           value={fieldofstudy} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"
           value={from} onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current"
            checked={current} 
            value={current}
            onChange={e => {
                setFormData({...formData, current: !current})
             toggleDisabled(!toDateDisabled);
             }}
            /> {' '} Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" 
           value={to} onChange={e => onChange(e)}
           disabled={toDateDisabled? 'disabled':''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description} onChange={e => onChange(e)}
          ></textarea>
        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <input type="submit" className="btn btn-post" target='_top' />
        <Link className="btn btn-post" to="/dashboard" target='_top'>Go Back</Link>
     
        </div>
        </form>
          </div>

      
        </Fragment>
    )
}

AddEducation.propTypes = {
 addEducation:PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation));
