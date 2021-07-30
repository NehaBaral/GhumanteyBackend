const SERVER_URL = "192.168.27.131:3000"
const fileToUrl = (fileName) => {
    return fileName?`http://${SERVER_URL}/${fileName}`:null
}

const addBaseUrlToPackageImage = (package) => {
    let response = package.toObject()
    response.image = fileToUrl(package.image)
    return response
}

module.exports = {
    fileToUrl: fileToUrl,
    addBaseUrlToPackageImage: addBaseUrlToPackageImage
}