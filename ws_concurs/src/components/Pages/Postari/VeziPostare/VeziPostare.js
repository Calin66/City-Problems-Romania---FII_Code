import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { db, useAuth } from "../../../../firebase";
import Navbar from "../../../NavBar/navBar";
import ImageSlider from "./ImageSlider";
import "./VeziPostare.css";

const VeziPostare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuth();

  //aa
  const [upvotedL, setUpvotedL] = useState();
  const [upvotesL, setUpvotesL] = useState();

  const [downvotedL, setDownvotedL] = useState();
  const [downvotesL, setDownvotesL] = useState();

  const [savedL, setSavedL] = useState();
  const [savedArrayL, setSavedArrayL] = useState([]);
  //aa

  const [userCData, setUserCData] = useState();
  const [post, setPost] = useState();

  const id = location.state?.id;
  const userid = location.state?.userid;

  const getUserData = async () => {
    if (userid) {
      const userddRef = doc(db, "users", userid);
      const docSnap = await getDoc(userddRef);
      if (docSnap.exists()) {
        setUserCData(docSnap.data());

        const upvotedUser = docSnap.data().upvoted;
        const downvotedUser = docSnap.data().downvoted;

        setUpvotedL(upvotedUser.includes(id));
        setDownvotedL(downvotedUser.includes(id));
        // console.log(`up ${upvotedL} down ${downvotedL}`);
      } else {
        console.log("Error docSnap");
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [userid]);

  useEffect(() => {
    const getPost = async () => {
      const postsCollectionRef = doc(db, "posts", id);
      const data = await getDoc(postsCollectionRef);
      if (data.exists()) {
        setPost(data.data());
        setUpvotesL(data.data().upvotes);
        setDownvotesL(data.data().downvotes);
      } else {
        console.log("Error data");
      }
    };
    getPost();
  }, []);

  const handleSave = async () => {
    if (userCData && post) {
      const userRef = doc(db, "users", userid);
      const infoRef = doc(db, "posts", id);
      if (savedL) {
        setSavedL(false);
        const indexSaved = savedArrayL.indexOf(id);
        savedArrayL.splice(indexSaved, 1);
        await updateDoc(userRef, { saved: savedArrayL });
      } else {
        setSavedL(true);
        savedArrayL.push(id);
        await updateDoc(userRef, { saved: savedArrayL });
      }
    }
  };

  const handleUpvote = async () => {
    console.log(id);
    if (userCData && post) {
      const userRef = doc(db, "users", userid);
      const infoRef = doc(db, "posts", id);

      const upvotedUser = userCData.upvoted;
      const downvotedUser = userCData.downvoted;
      if (upvotedL) {
        setUpvotedL(false);
        const indexUpvoted = upvotedUser.indexOf(id);
        const updateUpvoted = upvotedUser.splice(indexUpvoted, 1);
        await updateDoc(infoRef, { upvotes: upvotesL - 1 });
        setUpvotesL(upvotesL - 1);
        await updateDoc(userRef, { upvoted: userCData.upvoted });
      } else if (downvotedL) {
        setUpvotedL(true);
        setDownvotedL(false);
        const indexDownvoted = downvotedUser.indexOf(id);
        downvotedUser.splice(indexDownvoted, 1);
        await updateDoc(userRef, { downvoted: downvotedUser });
        await updateDoc(infoRef, { upvotes: upvotesL + 1 });
        setUpvotesL(upvotesL + 1);
        await updateDoc(infoRef, { downvotes: downvotesL - 1 });
        setDownvotesL(downvotesL - 1);
        const updateUpvoted = upvotedUser.push(id);
        await updateDoc(userRef, { upvoted: upvotedUser });
      } else {
        setUpvotedL(true);
        // console.log(upvotedUser);
        upvotedUser.push(id);
        await updateDoc(infoRef, { upvotes: upvotesL + 1 });
        setUpvotesL(upvotesL + 1);
        await updateDoc(userRef, { upvoted: upvotedUser });
      }
    }
  };

  const handleDownvote = async () => {
    if (userCData && post) {
      const userRef = doc(db, "users", userid);
      const infoRef = doc(db, "posts", id);

      const upvotedUser = userCData.upvoted;
      const downvotedUser = userCData.downvoted;
      if (downvotedL) {
        setDownvotedL(false);
        const indexDownvoted = downvotedUser.indexOf(id);
        const updateDownvoted = downvotedUser.splice(indexDownvoted, 1);
        await updateDoc(infoRef, { downvotes: downvotesL - 1 });
        setDownvotesL(downvotesL - 1);
        await updateDoc(userRef, { downvoted: downvotedUser });
      } else if (upvotedL) {
        setDownvotedL(true);
        setUpvotedL(false);
        const indexUpvoted = upvotedUser.indexOf(id);
        upvotedUser.splice(indexUpvoted, 1);
        await updateDoc(userRef, { upvoted: upvotedUser });
        await updateDoc(infoRef, { upvotes: upvotesL - 1 });
        setUpvotesL(upvotesL - 1);
        await updateDoc(infoRef, { downvotes: downvotesL + 1 });
        setDownvotesL(downvotesL + 1);
        const updateDownvoted = downvotedUser.push(id);
        await updateDoc(userRef, { downvoted: downvotedUser });
      } else {
        setDownvotedL(true);
        // console.log(downvotedUser);
        downvotedUser.push(id);

        await updateDoc(infoRef, { downvotes: downvotesL + 1 });
        setDownvotesL(downvotesL + 1);
        await updateDoc(userRef, { downvoted: downvotedUser });
      }
    }
  };

  return (
    <>
      {id ? (
        <>
          <Navbar backgroundColor="black" />
          <div className="container-vp">
            {post && <ImageSlider slides={post.urls} />}
            {/* {post && console.log(post.urls)}; */}
            <div className="detalii-vp">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1>{post && post.titlu}</h1>
                <h2
                  style={{
                    backgroundColor: "#E45826",
                    color: "white",
                    marginLeft: "15px",
                    padding: "0 10px",
                  }}
                >
                  {post && post.tproblema}
                </h2>
              </div>
              <h2 style={{ textDecoration: "underline", fontSize: "25px" }}>
                Autor: {post && post.ownerName}
              </h2>
              <p style={{ fontSize: "24px", marginTop: "40px" }}>
                {post && post.descriere}
              </p>
            </div>
            <div id="vp-likes">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "200px",
                }}
              >
                <h4>Save</h4>
                {!savedL ? (
                  <BsBookmark className="vp-bookmark" onClick={handleSave} />
                ) : (
                  <BsFillBookmarkFill
                    className="vp-bookmark"
                    onClick={handleSave}
                  />
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "200px",
                }}
              >
                <h4>Like</h4>
                <h4 style={{ marginLeft: "15%" }}>{upvotesL && upvotesL}</h4>
                {!upvotedL ? (
                  <AiOutlineLike className="vp-vote" onClick={handleUpvote} />
                ) : (
                  <AiFillLike className="vp-vote" onClick={handleUpvote} />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "200px",
                }}
              >
                <h4>Dislike</h4>
                <h4 style={{ marginLeft: "15%" }}>
                  {downvotesL && downvotesL}
                </h4>
                {!downvotedL ? (
                  <AiOutlineDislike
                    className="vp-vote"
                    onClick={handleDownvote}
                  />
                ) : (
                  <AiFillDislike className="vp-vote" onClick={handleDownvote} />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1>Vezi postari</h1>
        </div>
      )}
    </>
  );
};

export default VeziPostare;
