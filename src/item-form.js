'use strict';
import React from 'react';

const ItemDescription = React.createClass({
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

const ItemList = React.createClass({
  chooseItem: function () {
    this.props.onClickItem({ description: this.props.data.description, id:  this.props.data.id});
  },
  render: function () {
    return (
      <button type="button" className="btn btn-info" onClick={this.chooseItem}>{this.props.data.name}</button>
    );
  }
});

const ItemForm = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  displayDescription: function (data) {
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
  componentWillReceiveProps: function(nextProps) {
   $.ajax({
      url: nextProps.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(nextProps.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    let self = this;
    return (
      <div>
        <div className="btn-group-vertical col-md-2 col-md-offset-1">
          {this.state.data.map(function (data) {
            return <ItemList key={data.id} data={data} onClickItem={self.displayDescription}/>;
          }) }
        </div>
        <ItemDescription description={this.state.description} />
      </div>
    );
  }
});

export default ItemForm;