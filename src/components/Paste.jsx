import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search input */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Pastes section */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-2xl sm:text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Pastes
          </h2>

          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-[rgba(128,121,121,0.3)] w-full flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 sm:justify-between p-3 sm:p-4 rounded-[0.3rem]"
                >
                  {/* Title and content */}
                  <div className="w-full sm:w-[50%] flex flex-col space-y-3">
                    <p className="text-2xl sm:text-4xl font-semibold">
                      {paste?.title}
                    </p>
                    <p className="text-sm font-normal line-clamp-3 max-w-full sm:max-w-[80%] text-[#707070]">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end w-full sm:w-auto">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      {/* Edit */}
                      <button className="p-2 rounded bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500">
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                          />
                        </a>
                      </button>

                      {/* Delete */}
                      <button
                        className="p-2 rounded bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>

                      {/* View */}
                      <button className="p-2 rounded bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500">
                        <a
                          href={`/pastes/${paste?._id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </a>
                      </button>

                      {/* Copy */}
                      <button
                        className="p-2 rounded bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                    </div>

                    {/* Date */}
                    <div className="gap-x-2 flex">
                      <Calendar className="text-black" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-red-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
