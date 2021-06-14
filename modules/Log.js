const { withScope, captureException, Severity } = require("@sentry/node");

async function LogError(type, err, obj){
    if (!type) {
        type = "Fatal"
    }

    if (!err) {
        err = "Error not specified."
    }

    await withScope((scope) => {
        scope.setLevel(Severity[type])

        if (obj) {
            for (const key of Object.keys(obj)) {
                scope.setExtra(key, obj[key])
            }
        }
    })

    try {
        await captureException(err)
    } catch (err) {
        console.log(`Failed to capture exception to Sentry. ${err}`)
    }
}

module.exports = LogError