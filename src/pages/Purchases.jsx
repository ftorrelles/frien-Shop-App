import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import ModalPurchases from "../components/ModalPurchases";
import axios from "axios";
import getConfig from "../utils/getConfig";

const Purchases = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (info) => {
        setShow(true);
        setDataSelected(info);
    };
    const [purchases, setPurchases] = useState([]);
    useEffect(() => {
        axios
            .get(
                "https://e-commerce-api-v2.academlo.tech/api/v1/purchases",
                getConfig()
            )
            .then((resp) =>
                setPurchases(
                    resp.data.sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateB - dateA;
                    })
                )
            )
            .catch((error) => console.error(error));
    }, []);
    const [dataSelected, setDataSelected] = useState({});
    // console.log(purchases);
    return (
        <div>
            <h2>My purchases</h2>
            <hr />
            {purchases.map((purchase) => (
                <Card key={purchase.id} style={{ margin: "1rem" }}>
                    <Card.Header>
                        {purchase?.createdAt.slice(0, 10)}
                    </Card.Header>
                    <Card.Body
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <img
                            style={{ width: "2rem" }}
                            src={purchase.product?.images[0].url}
                            alt=""
                        />
                        <Card.Text>{purchase.product?.title}</Card.Text>
                        <Card.Text
                            style={{
                                width: "30px",
                                height: "30px",
                                border: "1px solid rgb(0, 0, 0)",
                                display: "flex",
                                justifyContent: "center",
                                alignpurchases: "center",
                            }}
                        >
                            {purchase?.quantity}
                        </Card.Text>
                        <Card.Text>
                            {(
                                purchase?.product?.price * purchase?.quantity
                            ).toFixed(2)}
                        </Card.Text>
                        <Button
                            style={{
                                height: "2rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            variant="primary"
                            onClick={() => handleShow(purchase)}
                        >
                            see details
                        </Button>
                    </Card.Body>
                </Card>
            ))}
            <ModalPurchases
                show={show}
                handleClose={handleClose}
                data={dataSelected}
            />
        </div>
    );
};

export default Purchases;
