import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, query, orderBy } from "firebase/firestore";
import { auth, db, storage } from "../../services/firebase";
import './newPost.css'

const Posts = () => {
    const [user] = useAuthState(auth);

    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
    );
    const [posts] = useCollectionData(postsQuery, { idField: "id" });

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

        // Enviar imagem para o Firebase Storage
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);

        // Obter a URL da imagem do Firebase Storage
        const imageUrl = await getDownloadURL(imageRef);

        // Adicionar detalhes da publicação ao Firestore
        await addDoc(collection(db, "posts"), {
            text,
            imageUrl,
            createdAt: new Date(),
            uid: user.uid,
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
            {user ? (
                <>
                    <form onSubmit={handlePostSubmit}>
                        <textarea
                            placeholder="Digite sua publicação"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        <button type="submit">Publicar</button>
                    </form>

                    <div className="container_title_posts">
                        <h2>Publicações</h2>
                    </div>


                    {user && posts &&
                        posts.map((post) => (
                            <div className="container_posts" key={post.uid}>
                                <div className="container_user">
                                    {post.photoURL && <img src={post.photoURL} alt="Avatar" />}
                                    <p>{post.displayName}</p>
                                </div>
                                <img className="image_post" src={post.imageUrl} alt="Publicação" />
                                <p>{post.text}</p>
                            </div>
                        ))}
                </>
            ) : (
                <p>Faça login para ver e criar publicações.</p>
            )}
        </div>
    );
};

export default Posts;
