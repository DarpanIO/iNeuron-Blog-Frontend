import React from 'react'
import './category-card.css';
export default function CategoryCard(props) {

  return (
    <div className='category-card rounded-4 p-2'>
    <img className="category-image mx-1" src={props.imageUrl} alt='' />
    <div className='category-title'>
    {props.title}
    </div>
    </div>
  )
}
