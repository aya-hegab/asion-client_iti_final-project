
import { useState,useEffect } from "react";
import { axiosInstance } from "../../apis/config";
import { Link } from "react-router-dom";

const Categories = () => {
  
  const [category, setCategory] = useState([]);
 
  useEffect(() => { 
    axiosInstance
      .get('/API/categories/')
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);
  //Categories Section Begin

  return (
    
    <>
      
      <section className="categories">
        {/* Add a check for category[0] before accessing its properties */}
        {category.length > 0 && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 p-0">
                <div
                  className="categories__item categories__large__item set-bg"
                  style={{ backgroundImage: `url(${category[0].image})` }}
                >
                  <div className="categories__text">
                    <h1>{category[0].name}</h1>
                    <p>{category[0].description}</p>
                    <Link to="/WomanPage">Shop now</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  {category.slice(1).map((cat) => (
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 p-0"
                      key={cat.id}
                    >
                      <div
                        className="categories__item set-bg"
                        style={{ backgroundImage: `url(${cat.image})` }}
                      >
                        <div className="categories__text">
                          <h4>{cat.name}</h4>
                          <p></p>
                          <br/>
                          {/* <p>{cat.itemCount} items</p> */}
                          {cat.id === 2? (
                            <Link to="/MenPage">Shop now</Link>
                          ) : (
                            <Link to="/ProductList">Shop now</Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
// Categories Section End

export default Categories;
