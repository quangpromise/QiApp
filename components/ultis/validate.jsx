export function isEmail(value) {
    return value.includes('@')
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
    return value.length > minLength
}

export function saveToStorage (key, value) {
        return window.localStorage.setItem(key, JSON.stringify(value))
    };

export function getFromStorage(key) {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key))
    }
    };