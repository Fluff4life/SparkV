const ejslint = require("ejs-lint");

const Render = async (response, request, view, data) => {
    if (!data) {
        data = {};
    }

    const BaseData = {
        path: request.path,
        user: request.isAuthenticated() ? request.user : null,
    };

    ejslint(view)
    response.status(200).render(view, Object.assign(BaseData, data))
};

module.exports = Render;