import React from "react";
import Image from "next/image";

const ShoppingCard = () => {
  return (
    <div
      className="bg-white rounded-xl border mt-9 relative text-center text-sm select-none flex flex-col justify-center"
      style={{ height: "226px", width: "192px" }}
    >
      <span className="block">
        <Image alt="" src="/images/indomie.png" height={100} width={100} />
      </span>
      <div className="mx-auto" style={{ width: "144px" }}>
        <div className="font-medium mb-1">Carton of Indomie</div>
        <div>N3,500</div>
        <div className="text-xs mb-4"> 20 packs available</div>
        <button style={{backgroundColor: "#251F2D"}} className="text-white text-sm font-semibold px-3 py-1 rounded"> Add to Cart</button>
      </div>
    </div>
  );
};

export default ShoppingCard;
