import React from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helper'
import './NoteListNav.css'
import AddFolder from '../AddFolder'
import AddNote from '../AddNote'

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div> </div>,
    main: () => <h2>  </h2>
  },
  {
    path: "/add-folder",
    // exact: true,
    sidebar: () => <div>
      <br/>
      <br/> <AddFolder /></div>,
    main: () => <h2>  </h2>
  },
  {
    path: "/add-note",
    sidebar: () => <div></div>,
    main: () => <h2><AddNote/></h2>
  }
];

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders=[], notes=[] } = this.context
    return (
      <Router>
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>

          </li>

        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          Link to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
          <Switch>
            {routes.map((route, index) => (
              <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.sidebar />}
              />
            ))}
          </Switch>
          <Switch>
            {routes.map((route, index) => (
              <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
              />
            ))}
          </Switch>
        </CircleButton>

      </div>
    </div>
    </Router>
  );
}
}