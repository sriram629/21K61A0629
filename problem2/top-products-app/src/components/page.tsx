import React from "react";

const Page: React.FC = () => (
  <div className="flex justify-center mt-4">
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
      Previous
    </button>
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2">
      Next
    </button>
  </div>
);

export default Page;
