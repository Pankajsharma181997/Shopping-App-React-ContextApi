import React from 'react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'

const Rating = ({rating,handleClick,Style}) => {

  return (
    <>
    {
        [...Array(5)].map((_,index) => (
            <span key={index}>
            {rating > index ? (<AiFillStar onClick={() => handleClick(index)}/>) : (<AiOutlineStar onClick={() => handleClick(index)}/>)}
            </span>
        )) 
    }
    </>
  )
}

export default Rating