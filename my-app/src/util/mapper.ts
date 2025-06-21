export const userMapper = (list: any) => {
  return list.map((data: any) => {
    return {
      name: data?.firstName,
      company_name: data?.company?.name,
      role: data?.role,
      country: data?.address?.country,
      is_local: false
    };
  });
};
