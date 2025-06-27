import { map } from "nanostores";

export const uiState = map({
  isShareModalOpen: false,
  isMobileMenuOpen: false,
  viewportWidth: 0,
  scrollPosition: 0,
  isMobile: false,
  contextMenuCard: null as string | null,
}); 