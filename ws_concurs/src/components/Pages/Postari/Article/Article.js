import React, { useEffect, useState } from "react";
import "./article.css";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineHeart,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
const Article = ({
  imgUrl,
  date,
  titlu,
  categorie,
  id,
  upvoted,
  downvoted,
  upvotes,
  downvotes,
  userid,
  upvotedUser,
  downvotedUser,
  saved,
  savedArray
}) => {
  // const [bgcolor, setBgcolor] = useState("black");
  const [upvotedL, setUpvotedL] = useState(upvoted);
  const [downvotedL, setDownvotedL] = useState(downvoted);
  const [upvotesL, setUpvotesL] = useState(upvotes);
  const [downvotesL, setDownvotesL] = useState(downvotes);

  const [savedL, setSavedL] = useState(saved);
  const [savedArrayL, setSavedArrayL] = useState(savedArray);

  const [postCData, setPostCData] = useState();
  const infoRef = doc(db, "posts", id);
  const userRef = doc(db, "users", userid);
  const getPostI = async () => {
    const docSnap = await getDoc(infoRef);
    if (docSnap.exists()) {
      setPostCData(docSnap.data());
    }
  };
  useEffect(() => {
    getPostI();
  }, []);

  const handleSave = async () => {
    if(savedL){
      setSavedL(false);
      const indexSaved = savedArrayL.indexOf(id);
      savedArrayL.splice(indexSaved, 1);
      await updateDoc(userRef, {saved: savedArrayL});
    }
    else{
      setSavedL(true);
      savedArrayL.push(id);
      await updateDoc(userRef, {saved: savedArrayL});
    }
  }
  const handleUpvote = async () => {
    console.log(id);
    if (upvotedL) {
      setUpvotedL(false);
      const indexUpvoted = upvotedUser.indexOf(id);
      const updateUpvoted = upvotedUser.splice(indexUpvoted, 1);
      await updateDoc(infoRef, { upvotes: upvotesL - 1 });
      setUpvotesL(upvotesL - 1);
      await updateDoc(userRef, { upvoted: upvotedUser });
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
      console.log(upvotedUser);
      upvotedUser.push(id);

      await updateDoc(infoRef, { upvotes: upvotesL + 1 });
      setUpvotesL(upvotesL + 1);
      await updateDoc(userRef, { upvoted: upvotedUser });
    }
  };
  const handleDownvote = async () => {
    if(downvotedL){
      setDownvotedL(false);
      const indexDownvoted = downvotedUser.indexOf(id);
      const updateDownvoted = downvotedUser.splice(indexDownvoted, 1);
      await updateDoc(infoRef, { downvotes: downvotesL - 1});
      setDownvotesL(downvotesL - 1);
      await updateDoc(userRef, { downvoted: downvotedUser });
    }
    else if (upvotedL) {
      setDownvotedL(true);
      setUpvotedL(false);
      const indexUpvoted = upvotedUser.indexOf(id);
      upvotedUser.splice(indexUpvoted, 1);
      await updateDoc(userRef, { upvoted: upvotedUser });
      await updateDoc(infoRef, { upvotes: upvotesL - 1});
      setUpvotesL(upvotesL - 1);
      await updateDoc(infoRef, { downvotes: downvotesL + 1 });
      setDownvotesL(downvotesL + 1);
      const updateDownvoted = downvotedUser.push(id);
      await updateDoc(userRef, { downvoted: downvotedUser });
    } else {
      setDownvotedL(true);
      console.log(downvotedUser);
      downvotedUser.push(id);

      await updateDoc(infoRef, { downvotes: downvotesL + 1 });
      setDownvotesL(downvotesL + 1);
      await updateDoc(userRef, { downvoted: downvotedUser });
    }
  };
  return (
    <div className="gpt3blog-container_article">
      <div style={{ position: "relative" }}>
        <div className="afp-ct">
          <h4>{categorie}</h4>
        </div>
        {!savedL ? <BsBookmark className="cp-bookmark" onClick={handleSave}/> : <BsFillBookmarkFill className="cp-bookmark" onClick={handleSave}/>}
        
      </div>
      <div className="gpt3blog-container_article-image">
        <img src={imgUrl} alt="blog_image" />
      </div>
      <div className="gpt3__blog-container_article-content">
        <div>
          <p>{date}</p>
          <h3>{titlu}</h3>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <p className="cp-vezipos">Vezi postare</p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start"
            }}
          >
            {!upvotedL ? <AiOutlineLike className="cp-vote" onClick={handleUpvote}/> : <AiFillLike  className="cp-vote" onClick={handleUpvote}/>}
            {!downvotedL ? <AiOutlineDislike className="cp-vote" onClick={handleDownvote}/>: <AiFillDislike className="cp-vote" onClick={handleDownvote}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
