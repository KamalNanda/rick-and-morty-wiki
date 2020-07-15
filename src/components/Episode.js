import React from 'react'
import axios from 'axios'
class Episode extends React.Component{
	constructor(props){
		super(props)
		this.state={
			charList : [],
			epiData : {}, 
			id: "",
		}
		this.loadChar = this.loadChar.bind(this)
	}
	componentDidMount(){
		var id = localStorage.getItem("id")
		if(!id) 
		{
			localStorage.setItem("id" , this.props.location.id)
			this.loadChar(id)
		}
		else if(this.props.location.id && id !== this.props.location.id){
			localStorage.setItem("id" , this.props.location.id)
			this.loadChar(this.props.location.id)
		}
		else this.loadChar(id)
	}	
	async loadChar(id){
		await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
		.then(response => {this.setState({
					epiData : response.data
				})})
		await this.state.epiData.characters.map(link => {
			return(
				axios.get(link).then(response => {
					var char = {
						id : response.data.id,
						name : response.data.name,
						species : response.data.species,
						imgLink : response.data.image,
						origin : response.data.origin.name,
						status : response.data.status
					}
					this.setState(state =>({
			      		charList : state.charList.concat([char])
			    	}))
				})
			)
		})
	}
	render(){
		return(
			<div className="container-fluid">
				<div className="epi-details">
					<div className="row">
						<h3>Name - </h3>
						<h4>{this.state.epiData.name}</h4>
					</div>
					<div className="row">
                    	<h3>Episode - </h3>
                    	<h4 className="card-text">{this.state.epiData.episode}</h4>
	                </div>
	               	<div className="row">
	                	<h3>Aired On - </h3>
	                	<h4 className="card-text">{this.state.epiData.air_date}</h4>
	                </div>
	                <div className="row">
	                	<h2>Characters(<span style={{color : "#ff9900"}}>{this.state.charList.length}</span>)</h2>
	                </div>
				</div>
				<div className="card-grid">
					{
						this.state.charList.map((char , i) => {
							return (
								<div key={i}>
									<div className="card shadow rounded" style={{width: "18rem"}}>
									  <img src={char.imgLink} className="card-img-top" alt={char.id}/>
									  <div className="card-body">
									    <div className="row">
									    	<h4 className="card-title">{char.name}</h4>
									    </div>
									    <div className="row">
									    	<h5 className="card-title">Species - </h5>
									    	<p className="card-text">{char.species}</p>
									    </div>
									    <div className="row">
									    	<h5 className="card-title">Origin - </h5>
									    	<p className="card-text">{char.origin}</p>
									    </div>
									    <div className="row">
									    	<h5 className="card-title">Status - </h5>
									    	<p className="card-text">{char.status}</p>
									    </div>
									  </div>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}

export default Episode