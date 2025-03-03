"use client";

import { useGetMyNotificationQuery } from "@/redux/api/notificationApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { List } from "antd";
import { Spin } from "antd";
import { Flex } from "antd";
import { useState } from "react";
import { Skeleton } from "antd";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { cn } from "@/utils/cn";

dayjs.extend(relativeTime);

const NotificationContainer = () => {
  const [limit, setLimit] = useState(10);
  const {
    data: notificationsRes,
    isLoading,
    isFetching,
  } = useGetMyNotificationQuery({ limit });

  const loadMoreData = () => {
    setLimit((prevLimit) => prevLimit + 10);
  };

  const notifications = notificationsRes?.data || [];
  const meta = notificationsRes?.meta || {};

  return (
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
                    <p className="text-primary">{notification?.description}</p>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default NotificationContainer;
