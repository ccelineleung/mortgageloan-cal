const db = require('../models/dbModels');

const apiController = {};

//retrive all the homeInfos from the user
apiController.allSavedforId = async (req, res, next) => {
  const { userId } = req.body;
  const param = [userId];
  console.log(`USERID reqbody`, req.body);
  try {
    const allDatafromUserQuery = `
        SELECT * FROM homedata
        WHERE user_id = $1 
        
        `;
    const allDatafromUser = await db.query(allDatafromUserQuery, param);
    // console.log(`allDatafromUser`,allDatafromUser)
    res.locals.status = allDatafromUser.rows;
    return next();
  } catch (error) {
    return next({
      log: 'Express error in allSavedforId middleware',
      status: 400,
      message: {
        err: `apiController.allSavedforId: ERROR: ${error}`,
      },
    });
  }
};

//edit the home info
apiController.editHomeInfo = async (req, res, next) => {
  const { user_id, home_id, name, address, additionalInfo } = req.body;
  const param = [user_id, home_id, name, address, additionalInfo];

  try {
    const deleteQuery = `
        UPDATE homedata
        SET name = $3 AND address = 4$ AND additionalInfo = $5
        WHERE home_id = $2
        RETURNING *
          `;

    const data = await db.query(deleteQuery, param);
    res.local.status = {
      message: 'home info has been updated',
    };
    return next();
  } catch (error) {
    return next({
      log: 'Express error in editHomeInfo middleware',
      status: 400,
      message: {
        err: `apiController.editHomeInfo: ERROR: ${error}`,
      },
    });
  }
};

//delete the home
apiController.deleteHome = async (req, res, next) => {
  const { user_id, home_id } = req.body;
  const param = [user_id, home_id];

  try {
    const deleteQuery = `
        DELETE FROM homedata
        WHERE user_id = $1 AND home_id = $2
        RETURNING *
        `;

    const data = await db.query(deleteQuery, param);
    // res.local.status = data.rows
    // console.log(`data from backend`,data.rows)
    return next();
  } catch (error) {
    console.log(error.message)
    return next({
      log: 'Express error in deleteHome middleware',
      status: 400,
      message: {
        err: `apiController.deleteHome: ERROR: ${error}`,
      },
    });
  }
};

//save the home info
apiController.addtoDB = async (req, res, next) => {
  const {
    userId,
    homeValue,
    loanAmount,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    PMIFee,
    homeInsurance,
    HOA,
    monthlyPayment,
    finalFees,
    name,
    address,
    additionalInfo,
  } = req.body;
  const param = [
    userId,
    homeValue,
    loanAmount,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax,
    PMIFee,
    homeInsurance,
    HOA,
    monthlyPayment,
    finalFees,
    name,
    address,
    additionalInfo,
  ];
  console.log(param)
  try {
    const addtoDBQuery = `
    INSERT INTO homedata(user_id,homevalue,loanamount,downpayment,interest,loanterm,proptax,pmi,insurance,hoa,monthlypayment,finalpayment,name,address,additionalinfo)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
    RETURNING *
          `;

    const data = await db.query(addtoDBQuery, param);

    res.local.status = {
      status: true,
      message: 'Successful added to DB',
    };
    return next();
  } catch (error) {
    console.log(error.message);
    return next({
      log: 'Express error in addtoDB middleware',
      status: 400,
      message: {
        err: `apiController.addtoDB: ERROR: ${error}`,
      },
    });
  }
};

module.exports = apiController;
