import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const URL = 'http://localhost:4000/toys'

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
      fetch(URL)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          toys: data
        })
      }).catch((e) => {console.log(e)})
  }

  addToy = (formData) => {
    const confObj = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }
    fetch(URL,confObj).then(resp => resp.json())
    .then(data => {
      const newToy =[...this.state.toys];
      newToy.push(data);
      this.setState({
        toys: newToy
      })
    })
    .catch((e) => {console.log(e)})
  }

  removeToy = (id) => {
    const toDelete = {
      id: id
    }
    const confObj = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toDelete)
    }
    fetch(URL+`/${id}`,confObj).then(resp => resp.json())
    .then(data => {
      const newToys = this.state.toys.filter(el => el.id !== id);
      this.setState({
        toys: newToys
      })
      })
    .catch((e) => {console.log(e)})
  }

  likeToy = (toy) => {
    const toPatch = {
      id: toy.id,
      name: toy.name,
      image: toy.image,
      likes: toy.likes+1
    }
    const confObj = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toPatch)
    }
    fetch(URL+`/${toy.id}`,confObj).then(resp => resp.json())
    .then(data => {
      const idx = this.state.toys.indexOf(toy);
      const newToys = [...this.state.toys];
      newToys.splice(idx,1,data);

      console.log(newToys);
      this.setState(
        {toys: newToys
        });
      })
    .catch((e) => {console.log(e)})

  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toysList={this.state.toys} removeToy={this.removeToy} likeToy={this.likeToy} />
      </>
    );
  }

}

export default App;
