import React,{useContext} from 'react';
import articleContext from '../../../context/articles/articleContext';
import './TagsInput.css';

const AuthorInput = props => {
	const context = useContext(articleContext);
	const { article,setArticle,author,setAuthor } = context;
	
	const removeTags = indexToRemove => {
		setAuthor([...author.filter((_, index) => index !== indexToRemove)])
		setArticle({...article,[props.name]:[...author.filter((_, index) => index !== indexToRemove)]});
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setAuthor([...author, event.target.value])
			setArticle({...article,[props.name]: [...author, event.target.value]});
			// props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input input-border">
			<ul id="tags">
				{author.map((singleauthor, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{singleauthor}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				// onKeyDown={event => event.keyCode == 13 ? event.key.preventDefault : null}
				placeholder="Press enter to add tags"
				// value={props.value}
			/>
		</div>
	);
};

export default AuthorInput;