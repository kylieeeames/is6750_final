const Wrapper = ({children, classNames}) => {
  return (
    <div className={classNames}>
     {children}
    </div>
  );
};

export default Wrapper;
