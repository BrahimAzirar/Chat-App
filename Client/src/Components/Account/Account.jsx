import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Layout";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const AuthWorker = new Worker("/src/Components/Auth/AuthWorker.js");
  const API_URL = import.meta.env.VITE_API_URL;
  const redirect = useNavigate();

  useEffect(() => {
    document.title = "Account Page";
    AuthWorker.postMessage({ message: "IsAuth", API_URL });
  }, []);

  AuthWorker.onmessage = (e) => {
    try {
      const { message = null, result = null, err = null } = e.data;
      if (err) throw new Error(err);
      if (message === "Is authenticated") {
        if (!result) redirect('/');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div id="AccountPage" className="d-flex justify-content-center align-items-center">
      <div className="row">
        <NavBar />
        <div></div>
      </div>
    </div>
  );
}
