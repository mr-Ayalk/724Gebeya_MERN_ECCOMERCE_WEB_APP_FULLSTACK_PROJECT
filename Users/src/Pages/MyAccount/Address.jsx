import React, { useState, useContext, useEffect } from "react";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { MyContext } from "../../App";
import { Radio } from "@mui/material";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
const Address = () => {
  const context = useContext(MyContext);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then((res) => {
      console.log(res);
    });
  };
  const handleClickOpenAddressDialog = () => {
    setOpenAddressDialog(true);
  };
  const handleClickCloseAddressDialog = () => {
    setOpenAddressDialog(false);
  };
  const [address, setAddress] = useState([]);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: true, // default Active
  });

  const [selectedValue, setSelectedValue] = useState(""); // start empty
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
  // ✅ Load user address data
  useEffect(() => {
    if (!context?.userData?._id) return; // wait for user data to load

    fetchDataFromApi(`/api/address/get/${context.userData._id}`)
      .then((res) => {
        setAddress(res.data || []);
      })
      .catch((err) => {
        console.error("Error fetching address:", err);
      });
  }, [context?.userData?._id]); // runs when user ID is available/changes

  const handleChangeradio = (event) => {
    setSelectedValue(event.target.value); // updates selected value
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-3">
              <h2 className="pb-0">Address</h2>
            </div>
            <hr />

            <div
              className="flex items-center justify-center p-5 border border-dashed border-gray-300 bg-[#f1f1ff] hover:bg-[#e7f3f9] cursor-pointer"
              onClick={handleClickOpenAddressDialog}
            >
              <span className="text-[14px] font-[500]">Add Address</span>
            </div>
            <Dialog
              open={openAddressDialog}
              onClose={handleClickCloseAddressDialog}
            >
              <DialogTitle className="px-10">Add Address</DialogTitle>
              <DialogContent>
                <form className="px-5" onSubmit={handleSubmit}>
                  <div className="flex  items-center gap-5 pb-5">
                    <div className="col w-[100%]">
                      <TextField
                        className="w-full"
                        label="Address Line 1"
                        variant="outlined"
                        size="small"
                        name="address_line1"
                        onChange={onChangeInput}
                        value={formFields.address_line1}
                      />
                    </div>
                  </div>

                  <div className="flex  items-center gap-5 pb-5">
                    <div className="col w-[50%]">
                      <TextField
                        className="w-full"
                        label="City"
                        variant="outlined"
                        size="small"
                        name="city"
                        onChange={onChangeInput}
                        value={formFields.city}
                      />
                    </div>
                    <div className="col w-[50%]">
                      <TextField
                        className="w-full"
                        label="State"
                        variant="outlined"
                        size="small"
                        name="state"
                        onChange={onChangeInput}
                        value={formFields.state}
                      />
                    </div>
                  </div>
                  <div className="flex  items-center gap-5 pb-5">
                    <div className="col w-[50%]">
                      <TextField
                        className="w-full"
                        label="Postal Code"
                        variant="outlined"
                        size="small"
                        name="pincode"
                        onChange={onChangeInput}
                        value={formFields.pincode}
                      />
                    </div>
                    <div className="col w-[50%]">
                      <TextField
                        className="w-full"
                        label="Country"
                        variant="outlined"
                        size="small"
                        name="country"
                        onChange={onChangeInput}
                        value={formFields.country}
                      />
                    </div>
                  </div>

                  <div className="flex items-center mt-4 gap-5 ">
                    <div className="w-[50%]">
                      <PhoneInput
                        defaultCountry="et"
                        value={phone}
                        onChange={(phone) => {
                          setPhone(phone);
                          setFormFields((prev) => ({
                            ...prev,
                            mobile: phone,
                          }));
                        }}
                        disabled={isLoading}
                      />
                    </div>
                    <div className="w-[50%] flex items-center gap-24 border border-[rgba(0,0,0,0.4)] rounded-md ">
                      <h3 className="text-[14px] font-[500] mb-1 !text-black items-center pl-2">
                        Status
                      </h3>
                      <Select
                        value={formFields.status}
                        onChange={handleStatusChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Status" }}
                        className="w-full h-fit !border-none"
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
                  <div className=" flex items-center gap-5 mt-5">
                    {" "}
                    <Button
                      type="submit"
                      // disabled={!validateValue}
                      className="btn-org  btn-lg w-full flex gap-2 items-center hover:!btn-org/75"
                    >
                      {isLoading === true ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        "Save Address"
                      )}
                    </Button>
                    <Button
                      className="btn-org btn-border btn-lg w-full flex gap-2"
                      onClick={handleClickCloseAddressDialog}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <br />
            <div className="flex gap-2 flex-col mt-4">
              {address?.length > 0 ? (
                address.map((addr, index) => (
                  <label
                    key={addr._id || index}
                    className="group relative border border-dashed border-gray-300 addressBox w-full flex items-center justify-start bg-[#f1f1f1] p-3 rounded-md cursor-pointer mb-2"
                  >
                    <div className="mr-auto">
                      {" "}
                      <Radio
                        name="selectedAddress"
                        value={addr._id || index}
                        checked={
                          selectedValue === (addr._id || index).toString()
                        }
                        onChange={handleChangeradio}
                      />
                      <span>
                        {addr.address_line1}, {addr.city}, {addr.state},{" "}
                        {addr.country}, {addr.pincode}
                      </span>
                    </div>
                    <span
                      onClick={() => removeAddress(address?._id)}
                      className="hidden group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-500 text-white ml-auto"
                    >
                      <FaRegTrashAlt />
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No addresses found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Address;
