import request from '@/utils/axios'

export function getMoneyIncomePay(params) {
	console.log("getMoneyIncomePay===="+JSON.stringify(params));
  return request({
    url: 'http://47.95.4.199:8081/api/school/getAllSchool',
    method: 'get',
    params: params
  })
}

export function addMoney(params) {
  return request({
    url: 'http://47.95.4.199:8081/api/school/addSchool',
    method: 'post',
    params: params
  })
}

export function removeMoney(params) {
	console.log("removeMoney===="+JSON.stringify(params));
  return request({
    url: 'http://47.95.4.199:8081/api/school/delSchool',//http://47.95.4.199:8081/swagger-ui.html
    method: 'get',
    params: params
  })
}


export function batchremoveMoney(params) {
  return request({
    url: '/money/batchremove',
    method: 'get',
    params: params
  })
}

export function updateMoney(params) {
  return request({
    url: 'http://47.95.4.199:8081/api/school/uptSchool',
    method: 'get',
    params: params
  })
}

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }


