import { Fragment, useEffect, useState } from "react";
import "./tableUsers.scss";
import { SerchInputs } from "../forms/serchInput";
import arrowDown from "../icons/arrowDown.svg";
import arrowUp from "../icons/arrowUp.svg";
import { Modal } from "../modal/modal";

export function TableUsers() {
  const https = "https://dummyjson.com/users";
  const [users, setUsers] = useState([]);
  const [serch, setSerch] = useState("");
  const [refresh, setRefresh] = useState(true || false); // для отслеживания обновления users
  const [modalActive, setModalActive] = useState({ boolean: false });

  const getUsers = async () => {
    try {
      const response = await fetch(https);
      const json = await response.json();
      setUsers(json.users);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  function sorted(text) {
    if (refresh) {
      users.sort((a, b) => (a[text] > b[text] ? 1 : -1));
      setUsers(users);
      setRefresh(!refresh);
    } else {
      users.sort((a, b) => (a[text] < b[text] ? 1 : -1));
      setUsers(users);
      setRefresh(!refresh);
    }
  }
  if (users.length == "") {
    return <>loading</>;
  }
  return (
    <div className="table">
      <div className="table__inner">
        <SerchInputs serch={serch} setSerch={setSerch} />
        <button
          onClick={() => {
            setUsers(users.sort((a, b) => (a.id > b.id ? 1 : -1)));
            setRefresh("1"); // преобразуется в true, для обновления компоненты
          }}
          className="table-btn"
        >
          Refresh
        </button>
      </div>
      <table>
        <thead className="thead">
          <tr>
            <th>
              ФИО{" "}
              {refresh ? (
                <img onClick={() => sorted("firstName")} src={arrowUp}></img>
              ) : (
                <img onClick={() => sorted("firstName")} src={arrowDown}></img>
              )}
            </th>
            <th>
              Возраст{" "}
              {refresh ? (
                <img onClick={() => sorted("age")} src={arrowUp}></img>
              ) : (
                <img onClick={() => sorted("age")} src={arrowDown}></img>
              )}
            </th>
            <th>
              Пол{" "}
              {refresh ? (
                <img onClick={() => sorted("gender")} src={arrowUp}></img>
              ) : (
                <img onClick={() => sorted("gender")} src={arrowDown}></img>
              )}
            </th>
            <th>Номер телефона</th>
            <th>
              Адрес{" "}
              {refresh ? (
                <img onClick={() => sorted("city")} src={arrowUp}></img>
              ) : (
                <img onClick={() => sorted("city")} src={arrowDown}></img>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((item) => {
              return serch.toLowerCase() === ""
                ? item
                : (
                    item.firstName.toLowerCase() +
                    " " +
                    item.lastName.toLowerCase() +
                    " " +
                    item.maidenName.toLowerCase()
                  ).includes(serch.toLocaleLowerCase()) ||
                    String(item.age).includes(serch.toLocaleLowerCase()) ||
                    item.gender
                      .toLowerCase()
                      .includes(serch.toLocaleLowerCase()) ||
                    String(item.phone).includes(serch.toLocaleLowerCase()) ||
                    item.address.city
                      .toLowerCase()
                      .includes(serch.toLocaleLowerCase()) ||
                    item.address.address
                      .toLowerCase()
                      .includes(serch.toLocaleLowerCase());
            })
            .map((arr) => {
              return (
                <tr
                  key={arr.id}
                  id={arr.id}
                  onClick={() => {
                    setModalActive({
                      boolean: true,
                      fullname: `${arr.firstName} ${arr.lastName} ${arr.maidenName}`,
                      age: arr.age,
                      address: `${arr.address.city} ${arr.address.address}`,
                      height: arr.height,
                      weight: arr.weight,
                      phone: arr.phone,
                      email: arr.email,
                    });
                  }}
                >
                  <th>
                    <p>
                      {arr.firstName} {arr.lastName} {arr.maidenName}
                    </p>
                  </th>
                  <th>
                    <p>{arr.age}</p>
                  </th>
                  <th>
                    <p>{arr.gender}</p>
                  </th>
                  <th>
                    <p>{arr.phone}</p>
                  </th>
                  <th>
                    <p>{arr.address.city}</p>
                    <p>{arr.address.address}</p>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
}
