import { useState, useEffect } from "react";

function BasicForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`ຊື່ທີ່ຖືກສົ່ງ:${name} `);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          placeholder="ກະລຸນາປ້ອນຊື່ຂອງທ່ານ"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button type="submit">ສົ່ງຂໍ້ມູນ</button>
      </form>
    </div>
  );
}


const MultipleInputsForm = () => {
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "",
    });


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`ຂໍ້ມູນທີ່ຖືກສົ່ງ: ${JSON.stringify(formData)}`);
    };

    return (<div>
        <form onSubmit={handleSubmit}>
            <input
                name="firstName"
                placeholder="ຊື່"
                value={formData.firstName}
                onChange={handleInputChange}
            />
            <input
                name="lastName"
                placeholder="ນາມສະກຸນ"
                value={formData.lastName}
                onChange={handleInputChange}
            />
            <input
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <button type="submit">ສົ່ງຂ້ໍມູນ</button>
        </form>
    </div>);
};

const SelectAndRadio = () => {
    const [selectedFruit, setSelectFruit] = useState("");
    const [gender, setGender] = useState("");
    const handleSelectChange = (e) => {
        setSelectFruit(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Selected Fruit: ${selectedFruit}, Gender: ${gender}`);
    }
    return (<div>
        <form onSubmit={handleSubmit}>
            <select value={selectedFruit} onChange={(e) => setSelectFruit(e.target.value)}>
                <option value="">ເລືອກໝາກໄມ້</option>
                <option value="ໝາກແອບເປີນ">ໝາກແອບເປີນ</option>
                <option value="ໝາກມ່ວງ">ໝາກມ່ວງ</option>
                <option value="ໝາກກ້ຽງ">ໝາກກ້ຽງ</option>
            </select>
            {selectedFruit && <h3>ທ່ານເລືອກ: {selectedFruit}</h3>}
            <div>
                <input type="radio" id="male" name="gender" value="male"
                       onChange={handleGenderChange}
                />
                <label htmlFor="">ຊາຍ</label>
                <input type="radio" id="female" name="gender" value="female"
                       onChange={handleGenderChange}
                />
                <label htmlFor="">ຍີງ</label>
                {gender && <h3>ເພດ: {gender}</h3>}
            </div>
        </form>
        <button type="submit">ສົ່ງຂ້ໍມູນ</button>
    </div>)
}

const ProductSearch = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const products = [
    { id: 1, name: "ໂທລະສັບມືືຖື", price: 5 },
    { id: 2, name: "ໂນດບຸກ", price: 10 },
    { id: 3, name: "ໂມງ", price: 2 },
    { id: 4, name: "ໂທລະທັດ", price: 8 },
    { id: 5, name: "ສາຍສາກ", price: 3 },
  ];
  const [results, setResults] = useState([...products]);

  useEffect(() => {
    handleSearch();
  }, [sortOrder, priceFilter, currentPage]);

  const handleSearch = () => {
    let filterProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by minimum price
    if (priceFilter.min !== "") {
      filterProducts = filterProducts.filter(
        (product) => product.price >= parseInt(priceFilter.min)
      );
    }

    // Filter by maximum price
    if (priceFilter.max !== "") {
      filterProducts = filterProducts.filter(
        (product) => product.price <= parseInt(priceFilter.max)
      );
    }
    filterProducts.sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setResults(filterProducts);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
  const handlePriceFilterChange = (e) => {
    setPriceFilter({ ...priceFilter, [e.target.name]: e.target.value });
  };

  // ການແບ່ງໜ້າ
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div>
      <b>
        <label htmlFor="">ຄົ້ນຫາຕາມພະຍັນຊະນະ</label>
      </b>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ຄົ້ນຫາ..."
        />
        <br />
        <label htmlFor="minPrice">ລາຄາຂັ້ນຕ່ຳ</label>
        <input
          type="number"
          name="min"
          value={priceFilter.min}
          onChange={handlePriceFilterChange}
        />
        <label htmlFor="maxPrice">ລາຄາຂັ້ນສູງ</label>
        <input
          type="number"
          name="max"
          value={priceFilter.max}
          onChange={handlePriceFilterChange}
        />
        <br />
        <label htmlFor="sortOrder">ລຽງຕາມລາຄາ</label>
        <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">ລາຄາຕໍ່າໄປຫາສູງ</option>
          <option value="desc">ລາຄາສູງໄປຫາຕໍ່າ</option>
        </select>
        <button type="submit">ຄົ້ນຫາ</button>
      </form>
      <ul>
        {currentItems.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          ກ່ອນໜ້າ
        </button>
        <span>
          ໜ້າ {currentPage} ຂອງ {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          ຕໍ່ໄປ
        </button>
      </div>
    </div>
  );
};

function Day6() {
    return (
        <div className="container">
        <h1>ມຶ້ທີ6 ການສອນ Forms ແລະ Controlled Components ໃນ React</h1>
        <u><h2>ແບບຟອມພື້ນຖານ</h2></u>
        <BasicForm/>
        <hr/>
        <u><h2>ແບບຟອມທີ່ມີຫລາຍ Input</h2></u>
        <MultipleInputsForm/>
        <hr/>
        <u><h2>ການເລືອກ Radio ແລະ Dropdown</h2></u>
        <SelectAndRadio/>
        <hr/>
        <u><h2>ລະບົບຄົ້ນຫາສີນຄ້າ</h2></u>
        <ProductSearch/>
        {/*<div>*/}
        {/*    <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}*/}
        {/*            disabled={currentPage === 1}*/}
        {/*    >*/}
        {/*        ກ່ອນ*/}
        {/*    </button>*/}
        {/*    <span>ໜ້າ {currentPage} ຈາກ {totalPages}</span>*/}
        {/*    <button onClick={() =>*/}
        {/*        setCurrentPage((prev) => Math.max(prev + 1, totalPages))*/}
        {/*    }*/}
        {/*            disabled={currentPage === totalPages}></button>*/}
        {/*</div>*/}
        <hr/>
        <style jsx>
            {`
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .form {
                    display: flex;
                    flex-direction: column;
                    width: 300px;
                    padding: 20px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                }

                .form input, select {
                    margin: 10px 0;
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                    font-size: 16px;
                }

                button {
                    margin-top: 10px;
                    padding: 5px 10px;
                    background-color: #4caf50;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                .error {
                    color: red;
                    font-size: 20px;
                }

                ul {
                    list-style-type: none;
                    padding: 0;
                }

                li {
                    width: 300px;
                    margin: 5px 0;
                    padding: 5px;
                    background-color: #bfeab2;
                    border-radius: 5px;
                    text-align: left;
                }
            `}
        </style>
    </div>);
}

export default Day6;
