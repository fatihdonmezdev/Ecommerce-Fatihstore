import React, { use, useEffect, useState } from "react";

const DashboardStats = ({ amount, name }) => {
  return (
    <div className={`block mt-8 max-w-[18rem] rounded-lg bg-slate-500`}>
      <div className="border-b-2 font-bold border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
        {name} Amount
      </div>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
          Current Amount of {name}
        </h5>
        <p className="text-3xl text-right text-black dark:text-neutral-50">
          {amount}
        </p>
      </div>
    </div>
  );
};

export default DashboardStats;
