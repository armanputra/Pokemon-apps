import React from 'react';

interface AbilityCardProps {
  abilityName: string;
}

const AbilityCard: React.FC<AbilityCardProps> = ({ abilityName }) => {
  return (
    <div className="bg-white  rounded-md">
      <h2 className="text-lg font-semibold"></h2>
      <p> {abilityName}</p>
    </div>
  );
};

export default AbilityCard;
