import "./ProgressBar.scss";

const ProgressBar = (props) => {
  const { completed } = props;

  const fillerStyles = {
    width: `${completed}%`,
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar__filler" style={fillerStyles}></div>
    </div>
  );
};

export default ProgressBar;
