/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
} from "@/redux/api/notificationApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { List } from "antd";
import { Spin } from "antd";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import { Skeleton, Divider } from "antd";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "@/utils/cn";
import { Popover } from "antd";
import { Check } from "lucide-react";
import { Bell } from "lucide-react";
import { toast } from "react-toastify";
import { useSocket } from "@/context/SocketContextApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";
import textTruncate from "@/utils/textTruncate";
import catchAsync from "@/utils/catchAsync";
import { Loader } from "lucide-react";

dayjs.extend(relativeTime);

const NotificationContainer = () => {
  const { socket } = useSocket();
  const userId = useSelector(selectUser)?._id;
  const [notifications, setNotifications] = useState([]);

  const [isUnreadNotificationFound, setIsUnreadNotificationFound] =
    useState(false);

  // Query
  const [page, setPage] = useState(1);

  // Get all notifications
  const {
    data: notificationsRes,
    isLoading,
    isFetching,
    refetch,
  } = useGetMyNotificationQuery({ page, limit: 10 });

  const notificationsMeta = notificationsRes?.meta || {};

  // Set notifications in local state
  useEffect(() => {
    if (notificationsRes?.data) {
      setNotifications((prev) => [...prev, ...notificationsRes?.data]);
    }
  }, [isFetching]);

  // Load more data on infinite scroll
  const loadMoreData = () => {
    if (page !== notificationsRes?.meta?.totalPages) {
      setPage((page) => page + 1);
    }
  };

  // Check if unread notification found
  useEffect(() => {
    notifications?.slice(0, 100)?.forEach((notification) => {
      if (notification?.read === false) {
        setIsUnreadNotificationFound(true);
        return;
      }
    });
  }, [notificationsRes]);

  // Mark all notifications as read
  const [markRead, { isLoading: isMarkLoading }] = useMarkAsReadMutation();

  const handleMarkAllAsRead = () => {
    catchAsync(async () => {
      await markRead().unwrap();
      setIsUnreadNotificationFound(false);

      // Refetch notifications and replace the state
      const { data: newNotificationsRes } = await refetch();
      if (newNotificationsRes?.data) {
        setNotifications(newNotificationsRes.data); // Replace old notifications
      }

      toast.success("All notifications marked");
    });
  };

  // handle new notification
  const handleNewNotification = async (notification) => {
    if (notification?.message) {
      toast(<p>{textTruncate(notification?.message, 200)}</p>, {
        theme: "light",
        type: "info",
        className: "!bg-blue-100 !text-[15px] !text-black !font-semibold",
      });
    }

    setNotifications((prev) => [notification, ...prev]);
    setIsUnreadNotificationFound(true);
  };

  useEffect(() => {
    if (socket && userId) {
      socket.on(`notification::${userId}`, handleNewNotification);
    }

    return () => socket?.off(`notification::${userId}`, handleNewNotification);
  }, [socket, userId]);

  return (
    <Popover
      placement="bottomRight"
      title={
        <div className="flex items-center justify-between px-2">
          <h4 className="text-base font-semibold">All Notifications</h4>
          <button
            className="flex-center flex items-center gap-1 rounded-md border px-3 py-1 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-white"
            onClick={handleMarkAllAsRead}
            disabled={isMarkLoading}
          >
            {isMarkLoading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              <>
                Mark Read <Check size={15} />
              </>
            )}
          </button>
        </div>
      }
      content={
        <div
          style={{
            maxHeight: 450,
            width: 550,
            overflow: "auto",
          }}
          className="scroll-hide"
          id="scrollableDiv"
        >
          {isLoading ? (
            <Flex align="center" justify="center" style={{ height: "450px" }}>
              <Spin size="large" />
            </Flex>
          ) : (
            <InfiniteScroll
              dataLength={notifications.length}
              next={loadMoreData}
              hasMore={notifications.length < notificationsMeta.total} // Ensure it stops correctly
              loader={<Skeleton active loading={isFetching} />}
              scrollableTarget="scrollableDiv"
              endMessage={
                <Divider style={{ fontSize: "14px", color: "gray" }}>
                  Yay! You&apos;ve seen it all 🎉
                </Divider>
              }
              className="scroll-hide"
            >
              <List
                dataSource={notifications}
                renderItem={(notification) => (
                  <List.Item
                    key={notification?._id}
                    className={cn(
                      "!p-2 !text-start",
                      !notification?.read && "bg-gray-100",
                    )}
                  >
                    <div className="flex w-full items-center gap-x-3">
                      <Icon
                        icon="typcn:bell"
                        height={26}
                        width={26}
                        color="var(--primary)"
                      />
                      <div className="flex w-full flex-col items-start">
                        <div className="flex w-full items-center justify-between text-start">
                          <p className="flex-1 font-semibold">
                            {notification?.message}
                          </p>

                          <p className="w-max text-xs font-medium text-muted">
                            {dayjs(notification?.createdAt).fromNow()}
                          </p>
                        </div>
                        <p className="text-primary">
                          {notification?.description}
                        </p>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          )}
        </div>
      }
    >
      <button className="flex-center relative aspect-square size-11 rounded-full bg-primary !leading-none">
        {isUnreadNotificationFound && (
          <div
            className="absolute right-3 top-2 size-3 animate-ping rounded-full bg-red-600"
            style={{
              animationDuration: "1500ms",
              animationIterationCount: "5",
            }}
          />
        )}

        <Bell size={24} color="#fff" />
      </button>
    </Popover>
  );
};

export default NotificationContainer;
