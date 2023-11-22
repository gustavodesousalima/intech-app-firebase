import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, query, orderBy } from "firebase/firestore";
import { auth, db, storage } from "../../services/firebase";
import './newPost.css';

const Posts = () => {
    const [user] = useAuthState(auth);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
    );
    const [posts] = useCollectionData(postsQuery, { idField: "uid" });

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (!text || !image) {
            alert("Por favor, insira texto e imagem");
            return;
        }

        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        const postId = Date.now().toString();

        await addDoc(collection(db, "posts"), {
            text,
            imageUrl,
            createdAt: new Date(),
            uid: user.uid,
            postId,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        });

        setText("");
        setImage(null);
    };

    return (
        <div className="container_NewPost">
            <h1>Publicar</h1>
            <>
                <form onSubmit={handlePostSubmit}>
                    <textarea
                        placeholder="Digite sua publicação"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <label htmlFor="ImageInput" className="container_InputImg">
                        <input className="input_postImg" type="file" accept="image/*" onChange={handleFileChange} />
                        <p>ESCOLHA SUA IMAGEM</p>
                    </label>
                    <button type="submit">Publicar</button>
                </form>

                <div className="container_title_posts">
                    <h2>Publicações</h2>
                </div>

                {user && posts &&
                    posts.map((post) => (

                        <div className="container_posts" key={post.postId}>
                            <div key={`${post.postId}_user`} className="container_user">
                                {user.photoURL && <img src={post.photoURL} alt="Avatar" key={`${post.postId}_avatar`} />}
                                <p key={`${post.postId}_displayName`}>{post.displayName}</p>
                            </div>
                            <p key={`${post.postId}_text`} className="post_Text">{post.text}</p>
                            <img className="image_post" src={post.imageUrl} alt="Publicação" key={`${post.postId}_image`} />
                        </div>
                    ))}
            </>
        </div>
    );
};

export default Posts;
