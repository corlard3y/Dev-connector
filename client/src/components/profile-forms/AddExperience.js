import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import  { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history}) => {
  
    const [ formData, setFormData] = useState({
        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });
  
    return (
        <Fragment>
          <div className='saka'>
          <h2 className="large text-primary centered">
       Add An Experience
      </h2>
      <p className="lead">
        <i className="fa fa-code"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <div className='centered'>
           <small>* = required field</small>
      </div>
      <form className="form" 
      onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history);
      }} style={{textAlign:'center'}}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"
          value={from} onChange={e => onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current}
        onChange={e => {
            setFormData({...formData, current: !current})
         toggleDisabled(!toDateDisabled);
         }} />{' '} Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e)}
          disabled={toDateDisabled? 'disabled':''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description} onChange={e => onChange(e)}
            placeholder="Job Description"
          ></textarea>
        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <input type="submit" className="btn btn-post" target='_top'/>
            <Link className="btn btn-post" to="/dashboard" target='_top'>Go Back</Link>     
        </div>
        </form>
          </div>
               
        </Fragment>
    )
}

AddExperience.propTypes = {
 addExperience:PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(withRouter(AddExperience));
