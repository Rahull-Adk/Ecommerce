export const FormContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[26rem] max-sm:w-full h-screen sm:h-full md:rounded-md flex flex-col justify-center items-center bg-darkmode_support_primary text-white">
        {children}
      </div>
    </div>
  );
};
