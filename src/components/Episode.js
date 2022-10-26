import React, {useState, useEffect} from 'react'
import axios from 'axios'
const Episode = (props) => {
	let [charList, setCharList] = useState([])
	let [epiData, setEpiDate] = useState({})
	let [id, setId] = useState('')
	useEffect(() => {
		var id = localStorage.getItem("id")
		if(!id) 
		{
			localStorage.setItem("id" , props.location.id)
			loadChar(id)
		}
		else if(props.location.id && id !== props.location.id){
			localStorage.setItem("id" , props.location.id)
			loadChar(props.location.id)
		}
		else loadChar(id)
	}, [])
	
	const loadChar = (id) => {
		axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
		.then( async response => {
			
			console.log(response)
				setEpiDate(response.data)
				let list = []
				response.data.characters.map( async link => {
					return(
						await axios.get(link).then(response => {
							var char = {
								id : response.data.id,
								name : response.data.name,
								species : response.data.species,
								imgLink : response.data.image,
								origin : response.data.origin.name,
								status : response.data.status
							}
							list = [...list, char]  
							setCharList(list)
						})
					)
				})  
			})
		
	}
	
	return(
		<div className="container-fluid">
			<div className="epi-details">
				<div className="row">
					<h3>Name - </h3>
					<h4>{epiData.name}</h4>
				</div>
				<div className="row">
					<h3>Episode - </h3>
					<h4 className="card-text">{epiData.episode}</h4>
				</div>
				   <div className="row">
					<h3>Aired On - </h3>
					<h4 className="card-text">{epiData.air_date}</h4>
				</div>
				<div className="row">
					<h2>Characters(<span style={{color : "#ff9900"}}>{charList.length}</span>)</h2>
				</div>
			</div>
			<div className="card-grid">
				{
					charList.map((char , i) => {
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
 

export default Episode