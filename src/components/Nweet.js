import { dbService, storageService } from 'fbase'
import { doc,deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';
import React, { useState } from 'react'
import {ref} from 'firebase/storage'


function Nweet ({nweetObj ,isOwner}){
    const [editing,setediting] = useState(false);
    const [newTweet,setNewTweet] = useState(nweetObj.text);

    const textaddress = doc(dbService,'ntweets',`${nweetObj.id}`);

   async function oneDelete() {
        const ok = window.confirm('Are you sure you wnat to delete this?');
        if(ok){
            await deleteDoc(textaddress);
            const Deleteele = ref(storageService, nweetObj.fileURL);
            await deleteObject(Deleteele);
        }
    }

    function changeUpdate() {
        setediting(!editing)
    }
    
    async function onsubmit(event){
        event.preventDefault();
        await updateDoc(textaddress,{text:newTweet})
        setediting(false);   
    }

function onChange(event) {
        const value = event.target.value
        setNewTweet(value);
    }

    return (
    <div>
        {editing ? (
            <>
            <form onSubmit={onsubmit}>
                <input type='text' placeholder='Edit yout text' value={newTweet} required onChange={onChange}/>
                <input type='submit' value='Update Ntweet'/>
            </form>
            <button onClick={changeUpdate}>Cancel</button>
            </>
        ):(
            <>
                    <div key={nweetObj.id}>
            <h4>{nweetObj.text}</h4>
            {nweetObj.fileURL && <img src={nweetObj.fileURL} width='50px' height='50px' />}
            {isOwner && (
               <>
               <button onClick={oneDelete}>Delete Nweet</button>
                <button onClick={changeUpdate}>Edit Nweet</button>
               </>
            )}
        </div>
            </>
        )}
    </div>
    )
}

export default Nweet