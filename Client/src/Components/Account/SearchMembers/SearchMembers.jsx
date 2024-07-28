import { useEffect } from "react"

export default function SearchMembers() {
  const API_URL = import.meta.env.VITE_API_URL;
  const worker = new Worker("/src/Components/SearchMembers/AuthWorker.js");

  useEffect(() => {
    document.title = "Members Page";
    worker.postMessage({ message: "GetMembers", API_URL });
  }, []);

  // worker.onmessage = (e) => {
  //   try {
  //     const { message = null, result = null, err = null } = e.data;
  //     if (err) throw new Error(err);
  //     if (message === "ToAccount") {
  //       redirect(result);
  //     }
  //     else if (message === "Is authenticated") {
  //       if (result) redirect('/Account');
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <>
      <div>
        <img src="/magnifying-glass-solid 1.svg" />
        <input type="text" placeholder="Search member" />
      </div>
      <div></div>
      <div></div>
    </>
  )
}
