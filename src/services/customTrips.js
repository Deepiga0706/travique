import { api, getAuthHeaders } from './api';

export async function createCustomTrip(payload) {
  // POST /api/custom-trips
  return api.post('/api/custom-trips', payload, {
    headers: getAuthHeaders(),
  });
}

export async function getMyBookingsCombined() {
  return api.get('/api/my-bookings', {
    headers: getAuthHeaders(),
  });
}


export async function getCustomTripDetails(id) {
  return api.get(`/api/custom-trips/${id}`, {
    headers: getAuthHeaders(),
  });
}

