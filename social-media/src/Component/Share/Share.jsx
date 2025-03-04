import "./share.scss";
import Map from "../../img/map.jpg";
import Image from "../../img/image.jpg";
import Friends from "../../img/friend.jpg";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";


const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

const upload = async () => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await makeRequest.post("/upload", formData); // Add await
    return res.data;
  } catch (error) {
    console.error("Upload error:", error);
    return ""; // Handle error gracefully
  }
};






  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleShare = async (e) => {
    e.preventDefault();

    let imgUrl = "";
    if (file) imgUrl = await upload();

    mutation.mutate(
      { desc, img: imgUrl },
      {
        onSuccess: () => {
          setDesc(""); // Clear the description
          setFile(null); // Clear the file
         
        },
        onError: (error) => {
          console.error("Error sharing post:", error);
        },
      }
    );
  };
  const profileImageUrl = currentUser?.profilePic?.startsWith("http")
    ? currentUser.profilePic
    : `http://localhost:8880/upload/${currentUser.profilePic}`;


  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={profileImageUrl}
              alt="User"
              onError={(e) => (e.target.src = loginImg)}
            />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />

            <div className="right">
              {file && (
                <img className="file" alt="" src={URL.createObjectURL(file)} />
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friends} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
