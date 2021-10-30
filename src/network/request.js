import axios from "axios"

export function request(baseConfig,get){

    const config = axios.create(baseConfig)
    return config({
      url:get.url,
      method:get.method
    })

}

// export function request(config,success,failure){

//     const instance = axios.create({
//         baseURL:"http://123.207.32.32:8000",
//         timeout:5000
//     })

//         //发送真正的网络请求
//     instance(config).then(
//         res=>{
//             success(res)
//         }
//     ).catch( err => {
//     failure(res)
// })
// }

//promise方式
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: "http://123.207.32.32:8000",
//       timeout: 5000
//     })

//     //发送真正的网络请求
//     instance(config).then(
//       res => {
//         resolve(res)

//       }).catch(err => {
//       reject(err)

//     })

//   })

// }

//直接promise方式
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: "http://123.207.32.32:8000",
//       timeout: 5000
//     })

//     // instance.interceptors.request.use(config => {
//     //   return config
//     // }, err => {
//     //   console.log(err);
//     // })
//     // instance.interceptors.response.use(res => {
//     //   return res.data
//     // }, err => {
//     //   console.log(err);
//     // })
//     const target = instance(config)


//     //发送真正的网络请求
//     return target
//   })
// }

// }

// export function request(config) {
//   const instance = axios.create({
//     baseURL: "http://123.207.32.32:8000",
//     timeout: 5000
//   })


//   instance.interceptors.request.use(config => {
//     console.log(config);
//   }, err => {
//     console.log(err);
//   })

// }
