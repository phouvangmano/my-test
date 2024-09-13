import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const EditPost = () => {
    const [editPost, setEditPost] = useState({});  // Initialize as an object
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${API_URL}/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEditPost(response.data.data.post);  // Set the entire post object
            } catch (error) {
                Swal.fire("Error", `Error fetching post: ${error.message}`);  // Display error message
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form from refreshing the page
        const token = localStorage.getItem("token");
        try {
            await axios.put(`${API_URL}/posts/${id}`, { content: editPost.content }, {  // Update only content
                headers: { Authorization: `Bearer ${token}` },
            });
            Swal.fire("Success", "Post updated successfully!", "success");  // Success message
            navigate("/");  // Redirect to home page
        } catch (error) {
            Swal.fire("Error", `Error updating post: ${error.message}`);  // Error message
        }
    };

    return (
        <div className="edit-post">
            <h2>Edit Post, ໄອດີ: {id}</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={editPost.content || ''}  // Avoid uncontrolled input warning
                    onChange={(e) => setEditPost({...editPost, content: e.target.value})}  // Update content in state
                    cols="60"
                    rows="10"
                    placeholder="ແກ້ໄຂໂພສຂອງທ່ານ"
                ></textarea>
                <button type="submit">ອັບເດດໂພສ</button>  // Submit button
            </form>
            <button onClick={() => navigate("/")}>ກັບຄືນ</button>
            <style jsx>
                {`
                    * {
                        font-family: 'Phetsarath OT', serif;
                    }
                    .edit-post {
                        padding: 30px;
                    }
                    h2 {
                        color: darkblue;
                    }
                    textarea {
                        text-align: center;
                        display: flex;
                        border: 1px solid darkblue;
                        padding: 10px;
                        margin-bottom: 10px;
                    }
                    button {
                        padding: 10px;
                        margin-bottom: 10px;
                    }
                `}
            </style>
        </div>
    );
};

export default EditPost;
