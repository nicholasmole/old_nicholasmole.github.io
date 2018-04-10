import React from 'react';
import './projectSection.scss';

const Projects = x => {
	console.log(x);
	
	return (
		
		x.props.map(prop => {
			return (
				<div className="contain_projects">
					<a href={prop.href}>
						<div className="proj_img">
							<img src={prop.img}/>
							<div className="bottom_screen_img"></div>
						</div>
						<div className="proj_desc">
							<div className="proj_title">{prop.title}</div>
						</div>
					</a>
				</div>
			);
		})
	);
};

export default Projects;
