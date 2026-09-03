function conform(item1, item2) { // Item 1 is correct, item 2 is imported
    if (typeof item1 !== typeof item2) return false 

    if (typeof item1 === 'object') {
        if (Array.isArray(item1)) {
            for (let inner of item2) {
                if (!conform(inner, item1[0])) return false 
            }

            return true
        } else {
            let item1_keys = Object.keys(item1)
            let item2_keys = Object.keys(item2) 

            for (let key of item2_keys) {
                if (!item1_keys.includes(key)) continue // Ignore, do not error

                if (!conform(item1[key], item2[key])) return false 
            }

            return true
        }
    } else {
        return true
    }
}

export function hasSameStructure(struct, imp) { 
    return conform(struct, imp)
}