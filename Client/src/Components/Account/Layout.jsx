import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div id="NavBar" className="col-2">
      <ul>
        <li>
          <Link to="/Account/:id">
            <img src="/Logo.svg" />
          </Link>
        </li>
        <li>
          <Link to="/Account/:id">
            <img src="/user-regular 1.svg" />
          </Link>
        </li>
        <li>
          <Link to="/Account/:id">
            <img src="/comments-regular 1.svg" />
          </Link>
        </li>
        <li>
          <Link to="/Account/:id">
            <img src="/bell-regular 1.svg" />
          </Link>
        </li>
        <li>
          <Link to="/Account/:id">
            <img src="/gear-solid 1.svg" />
          </Link>
        </li>
        <li>
          <Link to="/Account/:id">
            <img src="/download.jpeg" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
