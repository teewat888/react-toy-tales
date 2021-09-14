import React, { Component } from 'react';

class ToyCard extends Component {

  handleOnClick = (e) => {
    e.preventDefault();
    this.props.removeToy(this.props.toy.id);
  }

  handleLike = (e) => {
    e.preventDefault();
    this.props.likeToy(this.props.toy);
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button className="like-btn" onClick={this.handleLike}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.handleOnClick}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
