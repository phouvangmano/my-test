import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day8 = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [loginData, setLoginData] = useState({
        email: "phouvangdoui@gmail.com",
        password: "12345",
    });
    const [signupData, setSignupData] = useState({
        first_name: "",
        surname: "",
        email: "",
        phone_number: "",
        password: "",
    });
    const [activeTab, setActiveTab] = useState("login");
    const [isLoading, setIsLoading] = useState(false);
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/login`, loginData);
            if (response.data.status === "success") {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setUser(response.data.data.user);
                fetchPosts();
                Swal.fire({
                    icon: "success",
                    title: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
                    text: `ຍິນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "ເຂົ້າສູ່ລະບົບລົ້ມເຫຼວ",
                text: "ກະລຸນາກວດສອບຂ້ໍມູນຂອງທ່ານແລ້ວລອງໃຫມ່ອີກຄັ້ງ",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/signup`, signupData);
            if (response.data.status === "success") {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setUser(response.data.data.user);
                fetchPosts();
                Swal.fire({
                    icon: "success",
                    title: "ເຂົ້າສູ່ລະບົບສຳເລັດ",
                    text: `ຍິນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "ເຂົ້າສູ່ລະບົບລົ້ມເຫຼວ",
                text: "ກະລຸນາກວດສອບຂ້ໍມູນຂອງທ່ານແລ້ວລອງໃຫມ່ອີກຄັ້ງ",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPosts = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setPosts([]);
            return;
        }
        setIsPostsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPosts(response.data.data.posts);
        } catch (error) {
            setPosts([]);
        } finally {
            setIsPostsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setPosts([]);
        Swal.fire({
            icon: "success",
            title: "ອອກຈາກລະບົບສຳເລັດ",
            text: "ຂອບໃຈທີ່ໃຊ້ບໍລິການ!",
        });
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Please login first!",
                text: "Please login to perform this action!",
            });
            return;
        }
        setIsLoading(true);
        try {
            await axios.post(
                `${API_URL}/posts`,
                { content: newPost },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNewPost('');
            fetchPosts();
            Swal.fire({
                icon: "success",
                title: "Create a new post successfully!",
                text: "You have already posted!"
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Cannot create a new post!",
                text: "Something went wrong, please try again later!"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (postID) => {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                title: "ກະລຸກນາເຂົ້າລະບົບກ່ອນ",
                icon: "warning",
                text: "ກະລຸນາເຂົ້າສູ່ລະບົບເພື່ອລົບໂພສ!!"
            });
            return;
        }
        const result = await Swal.fire({
            icon: "warning", // Corrected icon type
            title: "ທ່ານແນ່ໃຈບໍ?",
            text: "ທ່ານຈະບໍ່ສາມາດກູ້ຂໍ້ມູນໂພສນີ້ໄດ້",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "ແມ່ນ, ລົບເລີຍ!",
            cancelButtonText: "ຍົກເລີກ",
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/posts/${postID}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                Swal.fire("ລົບແລ້ວ!", "ໂພສຂອງທ່ານຖືກລົບແລ້ວ.", "success");
                fetchPosts();
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "ບໍ່ສາມາດລົບໂພສ!",
                    text: "ບາງຢ່າງບໍ່ຖືກຕ້ອງ, ກະລຸນາລອງໃຫມ່."
                });
            }
        }
    };

    const handleLike = async (postID) => {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                title: "ກະລຸກນາເຂົ້າລະບົບກ່ອນ",
                icon: "warning",
                text: "ກະລຸນາເຂົ້າສູ່ລະບົບເພື່ອກົດ Like!!"
            });
            return;
        }
        try {
            await axios.patch(`${API_URL}/posts/${postID}/like`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchPosts();
            Swal.fire({
                icon: "success",
                title: "Liked successfully!",
                text: "You have liked this post!",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Cannot like the post!",
                text: "Something went wrong, please try again later!"
            });
        }
    };

    return (
        <div>
            {/* Your rendering and login form logic here */}
        </div>
    );
};

export default Day8;
