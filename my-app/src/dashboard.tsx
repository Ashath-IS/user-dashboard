import axios from "axios";
import { CustomTable } from "./components/ui/customTable";
import { useEffect, useState } from "react";
import { IconButton, Input, Button, useDisclosure } from "@chakra-ui/react";
import { LuSearch, LuTrash2 } from "react-icons/lu";
import { userMapper } from "./util/mapper";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const fetchData = async function (
  pagination: { limit: number; skip: number },
  search: string
) {
  const { limit, skip } = pagination;
  const paginationFilter = `limit=${limit}&skip=${skip}`;
  let url = `https://dummyjson.com/users`;
  url +=
    search.length > 0
      ? `/search?q=${search}&${paginationFilter}`
      : `?${paginationFilter}`;
  const response = await axios.get(url);
  return response.data;
};

const Dashboard = () => {
  const [users, setUsers]:any = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    limit: 25,
    page: 1,
  });

  const [search, setSearch] = useState("");

  const { open, onOpen, onClose } = useDisclosure();
  const fromStorage = JSON.parse(localStorage.getItem("localUsers") || "[]")


  useEffect(() => {
    const skip = (pagination.page - 1) * pagination.limit;

    async function getUsers() {
      const data = await fetchData({ limit: pagination.limit, skip }, search);
      const list = userMapper(data?.users);
      setUsers([...fromStorage, ...list]);
      setPagination((prev) => ({
        ...prev,
        count: data?.total || 0,
      }));
    }

    getUsers();
  }, [pagination.page, pagination.limit, search, JSON.stringify(fromStorage)]);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const onSearch = (value: string) => {
    setSearch(value);
    setPagination({ ...pagination, page: 1 });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newUser:any = {
      name: formData.get("name") as string,
      company_name: formData.get("company_name") as string,
      role: formData.get("role") as string,
      country: formData.get("country") as string,
      is_local: true,
    };

    const existing = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const updated = [newUser, ...existing];
    localStorage.setItem("localUsers", JSON.stringify(updated));
    setUsers([newUser, ...users]);
    onClose();
  };

  const deleteRecord = (item: any)=> {
    const existing = JSON.parse(localStorage.getItem("localUsers") || "[]");
    const updated = existing.filter((user:any) => user.name !== item.name);
    localStorage.setItem("localUsers", JSON.stringify(updated));
    setUsers([...updated, ...users]);
  }

  const columns = [
    {
      title: "Name",
      render: (item: any) => <p>{item.name}</p>,
      filter: {
        icon: <LuSearch color={"black"} />,
        render: () => (
          <Input
            placeholder="Search name"
            className="border p-1"
            onChange={(e) => onSearch(e.target.value)}
          />
        ),
      },
    },
    {
      title: "Company Name",
      render: (item: any) => <p>{item.company_name}</p>,
    },
    {
      title: "Role",
      render: (item: any) => <p className="capitalize">{item.role}</p>,
    },
    {
      title: "Country",
      render: (item: any) => <p>{item.country}</p>,
    },
    {
      title: "Actions",
      render: (item: any) => {
        return item.is_local ? (
          <IconButton
            variant={"ghost"}
            color="black"
            _hover={{ background: "transparent" }}
            onClick={()=> deleteRecord(item)}
          >
            <LuTrash2 color="red" />
          </IconButton>
        ) : (
          <></>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-black mb-20">Users</div>
        <Button onClick={() => onOpen()} variant={"surface"}>
          + Add
        </Button>
      </div>
      <CustomTable
        data={users}
        columns={columns}
        pagination={{
          count: pagination.count,
          limit: pagination.limit,
          page: pagination.page,
          onPageChange,
        }}
      />
      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="white"
          maxW="500px"
          m={"auto"}
          mt={8}
          p={8}
          borderWidth={2}
          borderRadius={20}
        >
          <ModalHeader className="text-black text-xl border-b">Add User</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel className="text-black">Name</FormLabel>
                <Input name="name" placeholder="Name" color="blackAlpha.700" required />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel className="text-black">Company</FormLabel>
                <Input
                  name="company_name"
                  placeholder="Company"
                  color="blackAlpha.700"
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel className="text-black">Role</FormLabel>
                <Input name="role" placeholder="Role" color="blackAlpha.700" required />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel className="text-black">Country</FormLabel>
                <Input
                  name="country"
                  placeholder="Country"
                  color="blackAlpha.700"
                  required
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" variant="surface" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dashboard;
