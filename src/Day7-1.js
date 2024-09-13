import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day7 = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [loginData, setLoginData] = useState({
        email: "", password: "",
    });
    const [signupData, setSignupData] = useState({
        first_name: "", surname: "", email: "", phone_number: "", password: "",
    });
    const [activeTab, setActiveTab] = useState("login");
    const [isLoading, setIsLoading] = useState(false);
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/login`, loginData);
            if (response.data.status === 'success') {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setUser(response.data.data.user);
                fetchPosts(token);
                Swal.fire({
                    icon: 'success',
                    title: 'ເຂົ້າສູ່ລະບົບສຳເລັດ',
                    text: `ຍີນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'ມີບັນຫາ',
                text: 'ກະລຸນາລອງອີກຄັ້ງ!',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/signup`, signupData);
            if (response.data.status === 'success') {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setUser(response.data.data.user);
                fetchPosts(token);
                Swal.fire({
                    icon: 'success',
                    title: 'ລົງທະບຽນສຳເລັດ',
                    text: `ຍີນດີຕ້ອນຮັບທ່ານ ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
                });
            }
        } catch (error) {
            console.error('Signup Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'ມີບັນຫາ',
                text: 'ກະລຸນາລອງອີກຄັ້ງ!',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPosts = async (token) => {
        if (!token) {
            setPosts([]);
            return;
        }
        setIsPostsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/posts`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(response.data.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsPostsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setPosts([]);
    };

    return (
        <div className="container">
            <h1>ມື້ທີ7: ລະບົບ login ແລະ Post</h1>

            {isLoading && <div className="loading">ກຳລັງໂຫລດ...</div>}

            {!user ? (
                <div>
                    <div className="tabs">
                        <button
                            className={activeTab === "login" ? "active" : ""}
                            onClick={() => setActiveTab("login")}
                        >
                            ກົດເພື່ອ - ເຂົ້າສູ່ລະບົບ
                        </button>
                        <button
                            className={activeTab === "signup" ? "active" : ""}
                            onClick={() => setActiveTab("signup")}
                        >
                            ກົດເພື່ອ - ລົງທະບຽນ
                        </button>
                    </div>
                    {activeTab === "login" && (
                        <form onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="ອີເມວ"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="ລະຫັດຜ່ານ"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                            <button type="submit" disabled={isLoading}>
                                ເຂົ້າສູ່ລະບົບ
                            </button>
                        </form>
                    )}
                    {activeTab === "signup" && (
                        <form onSubmit={handleSignUp}>
                            <input
                                type="text"
                                placeholder="ຊື່"
                                value={signupData.first_name}
                                onChange={(e) => setSignupData({ ...signupData, first_name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="ນາມສະກຸນ"
                                value={signupData.surname}
                                onChange={(e) => setSignupData({ ...signupData, surname: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="ອີເມວ"
                                value={signupData.email}
                                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="ເບີໂທລະສັບ"
                                value={signupData.phone_number}
                                onChange={(e) => setSignupData({ ...signupData, phone_number: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="ລະຫັດ"
                                value={signupData.password}
                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            />
                            <button type="submit" disabled={isLoading}>ລົງທະບຽນ</button>
                        </form>
                    )}
                </div>
            ) : (
                <div>
                    <h2>ສະບາຍດີ, {user.first_name} {user.surname}!</h2>
                    <p>ທີຢູ່ອີເມວ: {user.email}</p>
                    <p>ເບີໂທ: {user.phone_number}</p>
                    <p>ສິດທິ: {user.role}</p>
                    <button onClick={handleLogout}>ອອກຈາກລະບົບ</button>

                    <h2>ໂພສ</h2>
                    {isPostsLoading ? (
                        <div className="loading"> ກຳລັງໂຫລດໂພສ...</div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id}>
                                <p>{post.content}</p>
                                <hr />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Day7;

