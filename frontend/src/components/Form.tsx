export const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[30rem] h-screen sm:h-[35rem] md:rounded-md space-y-4 flex flex-col justify-center items-center bg-secondary text-white">
        {children}
      </div>
    </div>
  );
};
