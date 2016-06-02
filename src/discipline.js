'use strict';
import React from 'react';

const DisciplineDescription = React.createClass({
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

const DisciplineItemList = React.createClass({
  chooseDiscipline: function () {
    this.props.onClickDiscipline({ description: this.props.data.description, id:  this.props.data.id});
  },
  render: function () {
    return (
      <button type="button" className="btn btn-default" onClick={this.chooseDiscipline}>{this.props.data.name}</button>
    );
  }
});

const DisciplineForm = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  displayDisciplineDescription: function (data) {
    this.setState({ description: data.description });
    this.props.saveCharacter({id: data.id})
  },
  componentDidMount: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    let self = this;
    return (
      <div>
        <div className="btn-group-vertical col-md-2 col-md-offset-1">
          {this.state.data.map(function (data) {
            return <DisciplineItemList key={data.id} data={data} onClickDiscipline={self.displayDisciplineDescription}/>;
          }) }
        </div>
        <DisciplineDescription description={this.state.description} />
      </div>
    );
  }
});

export default DisciplineForm;