import React from 'react'
import { useParams } from 'react-router-dom'

const Post = (props) => {

  const params = useParams();

  return (
    <div>
      <h2>{props.title}</h2>
      <h2>{params.id}</h2>
      <p>{props.description}</p>
    </div>
  )
}

export default Post