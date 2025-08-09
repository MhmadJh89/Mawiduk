// import tru from "../../assets/images/true.png";
type Props = {
  onClose: () => void;
};

const SuccessPopup: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gray-900 text-white rounded-xl p-6 w-[360px] text-center">
        <img src="" alt="Success" className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Added Successfully</h3>
        <p className="text-sm text-gray-300 mb-4">
          You can now view and manage this service in your dashboard
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded"
        >
          <b>Close</b>
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
