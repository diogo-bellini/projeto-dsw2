export function Button({ children, className, ...props }) {
  return (
    <button
      className={`bg-[#C9A227] rounded-full w-fit py-[10px] px-6 
        hover:bg-[#B8931C] hover:border hover:border-b-neutral-50 
        hover:border-solid text-white cursor-pointer transition-all 
        ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
