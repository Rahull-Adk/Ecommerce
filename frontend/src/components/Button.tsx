const Button = ({ text }: { text: string }) => {
  return (
    <button type="submit" className="bg-primary w-[22rem] py-3 mt-4 rounded-md">
      {text}
    </button>
  );
};

export default Button;
