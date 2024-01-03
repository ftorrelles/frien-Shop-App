import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getProductsThunk,
    filterCategoriesThunk,
} from "../store/slices/products.slice";
import { addCartThunk } from "../store/slices/cart.slice";
import { Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
// import { Cart } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const [categories, setCategories] = useState([]);
    const [input, setInput] = useState("");
    const [productsFiltered, setProductsFiltered] = useState([]);

    const [count, setCount] = useState(1);

    useEffect(() => {
        dispatch(getProductsThunk());
        axios
            .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
            .then((resp) => setCategories(resp.data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setProductsFiltered(products);
    }, [products]);

    const filterByName = () => {
        const productsFiltered = products.filter((product) =>
            product.title.toLowerCase().includes(input)
        );
        setProductsFiltered(productsFiltered);
    };
    //cards
    const addToCart = (product) => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(addCartThunk(product, 1));
        } else {
            navigate("/login");
        }
    };
    //Promotion
    const addToCartPromotion = (product) => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(addCartThunk(product, count));
        } else {
            navigate("/login");
        }
    };
    console.log(products[14]);

    return (
        <div>
            <Row xs={1} md={2} lg={2}>
                <Col lg={7}>
                    <div className="carousel">
                        <Carousel fade variant="dark">
                            <Carousel.Item
                                style={{
                                    padding: "3rem 4rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100% ",
                                }}
                            >
                                <img
                                    style={{
                                        height: "400px",
                                        objectFit: "contain",
                                    }}
                                    // className="carousel_img"
                                    src={products[14]?.images?.[0]?.url}
                                    alt="First slide"
                                />
                            </Carousel.Item>

                            <Carousel.Item
                                style={{
                                    padding: "3rem 4rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100% ",
                                }}
                            >
                                <img
                                    style={{
                                        height: "400px",
                                        objectFit: "contain",
                                    }}
                                    // className="carousel_img"
                                    src={products[14]?.images?.[1]?.url}
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item
                                style={{
                                    padding: "3rem 4rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100% ",
                                }}
                            >
                                <img
                                    style={{
                                        height: "400px",
                                        objectFit: "contain",
                                    }}
                                    // className="carousel_img"
                                    src={products[14]?.images?.[2]?.url}
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </Col>
                <Col
                    lg={5}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Card style={{ border: "none" }}>
                        <Card.Body>
                            <Card.Title style={{ color: "#0f1626" }}>
                                <h1>Special Offer: 40% Off</h1>
                            </Card.Title>
                            <br />
                            <br />
                            <Card.Text>
                                <h4> {products[14]?.brand}</h4>
                            </Card.Text>
                            <Card.Text>{products[14]?.title}</Card.Text>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div>
                                        <p>
                                            <strong>Price</strong>
                                        </p>
                                        {products[14]?.price}
                                    </div>
                                    <div>
                                        <i className="bx bx-car"></i>
                                        <spam> Free shipping</spam>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ display: "flex" }}>
                                        <Button
                                            onClick={() =>
                                                count === 1
                                                    ? setCount(count)
                                                    : setCount(count - 1)
                                            }
                                            variant="secondary"
                                        >
                                            -
                                        </Button>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "40px",
                                            }}
                                        >
                                            {count}
                                        </div>
                                        <Button
                                            onClick={() => setCount(count + 1)}
                                            variant="secondary"
                                        >
                                            +
                                        </Button>
                                    </div>

                                    <Button
                                        size="lg"
                                        onClick={() =>
                                            addToCartPromotion(products[14])
                                        }
                                    >
                                        add to cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <br />
            <hr />
            <br />
            <br />

            <Row xs={1} md={2} lg={2}>
                <Col>
                    <h4 style={{ color: "#456268" }}>
                        Your favorite categories!!
                    </h4>
                    {categories?.map((category) => (
                        <Button
                            key={category?.id}
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                                dispatch(filterCategoriesThunk(category?.id))
                            }
                        >
                            {category.name}
                        </Button>
                    ))}
                    <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => dispatch(getProductsThunk())}
                    >
                        see all
                    </Button>
                </Col>
                <Col style={{ marginTop: "1rem" }}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                            id="name"
                            type="text"
                            value={input}
                            placeholder="search product by name"
                            onChange={(event) =>
                                setInput(event.target.value.toLowerCase())
                            }
                        />
                        <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={filterByName}
                        >
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <br />

            <Row xs={1} md={2} lg={3}>
                {productsFiltered?.map((producItem) => (
                    <Col key={producItem.id}>
                        <Card style={{ margin: "1rem", position: "relative" }}>
                            <Carousel fade variant="dark" interval={20000}>
                                <Carousel.Item
                                    style={{
                                        padding: "1rem 2rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100% ",
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "200px",
                                            objectFit: "contain",
                                        }}
                                        // className="carousel_img"
                                        src={producItem?.images?.[0]?.url}
                                        alt="First slide"
                                    />
                                </Carousel.Item>

                                <Carousel.Item
                                    style={{
                                        padding: "1rem 2rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100% ",
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "200px",
                                            objectFit: "contain",
                                        }}
                                        // className="carousel_img"
                                        src={producItem?.images?.[1]?.url}
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item
                                    style={{
                                        padding: "1rem 2rem",
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "100% ",
                                    }}
                                >
                                    <img
                                        style={{
                                            height: "200px",
                                            objectFit: "contain",
                                        }}
                                        // className="carousel_img"
                                        src={producItem?.images?.[2]?.url}
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                            <Card.Body className="card__body">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <Button
                                        className="btdetails_card"
                                        as={Link}
                                        to={`/products/${producItem.id}`}
                                    >
                                        Details
                                    </Button>
                                    <Button
                                        className="btAdd_card"
                                        onClick={() => addToCart(producItem)}
                                        variant="primary"
                                    >
                                        <i className="bx bxs-cart-add"></i>
                                        {/* <Cart /> */}
                                    </Button>
                                </div>
                                <div className="info_card">
                                    {" "}
                                    <Card.Title style={{ textAlign: "center" }}>
                                        {producItem.brand}
                                    </Card.Title>
                                    <Card.Text>{producItem.title}</Card.Text>
                                    <Card.Title>
                                        {" "}
                                        ${producItem.price}
                                    </Card.Title>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
