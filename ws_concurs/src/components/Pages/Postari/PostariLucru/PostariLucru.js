import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, useAuth } from "../../../../firebase";
import Navbar from "../../../NavBar/navBar";
import Article from "../Article/Article";
import "./postariLucru.css";
const PostariLucru = () => {
  const [postsCollectionRef, setPostsCollectionRef] = useState(
    collection(db, "posts")
  );
  const [userCData, setUserCData] = useState();
  const [posts, setPosts] = useState();
  const [postsL, setPostsL] = useState();
  const [postsA, setPostsA] = useState();

  const user = useAuth();

  const getUserData = async () => {
    if (user) {
      console.log("User data");
      const uid = user.uid;
      const userCollectionRef = doc(db, "users", uid);
      const docSnap = await getDoc(userCollectionRef);
      if (docSnap.exists()) {
        setUserCData(docSnap.data());
      } else {
        console.log("Error docSnap");
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [user]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPostsL(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);
  useEffect(() => {
    if (userCData && posts) {
      const filteredPosts = async () => {
        const sortedPostsA = posts.filter((post) => {
          return post.status === "in lucru" || post.status === "rezolvat";
        });
        setPostsA(sortedPostsA);
      };
      // console.log("AAAA");
      filteredPosts();
    } else {
      // console.log("PPPP");
    }
  }, [userCData, posts]);

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Navbar backgroundColor="black" />
      <div className="favorite-pg-postari">
        {postsA &&
          userCData &&
          postsA.map((post) => {
            const date = post.data.seconds * 1000;
            const finalDate = new Date(date);
            const upvotedUser = userCData.upvoted;
            const downvotedUser = userCData.downvoted;
            // console.log(upvotedUser);
            const liked = upvotedUser.includes(post.id);
            const unliked = downvotedUser.includes(post.id);
            // console.log("FRESH");
            // // console.log(`liked ${liked} unliked ${unliked}`);

            // console.log(
            //   `postID: ${post.id}, liked ${liked}, unliked ${unliked}`
            // );

            const savedArray = userCData.saved;
            const isSaved = savedArray.includes(post.id);
            // console.log(isSaved);
            // console.log(finalDate.toLocaleString());
            return (
              <Article
                key={post.id}
                imgUrl={post.urls[0]}
                date={finalDate.toLocaleString()}
                titlu={post.titlu}
                categorie={post.tproblema}
                status={post.status}
                id={post.id}
                upvoted={liked}
                downvoted={unliked}
                upvotes={post.upvotes}
                downvotes={post.downvotes}
                userid={user.uid}
                upvotedUser={userCData.upvoted}
                downvotedUser={userCData.downvoted}
                saved={isSaved}
                savedArray={savedArray}
              />
            );
          })}
        {/* <h2 style={{position:"absolute", top:"100px"}}>Bookmarked</h2> */}
      </div>
    </div>
  );
};

export default PostariLucru;
