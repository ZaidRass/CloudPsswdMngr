import React from "react";
import {Input} from "@nextui-org/react";

const MailInput = ({value,onChange})=> {
  const radius = [
    "lg"
  ];

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
      {radius.map((r) => (
        <Input
          key={r}
          radius={r}
          type="email"
          label="Email"
          value={value}
          onChange={onChange}
          placeholder="Enter your email"
          className="max-w-[220px]"
        />
      ))}
    </div>
  );
}


export default MailInput;