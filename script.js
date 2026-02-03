// ===== FLORISTERÍA ABIGAIL #2 - SCRIPT PRINCIPAL =====

// Inicializar la página cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Floristería Abigail #2 cargada correctamente');
    
    // ===== VARIABLES GLOBALES =====
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    const categoryButtons = document.querySelectorAll('.btn-category');
    
    // ===== MENÚ RESPONSIVE =====
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace (en móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Marcar enlace activo
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // ===== FILTRADO DE PRODUCTOS =====
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            // Obtener categoría a filtrar
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar productos
            productCards.forEach(card => {
                if (filterValue === 'todos' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== BOTONES DE WHATSAPP =====
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener datos del producto
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            
            // Crear mensaje personalizado
            const phoneNumber = '50492548753';
            const message = `¡Hola Floristería Abigail #2! Me interesa el producto: ${productName} (Precio: L. ${productPrice}). Me gustaría obtener más información y hacer un pedido.`;
            const encodedMessage = encodeURIComponent(message);
            
            // Abrir WhatsApp
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    });
    
    // ===== BOTONES DE CATEGORÍAS (filtro directo) =====
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            
            // Activar el filtro correspondiente
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-filter') === filterValue) {
                    btn.classList.add('active');
                }
            });
            
            // Filtrar productos
            productCards.forEach(card => {
                if (filterValue === 'todos' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Desplazarse al catálogo
            document.getElementById('catalogo').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // ===== ANIMACIÓN DE PÉTALOS =====
    function createPetals() {
        const petalContainer = document.getElementById('petal-container');
        const petalCount = 20; // Número de pétalos
        
        // Colores pastel para los pétalos
        const colors = [
            'rgba(255, 182, 193, 0.7)', // Rosa claro
            'rgba(255, 218, 185, 0.7)', // Durazno
            'rgba(221, 160, 221, 0.7)', // Ciruela
            'rgba(175, 238, 238, 0.7)', // Azul claro
            'rgba(240, 230, 140, 0.7)'  // Amarillo claro
        ];
        
        // Crear pétalos
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            // Tamaño aleatorio
            const size = Math.random() * 20 + 10;
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            
            // Color aleatorio
            const colorIndex = Math.floor(Math.random() * colors.length);
            petal.style.backgroundColor = colors[colorIndex];
            
            // Posición inicial aleatoria
            petal.style.left = `${Math.random() * 100}%`;
            
            // Animación con duración y retardo aleatorios
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            
            petalContainer.appendChild(petal);
        }
    }
    
    // Inicializar animación de pétalos
    createPetals();
    
    // ===== SCROLL SUAVE PARA ENLACES INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Desplazamiento suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== CAMBIAR CLASE ACTIVA EN NAVEGACIÓN AL SCROLL =====
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        // Obtener todas las secciones
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover clase activa de todos los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    // Agregar clase activa al enlace correspondiente
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Ejecutar al cargar la página
    
    // ===== ANIMACIÓN DE TARJETAS AL SCROLL =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .category-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar estado inicial de las tarjetas
    document.querySelectorAll('.product-card, .category-card, .testimonial-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página
    
    // ===== BOTÓN FLOTANTE DE WHATSAPP =====
    // Ya está implementado en el HTML como enlace directo
    console.log('Todas las funcionalidades se han inicializado correctamente');
});

// ===== MODAL DE IMÁGENES (PANTALLA COMPLETA) =====
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const modalProductName = document.getElementById('modalProductName');
const modalProductPrice = document.getElementById('modalProductPrice');

// Agregar evento click a todas las imágenes de productos
const productImages = document.querySelectorAll('.product-image');

productImages.forEach(imageContainer => {
    imageContainer.addEventListener('click', function() {
        const img = this.querySelector('img');
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Establecer imagen y datos en el modal
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalProductName.textContent = productName;
        modalProductPrice.textContent = productPrice;
        
        // Mostrar modal
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    });
});

// Cerrar modal al hacer clic en el botón X
modalClose.addEventListener('click', function() {
    imageModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaurar scroll
});

// Cerrar modal al hacer clic fuera de la imagen
imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && imageModal.classList.contains('active')) {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
});