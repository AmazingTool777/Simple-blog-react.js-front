import Toast from "react-bootstrap/Toast";
import ProgressBar from "react-bootstrap/ProgressBar";

const UploadToast = ({ show = false, percentage = 0 }) => {
  if (!show) return null;
  return (
    <Toast style={{ position: "fixed", bottom: "1rem", right: "1rem" }}>
      <Toast.Header>Upload status:</Toast.Header>
      <Toast.Body>
        <div>
          <ProgressBar striped animated now={percentage} />
        </div>
        <p className="text-center text-primary mb-1">{percentage}%</p>
        <div className="text-center text-muted">
          {percentage < 100 ? "Uploading the post" : "Finishing the upload"} ...
        </div>
      </Toast.Body>
    </Toast>
  );
};

export default UploadToast;
