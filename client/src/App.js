import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPosts();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitPost = e => {
    e.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload
    })
      .then(response => {
        console.log("Data has been sent to the server.");
        console.log(response.data);
        this.resetInputs();
        this.getBlogPosts();
      })
      .catch(() => {
        console.log("Internal server error.");
      });
  };

  resetInputs = () => {
    this.setState({
      title: "",
      body: "",
      posts: []
    });
  };

  displayState = () => {
    console.log(this.state);
  };

  getBlogPosts = () => {
    axios
      .get("/api")
      .then(response => {
        const data = response.data;
        this.setState({
          posts: data
        });
        console.log("data received");
      })
      .catch(err => {
        console.log("error getting data");
      });
  };

  // displayBlogPosts = posts => {
  //   return posts.map(post => {
  //     return (
  //       <div className="blog-post">
  //         <h3>{post.title}</h3>
  //         <p>{post.body}</p>
  //       </div>
  //     );
  //   });
  // };

  render() {
    return (
      <div className="app">
        <h1>MERN Blog</h1>
        <form onSubmit={this.submitPost}>
          <div className="form-input">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              type="text"
              name="body"
              placeholder="Content"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
        <div className="blogPosts">
          {/* {this.displayBlogPosts(this.state.posts)} */}
          {this.state.posts.map(post => {
            return (
              <div className="blog-post">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
