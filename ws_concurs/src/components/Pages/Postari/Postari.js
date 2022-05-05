import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Navbar from '../../NavBar/navBar';
import "./Postari.css";

const Postari = () => {
    const [postareCData, setPostareCData] = useState();
    const getPostari = async () => {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
            setPostareCData(doc.data());
        });
        // console.log(postareCData);
        // const postariCollectionRef = doc(db, "postari");
        // const docSnap = await getDoc(postariCollectionRef);
        // if (docSnap.exists()) {
            // setPostareCData(docSnap.data());
        // } else {
            // console.log("No");
        // }
    }
    
    useEffect(() => {
        getPostari();
      },[]);
    return (
        <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <Navbar backgroundColor="black"/>
            <div className='container-postari'>
                <div className='container-postare'><h1>{postareCData && postareCData.titlu}</h1></div>
                <h1></h1>
            </div>
        </div>
    )
}

export default Postari;