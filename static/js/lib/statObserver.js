class StatObserver implements Observer {
  update(message: Object) {
    console.log(JSON.stringify(message));
  }
}

