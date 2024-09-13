// Functional Counter Component
import React, {useEffect} from "react";


const FunctionalCounter = () => {
    const [counter, setCounter] = React.useState(0);

    useEffect(() => {
        document.title = `Func update ${counter}`
    }, [counter]);
      return (
          <div className="counter">
            <h2>ນີ້ແມ່ນ ຝັກຊັນການນຳເລກ <br/> Functional counter</h2>
            <p>ຈຳນວນ: {counter}</p>
            <button className="add-btn" onClick={() => {
                if (counter < 10) setCounter(counter + 1);

            }} >ເພີ່ມ</button>
            <button className="del-btn" onClick={() => {
                if (counter > 0) setCounter(counter - 1);
            }}>ລົບ</button>
            <button className="reset-btn" onClick={() => {
                setCounter(0);
            }}>
                ເລີ່ມຕົ້ນ (0)
            </button>
          </div>
      );
};

// Class Component
class ClassCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }
    componentDidUpdate() {
        document.title = `ຈຳນວນ ${this.state.counter}`;
    }

    render() {
          return (
              <div className="counter">
                <h2>ນີ້ແມ່ນ ຝັກຊັນການນຳເລກ <br/> Class Counter</h2>
                <p>ຈຳນວນ: {this.state.counter}</p>
                <button className="add-btn" onClick={() => {
                    if (this.state.counter < 100) this.setState( {counter: this.state.counter + 5});
                }}
                >ເພີ່ມ</button>
                <button className="del-btn" onClick={() => {
                    if (this.state.counter > 0) this.setState({counter: this.state.counter - 5});
                }}>ລົບ</button>
                  <button className="reset-btn" onClick={() => {
                      this.setState({counter: 0});
                  }}>
                    ເລີ່ມຕົ້ນ (0)
                  </button>
              </div>
        );
    };
};

const BlogPost = (props) => {
    const [like, setLike] = React.useState(0);
    return (
        <div className="blog-post">
            <h1> {props.title}</h1>
            <h1>{props.content}</h1>
            <img className="blog-img" width={500} src="01.png" alt=""/>
            <div>
                <button className="like" onClick={() => {
                    setLike(like +1);
                }}><img width="30px" src="like.png" alt=""/></button>
                <h2>{like}</h2>
            </div>
        </div>
    )
}

const ProductComp = (prop) => {
    const [like1, setLike1] = React.useState(0);
    return (
        <div className="product-card">

            <img className="product-img" src={prop.productImg} alt=""/>
            <h1>{prop.productTitle} , {prop.productType}</h1>
            <p>{prop.productPrice}</p>
            <p>{prop.productDec}</p>
            <p>ລຳດັບທີ: {prop.index}</p>
            <div>
                <button className="like" onClick={() => {
                    setLike1(like1 + 1);
                }}><img width="30px" src="like.png" alt=""/></button>
                <span>{like1}</span>

            </div>
        </div>

    )
}

// Main Component

const Day2 = () => {
    const title = "ນີ້ແມ່ນຫົວຂໍ້";
    const content = "ນີ້ແມ່ນເນື້ອຫາ"
    const productList = [
        {
            title: "ອາພາດເມັນ",
            type: "ສຳລັບເຊົ່າ",
            price: "$800/ຄືນ",
            img: "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU",
            dec: "ລາຍລະອຽດຂອງຫ້ອງ ທີ່ໃຫ້ເຊົ່",
        },
        {
            title: "ບ້ານວິນລ່າ",
            type: "ສຳລັບຂາຍ",
            price: "$100,000",
            img: "https://luckxayproperty.com/images/03_2020/LXH0004_01.jpg",
            dec: "ລາຍລະອຽດຂອງເຮືອນ ຕ້ອງການຂາຍດ່ວນ",
        }
    ]

  return (
        <div className="app">
            {productList.map((product, index) => (
                <ProductComp
                index={index + 1}
                productTitle = {product.title}
                productType = {product.type}
                productPrice = {product.price}
                productImg = {product.img}
                productDec = {product.dec}
                ></ProductComp>
            ))}


            <FunctionalCounter/>
            <ClassCounter />
            <hr/>
            ສ້າງກາດບົດຄວາມໂດຍ:
            <BlogPost
                title={title}
                content = {content}
            ></BlogPost>
            <style jsx>
              {
                `
                 * {
                    font-family: 'Phetsarath OT',serif;
                    }
                .app {
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 0 20px;
                  text-align: center;
                }
                .counter {
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    background: bisque;
                }
                button {
                    margin: 20px 10px;
                    padding: 10px 20px;
                    font-size: 16px;
                    border: none;
                    border-radius: 3px;
                    background: cornflowerblue;
                    color: #fff;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .add-btn {
                    background-color: darkgreen;
                }
                .del-btn {
                    background-color: red;
                }
                .reset-btn {
                    background-color: cornflowerblue;
                }
                .like {
                    background: beige;
                    text-align: left;
                }
                .product-card {
                    text-align: left;
                    margin: 20px auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    background: beige;
                }
                .product-img {
                    width: 100%;
                }
                `
              }
            </style>
          </div>
      );
};

export default Day2;