import React, { useState } from "react";

const Member = (props) => {

  const onScheduleHandler = () => {
    console.log(props.id);
  };

  return (
    <div onClick={() => props.setFamily(props.name, props.id)}>
        {props.name}
    </div>
  );
};

export default Member;