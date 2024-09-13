import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const EditPost = () => {
    const [editPost, setEditPost] = useState({});
    const [postDetail, setPostDetail] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${API_URL}/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPostDetail(response.data.data.post);
                setEditPost(response.data.data.post);
            } catch (error) {
                Swal.fire("Error", `Error fetching post: ${error.message}`);
                // Swal.fire("Error", error?.response?.data?.message ??"Error fetching post", "error");
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await axios.patch(`${API_URL}/posts/${id}`, { content: editPost.content }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Swal.fire("Success", "Post updated successfully!", "success");
            navigate("/");
        } catch (error) {
            Swal.fire("Error", `Error updating post: ${error.message}`);
        }
    };

    return (
        <div className="edit-post">
            <h2>Edit Post, ໄອດີ: {id}</h2>
            <h2>ຜູ້ຂຽນໂພດ: {postDetail?.author?.first_name} {postDetail?.author?.surname}</h2>
            <form action="" onSubmit={handleSubmit}>
                <textarea
                    name=""
                    value={editPost.content || ''}
                    onChange={(e) => setEditPost({...editPost, content: e.target.value})}
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="ແກ້ໄຂໂພສຂອງທ່ານ"
                ></textarea>
                <button type="submit">ອັບເດດໂພສ</button>
            </form>
            <button onClick={()=> navigate("/")}>ກັບຄືນ</button>
            <style jsx>
                {`
                    * {
                    font-family: 'Phetsarath OT',serif;
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
                        font-size: 32px;
                    }
                
                    button {
                        padding: 10px;
                        margin-bottom: 10px;
                    }
                `}
            </style>
        </div>
    )
}
export default EditPost;