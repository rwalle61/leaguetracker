var { URL } = require('url');

const isUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;  
    }
};

const getUrlPathName = (url) => {
    return (new URL(url)).pathname;  
};

module.exports = {
    isUrl,
    getUrlPathName,
};