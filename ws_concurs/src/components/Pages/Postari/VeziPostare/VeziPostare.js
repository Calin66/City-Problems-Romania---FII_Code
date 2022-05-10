import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import { db, useAuth } from '../../../../firebase';
import Navbar from '../../../NavBar/navBar';
import ImageSlider from './ImageSlider';
import "./VeziPostare.css";
import {
    AiOutlineLike,
    AiOutlineDislike,
    AiOutlineHeart,
    AiFillLike,
    AiFillDislike, 
  } from "react-icons/ai";
  import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
  
  const VeziPostare = () => {
      
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuth();

    const [userCData, setUserCData] = useState();
    const [post, setPost] = useState();
    
    const id = location.state?.id;
    const userid = location.state?.userid;
    
    const postsCollectionRef = doc(db, "posts", id);
    // const [userCollectionRef, setUserCollectionRef] = useState();
    // useEffect(()=>{
    //     if(user){
    //         setUserCollectionRef(db, "posts", user.uid);
    //     }
    // },[user])
    
//     const [upvotedL, setUpvotedL] = useState();
//     const [downvotedL, setDownvotedL] = useState();
      
//     const [upvotesL, setUpvotesL] = useState();
//     const [downvotesL, setDownvotesL] = useState();
      
//     const [savedL, setSavedL] = useState();
//     const [savedArrayL, setSavedArrayL] = useState([]);

//     let upvotedUser;
//     let downvotedUser;

//     useEffect(() => {

//         if(post && userCData){
//             const date = post.data.seconds * 1000;
//         const finalDate = new Date(date);
//         upvotedUser = userCData.upvoted;
//         downvotedUser = userCData.downvoted;
        
//         const liked = upvotedUser.includes(id);
//         const unliked = downvotedUser.includes(id);
        
//         const savedArray = userCData.saved;
//         const isSaved = savedArray.includes(id);
        
//         setUpvotedL(liked);
//         setDownvotedL(unliked);
        
//         setUpvotesL(post.upvotes);
//         setDownvotesL(post.downvotes);
        
//         setSavedL(isSaved);
//         setSavedArrayL(savedArray);
//     }
// }, [])
    
    
    const getUserData = async () => {
        if (userid) {
            const userddRef = doc(db, "users", userid)
            const docSnap = await getDoc(userddRef);
            if (docSnap.exists()) {
                setUserCData(docSnap.data());
            } else {
                console.log("Error docSnap");
            }
        }
    };
    useEffect(() => {
        getUserData();
    }, [userid]);

    // const getUserPostData = async () => {
    //     if (userCData) {
    //       const upvotedUser = userCData.upvoted;
    //       const downvotedUser = userCData.downvoted;
    //       // console.log(upvotedUser);
    //       const liked = upvotedUser.includes(id);
    //       const unliked = downvotedUser.includes(id);
    //       setDownvotedL(unliked);
    //       setUpvotedL(liked);
    //     }
    // };
    // useEffect(() => {
    //   getUserPostData();
    // }, [userCData]);
    // const handleSave = async () => {
    //     if (savedL) {
    //       setSavedL(false);
    //       const indexSaved = savedArrayL.indexOf(id);
    //       savedArrayL.splice(indexSaved, 1);
    //       await updateDoc(userCollectionRef, { saved: savedArrayL });
    //     } else {
    //       setSavedL(true);
    //       savedArrayL.push(id);
    //       console.log(savedArrayL);
    //       await updateDoc(userCollectionRef, { saved: savedArrayL });
    //     }
    //   };
    //   const handleUpvote = async () => {
    //     // console.log(id);
    //     if (upvotedL) {
    //       setUpvotedL(false);
    //       const indexUpvoted = upvotedUser.indexOf(id);
    //       const updateUpvoted = upvotedUser.splice(indexUpvoted, 1);
    //       await updateDoc(postsCollectionRef, { upvotes: upvotesL - 1 });
    //       setUpvotesL(upvotesL - 1);
    //       await updateDoc(userCollectionRef, { upvoted: upvotedUser });
    //     } else if (downvotedL) {
    //       setUpvotedL(true);
    //       setDownvotedL(false);
    //       const indexDownvoted = downvotedUser.indexOf(id);
    //       downvotedUser.splice(indexDownvoted, 1);
    //       await updateDoc(userCollectionRef, { downvoted: downvotedUser });
    //       await updateDoc(postsCollectionRef, { upvotes: upvotesL + 1 });
    //       setUpvotesL(upvotesL + 1);
    //       await updateDoc(postsCollectionRef, { downvotes: downvotesL - 1 });
    //       setDownvotesL(downvotesL - 1);
    //       const updateUpvoted = upvotedUser.push(id);
    //       await updateDoc(userCollectionRef, { upvoted: upvotedUser });
    //     } else {
    //       setUpvotedL(true);
    //       // console.log(upvotedUser);
    //       upvotedUser.push(id);
    //       await updateDoc(postsCollectionRef, { upvotes: upvotesL + 1 });
    //       setUpvotesL(upvotesL + 1);
    //       await updateDoc(userCollectionRef, { upvoted: upvotedUser });
    //     }
    //   };
    //   const handleDownvote = async () => {
    //     if (downvotedL) {
    //       setDownvotedL(false);
    //       const indexDownvoted = downvotedUser.indexOf(id);
    //       const updateDownvoted = downvotedUser.splice(indexDownvoted, 1);
    //       await updateDoc(postsCollectionRef, { downvotes: downvotesL - 1 });
    //       setDownvotesL(downvotesL - 1);
    //       await updateDoc(userCollectionRef, { downvoted: downvotedUser });
    //     } else if (upvotedL) {
    //       setDownvotedL(true);
    //       setUpvotedL(false);
    //       const indexUpvoted = upvotedUser.indexOf(id);
    //       upvotedUser.splice(indexUpvoted, 1);
    //       await updateDoc(userCollectionRef, { upvoted: upvotedUser });
    //       await updateDoc(postsCollectionRef, { upvotes: upvotesL - 1 });
    //       setUpvotesL(upvotesL - 1);
    //       await updateDoc(postsCollectionRef, { downvotes: downvotesL + 1 });
    //       setDownvotesL(downvotesL + 1);
    //       const updateDownvoted = downvotedUser.push(id);
    //       await updateDoc(userCollectionRef, { downvoted: downvotedUser });
    //     } else {
    //       setDownvotedL(true);
    //       // console.log(downvotedUser);
    //       downvotedUser.push(id);
    
    //       await updateDoc(postsCollectionRef, { downvotes: downvotesL + 1 });
    //       setDownvotesL(downvotesL + 1);
    //       await updateDoc(userCollectionRef, { downvoted: downvotedUser });
    //     }
    //   };
    //Get post data    
    useEffect(() => {
        const getPost = async () => {
            const data = await getDoc(postsCollectionRef);
            if(data.exists()){
                setPost(data.data());
                
            }
            else {
                console.log("Error data");
            }
        };
        getPost();
    }, []);
    

    useEffect(()=>{
        if(!id){navigate("/postari");}
    }, [])
  return (
      <>
        <div>VeziPostare</div>
        {(id)? (<>
            <Navbar backgroundColor="black"/>
            <div className="container-vp">
                {post && <ImageSlider slides={post.urls}/>}
                <div className="detalii-vp">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h1>{post && post.titlu}</h1>
                        <h2 style={{backgroundColor:"#E45826", color:"white", marginLeft:"15px", padding:"0 10px"}}>{post && post.tproblema}</h2>
                    </div>
                    <h2 style={{textDecoration:"underline", fontSize:"25px"}}>Autor: {post && post.ownerName}</h2>
                    <p style={{fontSize:"24px", marginTop:"40px"}}>{post && post.descriere}</p>
                    {/* <div style={{position:"absolute", bottom:"0px"}}>{!savedL ? (
          <BsBookmark className="cp-bookmark" onClick={handleSave} />
        ) : (
          <BsFillBookmarkFill className="cp-bookmark" onClick={handleSave} />
        )}</div> */}
                </div>
            </div>
        
        </>) : <div><h1>Vezi postari</h1></div>}
      </>
  )
}

export default VeziPostare