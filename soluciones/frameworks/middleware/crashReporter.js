const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    /*Raven.captureException(err, {
      extra: {
              action,
              state: store.getState()
            }
        })*/
      throw err
    }
}

module.exports = crashReporter
