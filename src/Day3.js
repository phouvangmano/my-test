import { useState } from "react";
import Swal from "sweetalert2";

const Form = ({onSubmint}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    gender: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (
          formData.first_name ==="" ||
          formData.last_name ==="" ||
          formData.email === "" ||
          formData.date_of_birth === "" ||
          formData.gender ==="" ||
          formData.message ===""
      ) {
          return Swal.fire({
            title: "ຜິດຜາດ",
            text: "ກະລຸນາປ້ອນຂໍ້ມູນຂອງທ່ານໃຫ້ຄົບຖ້ວນ!",
            icon: "error",
            confirmButtonText: "ຕົກລົງ",});
      }
      //ຖາມລູກຄ້າວ່າຈະສົ່ງຂໍ້ມູນແທ້ບໍ?
      const isSumbmit = await Swal.fire({
          title: "Sumbmit",
          text: "ແນ່ໃຈບໍ?",
          icon: "question",
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          showCancelButton: true,
          showCloseButton: true,
      })
          if (!isSumbmit.isConfirmed) {return;}



      onSubmint(formData);
      setFormData({
          first_name: "",
          last_name: "",
          email: "",
          date_of_birth: "",
          gender: "",
          message: "",
      });
  }

  return (
    <form className="form" action="" onSubmit={handleSubmit}>
      <input
        value={formData.first_name}
        type="text"
        name="first_name"
        placeholder="ຊື່"
        // required
        onChange={handleChange}
      />
      <input
        value={formData.last_name}
        type="text"
        name="last_name"
        placeholder="ນາມສະກຸນ"
        // required
        onChange={handleChange}
      />
      <input
        value={formData.date_of_birth}
        type="date"
        name="date_of_birth"
        placeholder="ວັນທີເກີດ"
        // required
        onChange={handleChange}
      />
      <select
        value={formData.gender}
        name="gender"
        // required
        onChange={handleChange}
      >
        <option value="">ເລືອກເພດ</option>
        <option value="ຊາຍ">ຊາຍ</option>
        <option value="ຍີງ">ຍີງ</option>
        <option value="ອຶ່ນໆ">ອຶ່ນໆ</option>
      </select>
      <input
        value={formData.email}
        type="email"
        name="email"
        placeholder="ອີເມວ"
        // required
        onChange={handleChange}
      />
      <textarea
        value={formData.message}
        name="message"
        cols="30"
        rows="10"
        placeholder="ຂໍ້ຄວາມ"
        // required
        onChange={handleChange}
      ></textarea>
      <button type="submit">ຈັດເກັບ</button>
    </form>
  );
};

const Day3 = () => {
    const [submissions, setSubmissions] = useState([]);
    const handleSubmit = (formData) => {
        setSubmissions([...submissions, formData]);
    }
  return (
    <div className="container">
      <Form onSubmint={handleSubmit}/>
        <div className="submissions">
            <h1>ຂໍ້ມູນທີ່ໄດ້ຮັບ</h1>
            {submissions.map((submission, index) => (
                <div className="submissions-item">
                    <p><strong>ຊື່: </strong>{submission.first_name}</p>
                    <p><strong>ນາມສະກຸນ: </strong>{submission.last_name}</p>
                    <p><strong>ວັນເດືອນປີເກີດ: </strong>{submission.date_of_birth}</p>
                    <p><strong>ເພດ: </strong>{submission.gender}</p>
                    <p><strong>ທີ່ຢູ່ອີເມວ: </strong>{submission.email}</p>
                    <p><strong>ຂໍ້ຄວາມ: </strong>{submission.message}</p>
                </div>
            ))}

        </div>

        <style jsx>
            {`
                * {
                    font-family: 'Phetsarath OT',serif;
                    }
                .container {
                    min-height: 100vh;
                    background: #f0f0f0;
                    padding: 20px;
                    max-width: fit-content;
                    margin: 10px;
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
                    border-radius: 3px;
                    font-size: 16px;
                  }
                  .form textarea {
                    width: 100%;
                    min-height: auto;
                    resize: vertical;
                  }
                  .form select {
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    text-align: left;
                  }
                  .submissions {
                      width: 100%;
                      margin-top: 20px;
                  }
                  .submissions-item {
                      background: #fff;
                      border: 1px solid #ddd;
                      border-radius: 20px;
                      padding: 15px;
                  }
                  strong {
                      color: darkgreen;
                  }
                  p {
                      color: darkslategray;
                  }
                `}
              </style>
    </div>
  );
};

export default Day3;
