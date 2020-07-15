import React from 'react'
class searchBar extends React.Component{
	render(){
		return(
			<div className="sbar mx-auto mb-4 mt-4">
				<input className="form-control mr-sm-2" type="text" onChange={this.props.onSearchChange} placeholder="Search a episode by name" />
			</div>
		)
	}
}
export default searchBar