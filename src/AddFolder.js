import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class AddFolder extends Component {
    render() {
        return (
            <div className="add_folder_form">
                <form className="add-folder-form">

                    <label htmlFor="name">New Folder Name:</label>
<input
type="text"
className="folder-name"
name="folder-name"
id="folder-"/>
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
        )
    }
}

export default AddFolder;