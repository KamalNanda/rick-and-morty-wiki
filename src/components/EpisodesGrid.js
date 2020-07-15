import React from 'react'
import {Link} from 'react-router-dom'
function EpisodeGrid(props){
	const data = props.data
	return(
		 <div className="card-grid">
          {
            data.map((data , index) => {
              return(
                <div key={index}>
					<div className="card shadow rounded">
                      <div className="card-body">
	                      
                   		 <div className="row">
                   		 	<h2 className="card-title" style={{color : "#ff9900"}}>{data.name}</h2>
                   		 </div>
                        <div className="row">
                        	<h5>Episode - </h5>
                        	<p className="card-text">{data.episode}</p>
                        </div>
                       	<div className="row">
                        	<h5>Aired On - </h5>
                        	<p className="card-text">{data.air_date}</p>
                        </div>
                        <Link to ={{
		                 	pathname: `/Episode/${data.name}` ,
		                 	id : data.id
		                 }}>
		                 <p style={{float: "right", fontWeight : "700" , marginBottom : "-5px"}}>Click Here</p>
                        </Link>
                      </div>
                    </div>
               </div>
              )
            })
          }
        </div>
	)
}
export default EpisodeGrid