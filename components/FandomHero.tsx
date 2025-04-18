export default function FandomHero({ name }: { name: string }) {
  // Enhanced styling using theme colors and fonts
  return (
    <div className="mb-8 rounded-lg h-48 bg-gradient-to-r from-deep-purple via-cosmic-blue/80 to-neon-accent/60 
                    flex flex-col justify-end p-8 shadow-lg relative overflow-hidden">
      {/* Optional: Add a subtle background pattern or texture */}
      <div className="absolute inset-0 bg-black/20 opacity-50 mix-blend-overlay"></div> 
      
      <h1 className="text-5xl font-headline font-bold text-white drop-shadow-md z-10">
        {name}
      </h1>
      <p className="text-light-gray/80 text-sm mt-1 max-w-xl z-10">
        [Fandom description placeholder - fetch from data later]
      </p>
      {/* TODO: Add buttons like "Follow Fandom", "Create Work" */}
    </div>
  );
} 