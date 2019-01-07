/*!
 * BackBlazeB2APIClient
 * Copyright(c) 2019 Domingo Sambo
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

import * as request from "request";
import * as is from "is_js";

/**
 * Application prototype.
 */

let app: any = exports = module.exports = {};


/**
 * Variable for storage app configurations
 * @private
 */

let _configs: any = {baseApiUrl: "https://api.backblazeb2.com/b2api/v2/b2_authorize_account", apiVersion: "/b2api/v2/"};

/**
 * Setting application configuration.
 * @public
 */

app.set = (key: string, value: any) => {
    _configs[key] = value;
};


app.authorizeAccount = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("accountId")) {
            reject("The accountId is required.");
        } else if (!_configs.hasOwnProperty("applicationKey")) {
            reject("The applicationKey is required.");
        } else {
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
                } else if (response.statusCode !== 200) {
                    reject(body);
                } else {
                    app.set("authData", body);
                    resolve();
                }
            });
        }
    })
};

app.cancelLargeFile = (fileId: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to cancel the upload of a large file.");
        } else {
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
                } else if (response.statusCode !== 200) {
                    reject(body);
                } else {
                    resolve(body);
                }
            });
        }
    });
};

app.createBucket = (bucketName: string, bucketPrivate: boolean = true, bucketInfo: any = {}, corsRules: any[] = [], lifecycleRules: any[] = []): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeBuckets", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to create a buckets.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_create_bucket`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
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
                } else if (response.statusCode !== 200) {
                    reject(body);
                } else {
                    resolve(body);
                }
            });
        }
    });
};

app.createKey = (capabilities: string[], keyName: string, validDurationInSeconds?: number, bucketId?: string, namePrefix?: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeKeys", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to create a buckets.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_create_key`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
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
                } else if (response.statusCode !== 200) {
                    reject(body);
                } else {
                    resolve(body);
                }
            });
        }
    });
};

app.deleteBucket = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.deleteFileVersion = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.deleteKey = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.downloadFileById = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.downloadFileByName = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.finishLargeFile = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.getDownloadAuthorization = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.getFileInfo = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.getUploadPartUrl = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.getUploadUrl = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.hideFile = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.listBuckets = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.listFileNames = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.listFileVersions = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.listKeys = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.listParts = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.listUnfinishedLargeFiles = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.startLargeFile = (bucketId: string, fileName: string, contentType: string, fileInfo: any = {}): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to upload a large file.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_start_large_file`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {bucketId, fileName, contentType, fileInfo},
                json: true
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else if (response.statusCode !== 200) {
                    reject(body);
                } else {
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

app.updateBucket = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.uploadFile = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.uploadPart = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};