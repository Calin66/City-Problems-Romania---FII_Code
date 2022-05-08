import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, useAuth } from "../../../firebase";
import Navbar from "../../NavBar/navBar";
import Article from "./Article/Article";
import "./Postari.css";
import Sortare from "./Sortare/Sortare";

const Postari = () => {
  const postsCollectionRef = collection(db, "posts");
  const user = useAuth();

  const [posts, setPosts] = useState([]);
  const [userCData, setUserCData] = useState();
  const [dataCrescator, setDataCrescator] = useState(false);
  const [voturiCrescator, setVoturiCrescator] = useState(false);

  //Sortare
  const handleSortareData = () => {
    if (dataCrescator) {
      const sortedPosts = posts.sort((a, b) => {
        return b.data.seconds - a.data.seconds;
      });
      setPosts(sortedPosts);
      console.log(sortedPosts);
    } else if (!dataCrescator) {
      const sortedPosts = posts.sort((a, b) => {
        return a.data.seconds - b.data.seconds;
      });
      setPosts(sortedPosts);
      console.log(sortedPosts);
    }
    setDataCrescator(!dataCrescator);
  };
  const handleSortareVoturi = () => {
    if (voturiCrescator) {
      const sortedPosts = posts.sort((a, b) => {
        return b.upvotes - a.upvotes;
      });
      setPosts(sortedPosts);
      console.log(sortedPosts);
    } else if (!voturiCrescator) {
      const sortedPosts = posts.sort((a, b) => {
        return a.upvotes - b.upvotes;
      });
      setPosts(sortedPosts);
      console.log(sortedPosts);
    }
  };
  //Sortare

  //UserData
  const getUserData = async () => {
    if (user) {
      const uid = user.uid;
      const userCollectionRef = doc(db, "users", uid);
      const docSnap = await getDoc(userCollectionRef);
      if (docSnap.exists()) {
        setUserCData(docSnap.data());
        // console.log(docSnap.data());
      } else {
        console.log("Error docSnap");
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [user]);
  //UserData

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Navbar backgroundColor="black" />
      <div className="container-postari">
        <div className="container-pg-postari">
          {userCData &&
            posts.map((post) => {
              const date = post.data.seconds * 1000;
              const finalDate = new Date(date);
              const upvotedUser = userCData.upvoted;
              const downvotedUser = userCData.downvoted;
              // console.log(upvotedUser);
              const liked = upvotedUser.includes(post.id);
              const unliked = downvotedUser.includes(post.id);
              // console.log(post.id);
              // console.log(finalDate.toLocaleString());
              return (
                <Article
                  imgUrl={post.urls[0]}
                  date={finalDate.toLocaleString()}
                  titlu={post.titlu}
                  categorie={post.tproblema}
                  id={post.id}
                  upvoted={liked}
                  downvoted={unliked}
                  upvotes={post.upvotes}
                  downvotes={post.downvotes}
                  userid={user.uid}
                  upvotedUser={userCData.upvoted}
                  downvotedUser={userCData.downvoted}
                />
              );
            })}
        </div>
        <div>
          <Sortare
            handleSortareData={handleSortareData}
            handleSortareVoturi={handleSortareVoturi}
          />
        </div>
      </div>
    </div>
  );
};

export default Postari;
