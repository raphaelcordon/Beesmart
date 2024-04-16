const Button = ({ children }) => {
  return (
    <>
      <div>Button</div>
      <button className="btn rounded-none bg-primary px-16 ">{children}</button>
    </>
  );
};

export default Button;
