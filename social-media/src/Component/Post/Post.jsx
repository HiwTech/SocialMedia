import { useContext, useState } from "react";
import "./post.scss";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Comments from "../Comments/Comments";
import moment from "moment";
import loginImg from "../../img/login.png";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

function Post({ post }) {
  const [openComment, setOpenComment] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // Fetch likes
  const { isLoading: likesLoading, data: likesData } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: async () => {
      const res = await makeRequest.get("/likes?postid=" + post.id);
      return res.data;
    },
  });

  console.log(post)
  // Fetch comment count
  const { isLoading: commentsLoading, data: commentCount } = useQuery({
    queryKey: ["commentCount", post.id],
    queryFn: async () => {
      const res = await makeRequest.get("/comments/count?postid=" + post.id);
      return res.data.count; // Assume API returns `{ count: <number> }`
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (liked) => {
      if (liked) {
        return makeRequest.delete("/likes", { data: { postid: post.id } });
      }
      return makeRequest.post("/likes", { postid: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
    },
  });

  const handleClick = () => {
    if (!Array.isArray(likesData)) return;
    mutation.mutate(likesData.includes(currentUser.id));
  };
  
const  postid = post.id;
console.log(postid);
  const deleteMutation = useMutation({
    
    mutationFn: async (postid) => {
      if (postid ) {
        return makeRequest.delete("/posts/" + postid );
      }
     
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleDelete = ()=>{
    deleteMutation.mutate(postid)
  }
 const profileImageUrl = post?.profilePic?.startsWith("http")
   ? post.profilePic
   : `http://localhost:8880/upload/${post.profilePic}`;



  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInf">
            <img
              src={profileImageUrl}
              alt="User"
              onError={(e) => (e.target.src = loginImg)}
            />

            <div className="detail">
              <Link
                to={`/profile/${post.userid}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
                <span className="date">{moment(post.createdAt).fromNow()}</span>
              </Link>
            </div>
          </div>
          <div className="icon">
            <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && post.userid === currentUser.id && (
              <button onClick={handleDelete}>delete</button>
            )}
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {likesLoading ? (
              "Loading..."
            ) : Array.isArray(likesData) &&
              likesData.includes(currentUser.id) ? (
              <FavoriteIcon style={{ color: "red" }} onClick={handleClick} />
            ) : (
              <FavoriteBorderIcon onClick={handleClick} />
            )}
            {Array.isArray(likesData) ? likesData.length : 0} likes
          </div>

          <div className="item" onClick={() => setOpenComment(!openComment)}>
            <MessageIcon />
            {commentCount > 0 && commentCount} Comments
          </div>
          <div className="item">
            <ShareIcon />
            Shared
          </div>
        </div>
        {openComment && <Comments postid={postid}   />}
      </div>
    </div>
  );
}

export default Post;

