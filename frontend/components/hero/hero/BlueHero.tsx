import { HomeParticles } from 'components/particles/home-particles/HomeParticles';

const BlueHero = ({
  size = 'lg',
  glow,
  particles,
}: {
  glow?: boolean;
  particles?: boolean;
  size: 'sm' | 'lg';
}) => {
  return (
    <div
      className={`bg-[#1C2534] w-full ${
        size === 'lg' ? 'h-[30rem]' : 'h-[25rem]'
      } absolute top-0 left-0 overflow-hidden `}
    >
      {glow && (
        <>
          <div className="h-[30rem] w-[30rem] rounded-full bg-primary_300/30 blur-[6rem] absolute left-[-14rem] top-[-14rem]" />
          <div className="h-[30rem] w-[30rem] rounded-full bg-primary_200/60 blur-[8rem] absolute right-[-20rem] bottom-[-20rem]" />
          <div className="h-[30rem] w-[30rem] rounded-full bg-[#FFB572]/30 blur-[10rem] absolute left-[60%] top-[-24rem]" />
        </>
      )}
      {particles && <HomeParticles />}
    </div>
  );
};

export default BlueHero;
