const {
    Storage
} = require('@google-cloud/storage');

const storage = new Storage({
    projectId: "uberfortutor-80eb9",
    keyFilename: "./serviceAccount.json"
});

const bucket = storage.bucket("uberfortutor-80eb9.appspot.com");

module.exports.UploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('Error.');
        }

        let newFileName = Date.now() + '_' + Date.now() * 2;

        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = 'https://storage.googleapis.com/' + bucket.name + '/' + fileUpload.name;

            resolve(url);
        });

        blobStream.end(file.buffer);
    });
};
