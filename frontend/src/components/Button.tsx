const Button = ({ text }: { text: string }) => {
  return (
    <button type='submit' className='bg-primary w-[90%] h-10'>
      {text}
    </button>
  );
};

export default Button;
