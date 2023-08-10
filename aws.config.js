const { DynamoDB } = require('@aws-sdk/client-dynamodb')

const region = "us-east-1"

const client = new DynamoDB({ region })

/* PERFORMING CRUD OPERATIONS */

// console.log(client);
const createCustomerTable = async () => {
    const params = {
        TableName: "Customer",
        AttributeDefinitions: [
            {
                AttributeName: "Email",
                AttributeType: "S"
            },
        ],
        KeySchema: [
            {
                AttributeName: "Email",
                KeyType: "HASH"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    client.createTable(params, (err, data) => {
        if (err) console.error(err);
        else {
            console.log(data);
        }
    });
}

// createCustomerTable();

const createCustomer = (customer) => {
    const params = {
        TableName: "Customer",
        Item: customer
    }

    client.putItem(params, (err, data) => {
        if (err) console.error(err)
        else {
            console.log(data.Attributes)
        }
    })
}

const getAllCustomers = async () => {
    const params = {
        TableName: "Customer"
    }
    const customers = await client.scan(params)
    console.log(customers.Items)
}

const getCustomerByEmail = async (email) => {
    const params = {
        TableName: "Customer",
        Key: {
            Email: { "S": email }
        }
    }
    const customer = await client.getItem(params)
    console.log(customer.Item)
}

const updateCustomerAge = async (email, age) => {
    const params = {
        TableName: "Customer",
        Key: {
            Email: { "S": email}
        },
        UpdateExpression: "SET Age = :newAge",
        ExpressionAttributeValues: {
            ':newAge': { "N": age }
        },
        ReturnValues: "ALL_NEW"
    }

    const updatedCustomer = await client.updateItem(params)
    console.log(updatedCustomer.Attributes)
}

const deleteCustomer = async (email) => {
    const params = {
        TableName: "Customer",
        Key: {
            Email: { "S": email }
        }
    }
    client.deleteItem(params, (err, data) => {
        if (err) console.error(err)
        else {
            console.log("Customer deleted successfully")
        }
    })
}

const customerData = {
    Name: { "S": "Timilehin Omo" },
    Email: { "S": "timtim2@makeuseof.com" },
    Age: { "N": "20"},
    Country: { "S": "Nigeria" }
}

// createCustomer(customerData)
// getAllCustomers();
// getCustomerByEmail("timtim@makeuseof.com")
// updateCustomerLocation("timtim@makeuseof.com", "25")
// deleteCustomer("timtim@makeuseof.com")

