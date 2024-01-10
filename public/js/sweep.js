function sweep(array = [], key = '', callback) {
    let k = key.split('.')
    array.map(function (r, i, o) {
        for (let i = 0; i < k.length; i++) {
            r = r[k[i]]
        }

        callback(r, { index: i, array: o })

        if (r.length > 0) {
            sweep(r, key, callback)
        }
    })

    return array
}