import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Navbar from "../../NavBar/navBar";
import Article from "./Article/Article";
import "./Postari.css";

const Postari = () => {
  const postsCollectionRef = collection(db, "posts");
  const [posts, setPosts] = useState([]);

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
          {posts.map((post) => {
            const date = post.data.seconds * 1000;
            const finalDate = new Date(date);
            console.log(finalDate.toLocaleString());
            return (
              <Article
                imgUrl={post.urls[0]}
                date={finalDate.toLocaleString()}
                titlu={post.titlu}
                categorie={post.tproblema}
              />
            );
          })}
        </div>
        <div>
          <h3>Sortare</h3>
          <div className="cp-sortare">
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postari;
