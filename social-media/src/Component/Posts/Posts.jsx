import "./posts.scss";
import React from "react";
import Post from "../Post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

function Posts({userid}) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await makeRequest.get("/posts?userid=" + userid);
      // console.log(typeof userid)
      return res.data;
    },
  });

   return (
    <div className="posts">
      {error?"Something went wrong": (isLoading?"Loading...":data.map((post) => (
        <div className="post" key={post.id}>
          <Post post={post} />
        </div>
      )))}
    </div>
  );
}

export default Posts;
