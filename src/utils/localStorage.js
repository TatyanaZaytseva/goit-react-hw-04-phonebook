const STORAGE_KEY = 'contacts';

export function saveContactsToStorage(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export function getContactsFtomStorage(STORAGE_KEY) {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}
