import React from 'react';

interface MoveCardProps {
  moveName: string;
}

const MoveCard: React.FC<MoveCardProps> = ({ moveName }) => {
  return (
    <div className="bg-white  rounded-md ">
      <h2 className=" font-semibold font-press-start"></h2>
      <p> {moveName}</p>
    </div>
  );
};

export default MoveCard;
