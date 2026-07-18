import CreatePost from "../../components/post/CreatePost";
import PostList from "../../components/post/PostList";

function Home() {
  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">

      <CreatePost />

      <PostList />

    </div>
  );
}

export default Home;