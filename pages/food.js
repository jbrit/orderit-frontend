import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import { getMe } from "../actions/auth";
import { getMeals, getOrderItems } from "../actions/food";
import DashboardTemplate from "../components/DashboardTemplate";
import FoodCard from "../components/FoodCard";
import { getCategory, redirectLoggedOut } from "../utils/utils";

export default function Food() {
  const getMeQuery = useQuery("me", getMe);
  const getItemsQuery = useQuery("order-items", getOrderItems);
  const getMealsQuery = useQuery("meals", getMeals);
  const orderItems = (getItemsQuery.data ?? []).reduce(
    function (obj, item) {
      // Get the integer value of the number
      let category = getCategory(item);

      // If the integer doesn't already exist as a key in the object, create it
      if (!obj.hasOwnProperty(category)) {
        obj[category] = [];
      }

      obj[category].push(item);

      // Pass the object on to the next loop
      return obj;
    },
    { Food: [], Extra: [], Snack: [], Drink: [] }
  );
  const [foodCategory, setFoodCategory] = useState("Food");
  redirectLoggedOut();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemQuantity, setSelectedItemQuantity] = useState(1);
  const [selectedMeal, setSelectedMeal] = [];
  const addMeal = (item, quantity) =>
    selectedMeal && setSelectedMeal({ item, quantity });
  console.log(selectedItem);
  return (
    <div>
      <Head>
        <title>Food | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <DashboardTemplate
        pageName={"Food"}
        loading={getMeQuery.isLoading}
        success={getMeQuery.isSuccess}
      >
        <>
          <div className="dashboard-container py-10">
            {/* Starts here */}
            <main className="grid grid-cols-3">
              <div className="col-span-2">
                <div className="font-semibold text-xl mb-4">Select Meal</div>
                <div className="mb-3">
                  <label className="mr-3">Category:</label>
                  <select
                    style={{ borderColor: "#251F2D" }}
                    className="border bg-transparent focus:outline-none rounded"
                    value={foodCategory}
                    onChange={(e) => {
                      setFoodCategory(e.target.value);
                      setSelectedItem(null);
                    }}
                  >
                    <option value="Food">Food</option>
                    <option value="Extra">Extra</option>
                    <option value="Drink">Drink</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
                <div
                  style={{ maxWidth: "800px" }}
                  className="grid grid-cols-7 gap-4 mb-3"
                >
                  <div className="col-span-3 relative">
                    <span
                      style={{
                        top: "-10px",
                        left: "5px",
                        backgroundColor: "#fafafa",
                        position: "absolute",
                      }}
                      className="text-sm px-1"
                    >
                      {foodCategory}
                    </span>
                    <select
                      style={{ borderColor: "#251F2D" }}
                      className="border bg-transparent focus:outline-none rounded w-full p-1"
                      value={selectedItem ? selectedItem : ""}
                      onChange={(e) => setSelectedItem(e.target.value)}
                    >
                      {orderItems[foodCategory].map((item, idx) => (
                        <option key={idx} value={JSON.stringify(item)}>
                          {item.name}
                        </option>
                      ))}
                      <option value="" disabled>
                        Select Item
                      </option>
                    </select>
                  </div>
                  <div className="col-span-2 relative">
                    <span
                      style={{
                        top: "-10px",
                        left: "5px",
                        backgroundColor: "#fafafa",
                        position: "absolute",
                      }}
                      className="text-sm px-1"
                    >
                      Price
                    </span>
                    <input
                      style={{ borderColor: "#251F2D" }}
                      className="border bg-transparent focus:outline-none rounded w-full p-1"
                      value={selectedItem ? JSON.parse(selectedItem).price : ""}
                      disabled
                    />
                  </div>
                  <div className="col-span-2 relative">
                    <span
                      style={{
                        top: "-10px",
                        left: "5px",
                        backgroundColor: "#fafafa",
                        position: "absolute",
                      }}
                      className="text-sm px-1"
                    >
                      Quantity
                    </span>
                    <select
                      style={{ borderColor: "#251F2D" }}
                      className="border bg-transparent focus:outline-none rounded w-full p-1"
                      value={selectedItemQuantity}
                      onChange={(e) => setSelectedItemQuantity(e.target.value)}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                    </select>
                  </div>
                </div>
                <div
                  style={{ maxWidth: "800px" }}
                  className="mb-10 flex justify-end"
                >
                  <button
                    style={{ backgroundColor: "#251F2D" }}
                    className="text-white text-sm font-semibold px-20 py-2 rounded mt-1"
                    onClick={() =>
                      selectedItem &&
                      addMeal(JSON.parse(selectedItem), selectedItemQuantity)
                    }
                  >
                    Select
                  </button>
                </div>
              </div>
              <div className="p-4 bg-white" style={{ marginTop: "60px" }}>
                <div className="uppercase font-bold mb-4">Selected Meal</div>
                <div className="uppercase font-semibold flex justify-between items-center">
                  <span>Total</span>
                  <span>N1,200</span>
                </div>
              </div>
            </main>
            {/* Ends Here */}
            <div className="font-semibold text-xl">Popular Combos</div>
            <div className="mb-4 flex justify-end">
              <span className="font-semibold cursor-pointer">View All</span>
            </div>
            <div className="max-w-full overflow-x-auto">
              <div className="grid gap-4  grid-flow-col  grid-rows-1 auto-cols-auto mb-9">
                {(getMealsQuery.data ?? []).map((meal, idx) => (
                  <FoodCard meal={meal} key={idx} />
                ))}
              </div>
            </div>
          </div>
        </>
      </DashboardTemplate>
    </div>
  );
}
