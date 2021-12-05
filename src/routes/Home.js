import { dbService } from 'fbase';
import { addDoc, collection, getDoc, getDocs, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from 'react';

const Home = () => {

    const [ntweet, setTweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const q = query(collection(dbService, 'ntweets'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            const nweetObj = {
                ...document.data(),
                id: document.id,
            }
            setNweets(prev => [nweetObj, ...prev]);
        });
    }

    useEffect(() => {
        getNweets();
    }, [])


    async function onSubmit(event) {
        event.preventDefault()
        console.log(`submit Tweet: ${ntweet}`)
        await addDoc(collection(dbService, "ntweets"), {
            ntweet,
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
                    <h4>{el.ntweet}</h4>
                </div> ))
            }
        </div>
        </div>
    )
}

export default Home;