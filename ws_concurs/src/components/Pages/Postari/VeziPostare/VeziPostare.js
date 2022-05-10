import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import { db } from '../../../../firebase';
const VeziPostare = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [userCData, setUserCData] = useState();
    const [post, setPost] = useState();
    const id = location.state?.id;
    const userid = location.state?.userid;
    
    
    const postsCollectionRef = doc(db, "posts", id);

    const getUserData = async () => {
        if (userid) {
            const userCollectionRef = doc(db, "users", userid);
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
    }, []);

    
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
        {id ? (<>
            <div>
                {post && post.urls.map(imag => <img src={imag}/>)}
            </div>
        
        </>) : <div><h1>Vezi postari</h1></div>}
      </>
  )
}

export default VeziPostare