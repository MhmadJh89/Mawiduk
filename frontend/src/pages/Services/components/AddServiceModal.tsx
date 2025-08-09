import React, { useState } from "react";
// import addphoto from "../../assets/images/addPhoto.png";
// import add from "../../assets/images/add-y.png";

type Props = {
  onClose: () => void;
  onSave: (data: FormData) => void;
};

const AddServiceModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState<File | null>(null);
  const [showInputs, setShowInputs] = useState(false);
  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", serviceName);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("status", status);
    if (image) {
      formData.append("image", image);
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-80 w-full h-full z-60 absolute"></div>
      <div className="bg-gray-800 text-white rounded-xl w-[500px] p-6 shadow-lg z-70">
        <h2 className="text-2xl font-bold mb-2 text-center">Add New Service</h2>
        <p className="text-sm text-gray-400 mb-4 text-center">
          Fill the details to add a new service
        </p>

        {/* زر الإضافة */}
        <img
          src=""
          onClick={() => setShowInputs(true)}
          alt="Add Icon"
          className="w-8 h-8 ml-auto mb-4 cursor-pointer"
        />

        {/* عرض صورة الخدمة */}
        <div className="bg-gray-700 p-4 rounded-xl flex justify-center items-center mb-4">
          <label
            className="flex flex-col items-center mx-5 cursor-pointer"
            onClick={() => setShowInputs(true)}
          >
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="hidden"
            />
            <div className="bg-gray-700 p-3 rounded-xl text-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-40 h-30 object-cover rounded"
                />
              ) : (
                <img src="" alt="Add Photo" className="w-40 h-30 mb-2" />
              )}
            </div>
          </label>

          <div className="text-sm space-y-1 text-right">
            <div>Service Name: ........</div>
            <div>Price: .......$</div>
            <div>Duration: ... Min</div>
            <div>Status: ........</div>
          </div>
        </div>

        {/* المدخلات تظهر بعد الضغط */}
        {showInputs && (
          <div className="space-y-3 mb-4 transition-opacity duration-300">
            <input
              type="text"
              placeholder="Service Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full p-2 bg-gray-300 border border-gray-400 rounded text-black"
            />
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 bg-gray-300 rounded border-gray-400 text-black"
            />
            <input
              type="text"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 bg-gray-300 rounded border-gray-400 text-black"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 bg-gray-300 rounded border-gray-400 text-black"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        )}

        {/* أزرار */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-10 py-2 mx-5 bg-white hover:bg-gray-200 text-black rounded-3xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-10 py-2 mx-4 bg-yellow-500 hover:bg-yellow-600 text-black rounded-3xl"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
