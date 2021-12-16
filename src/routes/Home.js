import Nweet from 'components/Nweet';
import { v4 } from 'uuid'
import { dbService, storageService } from 'fbase';
import { addDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { uploadString, ref, getDownloadURL } from '@firebase/storage';

const Home = ({ userObj }) => {
    //트윗 메세지를 입력하기 위해 담는 useState
    const [ntweet, setTweet] = useState("");
    //firebase에 저장된 데이터를 담아두는 useState
    const [nweets, setNweets] = useState([]);
    //image URL을 담기위한 useState();
    const [file, setFile] = useState('')

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
    console.log(nweets)

    async function onSubmit(event) {
        event.preventDefault();
        let fileURL = '';
        if(file !== ''){
            //파일경로 참조 만들기
            const fileref = ref(storageService, `${userObj.email}/${v4()}`)
            //Storage 참조 경로로 파일 업로드 하기
            const responce = await uploadString(fileref, file, "data_url");
            console.log(responce.ref)
            //storage에 있는 파일 URL다운로드 하기 
            const fileURL = await getDownloadURL(responce.ref)
        }
        await addDoc(collection(dbService, "ntweets"), {
            text: ntweet,
            createdAt: Date(),
            creatorId: userObj.uid,
            fileURL
        });
        setTweet('');
        setFile('');
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
                reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent
            setFile(result)
        }
    }

    function clearPhoto() {
        setFile(null)
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