import { dbService } from 'fbase'
import { doc,deleteDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'


function Nweet ({nweetObj ,isOwner}){
    const [editing,setediting] = useState(false);
    const [newTweet,setNewTweet] = useState(nweetObj.text);

    const textaddress = doc(dbService,'ntweets',`${nweetObj.id}`);

   async function oneDelete() {
        const ok = window.confirm('Are you sure you wnat to delete this?');
        if(ok){
            await deleteDoc(textaddress);
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