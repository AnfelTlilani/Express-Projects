import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/lib/data-fetching";
import { useState } from "react";
import AddUser from "../Users/AddUser";

function Doctors() {
  const [show, setShow] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data.length !== 0 ? (
        <div className="flex flex-col gap-2 overflow-y-auto h-96">
          {data.map((item: any, i: number) => (
            <div
              key={i}
              className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10"
            >
              <p>
                <span className="text-gray-300">Username: </span>
                {item.username.charAt(0).toUpperCase() + item.username.slice(1)}
              </p>
              <p>
                <span className="text-gray-300">Email: </span>
                {item.email}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          Aucun doctor trouvé
        </div>
      )}
      {!isLoading && (
        <button
          className="bg-primary hover:bg-primary/80 block w-fit mx-auto cursor-pointer text-white px-4 py-2 rounded-md mt-4"
          onClick={() => setShow(!show)}
        >
          Add
        </button>
      )}
      {show && <AddUser setShow={setShow} />}
    </div>
  );
}

export default Doctors;
