/*!
 * BackBlazeB2APIClient
 * Copyright(c) 2019 Domingo Sambo
 * MIT Licensed
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 * @private
 */
const request = require("request");
const is = require("is_js");
/**
 * Application prototype.
 */
let app = exports = module.exports = {};
/**
 * Variable for storage app configurations
 * @private
 */
let _configs = { baseApiUrl: "https://api.backblazeb2.com/b2api/v2/b2_authorize_account", apiVersion: "/b2api/v2/" };
/**
 * Setting application configuration.
 * @public
 */
app.set = (key, value) => {
    _configs[key] = value;
};
app.authorizeAccount = () => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("accountId")) {
            reject("The accountId is required.");
        }
        else if (!_configs.hasOwnProperty("applicationKey")) {
            reject("The applicationKey is required.");
        }
        else {
            request({
                url: _configs.baseApiUrl,
                method: "POST",
                headers: {
                    "Authorization": "Basic " + Buffer.from(_configs.accountId + ":" + _configs.applicationKey).toString('base64')
                },
                body: {},
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    app.set("authData", body);
                    resolve();
                }
            });
        }
    });
};
app.cancelLargeFile = (fileId) => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        }
        else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to cancel the upload of a large file.");
        }
        else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_cancel_large_file`,
                method: "POST",
                headers: {
                    "Authorization": _configs.authData.authorizationToken
                },
                body: {
                    fileId: fileId
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
};
app.createBucket = (bucketName, bucketPrivate = true, bucketInfo = {}, corsRules = [], lifecycleRules = []) => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        }
        else if (is.not.inArray("writeBuckets", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to create a buckets.");
        }
        else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_create_bucket`,
                method: "POST",
                headers: { "Authorization": _configs.authData.authorizationToken },
                body: {
                    accountId: _configs.accountId,
                    bucketType: bucketPrivate ? "allPrivate" : "allPublic",
                    bucketInfo,
                    corsRules,
                    lifecycleRules
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
};
app.createKey = (capabilities, keyName, validDurationInSeconds, bucketId, namePrefix) => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        }
        else if (is.not.inArray("writeKeys", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to create buckets.");
        }
        else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_create_key`,
                method: "POST",
                headers: { "Authorization": _configs.authData.authorizationToken },
                body: {
                    accountId: _configs.accountId,
                    capabilities,
                    keyName,
                    validDurationInSeconds,
                    namePrefix
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
};
app.deleteBucket = (bucketId) => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        }
        else if (is.not.inArray("deleteBuckets", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to delete buckets.");
        }
        else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_delete_bucket`,
                method: "POST",
                headers: { "Authorization": _configs.authData.authorizationToken },
                body: {
                    accountId: _configs.accountId,
                    bucketId
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
};
app.deleteFileVersion = (fileName, fileId) => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        }
        else if (is.not.inArray("deleteFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to delete files.");
        }
        else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_delete_file_version`,
                method: "POST",
                headers: { "Authorization": _configs.authData.authorizationToken },
                body: {
                    fileName,
                    fileId
                },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
};
app.deleteKey = (applicationKeyId) => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        }
        else if (is.not.inArray("deleteKeys", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to delete keys.");
        }
        else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_delete_key`,
                method: "POST",
                headers: { "Authorization": _configs.authData.authorizationToken },
                body: { applicationKeyId },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
};
app.downloadFileById = (fileId, range, b2ContentDisposition) => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        }
        else if (is.not.inArray("readFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to download files.");
        }
        else {
            let headers = { "Authorization": _configs.authData.authorizationToken };
            if (range) {
                headers.range = range;
            }
            if (b2ContentDisposition) {
                headers.b2ContentDisposition = b2ContentDisposition;
            }
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_download_file_by_id`,
                method: "POST",
                headers: headers,
                body: { fileId },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
};
app.downloadFileByName = () => {
    return new Promise((resolve, reject) => {
    });
};
app.finishLargeFile = (fileId, partSha1Array) => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        }
        else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to finish large files.");
        }
        else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_finish_large_file`,
                method: "POST",
                headers: { "Authorization": _configs.authData.authorizationToken },
                body: { fileId, partSha1Array },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
};
app.getDownloadAuthorization = () => {
    return new Promise((resolve, reject) => {
    });
};
app.getFileInfo = () => {
    return new Promise((resolve, reject) => {
    });
};
app.getUploadPartUrl = () => {
    return new Promise((resolve, reject) => {
    });
};
app.getUploadUrl = () => {
    return new Promise((resolve, reject) => {
    });
};
app.hideFile = () => {
    return new Promise((resolve, reject) => {
    });
};
app.listBuckets = () => {
    return new Promise((resolve, reject) => {
    });
};
app.listFileNames = () => {
    return new Promise((resolve, reject) => {
    });
};
app.listFileVersions = () => {
    return new Promise((resolve, reject) => {
    });
};
app.listKeys = () => {
    return new Promise((resolve, reject) => {
    });
};
app.listParts = () => {
    return new Promise((resolve, reject) => {
    });
};
app.listUnfinishedLargeFiles = () => {
    return new Promise((resolve, reject) => {
    });
};
app.startLargeFile = (bucketId, fileName, contentType, fileInfo = {}) => {
    return new Promise((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        }
        else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to upload a large file.");
        }
        else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_start_large_file`,
                method: "POST",
                headers: { "Authorization": _configs.authData.authorizationToken },
                body: { bucketId, fileName, contentType, fileInfo },
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                else if (response.statusCode !== 200) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        }
    });
};
// () {
// }
//
// createKey() {
// }
//
// deleteBucket() {
// }
//
// deleteFileVersion() {
// }
//
// deleteKey() {
// }
//
// downloadFileById() {
// }
//
// downloadFileByName() {
// }
//
// finishLargeFile() {
// }
//
// getDownloadAuthorization() {
// }
//
// getFileInfo() {
// }
//
// getUploadPartUrl() {
// }
//
// getUploadUrl() {
// }
//
// hideFile() {
// }
//
// listBuckets() {
// }
//
// listFileNames() {
// }
//
// listFileVersions() {
// }
//
// listKeys() {
// }
//
// listParts() {
// }
//
// listUnfinishedLargeFiles() {
// }
//
// startLargeFile() {
// }
//
// updateBucket() {
// }
//
// uploadFile() {
// }
//
// uploadPart() {
// }
app.updateBucket = () => {
    return new Promise((resolve, reject) => {
    });
};
app.uploadFile = () => {
    return new Promise((resolve, reject) => {
    });
};
app.uploadPart = () => {
    return new Promise((resolve, reject) => {
    });
};
//# sourceMappingURL=BBB2ApiClient.js.map