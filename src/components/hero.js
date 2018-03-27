import React, {Component} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {Map, List} from 'immutable';
import PropTypes from 'prop-types';
import {bind} from 'lodash-decorators';
import {Link} from 'react-router-dom';

class Hero extends Component {
	constructor(props) {
		super(props);

		this.interval = null;

		this.state = {
			index: 0
		};
	}

	static propTypes = {
		images: ImmutablePropTypes.list,
		title: PropTypes.string,
		link: ImmutablePropTypes.map,
		size: PropTypes.string,
		scrollTo: PropTypes.string,
		color: PropTypes.string
	};

	static defaultProps = {
		images: List(),
		title: '',
		link: Map(),
		size: '',
		scrollTo: '',
		color: 'pom'
	};

	componentDidMount() {
		this.init();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	init() {
		this.interval = setInterval(this.changeBackground, 3000);
	}

	@bind()
	getNextIndex() {
		console.log("eee");
		const {images} = this.props;
		const {index} = this.state;
		// if (images.count() <= 1) {
		// 	return index;
		// }

		if (index + 1 >= 2) {
			return 0;
		}

		return index + 1;
	}

	@bind()
	changeBackground() {
		const index = this.getNextIndex();

		this.setState({index});
	}

	render() {
		const {size, color, images, title, link, scrollTo} = this.props;
		const {index} = this.state;
		return (
			<div className={`hero ${size} is-${color}`}>
				<div className="hero-background-images">
					{images.map((image, i) => {
						console.log(image);
						console.log(index + "i: "+ i);
						if (index === i) {
							var style = {
								//backgroundImage: `url(${image.get('url')})`
								backgroundImage: `url(${image})`
							};
						}	

						const className = ['hero-background-image'];

						if (index === i) {
							className.push('is-active');
						}
						if (index !== i) {
							// style = {
							// 	backgroundImage: `rgba(0,0,0,0)`
							// };
						}

						return (
							<div
								//key={image.get('url')}
								style={style}
								className={className.join(' ')}
							/>
						);
					})}
				</div>
				<div className="hero-overlay"/>
				<div className="hero-inner">
					{title ? <h1>{title}</h1> : null}
					{/* {link && link.get('url') ? */}
					
					{link.map((url, i) => {
						if (index === i) {
							const lnk = `/${url}`;
							return (
								<Link to={lnk}>
									{url}
								</Link>
							); 
						}
					})}
				</div>
				{scrollTo && scrollTo !== '' ? <div>scroll to</div> : null}
			</div>
		);
	}
}

export default Hero;
