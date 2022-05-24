const { transaction, user } = require("../../models");

const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");

// GET TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {
    let data = await transaction.findAll({
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["createdAt", "DESC"]],
    });

    console.log("GET TRANSACTIONS: ", data);

    // data = JSON.parse(JSON.stringify(data));

    res.status(200).send({
      status: "Get data Transaction Success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Get data Transactions Failed",
      message: "Server Error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    let data = await transaction.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        id,
      },
    });
    res.status(200).send({
      status: "Get data Transaction Success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Get data Transactions Failed",
      message: "Server Error",
    });
  }
};

// =========== DELETE TRANSACTION =============
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await transaction.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: "Delete Transaction Success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Delete Transactions Failed",
      message: "Server Error",
    });
  }
};

// =========== ADD TRANSACTION =============
exports.addTransaction = async (req, res) => {
  try {
    // Prepare transaction data from body here ...
    let data = req.body;

    data = {
      id: parseInt(data.idPremium + Math.random().toString().slice(3, 8)),
      ...data,
      userId: req.user.id,
      status: "pending",
    };

    console.log("Catch Data: ", data.price);

    // Insert data transaction to database
    const newData = await transaction.create(data);

    // Get user
    const buyerData = await user.findOne({
      where: {
        id: newData.userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    // Create parameter for Snap API
    let parameter = {
      transaction_details: {
        order_id: newData.id,
        gross_amount: newData.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        full_name: buyerData?.name,
        email: buyerData?.email,
        phone: buyerData?.phone,
      },
    };

    // create transaction
    const payment = await snap.createTransaction(parameter);

    res.send({
      status: "Pending",
      message: "Pending transaction payment gateway",
      payment,
      premium:{
          id: data.idPremium
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      status: "Payment Failed",
      message: "Server Error",
    });
  }
};

// Configurate midtrans client with CoreApi
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

/**
 *  Handle update transaction status after notification
 * from midtrans webhook
 * @param {string} status
 * @param {transactionId} transactionId
 */

// Create function for handle https notification / WebHooks of payment status here ...
exports.notification = async (req, res) => {
  try {
    console.log("notification", req.body);
    const statusResponse = await core.transaction.notification(req.body);
    const orderId = statusResponse.order_id; // id transaksi
    const transactionStatus = statusResponse.transaction_status; //status transaction database
    const fraudStatus = statusResponse.fraud_status; //status transaction midtrans

    console.log(statusResponse);
    console.log("paymentType1", statusResponse?.payment_type);
    console.log("paymentType2", statusResponse?.notification);

    if (transactionStatus == "capture") {
      if (fraudStatus == "challenge") {
        // TODO set transaction status on your database to 'challenge'
        // and response with 200 OK
        // sendEmail("pending", orderId);
        updateTransaction("pending", orderId, false, statusResponse?.payment_type);
        res.status(200);
      } else if (fraudStatus == "accept") {
        // TODO set transaction status on your database to 'success'
        // and response with 200 OK
        // sendEmail("success", orderId);
        updateTransaction("success", orderId, true, statusResponse?.payment_type, statusResponse?.transaction_time, statusResponse?.gross_amount);
        res.status(200);
      }
    } else if (transactionStatus == "settlement") {
      // TODO set transaction status on your database to 'success'
      // and response with 200 OK
      // sendEmail("success", orderId);
      updateTransaction("success", orderId, true, statusResponse?.payment_type, statusResponse?.transaction_time, statusResponse?.gross_amount);
      res.status(200);
    } else if (transactionStatus == "cancel" || transactionStatus == "deny" || transactionStatus == "expire") {
      // TODO set transaction status on your database to 'failure'
      // and response with 200 OK
      // sendEmail("failed", orderId);
      updateTransaction("failed", orderId, false, statusResponse?.payment_type);
      res.status(200);
    } else if (transactionStatus == "pending") {
      // TODO set transaction status on your database to 'pending' / waiting payment
      // and response with 200 OK
      // sendEmail("pending", orderId);
      updateTransaction("pending", orderId, false, statusResponse?.payment_type);
      res.status(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const updateTransaction = async () => {
  try {
    await transaction.update(
      {
        status,
        paymentMethod,
      },
      {
        where: {
          id: transactionId,
        },
      }
    );



    const getUserId = await transaction.findOne({
      where: {
        id: transactionId,
      },
    });

    await user.update(
      { statusPayment: statusPayment },
      {
        where: {
          id: getUserId.userId,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
