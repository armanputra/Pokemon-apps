import React from 'react';

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface StatsProps {
  stats: Stat[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const maxValue = 200;

  return (
    <div className="bg-white p-4 rounded-md hover:bg-white shadow-md transition duration-300 hover:scale-105">
  {stats.map((stat, index) => (
    <div key={index} className="flex flex-col ">
      <p>{stat.stat.name}</p>
      <div className="bg-gray-300 rounded-full h-1">
        <div
          className="bg-blue-500 h-full rounded-full transition-transform"
          style={{ width: `${(stat.base_stat / maxValue) * 100}%` }}
        ></div>
      </div>
      <p>{stat.base_stat}</p>
    </div>
  ))}
</div>

  );
};

export default Stats;
