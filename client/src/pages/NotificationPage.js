
import React from "react";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoader, showLoader } from "../redux/slices/alertSlice";
import { Layout } from "../components/Layout";


const URL = "http://localhost:4000"

export const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user) 
  // handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoader());
      const res = await axios.post(
        `${URL}/api/v1/user/getallnotification`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        }
      );
      dispatch(hideLoader());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      console.log(error);
      message.error("something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {

    try {
      dispatch(showLoader());
      const res = await axios.post(
        `${URL}/api/v1/user/deleteallnotification`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        }
      );
      dispatch(hideLoader());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      console.log(error);
      message.error("something went wrong");
    }

  };

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead} style={{ cursor: "pointer" }}>
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMgs) => 
          {
            return <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.data.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
        })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>
          //displaying all seen notifications
          {user?.seennotification.map((notificationMgs) => 
          {
            return <div className="card" style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMgs.data.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            </div>
        })}

        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};
