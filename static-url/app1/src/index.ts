const div = document.getElementById('div');

import("app2/main")
    .then(module => {
        console.log("🚀 ~ app1: Success import from app2! Module: ", module);
        div.innerHTML = module.default;
    })
