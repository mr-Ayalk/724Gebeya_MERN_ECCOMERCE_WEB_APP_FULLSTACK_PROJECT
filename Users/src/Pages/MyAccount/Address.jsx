import React, { useState, useContext, useEffect } from "react";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  CircularProgress,
  Radio,
} from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";

const Address = () => {
  const context = useContext(MyContext);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: true,
  });

  // 🗑️ Remove Address
  const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then(() => {
      fetchDataFromApi(`/api/address/get/${context.userData._id}`).then((res) =>
        setAddress(res.data || [])
      );
      context.openAlertBox("success", "Address Removed Successfully");
    });
  };

  // 🏡 Add Address Dialog Handlers
  const handleClickOpenAddressDialog = () => setOpenAddressDialog(true);
  const handleClickCloseAddressDialog = () => setOpenAddressDialog(false);

  // 📬 Load User Addresses
  useEffect(() => {
    if (!context?.userData?._id) return;
    fetchDataFromApi(`/api/address/get/${context.userData._id}`)
      .then((res) => setAddress(res.data || []))
      .catch((err) => console.error("Error fetching address:", err));
  }, [context?.userData?._id]);

  const handleChangeradio = (event) => setSelectedValue(event.target.value);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleStatusChange = (event) => {
    setFormFields((prev) => ({ ...prev, status: event.target.value }));
  };

  // ✅ Handle Add Address
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
      context.openAlertBox("error", "Please fill in all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await postData(`/api/address/add`, formFields);
      if (res?.error) {
        context.openAlertBox("error", res?.message || "Failed to add address");
      } else {
        context.openAlertBox("success", "Address added successfully");
        setFormFields({
          address_line1: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          mobile: "",
          status: true,
        });
        fetchDataFromApi(`/api/address/get/${context.userData._id}`).then(
          (res) => setAddress(res.data || [])
        );
        setOpenAddressDialog(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto flex gap-8 px-6">
        {/* Sidebar */}
        <div className="w-[22%] hidden lg:block">
          <AccountSidebar />
        </div>

        {/* Address Management */}
        <div className="flex-1 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-orange-500 pl-3">
                My Addresses
              </h2>
              <Button
                variant="contained"
                className="!bg-gradient-to-r !from-orange-500 !to-orange-600 !text-white !capitalize"
                onClick={handleClickOpenAddressDialog}
              >
                + Add Address
              </Button>
            </div>

            {/* Address List */}
            <div className="space-y-4">
              {address.length > 0 ? (
                address.map((addr, index) => (
                  <div
                    key={addr._id || index}
                    className="group flex items-center justify-between border border-gray-200 rounded-xl bg-gray-50 hover:bg-orange-50 transition p-4 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      <Radio
                        name="selectedAddress"
                        value={addr._id || index}
                        checked={
                          selectedValue === (addr._id || index).toString()
                        }
                        onChange={handleChangeradio}
                        color="warning"
                      />
                      <div>
                        <p className="text-gray-800 font-medium">
                          {addr.address_line1}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.city}, {addr.state}, {addr.country},{" "}
                          {addr.pincode}
                        </p>
                        <p className="text-sm text-gray-500">
                          📞 {addr.mobile}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeAddress(addr?._id)}
                      className="hidden group-hover:flex items-center justify-center w-9 h-9 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-6">
                  No addresses found. Add your first one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Dialog */}
      <Dialog open={openAddressDialog} onClose={handleClickCloseAddressDialog}>
        <DialogTitle className="!font-semibold !text-gray-800 !text-xl !pb-0 px-8">
          Add New Address
        </DialogTitle>
        <DialogContent className="px-8 py-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              fullWidth
              label="Address Line 1"
              variant="outlined"
              size="small"
              name="address_line1"
              onChange={onChangeInput}
              value={formFields.address_line1}
            />

            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="City"
                variant="outlined"
                size="small"
                name="city"
                onChange={onChangeInput}
                value={formFields.city}
                fullWidth
              />
              <TextField
                label="State"
                variant="outlined"
                size="small"
                name="state"
                onChange={onChangeInput}
                value={formFields.state}
                fullWidth
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Postal Code"
                variant="outlined"
                size="small"
                name="pincode"
                onChange={onChangeInput}
                value={formFields.pincode}
                fullWidth
              />
              <TextField
                label="Country"
                variant="outlined"
                size="small"
                name="country"
                onChange={onChangeInput}
                value={formFields.country}
                fullWidth
              />
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
              <div>
                <PhoneInput
                  defaultCountry="et"
                  value={phone}
                  onChange={(phone) => {
                    setPhone(phone);
                    setFormFields((prev) => ({ ...prev, mobile: phone }));
                  }}
                  disabled={isLoading}
                  className="!w-full border rounded-md bg-gray-50"
                />
              </div>

              <div>
                <Select
                  value={formFields.status}
                  onChange={handleStatusChange}
                  fullWidth
                  size="small"
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-2">
              <Button
                onClick={handleClickCloseAddressDialog}
                className="!text-gray-600 hover:!text-gray-800 !capitalize"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="!bg-gradient-to-r !from-orange-500 !to-orange-600 !text-white !capitalize"
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save Address"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Address;
