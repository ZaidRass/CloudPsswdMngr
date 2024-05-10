import React from "react";
import {Input} from "@nextui-org/react";

const PlatformInput = ({value,onChange})=> {
  const radius = [
    "lg"
  ];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {radius.map((r) => (
        <Input
          key={r}
          radius={r}
          type="Platform"
          label="Platform"
          value={value}
          onChange={onChange}
          placeholder="Enter Platform here"
          className="max-w-[220px]"
        />
      ))}
    </div>
  );
}


export default PlatformInput;