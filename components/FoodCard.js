import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";
import { placeOrder } from "../actions/food";
import { getError } from "../utils/utils";

const FoodCard = ({ meal }) => {
  console.log(meal);
  const { name, image, total_price } = meal;
  const item_ids = meal.items.map((item) => item.id);
  return (
    <div
      className="bg-white rounded-xl border mt-9 relative text-center text-sm select-none"
      style={{ height: "250px", width: "192px" }}
    >
      <span
        className="block"
        style={{ transform: "translate(0px, -26px)", borderRadius: "50%" }}
      >
        <Image
          alt=""
          src={image}
          height={132}
          width={132}
          className="mx-auto"
          style={{ objectFit: "cover", borderRadius: "50%" }}
        />
      </span>
      <div className="mx-auto -mt-4" style={{ width: "144px" }}>
        <div className="font-medium mb-2">{name}</div>
        <div>N {total_price}</div>
        {/* <div> 20 packs available</div> */}
        <button
          style={{ backgroundColor: "#251F2D" }}
          className="text-white text-sm font-semibold px-3 py-1 rounded mt-1"
          onClick={() =>
            placeOrder({
              items: item_ids.join(","),
              item_quantities: item_ids.map((item) => 1).join(","),
            })
              .then(() => {
                Swal.fire("Success", "Meal Ordered Successfully", "success");
              })
              .catch((error) =>
                Swal.fire(
                  "Ordering Error",
                  getError(error) ?? "Could not order the meal",
                  "error"
                )
              )
          }
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
