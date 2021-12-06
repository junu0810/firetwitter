import { dbService } from 'fbase';
import { addDoc, collection, getDoc, getDocs, query, serverTimestamp,orderBy,onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {

    const [ntweet, setTweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(async () => {
        const q = query(
        collection(dbService, "ntweets"),orderBy("createdAt", "desc"));
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
        });
        setTweet("");
    }

    function onChange(event) {
        const vlaue = event.target.value
        setTweet(vlaue)
    }

    console.log(nweets)

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={ntweet}
                    onChange={onChange}
                    type='text'
                    placeholder="what's on your mind"
                    maxLength={120} />
                <input type='submit' value="NewTweet" />
            </form>
        <div>
            {nweets.map(el=>(
                <div key={el.id}>
                    <h4>{el.text}</h4>
                </div> ))
            }
        </div>
        </div>
    )
}

export default Home;