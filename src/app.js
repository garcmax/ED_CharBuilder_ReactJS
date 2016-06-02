'use strict';

import Director from 'director';
import React from 'react';
import ReactDOM from 'react-dom';
import ItemForm from './item-form';
import RaceForm from './race';
import DisciplineForm from './discipline';

const Menu = React.createClass( {
  render : function() {
    return (
      <div id="row">
            <div className="btn-group col-md-12 col-md-offset-5" role="group">
              <a className="btn btn-default" href="#/discipline">Disicpline</a>
              <a className="btn btn-default" href="#/race">Race</a>
              <a className="btn btn-default" href="#/attributs">Attributs</a>
              <a className="btn btn-default" href="#">Suite</a>
            </div>
          </div>
    );
  }
});

const App = React.createClass({
  getInitialState: function () {
    return ({ page: 'discipline' });
  },
  buildCharacter: function(data) {
  
  },
  disciplineChoosed: function (data) {
    this.setState({discipline : data.id});
  },
  raceChoosed: function (data) {
    this.setState({race : data.id});
  },
  componentDidMount: function () {
    const setDisciplinePage = function () {
      this.setState({ page: 'discipline' });
    }.bind(this);
    const setRacePage = function () {
      this.setState({ page: 'race' });
    }.bind(this);
    const setAttributsPage = function () {
      this.setState({ page: 'attributs' });
    }.bind(this);
    const router = Director.Router({
      '/discipline': setDisciplinePage,
      '/race': setRacePage,
      '/attributs': setAttributsPage,
      '*': setDisciplinePage,
    });
    router.init();
  },
  render: function () {
    switch (this.state.page) {
      case 'discipline':
        return (<div id="container">
          <Menu />
          <div id="row">
            <ItemForm url="disciplines.json" saveCharacter={this.disciplineChoosed}/>
          </div>
        </div>);
      case 'race':
        return (<div id="container">
         <Menu />
          <div id="row">
            <RaceForm races="races.json" integrity="integrity.json" disc={this.state.discipline} saveCharacter={this.raceChoosed}/>
          </div>
        </div>);
      case 'attributs':
        return (<div id="container">
          <Menu />
            <div>attributs</div>
          </div>);
      default:
        return (<span>default</span>);
    }
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);