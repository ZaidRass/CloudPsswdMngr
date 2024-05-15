const AWS = require("aws-sdk");
const sharp = require("sharp");

// Initialize the AWS SDK with your AWS credentials
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  try {
    // Get the uploaded image key and bucket name from the event
    const bucketName = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(
      event.Records[0].s3.object.key.replace(/\+/g, " ")
    );

    // Resize the image
    const resizedImage = await sharp(event.Records[0].s3.object.key)
      .resize({ width: 512, height: 512, fit: "inside" }) // Resize to 512x512 pixels
      .toBuffer();

    // Upload the resized image to S3
    await s3
      .putObject({
        Bucket: "ezzat", // Your bucket name
        Key: "resized/" + key, // New key for the resized image
        Body: resizedImage,
        ContentType: "image/jpeg", // Adjust based on your image type
      })
      .promise();

    // Update DynamoDB with the resized image URL or any other relevant information
    await docClient
      .update({
        TableName: "Users", // Your DynamoDB table name
        Key: {
          userId: "yourUserId", // Specify the user ID
        },
        UpdateExpression: "SET #imageUrl = :imageUrl",
        ExpressionAttributeNames: {
          "#imageUrl": "imageUrl", // Update this to match your attribute name
        },
        ExpressionAttributeValues: {
          ":imageUrl": `https://ezzat.s3.amazonaws.com/resized/${key}`, // URL of the resized image
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify("Image resized and updated successfully"),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};

// Use the invoke method of the AWS.Lambda class to invoke your Lambda function
const params = {
  FunctionName: 'lambda', // Specify the name of your Lambda function
  Payload: JSON.stringify({}) // Pass any input payload if required
};

lambda.invoke(params, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});