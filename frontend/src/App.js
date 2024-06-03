import React from "react";
import "./App.css";
import Login from "./login";
import Logout from "./logout";
import Layout from "./layouts/layout";
import { AuthProvider } from "./layouts/AuthContext";
import SignUp from "./signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import UserView from './actors/superadmin/UserView';

const App = () => {
    const isLoggedIn = false;

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/layout" element={<Layout />} />
                <Route path="/verify-email/:userId" element={<Login />} />

                //superadmin
                
                {/*<Route path="/TaskAdminActivity/:user_id" element={<Layout role="superadmin" />} /> */}                

                <Route path="/EmailVerification" element={<Layout />} />
                <Route path="/addUser" element={<Layout />} />
                <Route path="/UpdateUser/:user_id"  element={<Layout role="superadmin" />} />                                     
                <Route path="/userList" element={<Layout />} />
                <Route path="/AddFranchise" element={<Layout />} />
                <Route path="/FranchiseList" element={<Layout />} />
                <Route path="/FranchiseonwerList" element={<Layout />} />
                <Route path="/UpdateFranchise/:franchiseSystem_id"
                       element={<Layout role="superadmin" />}/>
                <Route path="/AddFranchisePermission" element={<Layout />} />
                <Route path="/FranchisePermissionList" element={<Layout />} />
                <Route path="/UpdateFranchisePermission/:franchise_permission_id"
                       element={<Layout role="superadmin" />}/>
                <Route path="/addAssignFranchisePermission"  element={<Layout />}/>
                <Route path="/AssignFranchisePermissionList"  element={<Layout />}  />
                <Route path="/UpdateAssignFranchisePermission/:APTofranchiseSystem_id"
                       element={<Layout role="superadmin" />} />
                <Route path="/AddRole" element={<Layout />} />
                <Route path="/RoleList" element={<Layout />} />
                <Route path="/UpdateRole/:role_id" element={<Layout role="superadmin" />}  />                 
                <Route path="/AddPermission" element={<Layout />} />
                <Route path="/PermissionList" element={<Layout />} />
                <Route path="/UpdatePermission/:permission_id"
                      element={<Layout role="superadmin" />}/> 
                 <Route path="/UserPermission" element={<Layout />} />
                <Route path="/UserPermissionList" element={<Layout />} />
                <Route path="/UpdateUserPermission/:user_permission_id"
                       element={<Layout role="superadmin" />} />
                <Route path="/DriversInfo" element={<Layout />} />
                <Route path="/UserSummaryModal" element={<Layout />} />
                <Route path="/RegisterUser" element={<Layout />} />
                <Route path="/RideInfo" element={<Layout />} />                           
                //Taskadmin
                <Route path="/AddFleet" element={<Layout />} />
                <Route path="/FleetList" element={<Layout />} />
                <Route path="/UpdateFleet/:fleet_id" element={<Layout role="taskadmin" />} /> 
                <Route path="/AddDriver" element={<Layout />} />
                <Route path="/DriverList" element={<Layout />} />
                <Route path="/UpdateDriver/:driver_id" element={<Layout role="taskadmin" />}  />   
                <Route path="/AssignFleet" element={<Layout />} />
                <Route path="/AssignedFleetList" element={<Layout />} />
                <Route path="/updateAssignFleet/:assign_fleet_id" element={<Layout role="taskadmin" />}/>                                  
                <Route path="/getTeamAdminUsers" element={<Layout />} />
                <Route path="/AssignFleetTeam" element={<Layout />} />
                <Route path="/AssignFleetList" element={<Layout />} />
                <Route path="/updateAssignFleetTeam/:TA_assign_fleet_id" element={<Layout role="taskadmin" />}/>                                 

                

                //TeamAdmin
                <Route path="/AddAttendence" element={<Layout />} />
                <Route path="/AttendenceList" element={<Layout />} />             
                <Route path="/UpdateAttendence/:attendance_id" element={<Layout role="taskadmin" />}/> 
                <Route path="/AddIssue" element={<Layout />} />
                <Route path="/IssueList" element={<Layout />} />
                <Route path="/UpdateIssue/:issues_id" element={<Layout role="taskadmin" />}/> 
                <Route path="/AddAccident" element={<Layout />} />
                <Route path="/AccidentList" element={<Layout />} />
                <Route path="/UpdateAccident/:accident_id" element={<Layout role="taskadmin" />}/> 
                <Route path="/AssignFleets" element={<Layout />} />
                <Route path="/AssignedFleetLists" element={<Layout />} />
                <Route path="/updateAssignFleet/:assign_fleet_id" element={<Layout role="teamadmin" />}/>                                  
                <Route path="/PresentDriverList" element={<Layout />} />
                <Route path="/AbsentDriverList" element={<Layout />} />
                <Route path="/IssueListInfo" element={<Layout />} />
                <Route path="/VacantRides" element={<Layout />} />
               
                
//////////////accountsadmin
                <Route path="/AddNew" element={<Layout />} />
                <Route path="/TutorsList" element={<Layout />} />
                <Route path="/Category" element={<Layout />} />
                <Route path="/CategoryList" element={<Layout />} />
                <Route path="/AddCourse" element={<Layout />} />
                <Route path="/CoursesList" element={<Layout />} />
                <Route path="/AssignTutors" element={<Layout />} />
                <Route path="/AssignedTutors" element={<Layout />} />
                <Route path="/EnrollNew" element={<Layout />} />
                <Route path="/EnrolmentList" element={<Layout />} />
               
                <Route path="/AddAccount" element={<Layout />} />
                <Route path="/AccountList" element={<Layout />} />              
                <Route path="/AddRecievableAccount" element={<Layout />} />
                <Route path="/RecievableAccountList" element={<Layout />} />
                <Route path="/RecievableAccountInfo" element={<Layout />} />
                <Route path="/UpdateRecieveableAccount/:accounts_recieveable_id" element={<Layout role="accountsadmin" />}/>                                  
                <Route path="/AddPayableAccount" element={<Layout />} />
                <Route path="/PayableAccountList" element={<Layout />} />
                <Route path="/UpdatePayableAccount/:accounts_payable_id" element={<Layout role="accountsadmin" />}/>                                  
                <Route path="/PayableAccountListInfo" element={<Layout />} />
                
                <Route path="/AddSales" element={<Layout />} />
                <Route path="/SalesList" element={<Layout />} />
                <Route path="/UpdateSales/:sales_jouranl_id" element={<Layout role="accountsadmin" />}/>                                  
                <Route path="/AddPurchase" element={<Layout />} />
                <Route path="/PurchaseList" element={<Layout />} />
                <Route path="/UpdatePurchase/:purchase_jouranl_id" element={<Layout role="accountsadmin" />}/>                                  
                <Route path="/SalesInfo" element={<Layout />} />
                
                <Route path="/AddNewExpenses" element={<Layout />} />
                <Route path="/Expenses" element={<Layout />} />
                <Route path="/ProfitAndLoss" element={<Layout />} />
                <Route path="/TrialBalance" element={<Layout />} />
                <Route path="/CashFlowStatement" element={<Layout />} />
                <Route path="/RideRequest" element={<Layout />} />
                <Route path="/Quries" element={<Layout />} />
                ////////Franchise_onwer
                <Route path="/AddNewTask" element={<Layout />} />
                <Route path="/TaskList" element={<Layout />} />
                <Route path="/UpdateNewTask/:task_id"
                       element={<Layout role="superadmin" />} />
                <Route path="/TaskInfo" element={<Layout />} />
                <Route path="/FleetListInfo" element={<Layout />} />
                <Route path="/DriverListInfo" element={<Layout />} />
                <Route path="/CustomerListInfo" element={<Layout />} />
                {/*<Route path="/UserView/:user_id" element={<UserView />} />*/}
            </Routes>
        </div>
    );
}

export default App;
