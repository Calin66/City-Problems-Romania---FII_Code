import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill, BsClockHistory } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
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

  const [statusL, setStatusL] = useState();
  const [status, setStatus] = useState();

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
        const savedUser = docSnap.data().saved;

        setUpvotedL(upvotedUser.includes(id));
        setDownvotedL(downvotedUser.includes(id));
        setSavedL(savedUser.includes(id));
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
        setStatusL(data.data().status);
        setStatus(data.data().status);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const infoRef = doc(db, "posts", id);
    await updateDoc(infoRef, { status: statusL });
    setStatus(statusL);
  };
  const handleChange = (e) => {
    setStatusL(e.target.value);
  };
  const handleDelete = async () => {
    await deleteDoc(doc(db, "posts", id));
    navigate("/postari");
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
                  id="tprob"
                  style={{
                    backgroundColor: "#E45826",
                    color: "white",
                    marginLeft: "15px",
                    padding: "3px 12px 3px 12px",
                  }}
                >
                  {post && post.tproblema}
                </h2>
              </div>
              <h2 style={{ textDecoration: "underline", fontSize: "25px" }}>
                Autor: {post && post.ownerName}
              </h2>
              <p
                style={{ fontSize: "24px", marginTop: "40px" }}
                id="vp-descriere"
              >
                {post && post.descriere}
              </p>
            </div>
            <div id="vp-likes">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "70%",
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
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "150px",
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
                    width: "150px",
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
                    <AiFillDislike
                      className="vp-vote"
                      onClick={handleDownvote}
                    />
                  )}
                </div>
              </div>
              {userCData && userCData.status === "moderator" && (
                <h4
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={handleDelete}
                >
                  Delete post X
                </h4>
              )}
            </div>
            <div className="vpc-status">
              <div className="vp-status">
                <BsClockHistory
                  size="30px"
                  style={{
                    marginRight: "15px",
                    position: "relative",
                    bottom: "3px",
                  }}
                />
                <h4>Status : </h4> <h4 id="statusL"> {status}</h4>
              </div>
              {userCData && userCData.status === "admin" && (
                <form onSubmit={handleSubmit}>
                  <ul id="status-vp">
                    <li>
                      <input
                        type="radio"
                        id="f-option"
                        value="vizionat"
                        checked={statusL === "vizionat"}
                        onChange={handleChange}
                      />
                      <label for="f-option">Vizionat</label>
                      <div class="check"></div>
                    </li>

                    <li>
                      <input
                        type="radio"
                        id="s-option"
                        value="in lucru"
                        checked={statusL === "in lucru"}
                        onChange={handleChange}
                      />
                      <label for="s-option">In lucru</label>
                      <div class="check">
                        <div class="inside"></div>
                      </div>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="t-option"
                        value="rezolvat"
                        checked={statusL === "rezolvat"}
                        onChange={handleChange}
                      />
                      <label for="t-option">Rezolvat</label>
                      <div class="check">
                        <div class="inside"></div>
                      </div>
                    </li>
                  </ul>
                  <button className="status-postare" type="submit">
                    Schimba status
                  </button>
                </form>
              )}
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
