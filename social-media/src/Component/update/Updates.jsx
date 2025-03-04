import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";// ✅ Import AuthContext
import "./update.scss";

function Update({ setOpenUpdate, user, refetch }) {
  const { setCurrentUser } = useContext(AuthContext); // ✅ Get setCurrentUser from AuthContext
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });

  useEffect(() => {
    setTexts({
      name: user.name || "",
      city: user.city || "",
      website: user.website || "",
    });
  }, [user]);

  const queryClient = useQueryClient();

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.error("Upload error:", error);
      return "";
    }
  };

  const mutation = useMutation({
    mutationFn: async (updatedUser) => {
      await makeRequest.put("/users", updatedUser);
    },
    onSuccess: async () => {
      console.log("Update successful! Updating AuthContext...");

      const updatedUser = { ...user, ...texts }; // Merge new data with existing user
      setCurrentUser(updatedUser); // ✅ Update AuthContext
      localStorage.setItem("users", JSON.stringify(updatedUser)); // ✅ Save changes to localStorage

      queryClient.invalidateQueries(["user"]);
      if (refetch) {
        try {
          await refetch();
          console.log("Refetch completed!");
        } catch (err) {
          console.error("Refetch error:", err);
        }
      }

      setOpenUpdate(false);
    },
  });

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const coverUrl = cover ? await upload(cover) : user.coverpicture;
      const profileUrl = profile ? await upload(profile) : user.profilePic;

      mutation.mutate({
        ...texts,
        coverpicture: coverUrl,
        profilePic: profileUrl,
      });
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
    <div className="update">
      <form>
        <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        <input
          type="text"
          name="name"
          value={texts.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="city"
          value={texts.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="website"
          value={texts.website}
          onChange={handleChange}
          placeholder="Website"
        />
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>X</button>
    </div>
  );
}

export default Update;
