const Stat = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col text-center gap-2">
      <span className="text-secondary_500  text-lg" onClick={() => {}}>
        {value}
      </span>
      <span className=" text-sm">{label}</span>
    </div>
  );
};
export const InfoWidget = () => {
  const stats = [
    {
      key: 'Recipes',
      value: 'N/A',
    },
    {
      key: 'Menus',
      value: 'N/A',
    },
    {
      key: 'Temp',
      value: 'N/A',
    },
  ];
  return (
    <div className="flex border-slate-400 border-2 rounded-xl p-4 justify-around items-center h-28">
      {stats.map(stat => (
        <Stat key={stat.key} label={stat.key} value={stat.value} />
      ))}
    </div>
  );
};
