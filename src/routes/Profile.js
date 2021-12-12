import { authService, dbService } from 'fbase';
import { collection, getDocs, query,where} from 'firebase/firestore';
import React from 'react';
import { useNavigate } from "react-router-dom";


export default ({userObj})=> {
    
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate('/')
    }   
   
   async function getMyNtweets(){
        const ntweets  = query(
            collection(dbService, 'nwtweets'),
            where('creatorId', '==', userObj.uid)
            .get()
            )
        const querySnapshot = await getDocs(ntweets);
        querySnapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
        }) 
    };
    
    
    return (
        <>
        <button onClick={onLogOutClick}>Logout</button>
        </>
    )
}