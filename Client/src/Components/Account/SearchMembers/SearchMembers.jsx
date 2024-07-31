import { useEffect, useState } from "react";

export default function SearchMembers() {
  const API_URL = import.meta.env.VITE_API_URL;
  const worker = new Worker("/src/Components/Account/SearchMembers/MembersWorker.js");

  const [Page, setPage] = useState(1);
  const [Members, setMembers] = useState([]);
  const [FriendRequests, setFriendRequests] = useState([]);

  const BtnStyle = {
    outline: "none",
    color: "white",
    fontWeight: "bold"
  }

  useEffect(() => {
    document.title = "Members Page";
    worker.postMessage({ message: "GetMembers", API_URL, data: Page });
    worker.postMessage({ message: "GetFriendRequests", API_URL });
  }, []);

  worker.onmessage = (e) => {
    try {
      const { message = null, result = null, err = null } = e.data;
      if (err) throw new Error(err);
      if (message === "Members") setMembers(result);
      else if (message === "FriendRequests") setFriendRequests(result);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div>
        <img src="/magnifying-glass-solid 1.svg" />
        <input type="text" placeholder="Search member" />
      </div>
      <div id="Members9832X" className="m-auto mt-3">
        {
          FriendRequests.length ?
            <div className="pb-3 mb-3" style={{ position: "relative" }}>
              <div>
                <p className="Members-Label FR_Content" style={{ color: "rgba(201, 94, 238, 0.8)" }}>Friend Requests</p>
              </div>
              <div>
                {
                  FriendRequests.map(ele => {
                    return (
                      <div key={ele._id} className="MembersCards py-3 px-4 my-2">
                        <div className="d-flex align-items-center">
                          <div> <img src={ele.Photo ? ele.Photo : '/download 1.png'} alt="" /> </div>
                          <p className="m-0">{ele.FirstName} {ele.LastName}</p>
                        </div>
                        <div>
                          <button 
                            className="btn btn-sm me-2" 
                            style={{ ...BtnStyle, background: "rgba(199, 189, 202, 1)" }}>
                              Cancel
                          </button>
                          <button 
                            className="btn btn-sm"
                            style={{ ...BtnStyle, background: "rgba(201, 94, 238, 1)" }}>
                            Accept
                          </button>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div> : null
        }
        {
          Members.length ?
            <div className="pb-3" style={{ position: "relative" }}>
              <div> <p className="Members-Label M_Content">Members</p> </div>
              <div>
                {
                  Members.map(ele => {
                    return (
                      <div key={ele._id} className="MembersCards py-3 px-4 my-2">
                        <div className="d-flex align-items-center">
                          <div> <img src={ele.Photo ? ele.Photo : '/download 1.png'} alt="" /> </div>
                          <p className="m-0">{ele.FirstName} {ele.LastName}</p>
                        </div>
                        <button
                          className="btn btn-sm"
                          style={{ ...BtnStyle, background: "rgba(201, 94, 238, 1)" }}>
                            Add a friend
                        </button>
                      </div>
                    );
                  })
                }
              </div>
            </div> : null
        }
      </div>
    </>
  )
}
