'use strict';

var gpiop = require('rpi-gpio').promise;
// const AWS = require('aws-sdk')

// let counter = 0

// console.log('starting:')

// // const x = new AWS.S3()

// const f = async () => {
//     // console.log('s3 data:')
//     // console.log(JSON.stringify(await x.listBuckets().promise(), null, 2))
//   console.log(`Counter: ${counter++}`)
// }

// f()
// setInterval(f, 5000)


 
console.log('GPIO Setup')

const start = async () => {
  try {
    console.log('setup')
    await gpiop.setup(7, gpiop.DIR_OUT)
    console.log('write')
    await gpiop.write(7, true)
    console.log('destroy')
    await gpiop.destroy()
    console.log('setup')
  } catch(err) {
    console.log('Error:')
    console.log(err)
  }
}


start()
setInterval(start, 5000)

process.once('SIGTERM', function (code) {
  gpiop.destroy()
});


module.exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
