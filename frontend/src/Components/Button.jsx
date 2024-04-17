const Button = ({ children }) => {
  return (
    <>
      <button className="btn bg-secondary px-16 my-4 md:my-8 ">{children}</button>
    </>
  );
};

export default Button;
