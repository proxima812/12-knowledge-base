import { useEffect, useState } from "react";

function SavedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("saved-posts");
    setPosts(savedPosts ? JSON.parse(savedPosts) : []);
  }, []);

  return (
    <div className="mt-12 grid gap-5 grid-cols-1 md:grid-cols-2">
      {posts.map((item) => (
        <>
          <a
            href={item.id}
            className="flex flex-col justify-between gap-4 p-6 rounded-lg bg-black text-white"
          >
            <h3 className="text-xl font-bold">{item.title}</h3>
          </a>
        </>
      ))}
    </div>
  );
}

export default SavedPosts;
