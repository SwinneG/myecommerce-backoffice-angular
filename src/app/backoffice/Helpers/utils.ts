export const formatToCamelCase = (name: string) => {
    return name.charAt(0).toUpperCase()+name.slice(1)
}

export const getExtension = (fileName: string) => {
    var parts = fileName.split('.')
    return parts[parts.length - 1]
}

export const isImage = (fileName: string) => {
    var ext = getExtension(fileName)
    switch(ext.toLowerCase()) {
        case 'jpg' :
        case 'gif' :
        case 'bmp' :
        case 'png' :
            return true
    }
    return false
}