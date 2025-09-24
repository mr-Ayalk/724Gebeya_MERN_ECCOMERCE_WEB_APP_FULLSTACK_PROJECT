

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useContext, useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MyContext } from "../../App";
import { FaCloudUploadAlt } from "react-icons/fa";
import { postData } from "../../utils/api";

const AddAddress = () => {
  const context = useContext(MyContext);
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: true, // default Active
  });

  // If you still want to prefill anything from userData, do it safely
  useEffect(() => {
    // no need to set userId; backend reads it from token
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (event) => {
    setFormFields((prev) => ({ ...prev, status: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const { address_line1, city, state, pincode, country, mobile } = formFields;

    if (
      !address_line1.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim() ||
      !country.trim() ||
      !mobile.trim()
    ) {
      context.openAlertBox(
        "error",
        "All fields are required. Please fill in all the fields."
      );
      return;
    }

    try {
      setIsLoading(true);
      const res = await postData(`/api/address/add`, formFields);

      if (res?.error) {
        context.openAlertBox("error", res?.message || "Failed to add address");
      } else {
        context.openAlertBox("success", res?.message || "Address added");
        // optionally reset
        setFormFields({
          address_line1: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile: "",
          status: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-5 px-20 bg-gray-50 overflow-hidden">
      <form className="form p-8 py-3" onSubmit={handleSubmit}>
        <div className="scroll max-h-[75vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-2 mb-3 gap-2">
            <div className="col w-full">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Address Line 1
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
                name="address_line1"
                onChange={onChangeInput}
                value={formFields.address_line1}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">City</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
                name="city"
                onChange={onChangeInput}
                value={formFields.city}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 mb-3 gap-2">
            <div className="col w-full">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">State</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
                name="state"
                onChange={onChangeInput}
                value={formFields.state}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Country
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
                name="country"
                onChange={onChangeInput}
                value={formFields.country}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Postal Code
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-blue-600 rounded-sm p-3 text-sm bg-white"
                name="pincode"
                onChange={onChangeInput}
                value={formFields.pincode}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 mb-3 gap-2">
            <div className="col w-full">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Mobile No
              </h3>
              <PhoneInput
                defaultCountry="et"
                value={formFields.mobile}
                onChange={(phone) =>
                  setFormFields((prev) => ({ ...prev, mobile: phone }))
                }
                disabled={isLoading}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-[14px] font-[500] mb-1 !text-black">
                Status
              </h3>
              <Select
                value={formFields.status}
                onChange={handleStatusChange}
                displayEmpty
                inputProps={{ "aria-label": "Status" }}
                className="w-full h-fit"
                size="small"
                disabled={isLoading}
              >
                <MenuItem value={true}>
                  <em>Active</em>
                </MenuItem>
                <MenuItem value={false}>
                  <em>Not Active</em>
                </MenuItem>
              </Select>
            </div>
          </div>
        </div>

        <br />
        <div className="w-[250px]">
          <button
            type="submit"
            className="btn-blue btn-lg w-full flex gap-2 disabled:opacity-60"
            disabled={isLoading}
          >
            <FaCloudUploadAlt className="text-[25px] text-white" />
            {isLoading ? "Saving..." : "Publish and View"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddAddress;
