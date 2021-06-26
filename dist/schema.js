"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var graphql_tools_1 = require("graphql-tools");
// loadfilessync는 각 파일들의 export default 들을 불러오므로 설정 필요
// loadFilesSync 를 통해 파일 경로 패턴 정의
// __dirname 은 현재 실행 중인 폴더 경로   
// /**/*.typeDefs.ts : 모든 폴더의 모든 이름의 typeDefs.ts
var loadedTypes = graphql_tools_1.loadFilesSync(__dirname + "/**/*.typeDefs.*");
var loadedResolvers = graphql_tools_1.loadFilesSync(__dirname + "/**/*.resolvers.*");
exports.typeDefs = graphql_tools_1.mergeTypeDefs(loadedTypes);
exports.resolvers = graphql_tools_1.mergeResolvers(loadedResolvers);
