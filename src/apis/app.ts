import curl from "../utils/curl"
import { getClientDomain } from "../utils/domain"

import { AppInfo } from "../data/AppInfo";
import { PagingParams, PagingResult } from "../data/Paging";

async function getByDomain() {
  const response = await curl(`/api/poppy/v1/apps/domains/${encodeURIComponent(getClientDomain())}`)
  return response.data as AppInfo;
}

let getByDomainPromise: Promise<AppInfo>;

async function getByDomainWithCache() {
  getByDomainPromise = getByDomain();
  return getByDomainPromise;
}

interface CreateOrUpdateParams {
  name: string,
  email: string,
  logoImg?: string,
  intro?: string,
  remark?: string,
  footer?: string,
  footerExt?: string,
  lookAndFeel?: string,
  status?: number,
}

interface ListParams {
  name?: string,
  status?: number
}

async function list(params: PagingParams<ListParams>) {
  const response = await curl.get(`/api/poppy/v1/apps`, { params, });
  return response.data as PagingResult<AppInfo>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/apps`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/apps/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/apps/${id}`);
  return response.data as AppInfo
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/apps/${id}`);
}

export default {
  getByDomain,
  getByDomainWithCache,

  list,
  create,
  get,
  update,
  del,
}
