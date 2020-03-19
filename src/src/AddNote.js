import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class AddNote extends Component {
  render() {
    return (
      <div className="add_note_form">
        <form className="add-note-form">
          <label htmlFor="name">Note Name:</label>
          <input
            type="text"
            className="note-name"
            name="note-name"
            id="note-"
          /><br/>
          <label htmlFor="content">Note Content:</label>
          <input
            type="text"
            className="note-content"
            name="note-content"
            id="note-content"
          /><br/>
          <label htmlFor="folder">Note Folder:</label>
          {/* should be a dropdown */}
          <input
            type="text"
            className="note-folder"
            name="note-folder"
            id="note-folder"
          /><br/>

          <div className="add-note-submit-button">
            <button type="submit" className="submit_button">
              Submit{" "}
            </button>
          </div>
          {/* Create a new component AddNote that implements a form to capture the name,
                    content and folder for a new Note.
                    Submit to the POST /notes endpoint on the server.
                    Add validation to ensure that the name of the note is not left blank.
                    The folder should be selected from a list of existing folders.
                    Ensure that errors are properly handled.
                    Add a button to the note list page to invoke this new form. */}
        </form>
      </div>
    );
  }
}

export default AddNote;
