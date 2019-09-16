// Home.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Dashboard extends Component {
  render() {
    return (
      <div id="content">
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>
          <div className="row dashborad_settings">

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Users
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        <Link className="nav-link" to="/admin/users">Click Here</Link>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-user" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Categories
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                         <Link className="nav-link" to="/admin/categories">Click Here</Link>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-align-left" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Courses
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                         <Link className="nav-link" to="/admin/courses">Click Here</Link>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-list" />
                    </div>
                  </div>
                </div>
              </div>
            </div>


             <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Enrollment Requests
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                         <Link className="nav-link" to="/admin/enrollments">Click Here</Link>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-bell" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Enrolled Users
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                          <Link className="nav-link" to="/admin/enrolled/users">Click Here</Link>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-user" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Blog
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                         <Link className="nav-link" to="/admin/blogs">Click Here</Link>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-forumbee" />
                    </div>
                  </div>
                </div>
              </div>
            </div>


             <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                       Pages
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        <Link className="nav-link" to="/admin/static/pages">Click Here</Link>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-files-o" />
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Settings
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                          <Link className="nav-link" to="/admin/settings">Click Here</Link>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fa fa-gear" />
                    </div>
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
