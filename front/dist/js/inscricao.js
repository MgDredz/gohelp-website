document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('evento');
    const eventos = document.querySelectorAll('.event-container');
    eventos.forEach((ev, idx) => {
        if (eventoId !== (idx + 1).toString()) {
            ev.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('evento');
    const eventos = document.querySelectorAll('.event-container');
    eventos.forEach(ev => {
        if (`evento-${eventoId}` !== ev.id) {
            ev.style.display = 'none';
        }
    });
});

