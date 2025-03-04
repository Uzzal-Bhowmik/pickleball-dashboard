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
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "antd";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "@/utils/cn";
import { Popover } from "antd";
import { Check } from "lucide-react";
import { Bell } from "lucide-react";
import toast from "react-hot-toast";
import { useSocket } from "@/context/SocketContextApi";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";

dayjs.extend(relativeTime);

const NotificationContainer = () => {
  const { socket } = useSocket();
  const userId = useSelector(selectUser)?._id;

  const [isUnreadNotificationFound, setIsUnreadNotificationFound] =
    useState(false);

  const [limit, setLimit] = useState(10);
  const {
    data: notificationsRes,
    isLoading,
    isFetching,
  } = useGetMyNotificationQuery({ limit });

  const loadMoreData = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  const notifications = useMemo(() => {
    if (!notificationsRes?.data?.length) {
      return [];
    }

    return notificationsRes?.data;
  }, [notificationsRes]);
  const meta = notificationsRes?.meta || {};

  useEffect(() => {
    notifications?.slice(0, 100)?.forEach((notification) => {
      if (notification?.read === false) {
        setIsUnreadNotificationFound(true);
        return;
      }
    });
  }, [notifications]);

  // handle new notification
  const handleNewNotification = async (data) => {
    console.log({ notification: data });

    if (!isUnreadNotificationFound) {
      setIsUnreadNotificationFound(false);
    }
  };

  useEffect(() => {
    if (socket && userId) {
      socket.on(`notification::${userId}`, handleNewNotification);
    }

    return () => socket?.off(`notification::${userId}`, handleNewNotification);
  }, [socket, userId]);

  // Mark all notifications as read
  const [markRead, { isLoading: isMarkLoading }] = useMarkAsReadMutation();

  const handleMarkAllAsRead = async () => {
    const toastId = toast.loading("Loading...");

    try {
      await markRead().unwrap();
      toast.success("All notifications marked as read!", {
        id: toastId,
      });

      setIsUnreadNotificationFound(false);
    } catch (error) {
      toast.error("Something went wrong! Please try again later.", {
        id: toastId,
      });
    }

    toast.promise(markRead(), {
      loading: "Loading...",
      success: "All notifications marked as read!",
      error: "Something went wrong!",
    });
  };

  return (
    <Popover
      placement="bottomRight"
      title={
        <div className="flex items-center justify-between px-2">
          <h4 className="text-base font-semibold">All Notifications</h4>
          <button
            className="flex items-center gap-1 rounded-md border px-3 py-1 transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-white"
            onClick={handleMarkAllAsRead}
            disabled={isMarkLoading}
          >
            Mark Read <Check size={15} />
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
              hasMore={notifications.length < meta.total} // Ensure it stops correctly
              loader={<Skeleton active loading={isFetching} />}
              scrollableTarget="scrollableDiv"
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
