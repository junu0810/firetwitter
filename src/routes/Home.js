import { fireEvent } from '@testing-library/react';
import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import { addDoc, collection, getDoc, getDocs, query, serverTimestamp, orderBy, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {

    const [ntweet, setTweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [file, setfile] = useState('')

    useEffect(async () => {
        const q = query(
            collection(dbService, "ntweets"), orderBy("createdAt", "desc"));
        await onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);


    async function onSubmit(event) {
        event.preventDefault()
        console.log(`submit Tweet: ${ntweet}`)
        await addDoc(collection(dbService, "ntweets"), {
            text: ntweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid
        });
        setTweet("");
    }

    function onChange(event) {
        const vlaue = event.target.value
        setTweet(vlaue)
    }

    // console.log(nweets)
    // console.log(userObj)

    function onFileChange(event) {
        const { target: { files } } = event
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent
            setfile(result)
        }
    }

    function clearPhoto() {
        setfile(null)        
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={ntweet}
                    onChange={onChange}
                    type='text'
                    placeholder="what's on your mind"
                    maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type='submit' value="NewTweet" />
                {file && <div>
                    <img src={file} width="50px" height="50px" />
                    <button onClick={clearPhoto}> Clear IMG</button>
                    </div>}
            </form>
            <div>
                {nweets.map(el => (
                    <Nweet key={el.id} nweetObj={el} isOwner={el.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home;