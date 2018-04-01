import React, {Component} from 'react';
import '../css/metlife_css/loader.scss';

/* eslint-disable react/self-closing-comp */
const LoadingElement = (props = 'loaderDiv') => {
	console.log('ccccccccc');
	let loaderChildren = [];
	for (let i = 0; i < 8; i++) {
		loaderChildren.push(<div></div>);
	}
	
	const loaderDiv = (
		<div className={props.divClass}>
			<div className="ml-loader">
				{loaderChildren}
			</div>
		</div>
	);
	console.log(loaderDiv);
	return loaderDiv;
};

export default LoadingElement;

// class LoadingElement extends Component {
// 	loadChildren = () => {
// 		let loaderChildren = [];
// 		for (let i = 0; i < 3; i++) {
// 			loaderChildren.push(<div></div>);
// 		}
// 		return loaderChildren;
// 	};

// 	loaderDiv = () => {
// 		return (
// 			<div>
// 				<div className="ml-loader">
// 					{this.loaderChildren}
// 				</div>
// 				<div className="ml-loader-label">
// 					<p>Loading...</p>
// 				</div>
// 			</div>
// 		);
// 	};

// 	render() {
// 		console.log('ooooo');
// 		return <div>{this.loaderDiv}</div>;
// 	}
// }