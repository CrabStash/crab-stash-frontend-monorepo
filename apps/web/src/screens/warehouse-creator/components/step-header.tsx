interface StepHeaderProps {
  title: string;
  description: string;
}
function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="space-y-2 text-center mt-4">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
      <p className="text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}

export default StepHeader;
