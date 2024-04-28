import React from "react";
import ProductRating from "./ProductRating";

const ListOfProduct = ({
  products,
  wishlistid,
  itemsid,
  handleAddWish,
  handleAdd,
  handlePageChange,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="row">
      {products.map((prod) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mix women" key={prod.id}>
          <div className="product__item">
            <div
              className="product__item__pic set-bg"
              style={{
                backgroundImage: `url('http://127.0.0.1:8000${prod.image}')`,
              }}
            >
              {prod.new && prod.stock !== 0 ? (
                <div className="label new">New</div>
              ) : prod.sale && prod.stock !== 0 ? (
                <div className="label sale">Sale</div>
              ) : prod.stock === 0 ? (
                <div className="label stockout">out of stock</div>
              ) : null}
              <ul className="product__hover">
                <li>
                  <a href={prod.image} className="image-popup">
                    <a href={`/productDetails/${prod.id}`}>
                      {" "}
                      <span className="arrow_expand"></span>
                    </a>
                  </a>
                </li>
                <li>
                  <a
                    href={() => false}
                    style={{
                      backgroundColor:
                        wishlistid.includes(prod.id) && "#ca1515",
                    }}
                    onClick={() => handleAddWish(prod.id)}
                  >
                    <span
                      style={{
                        color: wishlistid.includes(prod.id) && "#ffffff",
                      }}
                      className="icon_heart_alt"
                    ></span>
                  </a>
                </li>
                <li>
                  <a
                    href={() => false}
                    style={{
                      backgroundColor: itemsid.includes(prod.id)
                        ? "#ca1515"
                        : prod.stock === 0
                        ? "gray"
                        : null,
                    }}
                    onClick={() => handleAdd(prod)}
                  >
                    <span
                      style={{
                        color:
                          itemsid.includes(prod.id) || prod.stock === 0
                            ? "#ffffff"
                            : null,
                      }}
                      className="icon_bag_alt"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="product__item__text">
              <h6>
                <a href="h">{prod.name}</a>
              </h6>
              <div>
                <ProductRating rating={prod.ratings} />
              </div>
              {prod.sale ? (
                <div className="product__price  " style={{ color: "#ca1515" }}>
                  {prod.newprice} <span>{prod.price}</span>
                </div>
              ) : (
                <div className="product__price">{prod.price}</div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div class="col-lg-12 text-center mt-3">
        <div class="pagination__option">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <a
              href="#"
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-link ${
                currentPage === page ? "activee" : ""
              }`}
            >
              {page}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfProduct;
