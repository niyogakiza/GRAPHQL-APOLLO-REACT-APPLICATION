import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Navigation from './components/Navigation'
import Profile from './components/Profile'
import {Organization} from './components/Organization'

import * as routes from './constants/routes'


class App extends Component {
    state= {
        organizationName: 'the-road-to-learn-react'
    }

    onOrganizationSearch = value => {
        this.setState({ organizationName: value})
    }

  render() {
        const { organizationName } = this.state
    return (
        <Router>
          <div className="App">
              <Navigation
                  organizationName={organizationName}
                  onOrganizationName={this.onOrganizationSearch}
              />
              <div className='App-main'>
                <Route
                    exact
                    path={routes.ORGANIZATION}
                    component={() => (
                        <div className='App-content_larger_header'>
                          <Organization
                              organizationName={organizationName}
                          />
                        </div>
                    )}
                />
                <Route
                    exact
                    path={routes.PROFILE}
                    component={() => (
                        <div className='App-content_small-header'>
                            <Profile/>
                        </div>
                    )}
                />
              </div>
          </div>
        </Router>
    );
  }
}

export default App;
