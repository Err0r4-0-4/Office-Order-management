import React, { useState } from "react";

const Member = (props) => {

  const onScheduleHandler = () => {
    console.log(props.id);
  };

  return (
    <div onClick={() => props.setFamily(props.id)}>
        {props.id}
    </div>
  );
};

export default Member;