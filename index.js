import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

/* 
  1. Identify different pieces of form state
  2. Make one 'Field' component per piece of state
  3. User changes a 'Field' input
  4. Redux form automatically handles those changes
  5. User submits form
  6. We validate inputs and handle form submission
  Redux form INTERNALLY handles all the changes made for us, 
  we don't have to explicitally handle state change using this.setState() 
*/

class someComponent extends Component {

  renderField(field) { //field is just an object similar to what we get with event handlers (event)
    return (
      <div>
        <label>{field.label}</label>
        <input
          type="text"
          {...field.input} //...event handlers like onChange, onBlur a whole bunch of props are on this object
        //Give me access to all these pre-generated stuff from redux-form to the input form
        />
        {field.meta.touched ? field.meta.error : null}
      </div>
    )
  }

  //onSubmit is what happens once the form data is correct and ready to be submitted
  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props // this.props.handleSubmit comes from 'redux-form'
    return (
      //handleSubmit is a method given to us by redux-form
      //It's purpose is to make sure they're no errors before submission

      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title" // Refers to what piece of state this field will produce or what its responsible for
          component={this.renderField} //Helps what the field will look like, this interacts directly with user
        />

        <Field
          label="Tag"
          name="tags"
          component={this.renderField}
        />

        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />

        <button type="submit">Submit</button>
      </form>
    )
  }
}

//Helper fucntion for our validation purposes
function validate(values) {
  //this validate function is automatically called for us when onSubmit is triggered by redux-form

  const errors = {};

  if (!values.title.length < 3 || !values.title) {
    errors.title = 'Please enter a title greater than 3 characters'
  }

  if (values.tags.length < 1 || !values.tags) {
    errors.tags = 'Please enter some tags'
  }

  if (!values.content) {
    errors.content = 'Please enter come content'
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'someComponent'
})(someComponent);