document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle (Simple implementation)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#fff';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // Music Player Logic
    const modal = document.getElementById('music-modal');
    const closeModal = document.querySelector('.close-modal');
    const audioPlayer = document.getElementById('audio-player');
    const modalTitle = document.getElementById('modal-title');
    const modalGenre = document.getElementById('modal-genre');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Music data using CDN links
    const musicData = {
        'Clássicos': {
            title: 'Marcha Nupcial de Mendelssohn',
            src: 'https://palcocdn.akamaized.net/9/3/5/e/musicalforever-marcha-nupcial-de-mendelsson-bd5b7c4f.mp3'
        },
        'Romântico Moderno': {
            title: 'Hallelujah (Violin Cover)',
            src: 'https://palcocdn.akamaized.net/a/2/4/2/groovearigor-wedding-violin-hallelujah-from-film-shrek-violin-cover-b774fd.mp3'
        },
        'Eletrônica': {
            title: 'Hear Me Now (Alok Remix)',
            src: 'https://palcocdn.akamaized.net/a/e/3/e/stylegold-alok-bruno-martini-feat-zeeba-hear-me-now-style-gold-remix-a151d52a.mp3'
        }
    };

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const genre = item.querySelector('h4').innerText;
            const title = item.querySelector('.media-placeholder').innerText;

            // Update Modal Content
            // Use title from data if available, otherwise fallback to placeholder text
            if (musicData[genre]) {
                modalTitle.innerText = musicData[genre].title;
            } else {
                modalTitle.innerText = title;
            }
            modalGenre.innerText = genre;

            // Set audio source and play
            if (musicData[genre]) {
                console.log('Loading music:', musicData[genre].title, musicData[genre].src);

                // Update modal to show loading state
                modalTitle.innerText = musicData[genre].title + ' (Carregando...)';

                audioPlayer.src = musicData[genre].src;
                audioPlayer.load(); // Force load the audio

                // Add event listeners for debugging
                audioPlayer.addEventListener('loadstart', () => {
                    console.log('Audio loading started');
                });

                audioPlayer.addEventListener('canplay', () => {
                    console.log('Audio can play');
                    modalTitle.innerText = musicData[genre].title;
                });

                audioPlayer.addEventListener('error', (e) => {
                    console.error('Audio error:', e, audioPlayer.error);
                    modalTitle.innerText = musicData[genre].title + ' (Erro ao carregar)';
                    alert('Erro ao carregar a música. Tente novamente.');
                });

                audioPlayer.play().catch(e => {
                    console.error("Error playing audio:", e);
                    alert("Erro ao reproduzir a música. Clique no botão play do player.");
                });
            } else {
                console.error('No music data found for genre:', genre);
            }

            // Show Modal
            modal.classList.add('show');
        });
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        }
    });
});
