document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser && storedUser.name && storedUser.role) {
        const displayName = `${storedUser.name} (${storedUser.role})`;
        document.querySelector('.mr-2.d-none.d-lg-inline.text-gray-600.small').textContent = displayName;
    }
});