import { useState } from 'react';

// import other components to be rendered in the Home page
import Post from './common/Post'
import Menu from './common/Menu'

const Home = () => {

  // example posts to test state with, this will be replaced in time with a more dynamic solution
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

  // return for this function returns the JSX of the React component
  return (
    <div className="h-full">
      <div className="flex flex-row w-full gap-8">
        <Menu /> {/* abstract menu into it's own common component */}
        <div id="content" className="p-6 w-full bg-neutral-700 rounded-xl">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-left"><b>Home Feed</b></h1>
            <p className="text-left">See the latest and most popular posts from your fellow comets!</p>
          </div>
          <div className="flex flex-wrap gap-8 my-8 w-full">

            {/* map function iterates through all posts to render them on the feed */}
            {posts.map((post) => (
              <Post id={post.id} title={post.title} description={post.description} likes={post.likes} comments={post.comments} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home