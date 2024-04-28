import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { axiosInstance } from "../../../apis/config";
import swal from 'sweetalert';

function ViewCategory() {
  const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
        let isMounted = true;

        axiosInstance.get('/API/categories/').then(res=>{
            if(isMounted)
            {
                if(res.status === 200)
                {
                    setCategorylist(res.data)
                    setLoading(false);
                }
            }
        });
        console.log(categorylist)
        return () => {
            isMounted = false
        };

    }, []);

    // const deleteCategory = (e, id) => {
    //     e.preventDefault();
        
    //     const thisClicked = e.currentTarget;
    //     thisClicked.innerText = "Deleting";

    //     axiosInstance.delete(`/API/categories/${id}`).then(res=>{
    //         if(res.data.status === 200)
    //         {
    //             swal("Success",res.data.message,"success");
    //             thisClicked.closest("tr").remove();
    //         }
    //         else if(res.data.status === 404)
    //         {
    //             swal("Success",res.data.message,"success");
    //             thisClicked.innerText = "Delete";
    //         }
    //     });

    // }

    const deleteCategory = (e, id) => {
        e.preventDefault();
      
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
      
        axiosInstance.delete(`/API/categories/${id}`).then((res) => {
          if (res.data.status === 200) {
            // Subcategory deleted successfully, update state
            setCategorylist(categorylist.filter((subcategory) => subcategory.id !== id));
            swal("Success", res.data.message, "success");
          } else {
            // Handle other status codes, such as 404 (Not Found)
            swal("Success", res.data.message || "Success to delete subcategory", "success");
            thisClicked.innerText = "Delete";
          }
        }).catch(error => {
          // Handle network errors or unexpected errors
          console.error("Error deleting subcategory:", error);
          swal("Error", "Failed to delete subcategory", "error");
          thisClicked.innerText = "Delete";
        });
      };

    var viewcategory_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading Category...</h4>
    }
    else
    {
        viewcategory_HTMLTABLE = 
        categorylist.map( (item) => {
        
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>  <div
                  className="categories__item categories__large__item set-bg"
                  style={{ backgroundImage: `url(${item.image})`, width:'150px', height:'100px'}}
                ></div></td>
                    <td>
                        <Link to={`editCategory/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={ (e) => deleteCategory(e, item.id) } className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        });
    }
    console.log(categorylist)
  return (
    <>
      <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Category List 
                        <Link to="/addCategory" className="btn btn-primary btn-sm float-end">Add Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Delete</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {viewcategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
   
    </>
  )
}

export default ViewCategory
