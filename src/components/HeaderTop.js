import React from 'react';
import PropTypes from 'prop-types';
import './HeaderTop.scss';

export default x => {
	return (
			x.props.map(prop => {
				return (
					<div style={{backgroundImage: `url("img/${prop.src}")`}} className="headerTop parallax__layer parallax__layer--back" key={prop.id} >
						{/* <img src={`img/${prop.src}`}/> */}
						<h1>{prop.title}</h1>
						<div className="subtitle">{prop.subtitle}</div>
					</div>
				);
			})
	);
};
