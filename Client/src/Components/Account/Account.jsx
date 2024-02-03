import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./Layout";

export default function Account() {
  return (
    <div id="AccountPage" className="d-flex justify-content-center align-items-center">
      <div className="p-3">
        <NavBar />
        <div></div>
      </div>
    </div>
  );
}
