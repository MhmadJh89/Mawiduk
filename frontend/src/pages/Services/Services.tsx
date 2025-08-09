import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import i18n from "i18next";
import AddServiceModal from "./components/AddServiceModal";
import CreateIcon from "@mui/icons-material/Create";
import EditServiceModal from "./components/EditServiceModal";
import SuccessPopup from "./components/SuccessPopup";
// Import service images
import servicePic from "../../assets/images/service.jpg";
import Button from "../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeServices } from "../../redux/Services/slices/getEmpolyeeServices";
import { type RootState, type AppDispatch } from "../../redux/store";
import type { EmployeeService } from "../../redux/Services/slices/getEmpolyeeServices";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const { t } = useTranslation("Dashboard");
  const isArabic = i18n.language === "ar";
  const employeeServicesSelector = useSelector<RootState, EmployeeService[]>(
    (state) => state.employeeServices.data
  );
  const navigate = useNavigate();

  const [employeeServices, setEmployeeServices] = useState<EmployeeService[]>(
    []
  );
  useEffect(() => {
    setEmployeeServices(employeeServicesSelector);
  }, [employeeServicesSelector]);

  const [filterStatus, setFilterStatus] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [filterBy, setFilterBy] = useState<keyof EmployeeService>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentService, setCurrentService] = useState<EmployeeService | null>(
    null
  );

  const toggleServiceSelection = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const sortedAndFilteredServices = [...employeeServices]
    .filter((service) => {
      const availability = service.is_available ? "Active" : "Inactive";
      return filterStatus === "All" || availability === filterStatus;
    })
    .sort((a, b) => {
      const aVal = a[filterBy];
      const bVal = b[filterBy];

      if (filterBy === "price") {
        const aNum = typeof aVal === "string" ? parseFloat(aVal) : Number(aVal);
        const bNum = typeof bVal === "string" ? parseFloat(bVal) : Number(bVal);
        return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

  const handleDeleteSelected = () => {
    const updated = services.filter(
      (service) => !selectedServices.includes(service.id)
    );
    setServices(updated);
    setSelectedServices([]);
  };

  const handleEditService = (service: EmployeeService) => {
    setCurrentService(service);
    setShowEditModal(true);
  };

  const handleUpdateService = (formData: FormData) => {
    if (!currentService) return;

    const imageFile = formData.get("image") as File;
    let imageUrl = currentService.image;

    if (imageFile.size > 0) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    const updatedService: Service = {
      ...currentService,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: `${formData.get("price")}$`,
      category: formData.get("category") as string,
      duration: formData.get("duration") as string,
      status: formData.get("status") as "Active" | "Inactive",
      image: imageUrl,
    };

    setServices(
      services.map((service) =>
        service.id === currentService.id ? updatedService : service
      )
    );

    setShowSuccess(true);
    setShowEditModal(false);
    setCurrentService(null);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter((service) => service.id !== id));
  };
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchEmployeeServices());
  }, [dispatch]);
  return (
    <div
      className={`min-h-screen text-white p-4 md:p-8 spec-container ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      <div
        className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 ${
          isArabic ? "md:flex-row-reverse" : ""
        }`}
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-5">
            {t("servicesTitle")}
          </h1>
          <p>
            Today's date:{" "}
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long", // Monday
              day: "numeric", // 9
              month: "long", // July
            })}
          </p>
        </div>
        <div>
          <Button
            newStyles="bg-sec text-black"
            onClick={() => {
              navigate("/my_schedual");
            }}
          >
            My Schedual
          </Button>
        </div>
      </div>

      {/* Edit Service Modal */}
      {showEditModal && currentService && (
        <EditServiceModal
          service={currentService}
          onClose={() => {
            setShowEditModal(false);
            setCurrentService(null);
          }}
          onSave={handleUpdateService}
        />
      )}

      {/* Success Popup */}
      {showSuccess && (
        <SuccessPopup
          onClose={() => setShowSuccess(false)}
          message={t("operationSuccess")}
        />
      )}

      <hr className="mt-8 mb-3 border-gray-700" />

      <div
        className={`mb-4 flex flex-wrap items-center gap-4 ${
          isArabic ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex gap-4 max-lg:flex-wrap max-lg:justify-center max-lg:gap-1${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <select
            value={filterBy}
            onChange={(e) =>
              setFilterBy(e.target.value as keyof EmployeeService)
            }
            className="bg-gray-800 text-white px-4 max-lg:px-2 py-2 rounded-md border border-gray-700"
          >
            <option value="name">{t("filterByName")}</option>
            <option value="price">{t("filterByPrice")}</option>
            <option value="category">{t("filterByCategory")}</option>
            <option value="is_available">{t("filterByStatus")}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as "All" | "Active" | "Inactive")
            }
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700"
          >
            <option value="All">{t("allStatus")}</option>
            <option value="Active">{t("services.active")}</option>
            <option value="Inactive">{t("services.inactive")}</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="bg-gray-800 text-yellow-400 px-4 py-2 rounded-md hover:bg-gray-700"
          >
            {t(sortOrder === "asc" ? "sortAsc" : "sortDesc")}
          </button>
        </div>

        {selectedServices.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className={`text-yellow-400 hover:text-yellow-500 text-xl ${
              isArabic ? "mr-auto" : "ml-auto"
            }`}
            title={t("deleteSelected")}
          >
            <DeleteIcon />
          </button>
        )}
      </div>
      <div className="w-full flex justify-center">
        <div
          className={`max-w-[1200px] max-sm:w-full  justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 ${
            isArabic ? "justify-end" : "justify-start"
          }`}
        >
          {sortedAndFilteredServices.map((item) => {
            return (
              <div
                key={item.id}
                className={`bg-card w-[270px] h-[340px] mx-auto rounded-3xl overflow-hidden hover:bg-gray-750 transition-colors duration-200 shadow-lg flex flex-col`}
              >
                {/* Service Image */}
                <div className="h-[160px] py-2 px-2 flex justify-center items-center overflow-hidden bg-gray-700">
                  <img
                    src={item.image || servicePic}
                    alt=""
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col justify-between items-center text-center flex-1">
                  <h2 className="text-white font-semibold text-xl mb-1">
                    {item.service.name}
                  </h2>

                  <div className="text-sm space-y-1 w-full">
                    <div className="flex justify-center gap-1">
                      <span className="text-white">{t("services.price")}:</span>
                      <span className="text-white">{item.price}$</span>
                    </div>
                    <div className="flex justify-center gap-1">
                      <span className="text-white">
                        {t("services.duration")}:
                      </span>
                      <span className="text-white">
                        {item.expected_duration}
                      </span>
                    </div>
                    <div className="flex justify-center gap-1">
                      <span className="text-white">
                        {t("services.status")}:
                      </span>
                      <span
                        className={`px-2 rounded text-md font-medium ${
                          item.is_available ? "text-yellow-400" : "text-red-600"
                        }`}
                      >
                        {item.is_available
                          ? t("services.active")
                          : t("services.inactive")}
                      </span>
                    </div>
                  </div>

                  {/* Edit/Delete */}
                  <div
                    className={`flex justify-center gap-3 mt-4 ${
                      isArabic ? "flex-row-reverse" : ""
                    }`}
                  >
                    <button
                      className="p-2 hover:bg-gray-600 rounded transition-colors"
                      title={t("services.edit")}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditService(item);
                      }}
                    >
                      <CreateIcon />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-600 rounded transition-colors"
                      title={t("services.delete")}
                      onClick={() => handleDeleteService(item.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
