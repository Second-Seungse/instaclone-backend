"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromS3 = exports.uploadToS3 = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});
/**
 * ex) Upload file to S3
 * @param {String} attachmentId the attachment id
 * @param {Buffer} data the file data
 * @param {String} mimetype the MIME type
 * @param {String} fileName the original file name
 * @return {Promise} promise to upload file to S3
 */
var uploadToS3 = function (file, userId, folderName) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, createReadStream, readStream, objectName, Location_1, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, file];
            case 1:
                _a = _b.sent(), filename = _a.filename, createReadStream = _a.createReadStream;
                readStream = createReadStream();
                objectName = folderName + "/" + userId + "-" + Date.now() + "-" + filename;
                return [4 /*yield*/, new aws_sdk_1.default.S3()
                        .upload({
                        Bucket: process.env.AWS_BUCKET,
                        Key: objectName,
                        ACL: "public-read",
                        Body: readStream,
                    }, function (err) {
                        if (err)
                            console.log("err", err);
                    })
                        .promise()];
            case 2:
                Location_1 = (_b.sent()).Location;
                return [2 /*return*/, Location_1];
            case 3:
                e_1 = _b.sent();
                return [2 /*return*/, e_1];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.uploadToS3 = uploadToS3;
/**
 * * Delete file from S3
 * @param {String} attachmentId the attachment id
 * @return {Promise} promise resolved to deleted data
 */
var deleteFromS3 = function (fileUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var objectName, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                objectName = fileUrl.replace("https://" + process.env.AWS_BUCKET + ".s3." + process.env.AWS_REGION + ".amazonaws.com/", "");
                return [4 /*yield*/, new aws_sdk_1.default.S3()
                        .deleteObject({
                        Bucket: process.env.AWS_BUCKET,
                        Key: objectName,
                    }, function (err) {
                        if (err)
                            console.log("err", err);
                    })
                        .promise()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                return [2 /*return*/, e_2];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteFromS3 = deleteFromS3;
/**
 * Download file from S3
 * @param {String} attachmentId the attachment id
 * @return {Promise} promise resolved to downloaded data
 */
/*
async function downloadFromS3(attachmentId) {
  const file = await s3
    .getObject({
      Bucket: config.AMAZON.ATTACHMENT_S3_BUCKET,
      Key: attachmentId,
    })
    .promise();
  return {
    data: file.Body,
    mimetype: file.ContentType,
  };
}
 */
