import React, { useContext, useState } from "react";
import "../comments/Comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; //it is used to fetch the data based on query
import { makeRequest } from "../../axios";
import moment from "moment";
function Comments({ postId }) {
  const [description, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  // this below is used when posting the new post then get the updated list of posts
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // invalidate and refetch all the posts
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ description, postId });
    setDesc("");
  };

  function display(comment) {
    return (
      <div className="comment">
        <img src={comment.profilePicture} alt="" />
        <div className="details">
          <span>{comment.name}</span>
          <p>{comment.description}</p>
        </div>
        <span className="date">{moment(comment.createdAt).fromNow()}</span>
      </div>
    );
  }
  return (
    <div className="comments">
      <div className="writeComments">
        <img src={currentUser.profilePic} />
        <input
          type="text"
          placeholder="Write a Comment..."
          onChange={(e) => setDesc(e.target.value)}
          value={description}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading ? "is Loading " : data.map(display)}
    </div>
  );
}

export default Comments;
