// // function a() {
// //   console.log('a')
// // }

// // function b() {
// //   console.log('b')
// // }

// // function a() {
// //   setTimeout(() => {
// //     console.log('a')
// //   }, 1000)
// // }

// // function b() {
// //   console.log('b')
// // }

// function a(callback) {
//   setTimeout(() => {
//     console.log('a')
//     callback()
//   }, 1000)
// }

// function b() {
//   console.log('b')
// }

// a(() => {
//   b()
// })

// function fa() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('a')
//       resolve()
//     }, 1000)
//   })
// }

// function fb() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('a')
//       resolve()
//     }, 1000)
//   })
// }

// async function asyncFunc() {
//   await fa()
//   await fb()
// }


// asyncFunc()

// function Fa() {
//   return new Promise((resolve, reject) => {
//     if (isError) {
//       reject('fuck you')
//     }
//     setTimeout(() => {
//       console.log('a')
//       resolve('done')
//     }, 1000)
//   })
// }

// a()
//   .then(res => {
//     console.log(res)
//   })
//   .catch((error) => {
//     console.log(error.message)
//   })

// async function testa() {
//   try {
//     const res = await a()
//     console.log(res)
//   } catch {
//     console.log('ss')
//   } finally {
//     console.log('done')
//   }
// }

