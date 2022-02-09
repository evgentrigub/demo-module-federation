const div = document.getElementById('div');

import("app2_tag_name/main")
    .then(module => {
        console.log("🚀 ~ app1: Success import app2! Module: ", module);
        div.innerHTML = module.default;
    })
    .catch(e => {
        console.error(e)
    })