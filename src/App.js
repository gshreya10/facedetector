import React, {Component} from 'react';
import './App.css';
// Packages
import 'tachyons';
import Particles from 'react-particles-js';
// Components
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

// Options for particles.js
const ParticleParams = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area:1000
      }
      }
  }
}

// Initial state
const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends Component {

  constructor() {
    super();
    // Setup state object
    this.state = initialState;
  }

  // Calculate with response where the bounding_box would be located
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs["0"].data.regions["0"].region_info.bounding_box;

    // Grab image by id
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  // Check whenever there is an input on ImageLinkForm
  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  // When detect button is clicked
  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('https://facedetector-api-webapp.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://facedetector-api-webapp.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
               this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home')  {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {

    const { isSignedIn, box, imageURL, route, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={ParticleParams}/> 
        <Navigation className='bottom' isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <Logo/>
        {
          route === 'home'
          ? <div>
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL}/>
          </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
        <p className='white' style={{position: 'fixed', bottom: '0', right: '5px'}}><small>-Shreya Gupta</small></p>
      </div>
    );
  }
}

export default App;
