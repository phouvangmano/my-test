import { useEffect, useState } from "react";

function BasicForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`ຊື່ທີ່ຖືກສົ່ງ: ${name}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          placeholder="ກະລຸນາປ້ອນຊື່ຂອງທ່ານ"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">ສົ່ງຂໍ້ມູນ</button>
      </form>
    </div>
  );
}

const MultipleInputsForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`ຂໍ້ມູນທີ່ຖືກສົ່ງ: ${JSON.stringify(formData)}`);
  };

  return (
    <div>
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
        <button type="submit">ສົ່ງຂໍມູນ</button>
      </form>
    </div>
  );
};

const SelectAndRadio = () => {
  const [selectedFruit, setSelectFruit] = useState("");
  const [gender, setGender] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selected Fruit: ${selectedFruit}, Gender: ${gender}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={selectedFruit} onChange={(e) => setSelectFruit(e.target.value)}>
          <option value="">ເລືອກໝາກໄມ້</option>
          <option value="ໝາກແອບເປີນ">ໝາກແອບເປີນ</option>
          <option value="ໝາກມ່ວງ">ໝາກມ່ວງ</option>
          <option value="ໝາກກ້ຽງ">ໝາກກ້ຽງ</option>
        </select>
        {selectedFruit && <h3>ທ່ານເລືອກ: {selectedFruit}</h3>}
        <div>
          <input type="radio" id="male" name="gender" value="male" onChange={handleGenderChange} />
          <label htmlFor="male">ຊາຍ</label>
          <input type="radio" id="female" name="gender" value="female" onChange={handleGenderChange} />
          <label htmlFor="female">ຍີງ</label>
          {gender && <h3>ເພດ: {gender}</h3>}
        </div>
        <button type="submit">ສົ່ງຂໍ້ມູນ</button>
      </form>
    </div>
  );
};

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

export default function App() {
  return (
    <div>
      <h1>React Form Examples</h1>
      <BasicForm />
      <MultipleInputsForm />
      <SelectAndRadio />
      <ProductSearch />
    </div>
  );
}
