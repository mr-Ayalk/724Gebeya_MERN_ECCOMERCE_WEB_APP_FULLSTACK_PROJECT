// import MyListItems from "./MyListItems.jsx";
// import AccountSidebar from "../../components/AccountSidebar/AccountSidebar.jsx";

// function MyList() {
//   return (
//     <section className="py-10 w-full">
//       <div className="container flex gap-5">
//         <div className="col1 w-[20%]">
//           <AccountSidebar />
//         </div>

//         <div className="col2 w-[70%]">
//           <div className="shadow-md rounded-md  bg-white">
//             <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
//               <h2>My Lists</h2>
//               <p className="mt-0">
//                 There are <span className="font-bold text-primary">2 </span>{" "}
//                 products in your My Lists
//               </p>
//             </div>

//             <MyListItems />
//             <MyListItems />

//             <MyListItems />
//             <MyListItems />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default MyList;
import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../../utils/api";
import Button from "@mui/material/Button";

function MyList() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await fetchDataFromApi("/api/mylist");
    if (res?.data) setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    const r = await fetch(`${import.meta.env.VITE_API_URL}/api/mylist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accesstoken")
          ? `Bearer ${localStorage.getItem("accesstoken")}`
          : "",
      },
    }).then((res) => res.json());
    if (r?.success || !r?.error) load();
  };

  return (
    <section className="py-10">
      <div className="container">
        <h2>My List</h2>
        {items.length === 0 ? (
          <div>No items saved</div>
        ) : (
          items.map((it) => (
            <div
              key={it._id}
              className="py-3 border-b flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h4>{it.productTitle}</h4>
                  <p>${it.price}</p>
                </div>
              </div>
              <div>
                <Button variant="outlined" onClick={() => remove(it._id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MyList;
