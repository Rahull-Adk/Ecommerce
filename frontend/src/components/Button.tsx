const Button = ({ text }: { text: string }) => {
  return (
    <button type="submit" className="bg-primary w-[22rem] h-10">
      {text}
    </button>
  );
};

export default Button;
