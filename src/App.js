import React from 'react';
import './App.css';
import axios from 'axios'
import EpisodeGrid from './components/EpisodesGrid'
import {Route , Switch} from 'react-router-dom'
import Episode from './components/Episode'
import Contact from './Contact/Contact'
import SearchBar from './components/searchbar'
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data : [],
      keyword: ''
    }
    this.onSearchChange = this.onSearchChange.bind(this)
    this.loadPosts = this.loadPosts.bind(this)
  }
  onSearchChange(event){
    var search = event.target.value
    console.log(search)
    if(search !== "")
    {axios.get(`https://rickandmortyapi.com/api/episode/?name=${search}`).then(response => this.setState({data : response.data.results}))}
    else this.loadPosts()
  }
  async loadPosts(){
    var dataL1 , dataL2, data
    await axios.get('https://rickandmortyapi.com/api/episode').then(response => dataL1 = response.data.results)
    await axios.get('https://rickandmortyapi.com/api/episode?page=2').then(response => dataL2 = response.data.results)
    data = dataL1.concat(dataL2)
    this.setState({
      data : data
    })
  }
  componentDidMount(){
    this.loadPosts()
  }
  render(){
    
    return (
      <>
      <Switch>
        <Route exact path = "/" render={() => (
                 <div className="container-fluid">
                    <h1>Rick and Morty Wiki - by Kamal Nanda</h1>
                    <SearchBar onSearchChange={this.onSearchChange}/>
                    <EpisodeGrid data = {this.state.data}/>
                 </div>
        )} /> 
       <Route
            path="/Episode/:name"
            component={(props) => <Episode {...props} />}
         exact />
      </Switch>
      <Contact />
      </>
    )
  }
}

export default App;
