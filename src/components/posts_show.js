import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, deletePost } from "../actions";
import { Link } from "react-router-dom";

class PostsShow extends Component {
  //When this component is rendered, we need to call action creator so we can display the post. We can do this in componentDidMount since this is
  //when the component loaded on the DOM. When react router renders this component, it passes the id as part of the props so we can call the action
  //creator with appropriate id.
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchPost(id);
  }

  onClickDelete() {
    const {id} = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { post } = this.props;
    if(!post) {
      return <div>Loading...</div>
    }

    return(
      <div>
        <Link to="/">Go Back</Link>
        <button
        className="btn btn-danger pull-xs-right"
        onClick={this.onClickDelete.bind(this)}
        >Delete</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}
//In this function, we can pull a particular part of state(posts). ownProps is available so we can access something from the props of this component
//Like earlier we can use the id and then map the particular post to props by using this id so its easier to render the particular post.
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
