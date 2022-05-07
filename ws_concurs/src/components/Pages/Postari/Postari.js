import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Navbar from '../../NavBar/navBar';
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
        <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <Navbar backgroundColor="black"/>
            <div className='container-postari'>
                {posts.map(post => {
                    return <div className='container-postare'><h1>{post.titlu}</h1> <p>{post.descriere}</p></div>
                })}
            </div>
        </div>
    )
}

export default Postari;