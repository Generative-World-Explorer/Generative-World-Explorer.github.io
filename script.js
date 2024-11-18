// Observer for elements with classes 'cursor_supercharge', 'cursor_community', and 'cursor_ai'
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.1 // Adjust this value if needed
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.cursor_supercharge, .cursor_community, .cursor_ai');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// Observer for elements with the class 'layout292_item'
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.1 // Adjust this value if needed
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('in-view');
            } else {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.layout292_item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});
