const BBB2ApiClient = require("..");
const configs = require("../devConfigs/configs");

describe('BackBlazeB2ApiClient Test', function () {
    let largeFileId = "";
    let tmpBucket;

    describe('authorizeAccount', function () {
        it('should authorize account', function (done) {
            BBB2ApiClient.set("accountId", configs.accountId);
            BBB2ApiClient.set("applicationKey", configs.applicationKey);
            BBB2ApiClient.authorizeAccount().then(response => {
                done();
            }).catch(error => {
                done(error);
            });
        })
    });

    describe('createBucket', function () {
        it('should create a new bucket', function (done) {
            BBB2ApiClient.createBucket("TempBucketFromBBB2", true, {nickName: "BBBSmall"}).then(response => {
                tmpBucket = response;
                done();
            }).catch(error => {
                done(error);
            });
        })
    });

    describe('startLargeFile', function () {
        it('should start a large file', function (done) {
            debugger;
            BBB2ApiClient.startLargeFile(tmpBucket.bucketId, "myTestFile.txt", "text/plain", {metadata: "ABC123"}).then((file) => {
                largeFileId = file.fileId;
                done();
            }).catch(error => {
                debugger;
                done(error);
            })
        })
    });

    describe('cancelLargeFile', function () {
        it('should cancel large file', function (done) {
            debugger;
            BBB2ApiClient.cancelLargeFile(largeFileId).then(response => {
                done();
            }).catch(error => {
                done(error);
            })
        })
    });

});