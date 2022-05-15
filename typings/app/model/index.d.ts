// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBill = require('../../../app/model/bill');
import ExportType = require('../../../app/model/type');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Bill: ReturnType<typeof ExportBill>;
    Type: ReturnType<typeof ExportType>;
    User: ReturnType<typeof ExportUser>;
  }
}
