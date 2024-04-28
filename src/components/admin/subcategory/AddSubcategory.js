import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../apis/config";
import swal from "sweetalert";

function AddSubcategory() {
  const [error, setError] = useState({});
  const [subcategoryInput, setSubcategoryInput] = useState({
    name: "",
    parentCategory: "", 
  });
  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    // Fetch categories when component mounts
    axiosInstance.get("/API/categories/").then((res) => {
      if (res.status === 200) {
        setCategories(res.data);
      }
    });
  }, []);

  const handleInput = (event) => {
    const { name, value } = event.target;

    setSubcategoryInput({
      ...subcategoryInput,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    axiosInstance.post("/API/subcategories/", subcategoryInput).then((res) => {
      if (res.data.status === 201) {
        swal("Success", res.data.message, "success");
        setSubcategoryInput({
          name: "",
          parentCategory: "",
        });
        setError({});
      } else if (res.data.status === 400) {
        swal("Error", "All fields are mandatory", "error");
        setError(res.data.errors);
      }
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!subcategoryInput.name) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!subcategoryInput.parentCategory) {
      errors.parentCategory = "Parent Category is required";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  return (
    <>
      <div className="container-fluid px-4">
        <div className="card mt-4">
          <div className="card-header">
            <h4>
              Add Subcategory
              <Link to="/viewsubcategory" className="btn btn-primary btn-sm float-end">
                View Subcategories
              </Link>
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Name <span className='text-danger'>*</span></label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  value={subcategoryInput.name}
                  className="form-control"
                />
                <small className='text-danger'>{error.name}</small>
              </div>
              <div className="form-group mb-3">
                <label>Parent Category <span className='text-danger'>*</span></label>
                <select
                  name="parentCategory"
                  onChange={handleInput}
                  value={subcategoryInput.parentCategory}
                  className="form-control"
                >
                  <option value="">Select Parent Category</option>
                  {/* Render options dynamically based on available categories */}
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <small className='text-danger'>{error.parentCategory}</small>
              </div>
              <button type="submit" className="btn btn-primary px-4 float-end">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSubcategory;