import React, {useContext, useState, useEffect} from 'react'
import "./profile.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from '../../Component/Posts/Posts'
import BackgroundProfile from "../../img/backgroundPfofile.jpg";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation, Link } from "react-router-dom";
import Update from '../../Component/update/Updates.jsx';




function Profile({post}) {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useContext(AuthContext);
   const [openSearch, setOpenSearch] = useState(false);

  const userid = Number.parseInt(useLocation().pathname.split("/")[2]);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["user", userid],
    queryFn: async () => {
      const res = await makeRequest.get("/users/find/" + userid);
      console.log(res.data);
      return res.data;
    },
  });
  const { data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: async () => {
      const res = await makeRequest.get(
        "/relationship?followedUserId=" + userid
      );
      console.log(res.data);
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (following) => {
      if (following) {
        console.log("Deleting following...");
        return makeRequest.delete(`/relationship?userid=${userid}`);
      }
      console.log("Adding relationship...");
      return makeRequest.post("/relationship", { userid });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship"]);
    },
  });

  const handleFollow = () => {
    if (!Array.isArray(relationshipData)) return;
    mutation.mutate(relationshipData.includes(currentUser.id));
  };


  return (
    <div className="profile">
      <div className="images">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching data: {error.message}</p>
        ) : (
          <>
           
            <img
              src={"/upload/" + data.coverpicture}
              alt="Cover"
              className="cover"
            />
            <img
              src={"/upload/" + data.profilePic}
              alt="Profile"
              className="profileImg"
            />
          </>
        )}
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="https://www.facebook.com/">
              <FacebookIcon fontSize="large" />
            </a>
            <a href="https://www.instagram.com/">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="https://x.com/?lang=en">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="https://www.linkedin.com/">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="https://www.pinterest.com/">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <Link
              to={`/${relationshipData?.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            ></Link>
            <span>{data?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon fontSize="small" />
                <span>{data?.city}</span>
              </div>
              <div className="item">
                <LanguageIcon fontSize="small" />
                <span>{data?.website}</span>
              </div>
            </div>
            {userid === currentUser.id ? (
              <button onClick={() => setOpenUpdate(true)}>update</button>
            ) : (
              <button onClick={handleFollow}>
                {relationshipData?.includes(currentUser.id)
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailIcon fontSize="small" />
            <MoreVertIcon fontSize="small" />
          </div>
        </div>
      </div>
      <Posts userid={userid} />
      {openUpdate && (
        <Update setOpenUpdate={setOpenUpdate} user={data} refetch={refetch} />
      )}
    </div>
  );
}

export default Profile