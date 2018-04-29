import React, {Component} from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends Component {
  //reduxForm handles the state of our inputs within the form(managing action creators and event handlers). This function is to render some JSX on
  //our front end. We need to hook up this JSX to reduxForm's Field component. This is via the field argument which includes everything reduxForm
  //does for us. We can add props to Field and use them here to render various input fields based on labels. Also the error from validate function
  //gets passed via this field object and we can use it here to display errors(if any)
  renderField(field) {
    //Pulling off meta object from field and then pulling off subsequent properties touched and error from meta.
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          //Here we are passing all the properties of the Field component to this input component so we can have a connection between Field and
          //what we actually render(input) eg. event handlers and action creators.
          {...field.input}
        />
        <div className="text-help">
          {touched ? error: ""}
        </div>
      </div>
    );
    //reduxForm has three states for the field, pristine(new just loaded), touched(user focused and then focused out) and invalid. Here we
    //add a check to see if the field is touched, only then display the error(if any)
  }

//Once validation and state handling is done, reduxForm passes in values object to our callback. This is an object which includes all the data from them
//form and we can use this to post the data to our backend.
  onSubmit(values) {
    //When react-router renders a particular component, it adds a bunch of helper functions on the props of the component. We use that Here
    //to navigate to the root route. We do it in a callback function so we navigate after the post request is completed successfully. We pass This
    //callback to action creator as it knows when the promise is resolved and can call this function.
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    //Below we hooked up reduxForm to our component PostsNew. This added lots of functions on our props like handleSubmit. When the user submits the
    //form, there are two parts to the action. First reduxForm handles the state and validation via handleSubmit and then we need to be responsible
    //for posting the form details to our backend.
    const { handleSubmit } = this.props;
    return(
      //Once handleSubmit is called, our callback function is called. We use bind because we use this in a callback function which will run later
      //and we need to ensure the context of this is preserved.
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderField}
        />
        <button className="btn btn-primary" type="submit">Submit</button>
        <Link className="btn btn-danger" to="/">Cancel</Link>
      </form>
      //Always use the Link component from react router to handle navigation within the app. It is rendered on browser as an anchor tag as well
      // for styling purposes.
    );
  }
}

//Validate function takes the argument of values from reduxForm. This is what the user entered in the form. We can have validating for all our fields
//using this values object and return the error for any of the fields to reduxForm. if error has any properties, reduxForm will assume that the
//form data is invalid(it won't submit) and will pass this error to its fields object. Thus, handleSubmit won't be called and user data will
//not be posted to our backend.
function validate(values) {
  const error = {};

  if(!values.title) {
    error.title="Please enter a title";
  }

  if(!values.categories) {
    error.categories="Please enter categories";
  }

  if(!values.content) {
    error.content="Please enter some content";
  }

  return error;
}

//Using reduxForm to hook up my PostsNew component to redux. Pass in form as a unique string to distinguish against other forms. Validate is a
//function so we can validate user inputs and pass any errors to reduxForm.
export default reduxForm({
  form: "PostsNewForm",
  validate
 })(
   connect(null, {createPost})(PostsNew));
