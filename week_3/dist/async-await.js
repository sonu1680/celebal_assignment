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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function readFileAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs_1.promises.readFile("./data.txt", "utf8");
            console.log("File content:", data);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error("Error reading file:", err.message);
            }
            else {
                console.error("Unknown error:", err);
            }
        }
    });
}
readFileAsync();
