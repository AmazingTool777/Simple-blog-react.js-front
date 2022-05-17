const StepIndicators = ({ step = 1, width = 20, height = 20 }) => {
  const indicator2ClassName = `step-indicator bg-${step === 2 ? "primary" : "secondary"}`;
  const style = { width: `${width}px`, height: `${height}px`, borderRadius: "50%" };
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-center">
        <div style={style} className="step-indicator bg-primary me-3"></div>
        <div style={style} className={indicator2ClassName}></div>
      </div>
      <h6 className="text-primary text-center mt-2">
        {step === 1 && "Identity information"}
        {step === 2 && "Authentication credentials"}
      </h6>
    </div>
  );
};

export default StepIndicators;
