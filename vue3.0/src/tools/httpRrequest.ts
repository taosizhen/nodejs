import axios from 'axios'
import router from '@/router'
import qs from 'qs'

axios.defaults.timeout = 30000
const httpRequest = axios.create({
    timeout: 1000 * 30,
    withCredentials: true
})
const BASE_URL = 'api/'
// ajax请求方法封装
const http = {
    get(url: string, params: any, success: any, fail = null) {
        this.doAjax(url, 'get', null, success, fail)
    },
    post(url: any, params: any, success: any, fail = null, contentType = 'form') {
        let headers = null
        if (contentType !== 'form') {
            headers = {
                'Content-Type': 'application/json'
            }
            params = JSON.stringify(params)
        } else {
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            params = qs.stringify(params)
        }
        this.doAjax(url, 'post', params, success, fail, headers)
    },
    download(url: string, params: any, filename: any, fileExt = '.zip') {
        axios({
            method: 'get',
            url: BASE_URL + url,
            responseType: 'blob',
            params: params
        }).then((res) => {
            // console.log(res)
            if (!res) {
                return
            }
            const csvData = new Blob([res.data])
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(csvData, filename + fileExt)
            } else {
                const url = window.URL.createObjectURL(res.data)
                const link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', filename + fileExt)
                document.body.appendChild(link)
                link.click()
            }
        })
    },
    /**
     * 获取验证码的api
     * @returns {string}
     */
    getCaptcha(url: any) {
        return BASE_URL + url + '?uuid=' + new Date().getTime()
    },
    /**
     * ajax请求方法
     * @param url
     * @param method
     * @param params
     * @param success
     * @param fail
     * @param headers
     */
    doAjax(url: any, method: any, params: any, success: any, fail = null, headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }) {
        console.log(89, process.env)
        httpRequest({
            url: BASE_URL + url,
            method: method,
            data: params,
            headers: headers
        }).then((callback) => {
            this.handle(callback, success, fail)
        }).catch((error) => {
            console.log(error)
        })
    },
    /**
     * 响应体处理
     * @param callback
     */
    handle(callback: any, success: any, fail: any) {
        const code = callback.data.code
        if (code === 1) {
            success(callback.data)
        } else if (code === 403) {
            router.push({ name: 'login' })
        } else {
            if (fail !== null) {
                fail(callback.data)
            }
        }
    }
}

export default http
