import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
  console.log("products from component", products);
  return (
    <div className="max-w-[1200px] mx-auto p-4 flex flex-col justify-center w-full h-full">
      <div className="mx-auto p-4 flex flex-col justify-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 p-2 rounded-lg">
          {products &&
            products.map((product, i) => (
              <div
                key={i}
                className="flex flex-col justify-center p-4 bg-[var(--white)] shadow-md shadow-[var(--lime)] border-2 border-[var(--green)] group container rounded-lg"
              >
                <div className="flex flex-col justify-center p-6">
                  <img src={product.imageUrl} alt={product.name} />
                  <h2 className="text-xl text-[var(--green)] font-bold tracking-widest border-b-2 border-[var(--red)] pb-1">
                    {product.name}
                  </h2>
                  <p>{product.description}</p>
                  <p className="tracking-widest font-bold text-[var(--red)] py-4">
                    ${product.funding}
                  </p>
                  <a className="py-2" href={product.externalLink}>
                    More Info For This Item
                  </a>
                  <div className="tracking-widest my-4 mx-auto border-2 border-[var(--green)] rounded-lg p-4">
                    <Link
                      to={`/product/${product._id}`}
                      product={product}
                      className="text-[var(--green)]"
                    >
                      Fund This Item!
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
