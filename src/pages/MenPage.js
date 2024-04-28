import React, { useEffect, useState } from "react";
import { axiosInstance } from "../apis/config";
import { Link } from "react-router-dom";
import ShopCategory from "../components/Shop/ShopCategory";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter, setItemsid } from "../store/slices/total";
import { addItem, removeItem, setItems } from "../store/slices/wishlist";
import ListOfProduct from "../components/Shop/ListOfProduct";
import { Form, Button } from "react-bootstrap";
import './ProductList.css'


const MenPage = () => {
  const [subcategory, setsubCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const itemsid = useSelector((state) => state.total.itemsid);
  const userCookie = Cookies.get("user");
  const userID = userCookie ? JSON.parse(userCookie).id : null;
  const [wishlistid, setWishlistid] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(2); 
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const token = Cookies.get("token");
  const headers = {
    Authorization: `Token ${token}`,
  };



  useEffect(() => {
    axiosInstance
      .get("/API/subcategories/")
      .then((res) => setsubCategory(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axiosInstance
      .get("/API/categories/")
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axiosInstance
      .get(`/api/wishlist/list/`, { headers })
      .then((res) => {
        console.log(res.data);
        // console.log(userID);
        setWishlistid(res.data.wishlist_items.map((item) => item.item));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddWish = async (itemId) => {
    try {
      const response = await axiosInstance.post(
        `/api/wishlist/add/`,
        {
          item: itemId,
        },
        { headers }
      );

      if (response.data.msg === "Item removed from wishlist") {
        dispatch(removeItem());
        console.log(wishlistid);
        setWishlistid(wishlistid.filter((itemid) => itemid !== itemId));
      } else if (response.data.msg === "Item added to wishlist") {
        dispatch(addItem());
        console.log(wishlistid);
        setWishlistid(wishlistid.concat(itemId));
      }
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const handleAdd = async (item) => {
    // e.preventDefault();
    if (!itemsid.includes(item.id)) {
      try {
        const response = await axiosInstance.get(
          `/API/getProduct/${item.id}`,
          {
            headers,
          }
        );
        console.log(response.data.product);
        const proDetails = response.data.product;
        let selectedSize = "";

        if (proDetails.stock_S > 0) {
          selectedSize = "S";
        } else if (proDetails.stock_M > 0) {
          selectedSize = "M";
        } else if (proDetails.stock_L > 0) {
          selectedSize = "L";
        } else if (proDetails.stock_XL > 0) {
          selectedSize = "XL";
        } else {
          selectedSize = "one_size";
        }
        setSelectedSize(selectedSize);

        try {
          console.log(selectedSize);
          const response = await axiosInstance.post(
            `/api/cart/add/`,
            {
              item: item.id,
              quantity: 1,
              size: selectedSize,
            },
            { headers }
          );
          console.log(response.data);
          dispatch(increaseCounter());
          const updatedItemsId = itemsid.concat(item.id);
          dispatch(setItemsid(updatedItemsId));
        } catch (error) {
          console.error("Error:", error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      // try {
      //   const response = await axiosInstance.post(
      //     `/api/cart/add/`,
      //     {
      //       item: itemId,
      //       quantity: 1,
      //     },
      //     { headers }
      //   );
      //   console.log(response.data);
      //   dispatch(increaseCounter());
      //   const updatedItemsId = itemsid.concat(itemId);
      //   dispatch(setItemsid(updatedItemsId));
      // } catch (error) {
      //   console.error("Error:", error.response.data);
      // }
    }
  };

  const [activeAccordion, setActiveAccordion] = useState(null);
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [maxPriceFromAPI, setMaxPriceFromAPI] = useState(null);
  useEffect(() => {
    axiosInstance.get('http://127.0.0.1:8000/API/allproducts/')
      .then(res => {
        
        const maxPrice = Math.max(...res.data.results.products.map(product => parseFloat(product.price)));
        setMaxPriceFromAPI(maxPrice+20);
        setMaxPrice(maxPrice+20);

      })
      .catch(error => {
        console.error('Error fetching maximum price:', error);
      });
  }, []);

  useEffect(() => {
    fetchProducts(); // Fetch products initially
  }, [ selectedSubcategory, minPrice, maxPrice, currentPage]); // Refetch products when any filter changes

  const fetchProducts = () => {
    let url = `/API/allproducts/?page=${currentPage}`;

    // Add selected category and subcategory to the URL if they are not null
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }

    if (selectedSubcategory) {
      url += `&subcategory=${selectedSubcategory}`;
    }
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    // Add price range to the URL
    url += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    axiosInstance
      .get(url)
      .then((res) => {
        setProducts(res.data.results.products);
        const totalPages = Math.ceil(res.data.count / 12); // Calculate total pages
        setTotalPages(totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [keyword, setKeyword] = useState(""); 

  const handleSearchChange = (event) => {
    setKeyword(event.target.value); 
  };
  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); 
    fetchProducts(); 
  };
  

  return (
    <>
       {/* Breadcrumb Begin */}
       <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home"></i> Home
                </Link>
                <span>Men Category</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      <section className="shop spad">
      <div className="container">
        <div className="productSearch mb-3">
        <Form className="d-flex" onSubmit={handleSearchSubmit}> {/* Add onSubmit event handler */}
  <Form.Control
    type="search"
    placeholder="Search"
    className="me-2"
    aria-label="Search"
    value={keyword} // Bind value to keyword state
    onChange={handleSearchChange} // Add onChange event handler
  />
<Button variant="outline-success" type="submit" className="search-button">Search</Button>
</Form>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <div className="shop__sidebar">
              <div className="sidebar__categories">
                <div className="section-title">
                  <h4>Categories</h4>
                </div>
                <div className="categories__accordion">
                  <div className="accordion" id="accordionExample">
                  {category.filter(cat => cat.id === 2).map((cat) => {
                      return (
                        <>
                          <div className="card" key={cat.id}>
                            <div className="card-heading">
                              <Link
                                data-toggle="collapse"
                                data-target={`#collapse${cat.id}`}
                                onClick={() => {
                                  setSelectedCategory(cat.id); // Set selected category
                                  setSelectedSubcategory(""); // Set selected subcategory
                                }}
                              >
                                {cat.name}
                              </Link>
                            </div>
                            <div
                              id={`collapse${cat.id}`}
                              className="collapse"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <ul>
                                  {cat.subcategories.map((subcat) => (
                                    <li key={subcat.id}>
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          setSelectedCategory(cat.id); // Set selected category
                                          setSelectedSubcategory(subcat.id); // Set selected subcategory
                                        }}
                                      >
                                        {subcat.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                      
                  </div>
                </div>
              </div>
              <ShopCategory
                minPrice={minPrice}
                maxPrice={maxPrice}
                maxPriceFromAPI={maxPriceFromAPI}
                handlePriceChange={handlePriceChange}
              />
              <div className="sidebar__sizes">
                <div className="section-title">
                  
                </div>
             
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-9">
            <ListOfProduct
              products={products}
              wishlistid={wishlistid}
              itemsid={itemsid}
              handleAddWish={handleAddWish}
              handleAdd={handleAdd}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </section>
    
    </>
  
  );
};

export default MenPage;
