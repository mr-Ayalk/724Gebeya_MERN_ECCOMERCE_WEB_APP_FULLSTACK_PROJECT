import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData } from "../../utils/api";
import { CircularProgress } from "@mui/material";
function MyAccount() {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormsFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });
    }
  }, [context?.userData]);

  const [formFields, setFormsFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accesstoken"); // match handleSubmit
    if (!token) {
      history("/");
    }
  }, [context?.isLogin, history]);

  const validateValue = Object.values(formFields).every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter yuor Full name");
      return;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter your email id");
      return;
    }
    if (formFields.mobile === "") {
      context.openAlertBox("error", "Please enter your mobile phone number");
      return;
    }
    const res = await editData(`/api/user/${userId}`, formFields, {
      withCredentials: true,
    });
    // console.log(res);
    if (res?.error !== true) {
      context.openAlertBox("success", res?.message);

      setFormsFields({
        name: "",
        email: "",
        mobile: "",
      });

      context.setIsLogin(true);
      setIsLoading(false);
    } else {
      context.openAlertBox("error", res?.message);
      setIsLoading(false);
    }

    // console.log(res);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormsFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <h2 className="pb-3">My Profile</h2>
            <hr />
            <form action="mt-5" onSubmit={handleSubmit}>
              <div className="flex items-center gap-5 ">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    type="text"
                    id="name"
                    name="name"
                    onChange={onChangeInput}
                    value={formFields.name}
                    disabled={isLoading === true ? true : false}
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    type="email"
                    id="email"
                    name="email"
                    onChange={onChangeInput}
                    value={formFields.email}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="flex items-center mt-4 gap-5 ">
                <div className="w-[50%]">
                  <TextField
                    label="Phone Number"
                    type="number"
                    id="mobile"
                    name="mobile"
                    onChange={onChangeInput}
                    value={formFields.mobile}
                    variant="outlined"
                    size="small"
                    className="w-full"
                    disabled={isLoading === true ? true : false}
                  />
                </div>
              </div>

              <br />
              <div className="flex items-center w-full mt-3 mb-3">
                <Button
                  type="submit"
                  disabled={!validateValue}
                  className="btn-org  btn-lg w-full flex gap-3 hover:!btn-org/75"
                >
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
