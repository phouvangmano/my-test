import { useState } from "react";

const LoginForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.username === "admin" && formData.password === "123") {
            onSubmit && onSubmit();  // Call onSubmit if provided
        } else {
            setError("ຊື່ຜູ້ໃຊ້ ຫລື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>ຟອມເຂົ້າສູ່ລະບົບ</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">ຊື່ຜູ້ໃຊ້:</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="username"
                        name="username"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">ລະຫັດຜ່ານ:</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        id="password"
                        name="password"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">ເຂົ້າສູ່ລະບົບ</button>
            </form>
        </div>
    );
};

const SignUpForm = () => {  // Corrected component name
    const [profileImage, setProfileImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 512 * 1024) {  // Corrected file size check to 512KB
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);  // Corrected to use e.target.result
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h1>ຟອມສະໝັກ</h1>
            <form className="form">
                <div className="input-group">
                    <label htmlFor="">ຊື່</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label htmlFor="">ນາມສະກຸນ</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label htmlFor="">ອີເມວ</label>
                    <input type="email" />
                </div>
                <div className="input-group">
                    <label htmlFor="">ຊື່ຜູ້ໃຊ້</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label htmlFor="">ລະຫັດຜ່ານ</label>
                    <input type="password" />
                </div>
                {profileImage && (
                    <img className="profile-image" src={profileImage} alt="Profile" />
                )}
                <div className="input-group">
                    <label>ຮູບໂປຝ່າຍ</label>
                    <input
                        type="file"
                        id="profile-image"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
            </form>
        </div>
    );
};

const Day4 = () => {
    const [isDarkmode, setIsDarkmode] = useState(true);
    const [isLoginForm, setIsLoginForm] = useState(true);

    const toggleDarkmode = () => {
        setIsDarkmode(!isDarkmode);
    };

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    return (
        <div className={`container ${isDarkmode ? "dark-mode" : ""}`}>
            <button className="theme-btn" onClick={toggleDarkmode}>
                ປ່ຽນເປັນ: {isDarkmode ? "ໂໝດປົກກະຕິ" : "ໂໝດກາງຄືນ"}
            </button>
            <div className="auth-tabs">
                <button
                    type="button"
                    onClick={() => setIsLoginForm(true)}
                    className={isLoginForm ? "active" : ""}
                >
                    ເຂົ້າສູ່ລະບົບ
                </button>
                <button
                    type="button"
                    onClick={() => setIsLoginForm(false)}
                    className={!isLoginForm ? "active" : ""}
                >
                    ສະໝັກ
                </button>
            </div>
            {isLoginForm ? <LoginForm onSubmit={() => console.log("Logged in!")} /> : <SignUpForm />}
            <style jsx>
                {`
                    .container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        min-height: 100vh;
                        background-color: #f0f0f0;
                        padding: 20px;
                        max-width: 500px;
                        text-align: center;
                        margin: 0 auto;
                    }

                    .dark-mode {
                        background-color: #333;
                        color: white;
                    }

                    .dark-mode .form {
                        background-color: #555;
                    }

                    .dark-mode .form input {
                        background-color: #777;
                        border: 1px solid #666;
                    }

                    .dark-mode button {
                        background-color: bisque;
                        color: #111;
                    }

                    .form {
                        width: auto;
                        padding: 20px;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        margin-bottom: 20px;
                    }

                    .form input {
                        width: 100%;
                        margin: 10px auto;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 16px;
                    }

                    .input-group {
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 15px;
                        align-items: flex-start;
                    }

                    .profile-image {
                        width: 100px;
                        height: 100px;
                        border-radius: 50px;
                        object-fit: cover;
                        margin: 0 auto 15px;
                    }
                    .theme-btn {
                        height: 80px;
                        background-color: cornflowerblue;
                    }
                    .auth-tabs {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 20px;
                    }
                    .auth-tabs button {
                        background-color: cornflowerblue;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        margin: 0 5px;
                        width: 150px;
                    }
                    .auth-tabs button.active {
                        background-color: #5caf50;
                        color: white;
                    }
                    .error {
                        color: red;
                        margin-top: 10px;
                    }
                `}
            </style>
        </div>
    );
};

export default Day4;
