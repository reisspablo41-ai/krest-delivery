'use client';
import {
  createNewActivity,
  createNewShipment,
  fetchTrackingNumber,
  updateStatusShipment,
  addNewUser,
  uploadImage,
} from '@/app/api/supabaseapi';
import ButtonBig from '@/app/Components/ButtonBig';
import { useEffect, useState } from 'react';
import MessageLog from './MessageLog';
import { SlClose } from 'react-icons/sl';
import { revalidateDashboard } from '@/app/actions/revalidation';
import { TbRefresh } from 'react-icons/tb';
import { supabase } from '@/app/supabaseClient';
import { useRouter } from 'next/navigation';

function generateTrackingNumber() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'AM';
  for (let i = 0; i < 9; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result + '-LZ';
}

function CreateShipmentForm({
  transittimes,
  transitError,
  allPackageType,
  packageError,
  statuses
}) {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [originSelectedCountry, setOriginSelectedCountry] = useState('');
  const [destinationSelectedCountry, setdestinationSelectedCountry] =
    useState('');
  const [packageStatus, setPackageStatus] = useState(statuses?.[0]?.status_id || '');
  const [statusesList, setStatusesList] = useState(statuses || []);
  const [shippingType, setShippingType] = useState(1);
  const [packageType, setPackageType] = useState(1);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [transitTimes, setTransitTimes] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [shipmentType, setShipmentType] = useState('1');
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(() => generateTrackingNumber());
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);



  useEffect(() => {
    // Static country list — no external API dependency
    const COUNTRIES = [
      { name: 'Afghanistan', code: 'AF' }, { name: 'Albania', code: 'AL' }, { name: 'Algeria', code: 'DZ' },
      { name: 'Andorra', code: 'AD' }, { name: 'Angola', code: 'AO' }, { name: 'Antigua and Barbuda', code: 'AG' },
      { name: 'Argentina', code: 'AR' }, { name: 'Armenia', code: 'AM' }, { name: 'Australia', code: 'AU' },
      { name: 'Austria', code: 'AT' }, { name: 'Azerbaijan', code: 'AZ' }, { name: 'Bahamas', code: 'BS' },
      { name: 'Bahrain', code: 'BH' }, { name: 'Bangladesh', code: 'BD' }, { name: 'Barbados', code: 'BB' },
      { name: 'Belarus', code: 'BY' }, { name: 'Belgium', code: 'BE' }, { name: 'Belize', code: 'BZ' },
      { name: 'Benin', code: 'BJ' }, { name: 'Bhutan', code: 'BT' }, { name: 'Bolivia', code: 'BO' },
      { name: 'Bosnia and Herzegovina', code: 'BA' }, { name: 'Botswana', code: 'BW' }, { name: 'Brazil', code: 'BR' },
      { name: 'Brunei', code: 'BN' }, { name: 'Bulgaria', code: 'BG' }, { name: 'Burkina Faso', code: 'BF' },
      { name: 'Burundi', code: 'BI' }, { name: 'Cabo Verde', code: 'CV' }, { name: 'Cambodia', code: 'KH' },
      { name: 'Cameroon', code: 'CM' }, { name: 'Canada', code: 'CA' }, { name: 'Central African Republic', code: 'CF' },
      { name: 'Chad', code: 'TD' }, { name: 'Chile', code: 'CL' }, { name: 'China', code: 'CN' },
      { name: 'Colombia', code: 'CO' }, { name: 'Comoros', code: 'KM' }, { name: 'Congo', code: 'CG' },
      { name: 'Costa Rica', code: 'CR' }, { name: 'Croatia', code: 'HR' }, { name: 'Cuba', code: 'CU' },
      { name: 'Cyprus', code: 'CY' }, { name: 'Czech Republic', code: 'CZ' }, { name: 'Denmark', code: 'DK' },
      { name: 'Djibouti', code: 'DJ' }, { name: 'Dominica', code: 'DM' }, { name: 'Dominican Republic', code: 'DO' },
      { name: 'Ecuador', code: 'EC' }, { name: 'Egypt', code: 'EG' }, { name: 'El Salvador', code: 'SV' },
      { name: 'Equatorial Guinea', code: 'GQ' }, { name: 'Eritrea', code: 'ER' }, { name: 'Estonia', code: 'EE' },
      { name: 'Eswatini', code: 'SZ' }, { name: 'Ethiopia', code: 'ET' }, { name: 'Fiji', code: 'FJ' },
      { name: 'Finland', code: 'FI' }, { name: 'France', code: 'FR' }, { name: 'Gabon', code: 'GA' },
      { name: 'Gambia', code: 'GM' }, { name: 'Georgia', code: 'GE' }, { name: 'Germany', code: 'DE' },
      { name: 'Ghana', code: 'GH' }, { name: 'Greece', code: 'GR' }, { name: 'Grenada', code: 'GD' },
      { name: 'Guatemala', code: 'GT' }, { name: 'Guinea', code: 'GN' }, { name: 'Guinea-Bissau', code: 'GW' },
      { name: 'Guyana', code: 'GY' }, { name: 'Haiti', code: 'HT' }, { name: 'Honduras', code: 'HN' },
      { name: 'Hungary', code: 'HU' }, { name: 'Iceland', code: 'IS' }, { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' }, { name: 'Iran', code: 'IR' }, { name: 'Iraq', code: 'IQ' },
      { name: 'Ireland', code: 'IE' }, { name: 'Israel', code: 'IL' }, { name: 'Italy', code: 'IT' },
      { name: 'Jamaica', code: 'JM' }, { name: 'Japan', code: 'JP' }, { name: 'Jordan', code: 'JO' },
      { name: 'Kazakhstan', code: 'KZ' }, { name: 'Kenya', code: 'KE' }, { name: 'Kiribati', code: 'KI' },
      { name: 'Kuwait', code: 'KW' }, { name: 'Kyrgyzstan', code: 'KG' }, { name: 'Laos', code: 'LA' },
      { name: 'Latvia', code: 'LV' }, { name: 'Lebanon', code: 'LB' }, { name: 'Lesotho', code: 'LS' },
      { name: 'Liberia', code: 'LR' }, { name: 'Libya', code: 'LY' }, { name: 'Liechtenstein', code: 'LI' },
      { name: 'Lithuania', code: 'LT' }, { name: 'Luxembourg', code: 'LU' }, { name: 'Madagascar', code: 'MG' },
      { name: 'Malawi', code: 'MW' }, { name: 'Malaysia', code: 'MY' }, { name: 'Maldives', code: 'MV' },
      { name: 'Mali', code: 'ML' }, { name: 'Malta', code: 'MT' }, { name: 'Marshall Islands', code: 'MH' },
      { name: 'Mauritania', code: 'MR' }, { name: 'Mauritius', code: 'MU' }, { name: 'Mexico', code: 'MX' },
      { name: 'Micronesia', code: 'FM' }, { name: 'Moldova', code: 'MD' }, { name: 'Monaco', code: 'MC' },
      { name: 'Mongolia', code: 'MN' }, { name: 'Montenegro', code: 'ME' }, { name: 'Morocco', code: 'MA' },
      { name: 'Mozambique', code: 'MZ' }, { name: 'Myanmar', code: 'MM' }, { name: 'Namibia', code: 'NA' },
      { name: 'Nauru', code: 'NR' }, { name: 'Nepal', code: 'NP' }, { name: 'Netherlands', code: 'NL' },
      { name: 'New Zealand', code: 'NZ' }, { name: 'Nicaragua', code: 'NI' }, { name: 'Niger', code: 'NE' },
      { name: 'Nigeria', code: 'NG' }, { name: 'North Korea', code: 'KP' }, { name: 'North Macedonia', code: 'MK' },
      { name: 'Norway', code: 'NO' }, { name: 'Oman', code: 'OM' }, { name: 'Pakistan', code: 'PK' },
      { name: 'Palau', code: 'PW' }, { name: 'Palestine', code: 'PS' }, { name: 'Panama', code: 'PA' },
      { name: 'Papua New Guinea', code: 'PG' }, { name: 'Paraguay', code: 'PY' }, { name: 'Peru', code: 'PE' },
      { name: 'Philippines', code: 'PH' }, { name: 'Poland', code: 'PL' }, { name: 'Portugal', code: 'PT' },
      { name: 'Qatar', code: 'QA' }, { name: 'Romania', code: 'RO' }, { name: 'Russia', code: 'RU' },
      { name: 'Rwanda', code: 'RW' }, { name: 'Saint Kitts and Nevis', code: 'KN' }, { name: 'Saint Lucia', code: 'LC' },
      { name: 'Saint Vincent and the Grenadines', code: 'VC' }, { name: 'Samoa', code: 'WS' }, { name: 'San Marino', code: 'SM' },
      { name: 'Sao Tome and Principe', code: 'ST' }, { name: 'Saudi Arabia', code: 'SA' }, { name: 'Senegal', code: 'SN' },
      { name: 'Serbia', code: 'RS' }, { name: 'Seychelles', code: 'SC' }, { name: 'Sierra Leone', code: 'SL' },
      { name: 'Singapore', code: 'SG' }, { name: 'Slovakia', code: 'SK' }, { name: 'Slovenia', code: 'SI' },
      { name: 'Solomon Islands', code: 'SB' }, { name: 'Somalia', code: 'SO' }, { name: 'South Africa', code: 'ZA' },
      { name: 'South Korea', code: 'KR' }, { name: 'South Sudan', code: 'SS' }, { name: 'Spain', code: 'ES' },
      { name: 'Sri Lanka', code: 'LK' }, { name: 'Sudan', code: 'SD' }, { name: 'Suriname', code: 'SR' },
      { name: 'Sweden', code: 'SE' }, { name: 'Switzerland', code: 'CH' }, { name: 'Syria', code: 'SY' },
      { name: 'Taiwan', code: 'TW' }, { name: 'Tajikistan', code: 'TJ' }, { name: 'Tanzania', code: 'TZ' },
      { name: 'Thailand', code: 'TH' }, { name: 'Timor-Leste', code: 'TL' }, { name: 'Togo', code: 'TG' },
      { name: 'Tonga', code: 'TO' }, { name: 'Trinidad and Tobago', code: 'TT' }, { name: 'Tunisia', code: 'TN' },
      { name: 'Turkey', code: 'TR' }, { name: 'Turkmenistan', code: 'TM' }, { name: 'Tuvalu', code: 'TV' },
      { name: 'Uganda', code: 'UG' }, { name: 'Ukraine', code: 'UA' }, { name: 'United Arab Emirates', code: 'AE' },
      { name: 'United Kingdom', code: 'GB' }, { name: 'United States', code: 'US' }, { name: 'Uruguay', code: 'UY' },
      { name: 'Uzbekistan', code: 'UZ' }, { name: 'Vanuatu', code: 'VU' }, { name: 'Vatican City', code: 'VA' },
      { name: 'Venezuela', code: 'VE' }, { name: 'Vietnam', code: 'VN' }, { name: 'Yemen', code: 'YE' },
      { name: 'Zambia', code: 'ZM' }, { name: 'Zimbabwe', code: 'ZW' },
    ];
    setCountries(COUNTRIES);
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const toNum = (val) => {
      const n = Number(val);
      return isNaN(n) || val === '' ? null : n;
    };

    // Retrieve form data
    const formData = new FormData(event.target);
    console.log(formData);

    // Convert form data to an object
    // Construct addresses for user creation
    const originFullAddress = `${formData.get('originAddress')}, ${formData.get('originCity')}, ${formData.get('origin_state_province_region')}, ${formData.get('originPostalCode')}, ${formData.get('originSelectedCountry')}`;
    const destinationFullAddress = `${formData.get('destinationAddress')}, ${formData.get('destinationCity')}, ${formData.get('destination_state_province_region')}, ${formData.get('destinationPostalCode')}, ${formData.get('destinationSelectedCountry')}`;

    const data = {
      trackingNumber: formData.get('trackingNumber'),
      shipmentType: toNum(formData.get('shipmentType')),
      originAddress: formData.get('originAddress'),
      origin_state_province_region: formData.get(
        'origin_state_province_region'
      ),
      originCity: formData.get('originCity'),
      originPostalCode: formData.get('originPostalCode'),
      originSelectedCountry: formData.get('originSelectedCountry'),
      destinationAddress: formData.get('destinationAddress'),
      destination_state_province_region: formData.get(
        'destination_state_province_region'
      ),
      destinationCity: formData.get('destinationCity'),
      destinationPostalCode: formData.get('destinationPostalCode'),
      destinationSelectedCountry: formData.get('destinationSelectedCountry'),
      destinationSelectedCountry: formData.get('destinationSelectedCountry'),
      packageStatus: toNum(formData.get('packageStatus')),
      packageType: toNum(formData.get('packageType')),
      petName: formData.get('petName') || null,
      petBreed: formData.get('petBreed') || null,
      petAge: formData.get('petAge') || null,
      petWeight: formData.get('petWeight') || null,
      petNumber: formData.get('petNumber') || null,
      itemName: formData.get('itemName') || null,
      itemDimension: formData.get('itemDimension') || null,
      itemWeight: formData.get('itemWeight') || null,
      itemNumber: formData.get('itemNumber') || null,
      depatureTime: formData.get('depatureTime'),
      pickupTime: formData.get('pickupTime'),
      deliveryDate: formData.get('deliveryDate'),
      pickupDate: formData.get('pickupDate'),
      depatureDate: formData.get('depatureDate'),
      contentType: formData.get('contentType'),
      senderName: formData.get('senderName'),
      senderEmail: formData.get('senderEmail'),
      senderPhone: formData.get('senderPhone'),
      receiverName: formData.get('receiverName'),
      receiverEmail: formData.get('receiverEmail'),
      receiverPhone: formData.get('receiverPhone'),
      totalFreight: formData.get('totalFreight'),
      transitTimes: toNum(formData.get('transitTimes')),
      percentage: toNum(formData.get('percentage')),
      intermediatePath1: formData.get('intermediatePath1') || null,
      intermediatePath2: formData.get('intermediatePath2') || null,
    };

    const activityData = {
      trackingNumber: data.trackingNumber,
      packageStatus: data.packageStatus,
      presentAddress: 'Warehouse',
      time: new Date().toISOString(),
    };

    console.log(data);
    // Reset the error message and success message before validation
    setErrMessage('');
    setSuccessMessage('');
    setIsUploading(true);

    try {
      let imageUrl = null;
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${data.trackingNumber}-${Date.now()}.${fileExt}`;
        const filePath = `shipments/${fileName}`;
        const { data: uploadData, error: uploadError } = await uploadImage(selectedImage, filePath);
        if (uploadError) throw uploadError;
        imageUrl = uploadData.image_url;
      }

      if (Number(contentType) === 1) {
        data.petImage = imageUrl;
      } else {
        data.itemImage = imageUrl;
      }

      // Step 0: Create Users (Sender and Receiver)
      const senderUser = await addNewUser({
        name: data.senderName,
        email: data.senderEmail,
        phone: data.senderPhone,
        address: originFullAddress,
      });

      const receiverUser = await addNewUser({
        name: data.receiverName,
        email: data.receiverEmail,
        phone: data.receiverPhone,
        address: destinationFullAddress,
      });

      if (!senderUser || !receiverUser) {
        setErrMessage('Failed to create sender or receiver user records');
        return;
      }

      // Link user IDs to the shipment data
      data.sender = senderUser.user_id;
      data.receiver = receiverUser.user_id;

      // Step 1: Update the shipment status
      const { shipmentData } = await createNewShipment(data);
      await createNewActivity(activityData);

      if (!shipmentData) {
        console.error('Failed to update shipment status');
        setErrMessage('Failed to create shipment record');
        return;
      }
      console.log(shipmentData);
      setSuccessMessage('Shipment was successfully Created');

      // Step 2: Fetch the tracking number based on the activeShipment.shipment_id
      const { shipmentData: shipmentDetails } = await fetchTrackingNumber(
        shipmentData.shipment_id
      );
      console.log(shipmentDetails);
      // Step 3: Call the API to send email notifications
      const response = await fetch('/api/shipment-creation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shipmentDetails),
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log('Notification emails sent successfully');
        revalidateDashboard();
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1500);
      } else {
        console.error(
          'Failed to send notification emails:',
          responseData.error
        );
      }
    } catch (error) {
      // Handle any unexpected errors that occur during the API call
      console.error('Create error:', error);
      console.error('Error details:', error?.message, error?.details, error?.hint);
      setErrMessage(`An error occurred while adding the shipment: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="h-full w-full overflow-y-auto bg-white p-6 md:p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create Shipment</h2>
        <p className="text-gray-500 mt-2 text-sm">Fill in the details below to initialize a new shipment.</p>
      </div>

      <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
        {errMessage ? (
          <div className="mb-8">
            <MessageLog
              message={errMessage}
              setMessage={setErrMessage}
              value={false}
            />
          </div>
        ) : (
          <div className="mb-8">
            <MessageLog
              message={successMessage}
              setMessage={setSuccessMessage}
              value={true}
            />
          </div>
        )}

        <div className="bg-gray-50/50 p-6 md:p-8 rounded-2xl border border-gray-100 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Tracking Number <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  name="trackingNumber"
                  id="trackingNumber"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setTrackingNumber(generateTrackingNumber())}
                  title="Regenerate tracking number"
                  className="p-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl transition-colors"
                >
                  <TbRefresh className="text-gray-500 text-lg" />
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Shipment type <span className="text-red-400">*</span>
              </label>
              <select
                name="shipmentType"
                className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm appearance-none"
                value={shippingType}
                onChange={(e) => setShippingType(Number(e.target.value))}
                required
              >
                <option value="" disabled>Select Shipment Type</option>
                <option value={1}>Van Move</option>
                <option value={2}>Air Freight</option>
                <option value={3}>Ship Freight</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">Origin Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="flex flex-col md:col-span-12">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Address <span className="text-red-400">*</span>
                </label>
                <input
                  name="originAddress"
                  id="originAddress"
                  placeholder="Street Address"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col md:col-span-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  name="originCity"
                  id="originCity"
                  placeholder="City"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col md:col-span-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  State/Province <span className="text-red-400">*</span>
                </label>
                <input
                  name="origin_state_province_region"
                  id="region"
                  placeholder="State/Province"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Postal Code <span className="text-red-400">*</span>
                </label>
                <input
                  name="originPostalCode"
                  id="originPostalCode"
                  placeholder="Zip/Postal"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col md:col-span-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Country <span className="text-red-400">*</span>
                </label>
                <select
                  name="originSelectedCountry"
                  value={originSelectedCountry}
                  onChange={(e) => setOriginSelectedCountry(e.target.value)}
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm appearance-none"
                  required
                >
                  <option value="" disabled>Select Country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">Destination Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="flex flex-col md:col-span-12">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Address <span className="text-red-400">*</span>
                </label>
                <input
                  name="destinationAddress"
                  id="destinationAddress"
                  placeholder="Street Address"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col md:col-span-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  City <span className="text-red-400">*</span>
                </label>
                <input
                  name="destinationCity"
                  id="destinationCity"
                  placeholder="City"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col md:col-span-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  State/Province <span className="text-red-400">*</span>
                </label>
                <input
                  name="destination_state_province_region"
                  id="destination_state_province_region"
                  placeholder="State/Province"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Postal Code <span className="text-red-400">*</span>
                </label>
                <input
                  name="destinationPostalCode"
                  id="destinationPostalCode"
                  placeholder="Zip/Postal"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col md:col-span-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Country <span className="text-red-400">*</span>
                </label>
                <select
                  name="destinationSelectedCountry"
                  value={destinationSelectedCountry}
                  onChange={(e) => setdestinationSelectedCountry(e.target.value)}
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm appearance-none"
                  required
                >
                  <option value="" disabled>Select Country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">Shipping Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Package Status <span className="text-red-400">*</span>
                </label>
                <select
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm appearance-none"
                  value={packageStatus}
                  onChange={(e) => setPackageStatus(e.target.value)}
                  name="packageStatus"
                  required
                >
                  {statusesList.map((s) => (
                    <option key={s.status_id} value={s.status_id}>{s.status}</option>
                  ))}
                </select>
              </div>



              {Number(shippingType) === 2 && (
                <>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Intermediate Path 1</label>
                    <input
                      name="intermediatePath1"
                      id="intermediatePath1"
                      placeholder="Intermediate Path For Air Freight"
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Intermediate Path 2</label>
                    <input
                      name="intermediatePath2"
                      id="intermediatePath2"
                      placeholder="Intermediate Path For Air Freight"
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Shipment Content <span className="text-red-400">*</span>
                </label>
                <select
                  name="contentType"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm appearance-none"
                  onChange={(e) => setContentType(Number(e.target.value))}
                  value={contentType}
                  required
                >
                  <option value={1}>Pets</option>
                  <option value={2}>Goods</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Progress Percentage <span className="text-red-400">*</span>
                </label>
                <input
                  name="percentage"
                  id="percentage"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 25"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">Object Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Number(contentType) === 1 ? (
                <>
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Package Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm appearance-none"
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                      name="packageType"
                    >
                      <option value={1}>Crate</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Pet Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="petName"
                      id="petName"
                      placeholder="Pet Name"
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Pet Breed <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="petBreed"
                      id="petBreed"
                      placeholder="Pet Breed"
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Pet Age (weeks) <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="petAge"
                        id="petAge"
                        placeholder="Age in weeks"
                        className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Pet Weight <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="petWeight"
                        id="petWeight"
                        placeholder="Pet Weight in lbs"
                        className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Pet Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="petNumber"
                        id="petNumber"
                        placeholder="Pet Number"
                        className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Pet Image
                    </label>
                    <div className="flex items-center gap-4">
                      {imagePreview && (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-all"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Package Type <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm appearance-none"
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                      name="packageType"
                    >
                      <option value={2}>Standard Packages</option>
                      <option value={3}>Specialized Options</option>
                      <option value={4}>Freight Packaging</option>
                      <option value={5}>Customized Packaging</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Package Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="packageNumber"
                      id="packageNumber"
                      placeholder="Package Number"
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Item Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="itemName"
                      id="itemName"
                      placeholder="Item Name"
                      className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Item Dimension <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="itemDimension"
                        id="itemDimension"
                        placeholder="Item Dimension"
                        className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Item Weight <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="itemWeight"
                        id="itemWeight"
                        placeholder="Item Weight"
                        className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Item Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="itemNumber"
                        id="itemNumber"
                        placeholder="Item Number"
                        className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Package Image
                    </label>
                    <div className="flex items-center gap-4">
                      {imagePreview && (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm shrink-0">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-all"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Departure Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  id="depatureTime"
                  name="depatureTime"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Pickup Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  id="pickupTime"
                  name="pickupTime"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>

              <div className="flex flex-col md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Departure Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="depatureDate"
                    name="depatureDate"
                    className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Expected Delivery Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Pickup Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200/60">
            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">Billing & Parties</h3>
            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">Sender Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Sender Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="senderName"
                  placeholder="Full Name"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Sender Email <span className="text-red-400">*</span>
                </label>
                <input
                  name="senderEmail"
                  type="email"
                  placeholder="email@example.com"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Sender Phone
                </label>
                <input
                  name="senderPhone"
                  placeholder="Phone Number"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">Receiver Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Receiver Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="receiverName"
                  placeholder="Full Name"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Receiver Email <span className="text-red-400">*</span>
                </label>
                <input
                  name="receiverEmail"
                  type="email"
                  placeholder="email@example.com"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Receiver Phone
                </label>
                <input
                  name="receiverPhone"
                  placeholder="Phone Number"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-6">Billing Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Total Freight <span className="text-red-400">*</span>
                </label>
                <input
                  name="totalFreight"
                  id="totalFreight"
                  placeholder="Total Freight"
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Transit Times <span className="text-red-400">*</span>
                </label>
                <select
                  className="w-full p-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm appearance-none text-gray-900"
                  value={transitTimes}
                  name="transitTimes"
                  onChange={(e) => setTransitTimes(e.target.value)}
                  required
                >
                  <option value="" disabled className="text-gray-400">Select Transit Time</option>
                  {transittimes?.map((time) => (
                    <option key={time.transit_id} value={time.transit_id} className="text-gray-900">
                      {time.transitTimes || time.transittimes}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {errMessage && (
          <div className="mt-6">
            <MessageLog
              message={errMessage}
              setMessage={setErrMessage}
              value={false}
            />
          </div>
        )}

        {successMessage && (
          <div className="mt-6">
            <MessageLog
              message={successMessage}
              setMessage={setSuccessMessage}
              value={true}
            />
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <ButtonBig
            type="submit"
            className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-lg shadow-accent/20 transition-all duration-200 w-full md:w-auto flex justify-center"
            disabled={isUploading}
          >
            {isUploading ? 'Creating...' : 'Create Shipment'}
          </ButtonBig>
        </div>
      </form>
    </div>
  );
}

export default CreateShipmentForm;
