import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import googleIcon from "../assets/googleIcon.png";
import { useDispatch } from "react-redux";
import { signin } from "../actions/auth";
import { getUser } from "../actions/userProfile";

const initformData = { userEmail: "", userPassword: "" };

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initformData);
  const gooleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch({ type: "AUTH", data: { result, token } });
    navigate("/");
  };
  const gooleFailure = (err) => {
    console.log(err);
    console.log("Google Sign In was unsuccessful");
    toast.error("Google Sign In was unsuccessful");
  };
  const onChangeFuc = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmitFuc = async (e) => {
    e.preventDefault();
    try {
      let auth = await dispatch(signin(formData));
      // console.log(auth);
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
    <div className="min-w-[360px] bg-white">
      <ToastContainer />
      <div className="hero min-h-screen top-[3rem] ">
        <div className="flex-col justify-center hero-content lg:flex-row">
          <div className="text-center lg:text-left ">
            <h1 className="mb-3 text-5xl font-bold text-[#17252A]">
              Hello there
            </h1>
            <p className="mb-5 text-[#17252A]">
              Please take a few seconds to sign in or sign up
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl ">
            <form onSubmit={onSubmitFuc} className="card-body ">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-[#17252A]">Email</span>
                </label>
                <input
                  onChange={onChangeFuc}
                  name="userEmail"
                  id="email"
                  type="text"
                  placeholder="email"
                  className="input input-bordered bg-white border-2 border-[#D2D4D7]"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#17252A] ">Password</span>
                </label>
                <input
                  onChange={onChangeFuc}
                  name="userPassword"
                  id="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered bg-white border-2 border-[#D2D4D7]"
                />
                <label className="label">
                  <Link
                    to="/forgetpassword"
                    className="label-text-alt text-[#17252A]"
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="sumbit" className="btn btn-primary">
                  SIGN IN
                </button>
              </div>
              <div className="form-control  text-center hidden">
                <h2 className="font-bold text-[#17252A]">OR</h2>
              </div>
              <div className="form-control hidden">
                <GoogleLogin
                  clientId="266382544587-ka3jebk04sbh8vgtpagc9r9ks9cpb53e.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      className="btn btn-outline border-[#a991f7] hover:bg-white hover:text-black text-[#17252A]/90 flex justify-evenly"
                      disabled={renderProps.disabled}
                      onClick={renderProps.onClick}
                    >
                      SIGN IN WITH GOOGLE
                      <img src={googleIcon} className="w-[2rem]" />
                    </button>
                  )}
                  onSuccess={gooleSuccess}
                  onFailure={gooleFailure}
                  cookiePolicy="single_host_origin"
                />
              </div>

              <Link to="/SignUpPage" className="self-end mt-2">
                <p className="text-left text-[0.8rem]">
                  DON'T HAVE AN ACCOUNT? SIGN UP
                </p>
              </Link>
            </form>
          </div>
          <Link to="/" className="btn w-[7rem] rounded-3xl">
            GO BACK
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
