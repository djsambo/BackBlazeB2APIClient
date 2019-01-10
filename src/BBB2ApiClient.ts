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
import {strict} from "assert";

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
            throw Error("You don't have permissions to create buckets.");
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

app.deleteBucket = (bucketId: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("deleteBuckets", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to delete buckets.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_delete_bucket`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {
                    accountId: _configs.accountId,
                    bucketId
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

app.deleteFileVersion = (fileName: string, fileId: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("deleteFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to delete files.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_delete_file_version`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {
                    fileName,
                    fileId
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

app.deleteKey = (applicationKeyId: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("deleteKeys", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to delete keys.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_delete_key`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {applicationKeyId},
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

app.downloadFileById = (fileId: string, range?: string, b2ContentDisposition?: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("readFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to download files.");
        } else {

            let headers: any = {"Authorization": _configs.authData.authorizationToken};

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
                body: {fileId},
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

app.downloadFileByName = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

    });
};

app.finishLargeFile = (fileId: string, partSha1Array: any[]): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to finish large files.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_finish_large_file`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {fileId, partSha1Array},
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

app.getDownloadAuthorization = (bucketId: string, fileNamePrefix: string, validDurationInSeconds: number, b2ContentDisposition?: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("shareFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to get a download authorization.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_get_download_authorization`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {bucketId, fileNamePrefix, validDurationInSeconds, b2ContentDisposition},
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

app.getFileInfo = (fileId: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("readFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to get file info.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_get_file_info`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {fileId},
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

app.getUploadPartUrl = (fileId: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to get upload part url.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_get_file_info`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {fileId},
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

app.getUploadUrl = (bucketId: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to get bucket upload url.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_get_upload_url`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {bucketId},
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

app.hideFile = (bucketId: string, fileName: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to hide files.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_list_buckets`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {bucketId, fileName},
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

app.listBuckets = (bucketId?: string, bucketName?: string, bucketTypes?: string[]): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("listBuckets", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to list buckets.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_list_buckets`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {bucketId, bucketName, bucketTypes},
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

app.listFileNames = (bucketId: string, startFileName?: string, maxFileCount?: number, prefix?: string, delimiter?: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("listFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to list files.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_list_file_names`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {bucketId, startFileName, maxFileCount, prefix, delimiter},
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

app.listFileVersions = (bucketId: string, startFileName?: string, startFileId?: string, maxFileCount?: number, prefix?: string, delimiter?: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("listFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to list files versions.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_list_file_versions`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {bucketId, startFileName, startFileId, maxFileCount, prefix, delimiter},
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

app.listKeys = (maxKeyCount?: number, startApplicationKeyId?: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("listKeys", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to list keys.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_list_keys`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {accountId: _configs.accountId, maxKeyCount, startApplicationKeyId},
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

app.listParts = (fileId: string, startPartNumber?: number, maxPartCount?: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to list parts.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_list_parts`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {fileId, startPartNumber, maxPartCount},
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

app.listUnfinishedLargeFiles = (bucketId: string, namePrefix?: string, startFileId?: string, maxFileCount?: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("listFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to list unfinished large files.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_list_unfinished_large_files`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {bucketId, namePrefix, startFileId, maxFileCount},
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

app.updateBucket = (bucketId: string, bucketType?: string, bucketInfo?: any, corsRules?: any[], lifecycleRules?: any[], ifRevisionIs?: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeBuckets", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to update bucket.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_update_bucket`,
                method: "POST",
                headers: {"Authorization": _configs.authData.authorizationToken},
                body: {
                    accountId: _configs.accountId,
                    bucketId,
                    bucketType,
                    bucketInfo,
                    corsRules,
                    lifecycleRules,
                    ifRevisionIs
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

app.uploadFile = (xbzFileName: string,
                  contentType: string,
                  contentLength: number,
                  xbzContentSha1: string,
                  xbzInfoSrcLastModifiedMillis?: string,
                  xbzInfoB2ContentDisposition?: string,
                  xbzInfoX?: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to upload file.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_upload_file`,
                method: "POST",
                headers: {
                    "Authorization": _configs.authData.authorizationToken,
                    "X-Bz-File-Name": xbzFileName,
                    "Content-Type": contentType,
                    "Content-Length": contentLength,
                    "X-Bz-Content-Sha1": xbzContentSha1,
                    "X-Bz-Info-src_last_modified_millis": xbzInfoSrcLastModifiedMillis,
                    "X-Bz-Info-b2-content-disposition": xbzInfoB2ContentDisposition,
                    "X-Bz-Info-*": xbzInfoX,
                },
                body: {},
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

app.uploadPart = (xbzPartNumber: string, contentLength: number, xbzContentSha1: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        if (!_configs.hasOwnProperty("authData")) {
            throw Error("You should authorize the account first.");
        } else if (is.not.inArray("writeFiles", _configs.authData.allowed.capabilities)) {
            throw Error("You don't have permissions to upload part.");
        } else {
            request({
                url: `${_configs.authData.apiUrl}${_configs.apiVersion}b2_upload_part`,
                method: "POST",
                headers: {
                    "Authorization": _configs.authData.authorizationToken,
                    "X-Bz-Part-Number": xbzPartNumber,
                    "Content-Length": contentLength,
                    "X-Bz-Content-Sha1": xbzContentSha1
                },
                body: {},
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