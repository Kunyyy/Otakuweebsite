'use client';

import { Fragment, useEffect, useState } from "react";
import style from './adm.module.css';
import getAllanime from "./getdb";
import getDB from "./editdb";
import changeStatus from "./changestatus";
import Editform from "./editform";

export default function Animestatus() {

    useEffect (() => {
        const cookies = document.cookie;

        if (cookies) {
            const cookiess = document.cookie.split(';');
            const username = cookiess[0].split('=');
            const password = cookiess[1].split('=');

            if (username[1] !== 'admin' && password[1] !== '1234' ) {
                window.location.href = "/Admin";
            }
        } else {
            window.location.href = "/Admin";
        }
    })

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getdb = async() => {
            const { ongoingAnimes } = await getAllanime();
            setTableData(ongoingAnimes);
            setLoading(false);
        }
        getdb();

    }, []);

    const changestatus = async(id, currentStatus) => {
      const newStatus = currentStatus === "Completed" ? "Ongoing" : "Completed";
      const changes = await changeStatus(id, newStatus);
      if (changes) {
        location.reload();
      }
    }

    const [showEdit, setShowEdit] = useState(false);
    const [whichDB, setWhichDB] = useState(false);

    const editcontent = async(id) => {
      const { databases } = await getDB(id);
      setWhichDB(databases);
      setShowEdit(true);
    }

    const backbtn = () => {window.location.href = "/Adm/Anime";}

    if (!loading) {

      return (
        <Fragment>
          <button className={style['backbtn']} type="submit" onClick={backbtn}>Back</button>
          <div className="w-full h-full text-white text-2xl flex justify-center py-10 px-10">
            <table className="border-collapse border border-gray-300 h-[50px] w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300">ID</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 text-center">{item.id}</td>
                    <td className="border border-gray-300 p-2 text-ellipsis">{item.name}</td>
                    <td className="border border-gray-300 p-2 text-center">{item.status}</td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex flex-col justify-center items-center">
                          <button className="text-xl px-2 py-2 mb-2 bg-[#4CAF50] text-white rounded-md" onClick={() => changestatus(item.id, item.status)}>Change Status</button>
                          <button className="text-xl px-2 py-2 bg-[#A5A5A5] text-white rounded-md" onClick={() => editcontent(item.id)}>Edit Content</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Editform isVisible={showEdit} onClose={() => {setShowEdit(false)}} databases={whichDB} />
        </Fragment>
      )

    } else {
      return (
        <div className="absolute inset-0 bg-black"></div>
      )
    }
}