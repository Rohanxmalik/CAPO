export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-primary animate-pulse" />
        <div className="size-2 rounded-full bg-primary animate-pulse [animation-delay:150ms]" />
        <div className="size-2 rounded-full bg-primary animate-pulse [animation-delay:300ms]" />
      </div>
    </div>
  );
}
