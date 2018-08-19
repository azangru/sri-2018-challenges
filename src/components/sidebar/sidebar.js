export function openSidebar () {
  const layoutContainer = document.querySelector('.layout-container');
  const headerMenuButton = document.querySelector('.header__mobile-menu-button');
  const sidebar = document.querySelector('.sidebar');

  layoutContainer.classList.add('layout-container_with-sidebar-open');
  headerMenuButton.classList.add('header__mobile-menu-button_with-sidebar-open');
  sidebar.classList.add('sidebar_open');
  sidebar.classList.remove('sidebar_closed');
}

export function closeSidebar () {
  const layoutContainer = document.querySelector('.layout-container');
  const headerMenuButton = document.querySelector('.header__mobile-menu-button');
  const sidebar = document.querySelector('.sidebar');

  layoutContainer.classList.remove('layout-container_with-sidebar-open');
  headerMenuButton.classList.remove('header__mobile-menu-button_with-sidebar-open');
  sidebar.classList.remove('sidebar_open');
  sidebar.classList.add('sidebar_closed');
}
