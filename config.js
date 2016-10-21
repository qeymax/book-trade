var config = {
  DBUrl: process.env.DBURL || 'mongodb://qeymax:sallam2100@ds063715.mlab.com:63715/book-trade-production',
  passportSecret: process.env.PASSPORTSECRET || 'my passport secret'
}

module.exports = config
