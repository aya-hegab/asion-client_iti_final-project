import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { axiosInstance } from "../../../apis/config";

function EditCategory() {
  const [error, setError] = useState({});
  const [categoryInput, setCategory] = useState({
    name: "",
    description: "",
    image: null,
  });
  const { id } = useParams(); // Get category ID from URL params

  useEffect(() => {
    // Fetch category data based on ID when component mounts
    axiosInstance.get(`/API/categories/${id}/`).then((res) => {
      const { name, description, image } = res.data;
      setCategory({
        name: name,
        description: description,
        image: null, // We're not setting the image here to prevent rendering the current image
      });
    });
  }, [id]);

  const handleInput = (event) => {
    const { name, value, files } = event.target;

    setCategory({
      ...categoryInput,
      [name]: files ? files[0] : value, // Handling file uploads properly
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formData = new FormData();
    formData.append("name", categoryInput.name);
    formData.append("description", categoryInput.description);
    if (categoryInput.image) {
      formData.append("image", categoryInput.image);
    }

    axiosInstance.put(`/API/categories/${id}/`, formData).then((res) => {
      if (res.data.status === 200) {
        swal("Success", res.data.message, "success");
        setError({});
      } else if (res.data.status === 400) {
        swal("All fields are mandatory", "", "error");
        setError(res.data.errors);
      }
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Basic validation, you can enhance this based on your requirements
    const requiredFields = ["name", "description"];

    requiredFields.forEach((key) => {
      if (!categoryInput[key]) {
        errors[key] = "This field is required";
        isValid = false;
      }
    });

    setError(errors);
    return isValid;
  };

  return (
    <>
      <div className="container-fluid px-4">
        <div className="card mt-4">
            
          <div className="card-header">
            <h4>Edit Category</h4>
            <Link to="/viewCategory" className="btn btn-primary btn-sm float-end">BACK</Link>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} id="CATEGORY_FORM" encType="multipart/form-data">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane card-body border fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="form-group mb-3">
                    <label>Name <span className='text-danger'>*</span></label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      value={categoryInput.name}
                      className="form-control"
                    />
                    <small className='text-danger'>{error.name}</small>
                  </div>
                  <div className="form-group mb-3">
                    <label>Description<span className='text-danger'>*</span></label>
                    <textarea
                      name="description"
                      onChange={handleInput}
                      value={categoryInput.description}
                      className="form-control"
                    ></textarea>
                    <small className='text-danger'>{error.description}</small>
                  </div>
                  <div className="form-group mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleInput}
                      className="form-control"
                    />
                    <small className='text-muted'>Leave blank to keep the existing image.</small>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary px-4">
                Update
              </button>
              <Link to="/viewCategory" className="btn btn-secondary mx-2">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCategory;