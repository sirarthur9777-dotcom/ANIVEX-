/**
 * Coordinates modal-driven browser history transitions with top-level routing
 * so that closing a modal via browser Back/Forward never triggers unwanted
 * page-level scroll-to-top jumps.
 */

let productModalHistoryActive = false;

export function setProductModalHistoryActive(active: boolean): void {
  productModalHistoryActive = active;
}

export function isProductModalHistoryActive(): boolean {
  return productModalHistoryActive;
}

export const LOCATION_SYNC_EVENT = 'anivex:location-sync';

export function emitLocationSync(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(LOCATION_SYNC_EVENT));
  }
}
