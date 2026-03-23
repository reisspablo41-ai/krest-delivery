'use client';
import ButtonBig from '@/app/Components/ButtonBig';
import MessageLog from './MessageLog';
import { useEffect, useState } from 'react';
import { SlClose } from 'react-icons/sl';
import {
  updateStatusShipment,
  createNewActivity,
  uploadImage,
} from '@/app/api/supabaseapi';
import { triggerShipmentNotifications } from '@/app/api/notificationUtility';
import { supabase } from '@/app/supabaseClient';

function EditStatusForm({
  editStatusOpen,
  setStatusMenuOpen,
  activeShipment,
  statuses,
}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    percentage: '',
    status_id: 0,
  });

  useEffect(() => {
    if (activeShipment) {
      setFormData({
        percentage: activeShipment.percentage || 0,
        status_id: (typeof activeShipment.status_id === 'object' ? activeShipment.status_id?.status_id : activeShipment.status_id) || '',
      });
      setImagePreview(activeShipment.image_url || null);
    }
  }, [activeShipment]);

  const handleInputChange = (e) => {
    const { name, value, tagName } = e.target; // Get tagName to identify the type of element

    // Check if the field name contains dot notation for nested fields
    if (name.includes('.')) {
      const keys = name.split('.'); // Split the name into parts (e.g., ['shipment_pet_id', 'name'])

      setFormData((prev) => {
        // Create a deep copy of the previous state to prevent mutation
        const updatedFormData = { ...prev };
        let current = updatedFormData;

        // Iterate through all keys except the last one to navigate the nested object
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          current[key] = current[key] || {}; // Initialize the object if it doesn't exist
          current = current[key];
        }

        // Set the value of the final key, converting if it's a select
        current[keys[keys.length - 1]] =
          tagName === 'SELECT' ? Number(value) : value;

        return updatedFormData;
      });
    } else {
      // Handle flat fields
      setFormData((prev) => ({
        ...prev,
        [name]: tagName === 'SELECT' ? Number(value) : value, // Convert to number only for select
      }));
    }

    // Clear any previous error/success message when user types
    setErrMessage('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const testUpdateShipment = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setErrMessage('');
    setSuccessMessage('');

    try {
      let imageUrl = null;
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${activeShipment.trackingnumber}-${Date.now()}.${fileExt}`;
        const filePath = `shipments/${fileName}`;
        const { data: uploadData, error: uploadError } = await uploadImage(selectedImage, filePath);
        if (uploadError) throw uploadError;
        imageUrl = uploadData.image_url;
      }

      const toNum = (val) => {
        const n = Number(val);
        return isNaN(n) || val === '' ? null : n;
      };

      // Step 1: Update the shipment status
      const { error: updateError } = await updateStatusShipment(
        activeShipment.shipment_id,
        {
          percentage: toNum(formData.percentage),
          status_id: toNum(formData.status_id),
        }
      );

      if (updateError) throw updateError;

      // Step 2: Create an activity record for the status change
      await createNewActivity({
        trackingNumber: activeShipment.trackingnumber,
        packageStatus: formData.status_id,
        presentAddress: activeShipment.present_address || 'Warehouse',
        time: new Date().toISOString(),
        imageUrl: imageUrl,
      });

      setSuccessMessage('Shipment was successfully updated');
      triggerShipmentNotifications(activeShipment.shipment_id);
      setTimeout(() => setStatusMenuOpen(false), 1500);
    } catch (error) {
      console.error('Update error:', error);
      console.error('Error details:', error?.message, error?.details, error?.hint);
      setErrMessage(`Failed to update shipment status: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };
  // Separate handlers for select fields (updating the value as the user selects)

  const handlePackageStatusUpdate = (e) => {
    setPackageStatus(e.target.value);
    handleInputChange(e);
  };

  console.log(successMessage);

  // Fetch countries for the dropdown

  return editStatusOpen ? (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen py-10 px-4 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Header Section */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Update Shipment Progress
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Modify completion percentage and current status
              </p>
            </div>
            <button
              onClick={() => setStatusMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <SlClose className="text-2xl" />
            </button>
          </div>

          {errMessage ? (
            <MessageLog
              message={errMessage}
              setMessage={setErrMessage}
              value={false}
            />
          ) : (
            <MessageLog
              message={successMessage}
              setMessage={setSuccessMessage}
              value={true}
            />
          )}

          <div className="p-8">
            <form className="space-y-8">
              {/* Progress & Status Section */}
              <div className="bg-gray-50/50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-6">
                <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                  Status Details
                </h3>
                <div className="w-full flex md:flex-row xs:flex-col justify-between gap-6">
                  <div className="flex flex-col md:w-1/2 xs:w-full">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      Progress in Percentage <span className="text-accent">*</span>
                    </label>
                    <input
                      name="percentage"
                      id="percentage"
                      placeholder="Total Progress (%)"
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all shadow-sm"
                      value={formData.percentage}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col md:w-1/2 xs:w-full">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      Package Status <span className="text-accent">*</span>
                    </label>
                    <select
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all shadow-sm appearance-none"
                      onChange={handlePackageStatusUpdate}
                      value={formData.status_id}
                      name="status_id"
                    >
                      {statuses.map((status) => (
                        <option key={status.status_id} value={status.status_id}>
                          {status.status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Activity Image Section */}
              <div className="bg-gray-50/50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                  Activity Photo (Optional)
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-all cursor-pointer"
                  />
                </div>
              </div>

              {errMessage ? (
                <MessageLog
                  message={errMessage}
                  setMessage={setErrMessage}
                  value={false}
                />
              ) : (
                <MessageLog
                  message={successMessage}
                  setMessage={setSuccessMessage}
                  value={true}
                />
              )}

              <div className="pt-6 border-t border-gray-100 flex gap-4 pr-1 mt-10">
                <ButtonBig
                  type="button"
                  className="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl shadow-sm transition-all duration-200 w-1/4 flex justify-center shrink-0"
                  onClick={() => setStatusMenuOpen(false)}
                >
                  Cancel
                </ButtonBig>
                <ButtonBig
                  type="button"
                  className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-lg shadow-accent/20 transition-all duration-200 w-3/4 flex justify-center"
                  onClick={(e) => testUpdateShipment(e)}
                  disabled={isUploading}
                >
                  {isUploading ? 'Saving...' : 'Save Changes'}
                </ButtonBig>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default EditStatusForm;
