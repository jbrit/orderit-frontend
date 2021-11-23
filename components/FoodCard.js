import Image from "next/image";
import React from "react";

const FoodCard = () => {
  return (
    <div
      className="bg-white rounded-xl border mt-9 relative text-center text-sm select-none"
      style={{ height: "226px", width: "192px" }}
    >
      <span className="block" style={{ transform: "translate(0px, -26px)" }}>
        <Image alt="" src="/images/food.png" height={132} width={132} />
      </span>
      <div className="mx-auto -mt-4" style={{ width: "144px" }}>
        <div className="font-medium mb-2">Jollof Rice + Chicken + Drink</div>
        <div>N850</div>
        <div> 20 packs available</div>
      </div>
    </div>
  );
};

export default FoodCard;
