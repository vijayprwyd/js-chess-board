function debounce(callback, delay = 100) {

    let timeout;

    return function(...args) {

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            callback(...args)
        }, delay);
    }
}