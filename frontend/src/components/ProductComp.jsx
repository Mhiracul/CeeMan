import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { viewProducts } from "../actions/productActions";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

const ProductComp = ({ products = [], loading, viewProducts }) => {
  useEffect(() => {
    viewProducts();
  }, [viewProducts]);
  const formatPrice = (price) => {
    // Remove .00 and keep the ₦ symbol
    return price.replace(/\.00$/, "");
  };

  return (
    <div className="w-full">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 px-10 gap-6 container mx-auto py-20">
          {products.length > 0 ? (
            products.map((product) => {
              const originalPrice = parseFloat(
                product.price.replace(/[^0-9.-]+/g, "")
              );
              const newPrice = originalPrice + 150000;
              const defaultRating = 3.5;
              return (
                <Link
                  to={`/product-details/${product.ProductID}`}
                  key={product.ProductID}
                >
                  <div
                    key={product.ProductID}
                    className="border border-[#efefef] flex flex-col items-center py-3 justify-center"
                  >
                    <img
                      src={product.imageUrl[0]} // Accessing the first image in the array
                      alt={product.name}
                      className="w-1/2"
                    />
                    <div className="flex flex-col md:items-start items-center py-3">
                      <h3 className="text-xs font-normal">{product.name}</h3>
                      <p className="text-base font-bold">
                        <span>Price: </span>
                        {formatPrice(product.price)}
                      </p>

                      <p className="text-xs mt-3 font-normal line-through text-black">
                        {formatPrice(`₦${Math.round(newPrice)}`)}
                      </p>

                      <StarRatings
                        rating={defaultRating}
                        starRatedColor="#E5B800"
                        numberOfStars={5}
                        name="rating"
                        starDimension="13px"
                        starSpacing="1px"
                      />
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="text-center  py-2">No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.products.products); // Log products here to see what's being received
  return {
    products: state.products.products,
    loading: state.products.loading,
  };
};

export default connect(mapStateToProps, { viewProducts })(ProductComp);
