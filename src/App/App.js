import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css';

// use context instead of prop drilling

// implement 2 fetch requests to two endpoint when the applicatin mounts /folders and /notes
// GET http://localhost:9090/folders
// GET http://localhost:9090/
// store the response from theses requests using setState in whichever component you were keeping your dummy state

// implement the delete button for each note in main route and folder route

// implement the dlete button on the note page, if delete is successful redirect to the / path
// To delete notes, make a DELETE request to the /notes/<note-id> endpoint.
// **You can implement the DELETE request in the component that owns
// the delete button, and then use a callback context value to update
// the state in your top level component.
// **After making a successful DELETE request, you can use a
// this.state.notes.filter method along with setState
// to remove a note from state and update context.

//HINTS****

// You'll be able to swap the render props in your Route components
// for component props as the nested components can read the values
// from context directly.

// You may need to swap some function components for class components so
// that you can read context (or use Context.Consumer components with render props).

// To add the content type header in fetch requests you can pass in an
// "init" object with settings. Here's an example for a DELETE requests:
// fetch(`http://localhost:1234/foo/${fooId}`, {
//   method: 'DELETE',
//   headers: {
//     'content-type': 'application/json'
//   },
// })



class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
        .then(([notesRes, foldersRes]) => {
            if(!notesRes.ok)
            return notesRes.json().then(e => Promise.reject(e));
            if(!foldersRes.ok)
            return foldersRes.json().then(e => Promise.reject(e));

            return Promise.all([notesRes.json(), foldersRes.json()]);
        })
        .then(([notes, folders]) => {
            this.setState({notes, folders});
        })
        .catch(error => {
            console.error({error});
        });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                        />
                ))}
                <Route path="/note/:noteId"
                    component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                        />
                            ))}
                <Route path="/note/:noteId"
                    component={NotePageMain} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote
        };

        return (
            <ApiContext.Provider value={value}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </ApiContext.Provider>
        );
    }
}

export default App;