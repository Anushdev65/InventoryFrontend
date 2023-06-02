import 'bootstrap/dist/css/bootstrap.min.css';
import "./addproducts.css"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from "react";
import { useFetch } from "../../hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


function AddProductLayout() {
    const {
        data: categories,
        loading,
        error, } = useFetch(`${process.env.REACT_APP_API_BASE_URL}/category`);

    const navigate = useNavigate()

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState("");

    const [titleError, setTitleError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const [priceError, setPriceError] = useState(null);
    const [categoryError, setCategoryError] = useState(null);
    const [brandError, setBrandError] = useState(null);

    const handleChange = (event) => {
        setCategory(event.target.value);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setTitleError(null)
        setDescriptionError(null)
        setPriceError(null)
        setCategoryError(null)
        setBrandError(null)

        if (title === "") {
            setTitleError("title is required")
            toast.error("Title is required");
        }
        if (description === "") {
            setDescriptionError("description is required")
            toast.error("Description is required");
        }
        if (price <= 0) {
            setPriceError("price cannot be less than or equal to 0")
            toast.error("Price cannot be less than or equal to 0");
        }
        if (category === "") {
            setCategoryError("Category is required")
            toast.error("Category is required");
        }
        if (brand === "") {
            setBrandError("brand is required")
            toast.error("brand is required");
        }

        if (title === "" || description === "" || price <= 0 || category === "" || brand === "") {
            return;
        }

        const payload = {
            title,
            description,
            price,
            category,
            brand,
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/products`, payload
            );
            if (response.status === 200) {
                toast.success("Product Created Successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTitle("");
                setDescription("");
                setPrice();
                setCategory("");
                setBrand("");
                setTimeout(() => navigate('/'))
            } else {
                toast.error("Something went wrong", {
                    position: toast.POSITION.CENTER_RIGHT
                })
            }
        } catch (err) {
            toast.error("Something went wrong", {
                position: toast.POSITION.TOP_RIGHT
            })
        }

    }



    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Row} controlId="formGridTitle">
                    <Form.Label className="custom-label-one" >Title</Form.Label>
                    <Form.Control
                        type="Title"
                        placeholder="Enter Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={titleError}
                        helperText={titleError}
                    />

                </Form.Group>

                <Form.Group as={Row} controlId="formGridDescription">
                    <Form.Label className="custom-label-two">Description</Form.Label>
                    <Form.Control
                        as="textarea" placeholder="Describe"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={descriptionError}
                        helperText={descriptionError}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Row} controlId="formGridPrice">
                    <Form.Label className="custom-label-one">Price</Form.Label>
                    <Form.Control
                        placeholder='Price'
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        error={priceError}
                        helperText={priceError}
                    />
                </Form.Group>

                <Form.Group as={Row} controlId="formGridCategory">
                    <Form.Label className="custom-label-four">Category</Form.Label>

                    <Form.Select
                        value={category}
                        onChange={handleChange}
                        fullWidth error={categoryError} helperText={categoryError}
                    >
                        <option value="" disabled hidden>Select a category </option>
                        {categories && categories.map((cat) => { return <option value={cat._id}>{cat.name}</option> })}
                    </Form.Select>

                </Form.Group>

                <Form.Group as={Row} controlId="formGridBrand">
                    <Form.Label className="custom-label-three">Brand</Form.Label>
                    <Form.Control
                        placeholder='Brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        error={brandError}
                        helperText={brandError}
                    />
                </Form.Group>

            </Row>

            <Button className="custom-button" variant="contained" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            <ToastContainer />
        </Form>
    );
}

export default AddProductLayout;