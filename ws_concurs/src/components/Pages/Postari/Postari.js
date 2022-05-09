import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, useAuth } from "../../../firebase";
import Navbar from "../../NavBar/navBar";
import Article from "./Article/Article";
import "./Postari.css";
import Sortare from "./Sortare/Sortare";

const Postari = () => {
  const [postsCollectionRef, setPostsCollectionRef] = useState(collection(db, "posts"));
  const user = useAuth();

  const [posts, setPosts] = useState([]);
  const [postsL, setPostsL] = useState([]);
  const [userCData, setUserCData] = useState();
  const [dataCrescator, setDataCrescator] = useState(false);
  const [voturiCrescator, setVoturiCrescator] = useState(false);

  //Filtrare
  const [intCrescator, setIntCrescator] = useState(false);
  const [propCrescator, setPropCrescator] = useState(false);
  const [probCrescator, setProbCrescator] = useState(false);
  const [likeCrescator, setLikeCrescator] = useState(false);
  const [bookCrescator, setBookCrescator] = useState(false);
  
  const handleFilterInt = () => {
    if (!intCrescator) {
        const sortedPosts = posts.filter(post=> post.tproblema==="intrebari");
        setPostsL(sortedPosts);
        // console.log(sortedPosts);
        // setPostsCollectionRef(collection(db, "posts"), where("tproblema", "==", "intrebari"))
      } else if (intCrescator) {
        // setPostsCollectionRef(collection(db, "posts"))
        setPostsL(posts);
      }
      setIntCrescator(!intCrescator);
      setPropCrescator(false);
      setProbCrescator(false);
      setLikeCrescator(false);
      setBookCrescator(false);
  } 
  const handleFilterProp = () => {
    if (!propCrescator) {
        const sortedPosts = posts.filter(post=> post.tproblema==="propuneri");
        setPostsL(sortedPosts);
        // console.log(sortedPosts);
      } else if (propCrescator) {

        setPostsL(posts);
      }
      setPropCrescator(!propCrescator);
      setProbCrescator(false);
      setLikeCrescator(false);
      setBookCrescator(false);
      setIntCrescator(false);


  }
  const handleFilterProb = () => {
    if (!probCrescator) {
        const sortedPosts = posts.filter(post=> post.tproblema==="probleme");
        setPostsL(sortedPosts);
        // console.log(sortedPosts);
      } else if (probCrescator) {

        setPostsL(posts);
      }
      setProbCrescator(!probCrescator);
      setLikeCrescator(false);
      setBookCrescator(false);
      setIntCrescator(false);
      setPropCrescator(false);

  }
  const handleFilterLike = () => {
    if (!likeCrescator) {
        const upvotedUser = userCData.upvoted;
        const sortedPosts = posts.filter(post=> {
            const liked = upvotedUser.includes(post.id);
            return liked;
        })
        setPostsL(sortedPosts);
        // console.log(sortedPosts);
      } else if (likeCrescator) {

        setPostsL(posts);
      }
      setLikeCrescator(!likeCrescator);
      setProbCrescator(false);
      setBookCrescator(false);
      setIntCrescator(false);
      setPropCrescator(false);
  }
  const handleFilterBook = () => {
    if (!bookCrescator) {
        const upvotedUser = userCData.saved;
        const sortedPosts = posts.filter(post=> {
            const bookd = upvotedUser.includes(post.id);
            return bookd;
        })
        setPostsL(sortedPosts);
        // console.log(sortedPosts);
      } else if (bookCrescator) {
        setPostsL(posts);
      }
      setBookCrescator(!bookCrescator);
      setLikeCrescator(false);
      setProbCrescator(false);
      setIntCrescator(false);
      setPropCrescator(false);
  }



  //Filtrare
  //Sortare
  const handleSortareData = () => {
    if (dataCrescator) {
      const sortedPosts = postsL.sort((a, b) => {
        return b.data.seconds - a.data.seconds;
      });
      setPostsL(sortedPosts);
    //   console.log(sortedPosts);
    } else if (!dataCrescator) {
      const sortedPosts = postsL.sort((a, b) => {
        return a.data.seconds - b.data.seconds;
      });
      setPostsL(sortedPosts);
    }
    setDataCrescator(!dataCrescator);
  };
  const handleSortareVoturi = () => {
    if (voturiCrescator) {
      const sortedPosts = postsL.sort((a, b) => {
        return b.upvotes - b.downvotes - a.upvotes - a.downvotes;
      });
      setPostsL(sortedPosts);
    } else if (!voturiCrescator) {
      const sortedPosts = postsL.sort((a, b) => {
        return a.upvotes - a.downvotes - b.upvotes - b.downvotes;
      });
      setPostsL(sortedPosts);
    //   console.log(sortedPosts);
    }
    setVoturiCrescator(!voturiCrescator);

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
    //   const data = await getDocs(postsCollectionRef);
        const data = await getDocs(postsCollectionRef);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setPostsL(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
          {(postsL && userCData) &&
            postsL.map((post) => {
            console.log(`postID: ${post.id}`);
              const date = post.data.seconds * 1000;
              const finalDate = new Date(date);
              const upvotedUser = userCData.upvoted;
              const downvotedUser = userCData.downvoted;
              // console.log(upvotedUser);
              const liked = upvotedUser.includes(post.id);
              const unliked = downvotedUser.includes(post.id);
              
              const savedArray = userCData.saved;
              const isSaved = savedArray.includes(post.id);
              // console.log(isSaved);
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
                  saved={isSaved}
                  savedArray={savedArray}
                />
              );
            })}
            {console.log("DX")}
        </div>
        <div>
          <Sortare
            handleSortareData={handleSortareData}
            handleSortareVoturi={handleSortareVoturi}
            handleFilterInt={handleFilterInt}
            handleFilterProp={handleFilterProp}
            handleFilterProb={handleFilterProb}
            handleFilterLike={handleFilterLike}
            handleFilterBook={handleFilterBook}
          />
        </div>
      </div>
    </div>
  );
};

export default Postari;
