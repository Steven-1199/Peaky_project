import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import googleIcon from "../assets/googleIcon.png";
import { useDispatch } from "react-redux";
import { signup } from "../actions/auth";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../actions/userProfile";

const initformData = { userName: "", userEmail: "", userPassword: "" };

function SignUpPage() {
  const [formData, setFormData] = useState(initformData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeFuc = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitFucc = async (e) => {
    e.preventDefault();
    try {
      let auth = await dispatch(signup(formData));
      if (auth) {
        dispatch(getUser(auth.result._id));

        navigate("/");
      } else {
        toast.error("Something's wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-w-[360px]">
      <ToastContainer />
      <div className="hero min-h-screen bg-base-200">
        <div className="flex-col justify-center hero-content lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Please take a few seconds to sign in or sign up
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={onSubmitFucc}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  onChange={onChangeFuc}
                  name="userName"
                  type="text"
                  placeholder="user name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={onChangeFuc}
                  name="userEmail"
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={onChangeFuc}
                  name="userPassword"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  SIGN UP
                </button>
              </div>
              <div className="form-control text-center hidden">
                <h2 className="font-bold">OR</h2>
              </div>
              <div className="form-control hidden">
                <Link
                  to="/SignUpPage"
                  className="btn btn-outline border-[#a991f7] hover:bg-white hover:text-black text-[#17252A]/90"
                >
                  SIGN UP WITH GOOGLE
                </Link>
              </div>
            </form>
          </div>
          <Link to="/SignInPage" className="btn w-[7rem] rounded-3xl">
            GO BACK
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
