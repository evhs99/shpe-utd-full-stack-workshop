import { useState } from 'react';

import Post from './Post'
import Menu from './common/Menu'

const Home = () => {

  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'First Post',
      description: 'This is the description of the first post.',
      likes: 5,
      comments: [
        'Great post!',
        'Thanks for sharing!',
        'Very informative!'
      ]
    },
    {
      id: '2',
      title: 'Second Post',
      description: 'This is the description of the second post.',
      likes: 10,
      comments: [
        'I learned a lot!',
        'Interesting read!',
        'Can you elaborate more?'
      ]
    },
    {
      id: '3',
      title: 'Third Post',
      description: 'This is the description of the third post.',
      likes: 2,
      comments: [
        'Nice perspective!',
        'I disagree with some points.',
        'Looking forward to your next post!'
      ]
    }
  ]);
  
  return (
    <div className="h-full">
    <div className="flex flex-row w-full"> 
        <Menu />
        <div id="content" className="w-full">
            <div className="flex flex-col items-start justify-start">
                <h1 className="text-4xl text-left"><b>Home Feed</b></h1>
                <p className="text-left">See the latest and most popular posts about your favorite indie bands!</p>
            </div>
            <div className="flex flex-wrap gap-8 my-8 w-full">
                {posts.map((post) => (
                    <Post id={post.id} title={post.title} description={post.description} likes={post.likes} comments={post.comments}/>
                ))}
            </div>
        </div>
    </div>
</div>
)
}

export default Home