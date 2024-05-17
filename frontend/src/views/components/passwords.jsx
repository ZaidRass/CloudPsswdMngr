import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import axios from "axios";
import AddPasswordForm from "./AddPasswordForm";
import EditPasswordForm from "./EditPasswordForm";

export default function Passwords() {
  const [passwords, setPasswords] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editPasswordId, setEditPasswordId] = useState(null);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const toggleEditForm = (passwordId) => {
    setShowEditForm(!showEditForm);
    setEditPasswordId(passwordId);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleDelete = async (passwordId) => {
    try {
      const response = await axios.delete(
        `http://ec2-16-170-228-249.eu-north-1.compute.amazonaws.com:3000/api/v1/Users/deletePlatformPassword/${passwordId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Password deleted successfully");
        fetchPasswords();
      }
    } catch (error) {
      console.error("Failed to delete password", error);
    }
  };

  const fetchPasswords = async () => {
    try {
      const response = await axios.get(
        "http://ec2-16-170-228-249.eu-north-1.compute.amazonaws.com:3000/api/v1/Users/passwords",
        { withCredentials: true }
      );
      if (!response) {
        throw new Error("Failed to fetch passwords");
      }
      const data = response.data;
      setPasswords(data);
    } catch (error) {
      console.error("Failed to fetch passwords", error);
    }
  };

  const renderCell = (password, columnKey) => {
    const cellValue = password[columnKey];

    switch (columnKey) {
      case "Platform Mail":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {password.platEmail}
            </p>
          </div>
        );
      case "Password":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {password.password}
            </p>
          </div>
        );
      case "Platform":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {password.platform}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onClick={() => toggleEditForm(password.passId)}>
                  Edit
                </DropdownItem>
                <DropdownItem onClick={() => handleDelete(password.passId)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table
      aria-label="Passwords Table"
      isHeaderSticky
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      topContent={
        <div className="flex flex-col gap-4">
          <div className="flex justify-end gap-3 items-end">
            <div className="flex gap-3">
              <Button
                color="primary"
                endContent={<PlusIcon />}
                onClick={toggleAddForm}
              >
                Add New Password
              </Button>
            </div>
          </div>
          {showAddForm && <AddPasswordForm />}
          {showEditForm && <EditPasswordForm passwordId={editPasswordId} />}
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">
              Total {passwords.length} passwords
            </span>
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      }
    >
      <TableHeader
        columns={[
          { uid: "Platform Mail", name: "Platform Mail" },
          { uid: "Platform", name: "Platform" },
          { uid: "Password", name: "Password" },
          { uid: "actions", name: "Actions" },
        ]}
      >
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={false}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No passwords found"} items={passwords}>
        {(password) => (
          <TableRow key={password.passId}>
            {(columnKey) => (
              <TableCell>{renderCell(password, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
