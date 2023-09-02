import { useEffect, useState } from "react";

function SavedPosts() {
 const [posts, setPosts] = useState([]);

 useEffect(() => {
  const savedPosts = localStorage.getItem("saved-posts");
  setPosts(savedPosts ? JSON.parse(savedPosts) : []);
 }, []);

 return (
  <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
   {posts.map((item) => (
    <>
     <a href={item.id}>
      <h3 className="text-xl font-bold">{item.title}</h3>
     </a>
    </>
   ))}
  </div>
 );
}

export default SavedPosts;
