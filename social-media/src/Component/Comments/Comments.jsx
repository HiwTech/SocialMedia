import { useContext, useState } from "react";
import React from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

function Comments({ postid }) {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["comment"],
    queryFn: async () => {
      const res = await makeRequest.get("/comments?postid=" + postid);
      console.log(res.data);
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comment"]);
    },
  });

  const handleComment = async (e) => {
    e.preventDefault();
    mutation.mutate(
      { desc, postid },
      {
        onSuccess: () => {
          setDesc(""); // Clear the description
        },
        onError: (error) => {
          console.error("Error sharing post:", error);
        },
      }
    );
  };

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser?.profilePic?.startsWith("http")
              ? currentUser.profilePic
              : `http://localhost:8880/upload/${currentUser.profilePic}`
          }
          alt="User"
          onError={(e) => (e.target.src = loginImg)}
        />
        <input
          type="text"
          placeholder="Write a comment..."
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={handleComment}>Send</button>
      </div>
      {isLoading
        ? "Loading...."
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img
                src={
                  comment.profilePic?.startsWith("http")
                    ? comment.profilePic
                    : `http://localhost:8880/upload/${comment.profilePic}`
                }
                alt="User"
                onError={(e) => (e.target.src = loginImg)}
              />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
}

export default Comments;

