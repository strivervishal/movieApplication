import React from "react";

const Dropdown = ({ title, options, change }) => {
  // console.log(func);
  return (
    <div className="select ">
      <select onChange={change} defaultValue="0" name="format" id="format">
        <option value={0} disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option
            className="bg-[#dadada] text-zinc-600 text-sm "
            key={i}
            value={o}
          >
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
