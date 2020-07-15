import React , { Component } from 'react'
class ContactBody extends Component{

	onIconClick = (ob) =>{
		window.open(ob.link , '_blank')
	}
	render(){
		const data= this.props.data
		return(
			<div id="contactBody">
				<header>
					<div className="contact-header">
						<h2 style={{fontSize : "20px"}}>Designed & Developed By <a href="https://kamalnanda.github.io/" target="_blank" rel="noopener noreferrer" style={{color : "white"}}>Kamal</a></h2>
					</div>
					<img src="https://ik.imagekit.io/hbj42mvqwv/close_jpFLuKZyl.png" onClick={this.props.onCloseClick} alt="close" className="close"/>
				</header>
				<h2 align="center" className="cbH">GET IN TOUCH ON</h2>
				<div className="icon-holder">
					{
						data.map((data , index) =>{
							return <img src={data.imgLink} key={index} id={data.id} onClick={() => this.onIconClick(data)} href={data.link} className="icon" alt={data.id} />
						})
					}
				</div>
			</div>
		)
	}
}
export default ContactBody