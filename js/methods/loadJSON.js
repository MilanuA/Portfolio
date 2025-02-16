export const loadJSON = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); 
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText)); 
        } else if (xhr.readyState === 4) {
            callback(new Error(`Failed to load ${url}`)); 
        }
    };
    xhr.send();
};