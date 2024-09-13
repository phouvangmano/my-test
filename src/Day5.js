import {useState} from "react";
import Swal from "sweetalert2";

const SampleList = () => {
    const fruits = ["ໝາກພ້າວ", "ໝາກແອັບ", "ໝາກກ້ຽງ", "ໝາກນາວ", "ໝາກມ່ວງ", "ໝາກຂຽບ"];
    return (<div>
        <h2><u>ລາຍການໝາກໄມ້ຕ່າງໆ</u></h2>
        <ul>
            {fruits.map((fruit, index) => (<li className="fruits-list" key={index}>{index + 1}. {fruit}</li>))}
        </ul>
    </div>)
};

const ASEANCoutries = () => {
    const countries = ["ລາວ", "ໄທ", "ຫວຽດນາມ", "ກຳປູເຈຍ", "ມ້ຽນມ້າ", "ສິງກາໂປ", "ມາເລເຊຍ", "ຝິລິປິປິນ", "ບູຣໄນ"]
    return (
        <div>
            <h2><u>ປະເທດນອນໃນອາຊ່ຽນ</u></h2>
            <ul>
                {countries.map((country, index) => (
                    <li className="countries-list" key={index}>{index + 1}. {country}</li>))}
            </ul>
        </div>
    )
}

const StudentList = () => {
    const students = [
        {
            name: "ທ.ສົມຫວັງ",
            class: "A1",
            gender: "ຊາຍ"
        },
        {
            name: "ນ.ສົມເພັດ",
            class: "A1",
            gender: "ຍິງ"
        },
        {
            name: "ທ.ສົມບູນ",
            class: "A3",
            gender: "ຊາຍ"
        },
        {
            name: "ທ.ສົມພອນ",
            class: "B1",
            gender: "ຊາຍ"
        },
    ]
    return (
        <div>
            <h2><u>ລາຍຊື່ນັກຮຽນ</u></h2>
            <ul>
                {students
                    .filter((student) => student.class === "A1" && student.gender === "ຍິງ")
                    .map((student, index) =>
                        <li className="students-list" key={index}> {index + 1}. ຊື່: {student.name},
                            ຫ້ອງ: {student.class} , ເພດ : {student.gender} </li>
                    )}
                {/*{students.map((student, index) =>*/}
                {/*    student.class === "A1" && student.gender === "ຍິງ" ?*/}
                {/*        (<li className="students-list" key={index}> {index + 1}. ຊື່: {student.name}, ຫ້ອງ: {student.class} , ເພດ : {student.gender} </li>) : (<div></div>)*/}
                {/*)}*/}
            </ul>
        </div>
    )
}

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");

    const addTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim() === "")
            return Swal.fire({
            title: "ຜິດຜາດ",
            text: "ກະລຸນາປ້ອນຂໍ້ມູນຂອງທ່ານໃຫ້ຄົບຖ້ວນ!",
            icon: "error",
            confirmButtonText: "ຕົກລົງ",});
        setTodos([...todos, {text:newTodo, completed:false}]);
        setNewTodo("");
        };


    const toggleTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };


    const [todos, setTodos] = useState([
        {
            text: 'ຮຽນ React', completed: false
        },
        {
            text: 'ສ້າງ To-do app', completed: false
        },
        {
            text: 'ໃຶກຫັດໃຊ້ List & Keys', completed: console
        },

    ]);

    return (
        <div>
            <h2><u>ລາຍການສິງທີ່ຕ້ອງເຮັດ</u></h2>
            <form action="" onSubmit={addTodo}>
                <input value={newTodo} type="text" onChange={(event) => setNewTodo(event.target.value)}
                       placeholder="ເພີ່ມລາຍການໃຫມ່..."/>
                <button type="submit">ເພີ່ມ</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li
                        onClick={() => toggleTodo(index)}
                        key={index}
                        style={{textDecoration: todo.completed ? "line-through" : "none"}}
                    >
                        {todo.text}
                    </li>
                ))}

            </ul>
        </div>
    )
}

const ImageCarousel =({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide =()=>{
        setCurrentIndex((prevIndex) => (prevIndex+1)% images.length)
    }
    const prevSlide = ()=>{
        setCurrentIndex((prevIndex) => (prevIndex-1 + images.length)% images.length)
    }
    return (
        <div>
            <div className="carousel">
                <button className="carousel-button prev" onClick={prevSlide}>&#10094;</button>
                {images.map((image, index) => (
                    <img src={image} key={index} alt={`Slide ${index+1}`} className={`carousel-image ${index === currentIndex ? "active" : ""}`} />
                ))}
                <button className="carousel-button next" onClick={nextSlide}>&#10095;</button>
            </div>
        </div>
    )
}

const Day5 = () => {
    const carouselImage =[
        'https://images.pistonheads.com/nimg/45077/AventadorSV_01.jpg',
        'https://news.dupontregistry.com/wp-content/uploads/2022/05/aventador-ultimae-2.jpg',
        'https://cdn.motor1.com/images/mgl/OozxwY/s1/2024-lamborghini-aventador-successor-rendering.webp',
        'https://hips.hearstapps.com/hmg-prod/images/2022-lamborghini-aventador-109-1625607587.jpg?crop=0.721xw:0.541xh;0.194xw,0.305xh&resize=1200:*'

    ]
    return (<div className="container">
        <h1><u>ການສອນ List & Key ໃນ React</u></h1>
        <div>
            <button>ປະເທດນອນໃນອາຊ່ຽນ</button>
            <button>ລາຍການໝາກໄມ້ຕ່າງໆ</button>
        </div>
        <hr/>
        <SampleList/>
        <hr/>
        <ASEANCoutries/>
        <hr/>
        <StudentList/>
        <hr/>
        <TodoList/>
        <hr/>
        <ImageCarousel images={carouselImage} />
        <style jsx> {`
            .container {
                max-width: 500px;
                margin: 0 auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                min-height: 100vh;
                background-color: #f0f0f0;
            }

            ul {
                list-style-type: none;
                padding: 0;
            }

            li {
                margin-bottom: 10px;
                padding: 10px;
                background-color: #61dafb;
                border-radius: 10px;
            }

            button {
                width: 200px;
            }

            hr {
                color: black;
                width: 100%;
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
            .carousel {
                position: relative;
                width: 100%;
                max-width: 500px;
                margin: 0 auto;
            }
            .carousel-image {
                width: 100%;
                height: auto;
                display: none;
            }
            .carousel-image.active{
                display: block;
            }
            .carousel-button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                padding: 10px 15px;
                cursor: pointer;
                font-size: 18px;
            }
            .prev {
                left: 10px;
            }
            .next {
                right: 10px;
            }


        `}</style>
    </div>);
}

export default Day5;