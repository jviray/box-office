import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    loading: true,
    drizzleState: null
  };

  componentDidMount() {
    const { drizzle } = this.props;

    // Subscribes to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // Every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // Check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });


  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const mainContentDimensions = {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '10px 10px 100px 10px',
    };

    if (this.state.loading) return "LOADING...";

    return (
      <div className="App">
        {/* NAVIGATION BAR */}
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a href="#" className="navbar-brand">BOX OFFICE</a>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <div style={mainContentDimensions}>
          <div className="container">

            {/* ADD SHOW MODAL */}
            <div className="modal" id="add-show-modal">
              <div className="modal-dialog">

                <div className="modal-content">
                  <div className="modal-header">
                    <button className="close"
                            type="button" data-dismiss="modal">X</button>
                    <h3 className="modal-title">Enter Show Details</h3>
                  </div>

                  <div className="modal-body">

                    {/* ADD SHOW MODAL FORM */}
                    <form>
                      <div className="form-group">
                        <div className="input-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Enter artist's name" />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="input-group">
                          <input type="text"
                                 className="form-control"
                                 placeholder="Enter ticket price" />
                          <span className="input-group-addon">ETH</span>
                        </div>
                      </div>

                      <button
                          href="#"
                          type="submit"
                          className="btn btn-primary btn-sm pledge-btn">
                          SUBMIT
                      </button>
                    </form>

                  </div>
                </div>

              </div>
            </div>

            {/* HEADER */}
            <div className="page-header">
              <h3>UPCOMING SHOWS</h3>
            </div>

            <div className="row">

              {/* SHOW LIST */}
              <div className="col-xs-12 col-md-8 ">

              </div>

              {/* SIDE PANEL */}
              <div className="col-xs-12 col-md-4">
                <div className="panel panel-default side-panel">
                  <div className="panel-heading">
                    <h6><b>Your Address:</b></h6>
                    <h6 className="text-success">{ this.state.drizzleState.accounts[0] }</h6>
                    <h6><b>Your Balance:</b></h6>
                    <h6 className="text-success">{ (this.state.drizzleState.accountBalances[this.state.drizzleState.accounts[0]] / 10 ** 18) + ' ETH' }</h6>
                  </div>

                  <div className="panel-body">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      href="#"
                      data-toggle="modal"
                      data-target="#add-show-modal">
                      ADD SHOW
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
