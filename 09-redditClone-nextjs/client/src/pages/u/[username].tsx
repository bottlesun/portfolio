import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import UserPageView from "../../components/organisms/users/userPage.view";

const UserPage = () => {
  const router = useRouter();
  const username = router.query.username;

  const { data, error } = useSWR(username ? `/users/${username}` : null);
  if (!data) return null;

  return <UserPageView {...data} />;
};

export default UserPage;
