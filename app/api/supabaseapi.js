'use server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SECRET_KEY || ''
);

const toNum = (val) => {
  const n = Number(val);
  return isNaN(n) || val === '' ? null : n;
};

export const uploadImage = async (file, path) => {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from('krest-storage')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Error uploading image:', error.message);
      return { data: null, error };
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('krest-storage')
      .getPublicUrl(path);

    return { data: { image_url: publicUrl }, error: null };
  } catch (err) {
    console.error('Unexpected error during upload:', err);
    return { data: null, error: err };
  }
};

/**
 * Extracts the storage path from a public URL and deletes the file from krest-storage.
 */
export const deleteImageFromStorage = async (url) => {
  if (!url || typeof url !== 'string') return;
  try {
    // Standard Supabase public URL: https://[ref].supabase.co/storage/v1/object/public/[bucket]/[path]
    const bucketToken = '/public/krest-storage/';
    const index = url.indexOf(bucketToken);
    if (index === -1) return;

    const path = url.substring(index + bucketToken.length);
    if (!path) return;

    const { error } = await supabaseAdmin.storage
      .from('krest-storage')
      .remove([path]);

    if (error) {
      console.error('Error deleting image from storage:', error.message);
    } else {
      console.log('Successfully deleted image from storage:', path);
    }
  } catch (err) {
    console.error('Unexpected error during image deletion:', err);
  }
};
export const fetchShipmentByTrackingNumber = async (trackingNumber) => {
  const error = {};
  console.log(`[API] fetchShipmentByTrackingNumber starting for: "${trackingNumber}"`);

  // Use case-insensitive matching and robust relationship selection
  const selectStr = `
    *,
    status_id(status, status_id),
    shipment_pet_id(name, breed, age, weight, petNumber:petnumber, pet_id, image_url),
    transit_times_id(transitTimes:transittimes),
    shipper_detail:shipper(name, email, phone_number, address),
    receiver_detail:receiver(name, email, phone_number, address),
    shipment_good_id(weight, dimensions, item_name, Item_number:item_number, goods_id, image_url),
    package_type(type, item_id)
  `.replace(/\s+/g, ' ').trim();

  const { data, error: err } = await supabaseAdmin
    .from('shipments')
    .select(selectStr)
    .ilike('trackingnumber', trackingNumber)
    .single();

  if (err || !data) {
    console.error(`[API] fetchShipmentByTrackingNumber failure for [${trackingNumber}]:`, err?.message || 'No data', "Error:", JSON.stringify(err));

    // Re-check with lowercase trackingnumber column name if previous failed
    // Postgres folded trackingNumber to trackingnumber, so this should be the one.

    error.message = 'Shipment could not be found. Please verify the tracking number.';
    error.code = err?.code;
  } else {
    // For backward compatibility with components expecting un-aliased shipper/receiver
    if (data.shipper_detail) data.shipper = data.shipper_detail;
    if (data.receiver_detail) data.receiver = data.receiver_detail;
    if (data.trackingnumber) data.trackingNumber = data.trackingnumber;
  }

  return { data, error };
};

export const fetchAllShipments = async () => {
  let { data, error } = await supabase
    .from('shipments')
    .select(
      '*, status_id(status, status_id), shipper_detail:shipper(name, user_id), receiver_detail:receiver(name, user_id), package_type(type, item_id)'
    )
    .order('created_at', { ascending: false });
  return { data, error };
};
export const fetchAllShipmentsforUpdate = async () => {
  let { data, error } = await supabaseAdmin
    .from('shipments')
    .select(
      '*, status_id(status, status_id), shipment_good_id(goods_id, weight, dimensions, Item_number:item_number, item_name), shipper_detail:shipper(name, user_id), receiver_detail:receiver(name, user_id), package_type(type, item_id), shipment_pet_id(name, breed, age, weight, petNumber:petnumber, pet_id)'
    )
    .order('created_at', { ascending: false });
  if (error) console.error('fetchAllShipmentsforUpdate error (server):', error.message, error.hint, error.details);
  return { data, error };
};

export const createNewShipment = async (data) => {
  console.log(data);
  try {
    let relatedItemId = null; // ID of the inserted pet or good
    let relatedItemType = ''; // To indicate whether it's a pet or a good

    // Step 1: Insert into `pets` or `goods` table
    if (data.petName) {
      const { data: petData, error: petError } = await supabaseAdmin
        .from('pets')
        .insert([
          {
            name: data.petName,
            breed: data.petBreed,
            age: data.petAge,
            weight: data.petWeight,
            petnumber: data.petNumber,
            image_url: data.petImage || null,
          },
        ])
        .select('pet_id')
        .single();

      if (petError)
        throw new Error(`Failed to insert pet: ${petError.message}`);

      relatedItemId = petData?.pet_id;
      relatedItemType = 'pet';
    } else if (data.itemName) {
      const { data: goodData, error: goodError } = await supabaseAdmin
        .from('goods')
        .insert([
          {
            item_name: data.itemName,
            dimensions: data.itemDimension,
            weight: data.itemWeight,
            item_number: data.itemNumber,
            image_url: data.itemImage || null,
          },
        ])
        .select('goods_id')
        .single();

      if (goodError)
        throw new Error(`Failed to insert good: ${goodError.message}`);

      relatedItemId = goodData?.goods_id;
      relatedItemType = 'good';
    } else {
      throw new Error(
        'No valid item data (pet or good) provided for insertion.'
      );
    }

    // Step 2: Insert into `shipments` table
    const { data: shipmentData, error: shipmentError } = await supabaseAdmin
      .from('shipments')
      .insert([
        {
          trackingnumber: data.trackingNumber,
          shipping_type_id: data.shipmentType,
          origin_street_address: data.originAddress,
          origin_state: data.origin_state_province_region,
          origin_city: data.originCity,
          origin_postal_code: data.originPostalCode,
          origin_country: data.originSelectedCountry,
          destination_street_address: data.destinationAddress,
          destination_state: data.destination_state_province_region,
          destination_city: data.destinationCity,
          destination_postal_code: data.destinationPostalCode,
          destination_country: data.destinationSelectedCountry,
          status_id: toNum(data.packageStatus),
          depaturetime: data.depatureTime,
          pickuptime: data.pickupTime,
          expecteddeliverydate: data.deliveryDate,
          depaturedate: data.depatureDate,
          pickupdate: data.pickupDate,
          shipper: toNum(data.sender),
          receiver: toNum(data.receiver),
          totalfreight: data.totalFreight,
          transit_times_id: toNum(data.transitTimes),
          percentage: data.percentage,
          shipment_pet_id: relatedItemType === 'pet' ? relatedItemId : null,
          shipment_good_id: relatedItemType === 'good' ? relatedItemId : null,
          package_type: toNum(data.packageType),
          intermediate_path1: data.intermediatePath1 ?? null, // Use null if undefined
          intermediate_path2: data.intermediatePath2 ?? null, // Use null if undefined
          image_url: data.petImage || data.itemImage || null,
        },
      ])
      .select()
      .single();

    if (shipmentError) {
      console.error('Error occurred while creating shipment:', shipmentError);
      throw new Error(`Failed to insert shipment: ${shipmentError.message}`);
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/dashboard');
    revalidatePath('/Track');
    return { relatedItemId, relatedItemType, shipmentData }; // Return shipment info
  } catch (error) {
    console.error('Error creating shipment:', error.message);
    throw error; // Rethrow the error for higher-level handling
  }
};

export const fetchAllUsers = async () => {
  let { data, error } = await supabaseAdmin.from('users').select('*');
  return { data, error };
};

export const addNewUser = async (data) => {
  try {
    // First check if the user already exists by email
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', data.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // Ignore "no rows returned" error
      console.error('Error checking existing user:', checkError);
    }

    if (existingUser) {
      return existingUser; // Return the existing user object
    }

    // If not, insert a new user
    const { data: responseData, error } = await supabaseAdmin
      .from('users')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone_number: data.phone,
          address: data.address,
        },
      ])
      .select();

    if (error) {
      console.error('Error adding user in Supabase:', error);
      return null;
    }

    return responseData?.[0] || null; // Return the created user object
  } catch (err) {
    console.error('Caught severe fetch/network error in addNewUser:', err.message, err.cause);
    return null;
  }
};

export const deleteUser = async (userId) => {
  console.log(userId);
  const { data, error } = await supabaseAdmin
    .from('users')
    .delete()
    .eq('id', userId);
  if (!error) {
    revalidatePath('/admin/dashboard/all-users'); // 🔄 Revalidate the Users page
  }
  return { data, error };
};

export const updateUser = async (userId, updatedFields) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(updatedFields) // Use updated fields
    .eq('user_id', userId)
    .select();
  if (!error) {
    revalidatePath('/admin/dashboard/all-users'); // 🔄 Revalidate the Users page
  }
  return { data, error };
};

export const fetchAllStatus = async () => {
  let { data: statuses, error } = await supabaseAdmin.from('statuses').select('*');
  return { statuses, error };
};

export const fetchAllTransitTimmes = async () => {
  let { data: transittimes, error } = await supabaseAdmin
    .from('transittimes')
    .select('*');
  return { transittimes, error };
};

export const fetchAllItemTypes = async () => {
  let { data: packagetype, error } = await supabaseAdmin
    .from('packagetype')
    .select('*');
  return { packagetype, error };
};

export const fetchAllShippingTypes = async () => {
  let { data: shippingtype, error } = await supabaseAdmin
    .from('shippingtypes')
    .select('*');
  return { shippingtype, error };
};

export const updateShipment = async (shipmentId, updatedFields) => {
  // Check if we are updating the image
  if (updatedFields.image_url) {
    const { data: current } = await supabaseAdmin
      .from('shipments')
      .select('image_url')
      .eq('shipment_id', shipmentId)
      .single();
    
    if (current?.image_url && current.image_url !== updatedFields.image_url) {
      await deleteImageFromStorage(current.image_url);
    }
  }

  const { data: formdata, error } = await supabaseAdmin
    .from('shipments')
    .update(updatedFields)
    .eq('shipment_id', shipmentId)
    .select('*');

  if (!error) {
    revalidatePath('/admin/dashboard');
    revalidatePath('/dashboard');
    revalidatePath('/Track');
  } else {
    console.error('updateShipment error (server):', error);
  }
  // Return serializable error
  return { 
    formdata, 
    error: error ? { message: error.message, details: error.details, hint: error.hint } : null 
  };
};

export const updatePet = async (petId, petData) => {
  // Check if we are updating the image
  if (petData.image_url) {
    const { data: current } = await supabaseAdmin
      .from('pets')
      .select('image_url')
      .eq('pet_id', petId)
      .single();
    
    if (current?.image_url && current.image_url !== petData.image_url) {
      await deleteImageFromStorage(current.image_url);
    }
  }

  const { data, error } = await supabaseAdmin
    .from('pets')
    .update(petData)
    .eq('pet_id', petId)
    .select('*');
  if (error) {
    console.error('updatePet error (server):', error);
  }

  return { 
    data, 
    error: error ? { message: error.message, details: error.details, hint: error.hint } : null 
  };
};

export const updateGoods = async (goodId, updatedFields) => {
  console.log(updatedFields);
  // Check if we are updating the image
  if (updatedFields.image_url) {
    const { data: current } = await supabaseAdmin
      .from('goods')
      .select('image_url')
      .eq('goods_id', goodId)
      .single();
    
    if (current?.image_url && current.image_url !== updatedFields.image_url) {
      await deleteImageFromStorage(current.image_url);
    }
  }

  const { data: gooddata, error: gooderror } = await supabaseAdmin
    .from('goods')
    .update(updatedFields)
    .eq('goods_id', goodId)
    .select();
  if (!gooderror) {
    revalidatePath('/admin/dashboard');
    revalidatePath('/dashboard');
    revalidatePath('/Track');
  }
  return { gooddata, gooderror };
};

export const deleteShipment = async (shipmentId) => {
  try {
    // 1. Fetch shipment details to get image URLs
    const { data: shipment } = await supabaseAdmin
      .from('shipments')
      .select('*, shipment_pet_id(image_url), shipment_good_id(image_url)')
      .eq('shipment_id', shipmentId)
      .single();

    if (shipment) {
      const urlsToDelete = new Set();
      if (shipment.image_url) urlsToDelete.add(shipment.image_url);
      if (shipment.shipment_pet_id?.image_url) urlsToDelete.add(shipment.shipment_pet_id.image_url);
      if (shipment.shipment_good_id?.image_url) urlsToDelete.add(shipment.shipment_good_id.image_url);

      // 2. Fetch related activities for this shipment
      const { data: activities } = await supabaseAdmin
        .from('activity')
        .select('image_url')
        .eq('trackingnumber', shipment.trackingnumber);
      
      if (activities) {
        activities.forEach(act => {
          if (act.image_url) urlsToDelete.add(act.image_url);
        });
      }

      // 3. Delete from storage
      for (const url of urlsToDelete) {
        await deleteImageFromStorage(url);
      }
    }

    // 4. Delete shipment record (assumes activities/pets/goods are handled by DB cascade or manually)
    const { error } = await supabaseAdmin
      .from('shipments')
      .delete()
      .eq('shipment_id', shipmentId);

    if (!error) {
      revalidatePath('/admin/dashboard');
      revalidatePath('/dashboard');
      revalidatePath('/Track');
    }
    return error;
  } catch (err) {
    console.error('Unexpected error in deleteShipment:', err);
    return { message: err.message };
  }
};
export async function updateStatusShipment(shipmentId, updatedFields) {
  // Check if we are updating the image
  if (updatedFields.image_url) {
    const { data: current } = await supabaseAdmin
      .from('shipments')
      .select('image_url')
      .eq('shipment_id', shipmentId)
      .single();
    
    if (current?.image_url && current.image_url !== updatedFields.image_url) {
      await deleteImageFromStorage(current.image_url);
    }
  }

  const { data: formdata, error } = await supabaseAdmin
    .from('shipments')
    .update(updatedFields)
    .eq('shipment_id', shipmentId)
    .select();
  if (!error) {
    revalidatePath('/admin/dashboard');
    revalidatePath('/dashboard');
    revalidatePath('/Track');
  } else {
    console.error('updateStatusShipment error:', error);
  }
  return { formdata, error };
}

export const updateShipmentLocation = async (shipmentId, newLocation) => {
  const { data, error } = await supabaseAdmin
    .from('shipments') // ✅ Table name
    .update({ present_address: newLocation }) // ✅ Column update
    .eq('shipment_id', shipmentId); // ✅ Find by tracking number

  if (error) {
    console.error('Error updating location:', error.message);
    return null;
  }

  console.log('Location updated successfully:', data);
  revalidatePath('/admin/dashboard');
  revalidatePath('/dashboard');
  revalidatePath('/Track');
  return data;
};

export const fetchActivity = async (trackingNumber) => {
  const { data: activity, error } = await supabaseAdmin
    .from('activity')
    .select('*, status(status)')
    .eq('trackingnumber', trackingNumber)
    .order('time', { ascending: false }) // Sorts by time (newest first)
    .throwOnError(); // Ensure it throws errors

  if (error) {
    console.error('Error fetching activities:', error);
    return null;
  }

  console.log('Fetched Activities:', activity); // Log the fetched data
  return activity; // Returns an array of rows
};

export const createNewActivity = async (activityData) => {
  const { data: dataActivity, error } = await supabaseAdmin.from('activity').insert([
    {
      trackingnumber: activityData.trackingNumber,
      status: activityData.packageStatus,
      present_address: activityData.presentAddress,
      time: activityData.time,
      image_url: activityData.imageUrl || null,
    },
  ]);

  if (error) {
    console.error('Error inserting activity:', error);
    return { error };
  }

  if (!error) {
    revalidatePath('/admin/dashboard');
    revalidatePath('/dashboard');
    revalidatePath('/Track');
  }
  return { dataActivity };
};

export const fetchUser = async (email) => {
  const error = {};
  const { data, error: err } = await supabaseAdmin
    .from('users')
    .select(`*`) // Select all columns from shipments and 'status' from statuses table
    .eq('email', email) // Filter by the shipment ID
    .single();

  if (err) {
    error.message = 'Your Email has Not Loaded Correctly';
  }
  return { data, error };
};

export const fetchShipmentByEmail = async (receiver) => {
  const error = {};
  const { data: shipmentData, error: err } = await supabaseAdmin
    .from('shipments')
    .select(
      `*, status_id(status), shipment_pet_id(name, breed, age, weight, petNumber:petnumber), transit_times_id(transitTimes:transittimes), shipper(name, email, phone_number, address), receiver(name, email, phone_number, address), shipment_good_id(weight, dimensions,  item_name, Item_number:item_number), package_type(type)`
    )
    .eq('receiver', receiver)
    .order('created_at', { ascending: false });

  if (err) {
    console.error('fetchShipmentByEmail error:', err);
    error.message = 'Shipments could not be loaded.';
  }
  return { shipmentData, error };
};

export const fetchRefundsById = async (receiver) => {
  const { data: refundsData, error } = await supabaseAdmin
    .from('refunds')
    .select('*')
    .eq('user_id', receiver);
  console.log(refundsData);
  return { refundsData, error };
};

export const fetchRefunds = async () => {
  let { data: refunds, error } = await supabase
    .from('refunds')
    .select('*, user_id(name, email, user_id)');
  return { refunds, error };
};

export const deleteRefunds = async (id) => {
  const { error } = await supabase.from('refunds').delete().eq('id', id);
  if (!error) {
    revalidatePath('/admin/dashboard/refunds');
  }
  return error;
};

export const createRefund = async (data) => {
  const { data: result } = await supabase
    .from('refunds')
    .insert([
      {
        user_id: data.user,
        purpose: data.purpose,
        amount_paid: data.amount_paid,
        refundable_amount: data.refundable_amount,
      },
    ])
    .select();
  revalidatePath('/admin/dashboard/refunds');
  return result;
};

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true, message: 'Password reset link sent!' };
}

export async function fetchTrackingNumber(shipmentId) {
  const { data: shipmentData, error: shipmentError } = await supabaseAdmin
    .from('shipments')
    .select(
      'shipper(email), receiver(email), trackingnumber, status_id(status)'
    )
    .eq('shipment_id', shipmentId)
    .single();

  if (shipmentData) {
    shipmentData.trackingNumber = shipmentData.trackingnumber;
  }

  return { shipmentData, shipmentError };
}

export async function fetchForSMS(shipmentId) {
  const { data: smsData, error: smsError } = await supabaseAdmin
    .from('shipments')
    .select('receiver(name, phone_number), trackingnumber, status_id(status)')
    .eq('shipment_id', shipmentId)
    .single();

  if (smsData) {
    smsData.trackingNumber = smsData.trackingnumber;
  }

  return { smsData, smsError };
}

export async function fetchSystemSettings() {
  const { data, error } = await supabaseAdmin
    .from('system_settings')
    .select('*');

  // Convert array to key-value object for easier use
  const settings = data?.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {}) || {};

  return { settings, error };
}

export async function updateSystemSetting(key, value) {
  const { data, error } = await supabaseAdmin
    .from('system_settings')
    .update({ value, updated_at: new Date() })
    .eq('key', key)
    .select();

  revalidatePath('/admin/dashboard/settings');
  revalidatePath('/Track');
  revalidatePath('/dashboard');
  return { data, error };
}
