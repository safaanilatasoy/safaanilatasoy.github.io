document.querySelectorAll('.submenu').forEach((submenu) => {
    submenu.addEventListener('mouseenter', () => {
      const submenuItems = submenu.querySelector('.submenu-items');
      if (submenuItems) submenuItems.style.display = 'block';
    });
  
    submenu.addEventListener('mouseleave', () => {
      const submenuItems = submenu.querySelector('.submenu-items');
      if (submenuItems) submenuItems.style.display = 'none';
    });
  });
  