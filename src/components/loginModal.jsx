import React, { useState } from "react";
import { setMovies } from "../store/feature/moviesSlice";
import { login } from "../store/feature/userSlice";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";

const SECRET_KEY = "your-secret-key";

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handleLogin = async (userData) => {
    // Check if user data exists in local storage
    const savedUserData = localStorage.getItem(userData.username);
    if (savedUserData) {
      const parsedUserData = decryptData(savedUserData);
      dispatch(login(parsedUserData));
      dispatch(setMovies(parsedUserData.movies || []));
    } else {
      // Save new user data to local storage on login
      const newUserData = { ...userData, movies: [] };
      localStorage.setItem(userData.username, encryptData(newUserData));
      dispatch(login(newUserData));
      dispatch(setMovies([]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform authentication
    const userData = { username, password };
    handleLogin(userData);
    setUsername("");
    setPassword("");
    alert("Login Successfully!!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="p-4">
          {/* {children} */}
          <div class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div class="w-full">
              <div class="m-2 my-10 max-w-[400px] mx-auto">
                <div class="mb-4">
                  <h1 class="mb-4 text-3xl font-extrabold">Sign In</h1>
                </div>
                <div class="">
                  <form class="flex flex-col py-8 justify-evenly gap-6 ">
                    <input
                      class="h-8 p-2"
                      type="email"
                      placeholder="Email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </form>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    class="p-3 bg-black my-2 rounded-full text-white w-full font-semibold"
                  >
                    Login
                  </button>
                  <button
                    onClick={onClose}
                    class="p-3 bg-white border rounded-full w-full font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
