import { map } from "nanostores";

export const uiState = map({
  isShareModalOpen: false,
  isMobileMenuOpen: false,
  viewportWidth: 0,
  scrollPosition: 0,
}); 