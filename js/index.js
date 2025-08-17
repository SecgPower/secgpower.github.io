// JavaScript Document
// ����������Ч��
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow-md');
        navbar.classList.remove('py-4');
        navbar.classList.add('py-3');
    } else {
        navbar.classList.remove('bg-white', 'shadow-md');
        navbar.classList.remove('py-3');
        navbar.classList.add('py-4');
    }
});

// �ƶ��˲˵��л�
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
mobileMenu.classList.toggle('hidden');
});

// ƽ������
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
		if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            // �ر��ƶ��˵�
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});
// ��������
const scrollElements = document.querySelectorAll('[data-scroll-animate]');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('animate-fade-in');
    element.classList.remove('opacity-0');
};
const hideScrollElement = (element) => {
    element.classList.remove('animate-fade-in');
    element.classList.add('opacity-0');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                } else {
                    hideScrollElement(el);
                }
            });
        };

        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });

        // ��ʼ������
        handleScrollAnimation();

        // ���ּ�������
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target;
                }
            });
        };

        // ���Ԫ���Ƿ����ӿ���
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // ������һ��������Ԫ��
        if (counters.length > 0) {
            observer.observe(counters[0]);
        }

        // ��Ʒɸѡ
        const filterButtons = document.querySelectorAll('.filter-btn');
        const workItems = document.querySelectorAll('.work-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // �Ƴ����а�ť��active��
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-primary', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-gray-600');
                });

                // ��ӵ�ǰ��ť��active��
                button.classList.add('active', 'bg-primary', 'text-white');
                button.classList.remove('bg-gray-100', 'text-gray-600');

                const filter = button.getAttribute('data-filter');

                workItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('opacity-0');
                            item.classList.add('opacity-100');
                        }, 50);
                    } else {
                        item.classList.remove('opacity-100');
                        item.classList.add('opacity-0');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // ��ϵ���ύ
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // ģ����ύ
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;

                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> ������...';

                setTimeout(() => {
                    // ��ʾ�ɹ���Ϣ
                    submitButton.innerHTML = '<i class="fa fa-check mr-2"></i> ���ͳɹ�!';
                    submitButton.classList.remove('bg-primary');
                    submitButton.classList.add('bg-green-500');

                    // ���ñ�
                    contactForm.reset();

                    // �ָ���ť״̬
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('bg-green-500');
                        submitButton.classList.add('bg-primary');
                    }, 3000);
                }, 1500);
            });
        }