document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('[data-category]');
  const productItems = document.querySelectorAll('.product-item');
  const appointmentModal = document.getElementById('modalCita');
  const serviceSelect = document.getElementById('servicioSeleccionado');
  const appointmentForm = document.getElementById('quickAppointmentForm');
  const contactForm = document.getElementById('contactForm');
  const contactFormAlert = document.getElementById('contactFormAlert');
  const toastElement = document.getElementById('toastInteraccion');
  const toastMessage = document.getElementById('toastMensaje');
  const toast = toastElement && window.bootstrap ? bootstrap.Toast.getOrCreateInstance(toastElement) : null;

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const selectedCategory = button.getAttribute('data-category');

      filterButtons.forEach(function (item) {
        item.classList.remove('active');
      });

      button.classList.add('active');

      productItems.forEach(function (product) {
        const productCategory = product.getAttribute('data-item');
        const shouldShow = selectedCategory === 'todos' || productCategory === selectedCategory;

        product.style.display = shouldShow ? 'block' : 'none';
      });
    });
  });

  if (appointmentModal && serviceSelect) {
    appointmentModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const selectedService = button ? button.getAttribute('data-service') : '';

      if (selectedService) {
        serviceSelect.value = selectedService;
      }
    });
  }

  if (appointmentForm && appointmentModal && serviceSelect && toast && toastMessage) {
    appointmentForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const serviceName = serviceSelect.value;

      toastMessage.textContent = 'Solicitud recibida para ' + serviceName + '. Te contactaremos para confirmar la cita.';
      toast.show();
      bootstrap.Modal.getInstance(appointmentModal).hide();
      appointmentForm.reset();
    });
  }

  if (contactForm && contactFormAlert) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      contactFormAlert.classList.remove('d-none');
      contactForm.reset();
      contactFormAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

});