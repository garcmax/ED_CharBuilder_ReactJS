'use strict';
import React from 'react';

const RaceDescription = React.createClass({
  render: function () {
    return (
      <div className="panel panel-default col-md-6">
        <div className="panel-body">
          {this.props.description}
        </div>
      </div>
    );
  }
});

const RaceItemList = React.createClass({
  chooseRace: function () {
    this.props.onClickRace({ description: this.props.data.description, id : this.props.data.id});
  },
  render: function () {
    if (this.props.integrity.racesLimitations[this.props.data.id].indexOf(this.props.disc) >= 0) {
      return (
        <button type="button" className="btn btn-info" onClick={this.chooseRace}>{this.props.data.name}</button>
      );
    } else {
      return (
        <button type="button" className="btn btn-danger" onClick={this.chooseRace}>{this.props.data.name}</button>
      );
    }
  }
});

const RaceForm = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  displayRaceDescription: function (data) {
    this.setState({ description: data.description });
    this.props.saveCharacter({id: data.id});
  },
  componentDidMount: function () {
    $.ajax({
      url: this.props.races,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.races, status, err.toString());
      }.bind(this)
    });
    $.ajax({
      url: this.props.integrity,
      dataType: 'json',
      cache: false,
      success: function (data) {        
        this.setState({ integrity: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.integrity, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    let self = this;
    return (
      <div>
        <div className="btn-group-vertical col-md-2 col-md-offset-1">
          {this.state.data.map(function (data) {
            return <RaceItemList key={data.id} data={data} integrity={self.state.integrity} disc={self.props.disc} onClickRace={self.displayRaceDescription}/>;
          }) }
        </div>
        <RaceDescription description={this.state.description} />
      </div>
    );
  }
});

export default RaceForm;