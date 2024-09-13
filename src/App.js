import Day2 from "./Day2";
import Day3 from "./Day3";
import Day4 from "./Day4";
import Day5 from "./Day5";
import Day6 from "./Day6";
import Day7 from "./Day7";
import Day8 from "./Day8";
import Day9 from "./Day9";
import Day10 from "./Day10";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

//Main Component
const App = () => {
    const days = [1,2,3,4,5,6,7,8,9,10];
    const [currentDate, setCurrentDate] = useState(9);
    const handleDayClick = (day) => {setCurrentDate(day);};
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/authentication");
        }
    }, []);

    const handleLogout = async () => {
        const result = await Swal.fire({
            icon: "warning",
            title: "ທ່ານແນ່ໃຈບໍ?",
            text: "ແນ່ໃຈບໍຈະອອກລະບົບບໍ?",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonText: "ຍົກເລີກ",
            confirmButtonText: "ແມ່ນ",
        });
        if (result.isConfirmed) {
            localStorage.removeItem("token");
            await Swal.fire({
                icon: "success",
                title: "ອອກຈາກລະບົບ",
                text: "ຂອບໃຈທີ່ໃຊ້ບໍລິການ!",
                timer: "1500",
            });
            navigate('/authentication')
        }

    }
    const DayContent = ({day}) => {
        switch (day) {
            case 2:
                return <Day2/>;
            case 3:
                return <Day3/>;
            case 4:
                return <Day4/>;
            case 5:
                return <Day5/>;
            case 6:
                return <Day6/>;
            case 7:
                return <Day7/>;
            case 8:
                return <Day8/>;
            case 9:
                return <Day9/>;
            case 10:
                return <Day10/>;
            default:
                return null;
        }
    }

    return <div className="app">
        <h1>ຕາຕະລາງຮຽນ!</h1>
        {days.map((day, i) => (
            <button onClick= {() => handleDayClick(day)} className={currentDate === day ? "active-btn":"inactive-btn"}>ມື້ທີ : {day}</button>
        ))}
        <DayContent day={currentDate}/>
        <button
            onClick={
            async () =>
            {await handleLogout()
            }}
        >ອອກລະບົບ</button>

        <style jsx>
            {
                `
                * {
                    font-family: 'Phetsarath OT',serif;
                    }
                html, body {
                        height: 100%;
                        margin: 0;
                        padding: 5px;
                        text-align: center;
                    }
                h1 {
                    text-align: center;
                }
                button {
                    width: 100px;
                    height: 40px;
                    border-radius: 10px;
                    border: none;
                    text-align: center;
                    cursor: pointer;
                    padding: 5px;
                    font-size: 16px;
                    margin: 5px;
                    color: white;
                    background: green;
                }
                .active-btn {
                    background-color: #ddd;
                }
                `
            }
        </style>
    </div>;
}
export default App;