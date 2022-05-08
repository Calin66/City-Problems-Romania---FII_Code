import React, { useEffect, useState } from "react";
import "./article.css";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineHeart,
} from "react-icons/ai";
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
}) => {
  const [bgcolor, setBgcolor] = useState("black");
  const [upvotedL, setUpvotedL] = useState(upvoted);
  const [downvotedL, setDownvotedL] = useState(downvoted);
  const [upvotesL, setUpvotesL] = useState(upvotes);
  const [downvotesL, setDownvotesL] = useState(downvotes);

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
  const handleUpvote = async () => {
    if (upvotedL) {
      const indexUpvoted = upvotedUser.indexOf(id);
      const updateUpvoted = upvotedUser.splice(indexUpvoted, 1);
      await updateDoc(infoRef, { upvotes: upvotesL - 1 });
      setUpvotesL(upvotesL - 1);
      await updateDoc(userRef, { upvoted: upvotedUser });
      setUpvotedL(false);
    } else if (downvotedL) {
      const indexDownvoted = downvotedUser.indexOf(id);
      downvotedUser.splice(indexDownvoted, 1);
      await updateDoc(userRef, { downvoted: downvotedUser });
      await updateDoc(infoRef, { upvotes: upvotesL + 1 });
      setUpvotesL(upvotesL + 1);
      await updateDoc(infoRef, { downvotes: downvotes - 1 });
      const updateUpvoted = upvotedUser.push(id);
      await updateDoc(userRef, { upvoted: upvotedUser });
      setUpvotedL(true);
      setDownvotedL(false);
    } else {
      console.log(upvotedUser);
      upvotedUser.push(id);

      await updateDoc(infoRef, { upvotes: upvotesL + 1 });
      setUpvotesL(upvotesL + 1);
      await updateDoc(userRef, { upvoted: upvotedUser });
      setUpvotedL(true);
    }
  };
  const handleDownvote = async () => {};
  return (
    <div className="gpt3blog-container_article">
      <div style={{ position: "relative" }}>
        <div className="afp-ct">
          <h4>{categorie}</h4>
        </div>
        <AiOutlineHeart id="cp-bookmark" />
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
              alignItems: "flex-start",
              backgroundColor: bgcolor,
            }}
          >
            <AiOutlineLike id="cp-vote" onClick={handleUpvote} />
            <AiOutlineDislike id="cp-vote" onClick={handleDownvote} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
