import Image from "next/image";
import React from "react";

const FoodCard = ({ meal }) => {
  console.log(meal);
  const { name, image, total_price } = meal;
  return (
    <div
      className="bg-white rounded-xl border mt-9 relative text-center text-sm select-none"
      style={{ height: "250px", width: "192px" }}
    >
      <span className="block" style={{ transform: "translate(0px, -26px)" }}>

        <img
          alt=""
          src={image}
          className="mx-auto"
          style={{ height: "132px", width: "132px", objextFit: "cover", borderRadius: "50%" }}
        />
      </span>
      <div className="mx-auto -mt-4" style={{ width: "144px" }}>
        <div className="font-medium mb-2">{name}</div>
        <div>N {total_price}</div>
        {/* <div> 20 packs available</div> */}
        <button
          style={{ backgroundColor: "#251F2D" }}
          className="text-white text-sm font-semibold px-3 py-1 rounded mt-1"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
