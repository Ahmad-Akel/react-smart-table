"use client";

import { useState } from "react";
import Table from "./components/Table";
import { tableMockData } from "./utils/mockData";

const Home = () => {
  const [data, setData] = useState(tableMockData);

  const [isEditable, setIsEditable] = useState(false);

  const handleDataChange = (newData: any[]) => {
    setData(newData);
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">SSR Table Example</h1>
      <button
        onClick={() => setIsEditable(!isEditable)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isEditable ? "View Mode" : "Edit Mode"}
      </button>
      <Table
        data={data}
        isEditable={isEditable}
        onDataChange={handleDataChange}
      />
    </div>
  );
};

export default Home;
