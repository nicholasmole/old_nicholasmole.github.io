import React from 'react';
import FlashyAbout from '../components/flashyabout';

const About = () => (
	<div className="Aboutsection">
		<div className="Title"> About me </div>
		<hr/>
		<div className="img_container">
			<img src="../img/Nick_mole.jpg"/>
			<div className="about_div">A passion for coding, and web development with the thrive to develop power content. Experienced in UX/UI design using a range of front-end and back-end skills. A database expert, who knows how to contruct a single-page application. Looking for some help? 
			</div>
		</div>
		<div className="header_text jump_tabs about_jump">
			<a className="about_click" onClick={()=>null}>Contact Me</a>
		</div>

		{/* <FlashyAbout/> */}
		{/* <div className="about_div">Web developer from the small town of Bristol. Always looking for the something new. Always excited to come up with a creative solutions to problems.
		</div>
		<div className="about_div">You imagine it. I make it happen.</div> */}
	</div>
);

export default About;
