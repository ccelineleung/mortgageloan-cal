


CREATE TABLE users (
  user_id     SERIAL PRIMARY KEY NOT NULL,
  username     VARCHAR(50)  NOT NULL UNIQUE,
  email    VARCHAR(50)  UNIQUE,
  password      VARCHAR(255)  NOT NULL,
  refreshtoken VARCHAR(255)  NOT NULL,
  githubUser INT NOT NULL,
);


CREATE TABLE homedata (
  home_id     SERIAL PRIMARY KEY NOT NULL,
  user_id     INT NOT NULL,
  homevalue        VARCHAR(50) NOT NULL,
  loanamount    VARCHAR(255) NOT NULL,
  downpayment       VARCHAR(255) NOT NULL,
  interest       VARCHAR(255) NOT NULL,
  loanterm      VARCHAR(255) NOT NULL,
  proptax      VARCHAR(255) NOT NULL,
  PMI      VARCHAR(255) NOT NULL,
  insurance     VARCHAR(255) NOT NULL,
  HOA       VARCHAR(255) NOT NULL,
  monthlypayment       VARCHAR(255) NOT NULL,
  finalpayment       VARCHAR(255) NOT NULL,
  name      VARCHAR(255) NOT NULL,
  streetaddress    VARCHAR(255) NOT NULL,
  city    VARCHAR(255) NOT NULL,
  state    VARCHAR(255) NOT NULL,
  zipcode  VARCHAR(255) NOT NULL,
  additionalInfo       VARCHAR(255) NOT NULL,


  FOREIGN KEY (user_id) REFERENCES users(user_id)

);

