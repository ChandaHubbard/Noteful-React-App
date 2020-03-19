import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import config from "./config";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    // this.folderNameInput = React.createRef();
    this.state = {
      folderName: {
        value: ""
      }
    };
  }

  // componentDidMount() {
  //     Promise.all([
  //         fetch(`${config.API_ENDPOINT}/notes`),
  //         fetch(`${config.API_ENDPOINT}/folders`)
  //     ])
  //     .then(([notesRes, foldersRes]) => {
  //         if(!notesRes.ok)
  //         return notesRes.json().then(e => Promise.reject(e));
  //         if(!foldersRes.ok)
  //         return foldersRes.json().then(e => Promise.reject(e));

  //         return Promise.all([notesRes.json(), foldersRes.json()]);
  //     })
  //     .then(([notes, folders]) => {
  //         this.setState({notes, folders});
  //     })
  //     .catch(error => {
  //         console.error({error});
  //     });
  // }

  // handleDeleteNote = noteId => {
  //     this.setState({
  //         notes: this.state.notes.filter(note => note.id !== noteId)
  //     });
  // };

  updateFolderName(folderName) {
    this.setState({ folderName: { value: folderName } });
  }

  handleSubmit(event) {
    // event.preventDefault();
    //remove later because we want to POST to the noteful server
    const folderName = this.state;
    console.log("Folder Name: ", folderName.value);
    const formData = JSON.stringify({ folderName: folderName });

    fetch(`${config.API_ENDPOINT}/folders`, {
      // This is the data we're sending with our request
      body: formData,

      // the method is important, don't forget it, or it won't work properly!
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(folder => {
        // Add the folder to the folders array in App.js state
      });
  }

  render() {
    return (
      <div className="add_folder_form">
        <form className="add-folder-form" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="name">New Folder Name:</label>
          <input
            type="text"
            className="foldername"
            name="foldername"
            id="foldername"
            // ref={this.folderNameInput}
            // value="New Folder"
            onChange={e => this.updateFolderName(e.target.value)}
          />
          <div className="add-folder-submit-button">
            <button type="submit" className="submit_button">
              Submit{" "}
            </button>
          </div>
          {/* Create a new component AddFolder that implements a form to capture the name of a new folder from the user.
                    This form should submit the name of the new folder to the POST /folders endpoint on the server.
                    Ensure that any errors are properly handled.
                    Add a button to the navigation to invoke the new form. */}
        </form>
      </div>
    );
  }
}

export default AddFolder;
