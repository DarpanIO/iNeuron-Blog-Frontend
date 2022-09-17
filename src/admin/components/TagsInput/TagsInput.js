import React,{useState,useContext} from 'react';
import articleContext from '../../../context/articles/articleContext';
import './TagsInput.css';

const TagsInput = props => {
	const context = useContext(articleContext);
	const { article,setArticle,tags,setTags } = context;
	const name = props.name
	// const [tags, setTags] = useState(props.tags)
	
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)])
		setArticle({...article,[props.name]:[...tags.filter((_, index) => index !== indexToRemove)]});
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value])
			setArticle({...article,[props.name]: [...tags, event.target.value]});
			// props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
		<div className="tags-input input-border">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
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

export default TagsInput;