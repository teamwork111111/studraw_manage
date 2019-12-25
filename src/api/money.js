import request from '@/utils/axios'

export function getMoneyIncomePay(params) {
  return request({
    url: 'http://47.95.4.199:8081/api/school/getAllSchool',
    method: 'get',
    params: params
  })
}

export function addMoney(params) {
  return request({
    // url: '/money/add',
	headers:{
		"Content-type":"application/x-www-form-urlencoded;charset=UTF-8"
	},
	url:'/hello/test',
    method: 'post',
    params: params
  })
}

export function removeMoney(params) {
  return request({
    url: '/money/remove',
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
    url: '/money/edit',
    method: 'get',
    params: params
  })
}

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }


