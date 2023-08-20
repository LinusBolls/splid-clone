import axios from 'axios';

import { getCurrencies } from './methods/currencies/getCurrencies';
import { getCurrency } from './methods/currencies/getCurrency';
import { createExpenseCategory } from './methods/expenseCategories/createExpenseCategory';
import { deleteExpenseCategory } from './methods/expenseCategories/deleteExpenseCategory';
import { getExpenseCategoriesByGroup } from './methods/expenseCategories/getExpenseCategoriesByGroup';
import { getExpenseCategory } from './methods/expenseCategories/getExpenseCategory';
import { createExpense } from './methods/expenses/createExpense';
import { deleteExpense } from './methods/expenses/deleteExpense';
import { getExpense } from './methods/expenses/getExpense';
import { getExpensesByGroup } from './methods/expenses/getExpensesByGroup';
import { updateExpense } from './methods/expenses/updateExpense';
import { createGroupMember } from './methods/groupMembers/createGroupMember';
import { deleteGroupMember } from './methods/groupMembers/deleteGroupMember';
import { getGroupMember } from './methods/groupMembers/getGroupMember';
import { getGroupMembersByGroup } from './methods/groupMembers/getGroupMembersByGroup';
import { updateGroupMember } from './methods/groupMembers/updateGroupMember';
import { createGroup } from './methods/groups/createGroup';
import { deleteGroup } from './methods/groups/deleteGroup';
import { getGroup } from './methods/groups/getGroup';
import { getGroupsByInviteCode } from './methods/groups/getGroupsByInviteCode';
import { RequestConfig } from './requestConfig';
import { FuncWithoutConfigArg } from './util';

export default class PalmtreeClient {
  private readonly requestConfig: RequestConfig;

  private injectRequestConfig<
    F extends (requestConfig: RequestConfig, ...args: any[]) => any
  >(f: F) {
    const newF: FuncWithoutConfigArg<typeof f> = (...args) => {
      return f(this.requestConfig, ...args);
    };
    return newF;
  }

  constructor() {
    const httpClient = axios.create();

    const baseUrl = 'https://api.palmtree.ovh';

    const getHeaders = () => ({});

    this.requestConfig = {
      httpClient,
      baseUrl,
      getHeaders,
    };
  }
  expenses = {
    create: this.injectRequestConfig(createExpense),
    delete: this.injectRequestConfig(deleteExpense),
    get: this.injectRequestConfig(getExpense),
    getByGroup: this.injectRequestConfig(getExpensesByGroup),
    update: this.injectRequestConfig(updateExpense),
  };
  groups = {
    create: this.injectRequestConfig(createGroup),
    delete: this.injectRequestConfig(deleteGroup),
    get: this.injectRequestConfig(getGroup),
    getByInviteCode: this.injectRequestConfig(getGroupsByInviteCode),
  };
  groupMembers = {
    create: this.injectRequestConfig(createGroupMember),
    delete: this.injectRequestConfig(deleteGroupMember),
    get: this.injectRequestConfig(getGroupMember),
    getByGroup: this.injectRequestConfig(getGroupMembersByGroup),
    update: this.injectRequestConfig(updateGroupMember),

    paymentDetails: {},
  };
  currencies = {
    get: this.injectRequestConfig(getCurrency),
    getAll: this.injectRequestConfig(getCurrencies),
  };
  expenseCategories = {
    create: this.injectRequestConfig(createExpenseCategory),
    delete: this.injectRequestConfig(deleteExpenseCategory),
    getByGroup: this.injectRequestConfig(getExpenseCategoriesByGroup),
    get: this.injectRequestConfig(getExpenseCategory),
  };
}
