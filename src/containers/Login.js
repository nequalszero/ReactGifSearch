import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

// styled with bootstrap classes
class Login extends React.Component {
  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );

  // handleSubmit() is a redux-form method, made available via this.props by
  //   reduxForm()(), that can be attached to the form's onSubmit event handler.
  // This lets redux-form know that hte user is trying to submit the form so it
  //   can intercept it and run validation first (if defined).
  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field className="form-control"
              name="email"
              component={this.renderField}
              type="text"
              label="Email"/>
            <Field className="form-control"
              name="password"
              component={this.renderField}
              type="password"
              label="Password"/>

            <button className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

// reduxForm is a decorator that connects the form to Redux.  It takes a config
//   object with only one required argument, a unique name for the form.
// bindActionsCreators not needed like in Home container component to add 
//   actions to props; bindActionsCreators only needed when passing action
//   creators down as props from a container to a component that's not aware
//   of Redux.  Login has no child components, so can just pass action creators
//   into reduxForm() directly.
export default connect(null, Actions)(reduxForm({
  form: 'login',
  validate
})(Login));
