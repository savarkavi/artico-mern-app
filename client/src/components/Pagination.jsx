/* eslint-disable react/prop-types */
import { UilAngleLeftB, UilAngleRightB } from "@iconscout/react-unicons";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handleCurrentPageChange = (btn) => {
    if (currentPage === 1 && btn === "prev") {
      return;
    }

    if (currentPage === totalPages && btn === "next") {
      return;
    }

    if (btn === "prev") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return setCurrentPage((prev) => prev - 1);
    }

    if (btn === "next") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return setCurrentPage((prev) => prev + 1);
    }
  };

  if (totalPages === 0) return;

  return (
    <div className="flex items-center justify-between lg:px-12 my-12 text-white w-full">
      <div
        className={`flex items-center ${
          currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => handleCurrentPageChange("prev")}
      >
        <UilAngleLeftB className="w-8 h-8" />
        <span className="text-sm lg:text-lg">Prev Page</span>
      </div>
      <p className="text-white text-sm lg:text-lg">{`Page ${currentPage} of ${totalPages}`}</p>
      <div
        className={`flex items-center ${
          currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => handleCurrentPageChange("next")}
      >
        <span className="text-sm lg:text-lg">Next Page</span>
        <UilAngleRightB className="w-8 h-8" />
      </div>
    </div>
  );
};

export default Pagination;
