import React from 'react';
import PropTypes from 'prop-types';
import './HeaderTop.scss';

export default x => {

	function cats () {
		return (
			<span>
				<span class="word wisteria">Make it flashy!</span>
				<span class="word belize">Make it awesome!</span>
				<span class="word pomegranate">Make it Last!</span>
				<span class="word green">Make it with Mole!</span>
				<span class="word midnight">cheap.</span>
			</span>
		);
	}

	return (
			x.props.map(prop => {
				return (
					<div className="headerTop" key={prop.id} >
						<div className="containCenter">
							<div className="floatingorb"></div>	
							<div className="floatingorb2"></div>	
							<div className="floatingorb3"></div>	
							<div className="floatingorb4"></div>	
						</div>
						<div className="containCenterComputer">
							<div className="ComputerBorder"></div>	
							<div className="codeLine"></div>	
							<div className="codeLine2"></div>	
							<div className="codeLine3"></div>	
							<div className="codeLine4"></div>	
						</div>
						<div className="flipTitle">
						</div>
						{/* <img src={`img/${prop.src}`}/> */}
						<h1>Make a site with <span>{prop.title}</span></h1>
						<div className="header_text">Lets make it go fast. </div>
						<div className="header_text hide_text">{cats()}</div>
						<div className="header_text jump_tabs">
							<a href="#about">ABOUT</a>
							<a href="#project">PROJECTS</a>
							<a href="#skills">SKILLS</a>
							<a href="#contact">CONTACT</a>
						</div>
					</div>
				);
			})
	);
};
