import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import { db, useAuth } from '../../../../firebase';
import Navbar from '../../../NavBar/navBar';
import ImageSlider from './ImageSlider';
import "./VeziPostare.css";
const VeziPostare = () => {
      
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAuth();

    const [userCData, setUserCData] = useState();
    const [post, setPost] = useState();
    
    const id = location.state?.id;
    const userid = location.state?.userid;
    
    
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

      
    useEffect(() => {
        const getPost = async () => {
            const postsCollectionRef = doc(db, "posts", id);
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
    

  return (
      <>
        {id? (<>
            <Navbar backgroundColor="black"/>
            <div className="container-vp">
                {post && <ImageSlider slides={post.urls}/>}
                {/* {post && console.log(post.urls)}; */}
                <div className="detalii-vp">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <h1>{post && post.titlu}</h1>
                        <h2 style={{backgroundColor:"#E45826", color:"white", marginLeft:"15px", padding:"0 10px"}}>{post && post.tproblema}</h2>
                    </div>
                    <h2 style={{textDecoration:"underline", fontSize:"25px"}}>Autor: {post && post.ownerName}</h2>
                    <p style={{fontSize:"24px", marginTop:"40px"}}>{post && post.descriere}</p>
                </div>
                <div id="vp-likes"><div style={{display:"flex", alignItems:"center"}}><h4>Likes</h4><h4 style={{marginLeft:"15%"}}>{ post&& post.upvotes}</h4></div>
                <div style={{display:"flex", alignItems:"center"}}><h4>Dislikes</h4><h4 style={{marginLeft:"15%"}}>{ post&& post.downvotes}</h4></div>
                </div>
            </div>
        
        </>) : <div><h1>Vezi postari</h1></div>}
      </>
  )
}

export default VeziPostare