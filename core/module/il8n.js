/*
    il8n helper
    @author Birkhoff Lee
 */

function register () {
    if (typeof config.lang == "undefined") {
        config.lang = "en-US";
    }

    var lang = config.lang;
    var langPath = core.paths.lang + "/lang_" + lang + ".js";

    try {
        require.resolve(langPath);
    } catch (e) {
        new Error("Could not load lang file: " + langPath);
    }

    return require(langPath);
}

module.exports = {register: register};
